export type VariableType = 'number' | 'select' | 'boolean';

export interface UnitConfig {
  id: string;
  name: string;
  /** Multiplier to convert this unit into the "base" unit used for calculations */
  toBaseMultiplier: number;
}

export interface VariableConfig {
  id: string;
  name: string;
  type: VariableType;
  description?: string;
  
  // For number variables
  min?: number;
  max?: number;
  step?: number;
  
  // For unit conversion
  units?: UnitConfig[];
  defaultUnit?: string;
  
  // For select variables
  options?: { label: string; value: string | number }[];
  
  // Layout grouping
  group?: string;
}

export interface SolverFunction {
  solveFor: string;
  dependencies: string[];
  fn: (values: Record<string, number>) => number;
}

export interface ChartConfig {
  type: 'pie' | 'doughnut';
  title: string;
  dataPoints: {
    label: string;
    valueVariable: string;
    color: string;
  }[];
}

export interface CalculatorConfig {
  id: string;
  title: string;
  description: string;
  variables: VariableConfig[];
  solvers: SolverFunction[];
  charts?: ChartConfig[];
}

// Engine State
export interface VariableState {
  value: number | string | null;
  unit?: string;
  isUserProvided: boolean;
}

export type EngineState = Record<string, VariableState>;
