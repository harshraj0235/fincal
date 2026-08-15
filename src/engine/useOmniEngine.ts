import { useState, useCallback } from 'react';
import { CalculatorConfig, EngineState } from './types';

export function useOmniEngine(config: CalculatorConfig) {
  const [state, setState] = useState<EngineState>(() => {
    const initialState: EngineState = {};
    config.variables.forEach(v => {
      initialState[v.id] = {
        value: null,
        unit: v.defaultUnit || (v.units ? v.units[0].id : undefined),
        isUserProvided: false,
      };
    });
    return initialState;
  });

  // Keep track of the order of user edits. 
  // Max inputs = total variables - 1 (usually, assuming 1 degree of freedom).
  const [editHistory, setEditHistory] = useState<string[]>([]);

  const recalculate = useCallback((currentState: EngineState, currentHistory: string[]) => {
    let nextState = { ...currentState };
    let changed = true;
    let iterations = 0;

    while (changed && iterations < 10) {
      changed = false;
      iterations++;

      for (const solver of config.solvers) {
        // Don't overwrite if the user provided it (and it's still in the active history)
        if (currentHistory.includes(solver.solveFor)) continue;

        const canSolve = solver.dependencies.every(dep => {
           const val = nextState[dep]?.value;
           return val !== null && val !== undefined && val !== '';
        });

        if (canSolve) {
          // 1. Convert dependencies to base units
          const baseValues: Record<string, number> = {};
          for (const dep of solver.dependencies) {
            const varConf = config.variables.find(v => v.id === dep);
            let val = Number(nextState[dep].value);
            if (varConf?.units && nextState[dep].unit) {
              const unit = varConf.units.find(u => u.id === nextState[dep].unit);
              if (unit) val = val * unit.toBaseMultiplier;
            }
            baseValues[dep] = val;
          }

          // 2. Solve
          const result = solver.fn(baseValues);
          if (isNaN(result) || !isFinite(result)) continue;

          // 3. Convert result back to target unit
          const targetConf = config.variables.find(v => v.id === solver.solveFor);
          let displayResult = result;
          if (targetConf?.units && nextState[solver.solveFor].unit) {
            const targetUnit = targetConf.units.find(u => u.id === nextState[solver.solveFor].unit);
            if (targetUnit) displayResult = displayResult / targetUnit.toBaseMultiplier;
          }

          // 4. Update state if changed
          const roundedResult = Math.round(displayResult * 100) / 100; // Round to 2 decimals for now
          if (nextState[solver.solveFor].value !== roundedResult) {
            nextState[solver.solveFor] = {
              ...nextState[solver.solveFor],
              value: roundedResult,
              isUserProvided: false
            };
            changed = true;
          }
        }
      }
    }
    return nextState;
  }, [config]);

  const updateVariable = useCallback((id: string, value: number | string | null) => {
    setState(prev => {
      const nextState = { ...prev };
      nextState[id] = { ...nextState[id], value, isUserProvided: value !== null && value !== '' };
      
      let nextHistory = [...editHistory];
      if (value !== null && value !== '') {
         // Move to end of history (most recent)
         nextHistory = nextHistory.filter(h => h !== id);
         nextHistory.push(id);
         
         // Assuming max inputs = total variables - 1
         const maxInputs = config.variables.length - 1;
         if (nextHistory.length > maxInputs) {
            // Remove oldest
            const oldest = nextHistory.shift();
            if (oldest) {
                nextState[oldest].isUserProvided = false;
            }
         }
      } else {
         // If cleared, remove from history
         nextHistory = nextHistory.filter(h => h !== id);
      }
      
      setEditHistory(nextHistory);
      return recalculate(nextState, nextHistory);
    });
  }, [config, editHistory, recalculate]);

  const updateUnit = useCallback((id: string, unitId: string) => {
    setState(prev => {
      const nextState = { ...prev };
      
      // If the variable has a value, we should convert the visual value so the base value remains the same.
      // E.g., changing Tenure from 1 Year to Months should change the input box to 12.
      const varConf = config.variables.find(v => v.id === id);
      const oldUnitId = prev[id].unit;
      const val = prev[id].value;
      
      if (varConf?.units && oldUnitId && val !== null && val !== '') {
          const oldUnit = varConf.units.find(u => u.id === oldUnitId);
          const newUnit = varConf.units.find(u => u.id === unitId);
          
          if (oldUnit && newUnit) {
              const baseValue = Number(val) * oldUnit.toBaseMultiplier;
              const newValue = baseValue / newUnit.toBaseMultiplier;
              nextState[id].value = Math.round(newValue * 100) / 100;
          }
      }
      
      nextState[id] = { ...nextState[id], unit: unitId };
      
      // We also trigger a recalculation to ensure dependents update appropriately 
      return recalculate(nextState, editHistory);
    });
  }, [config, editHistory, recalculate]);

  return {
    state,
    updateVariable,
    updateUnit
  };
}
