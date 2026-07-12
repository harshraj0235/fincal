import React from 'react';

interface ThinkingStep {
  label: string;
  status: 'pending' | 'active' | 'done';
}

interface ThinkingPanelProps {
  steps: ThinkingStep[];
  visible: boolean;
}

const ThinkingPanel: React.FC<ThinkingPanelProps> = ({ steps, visible }) => {
  if (!visible || steps.length === 0) return null;

  return (
    <div className="thinking-panel">
      <div className="thinking-header">
        <div className="thinking-dot-container">
          <span className="thinking-dot thinking-dot-1"></span>
          <span className="thinking-dot thinking-dot-2"></span>
          <span className="thinking-dot thinking-dot-3"></span>
        </div>
        <span className="thinking-title">Researching...</span>
      </div>
      <div className="thinking-steps">
        {steps.map((step, idx) => (
          <div key={idx} className={`thinking-step thinking-step-${step.status}`}>
            <span className="thinking-step-icon">
              {step.status === 'done' ? '✅' : step.status === 'active' ? (
                <span className="thinking-spinner"></span>
              ) : '⬜'}
            </span>
            <span className="thinking-step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThinkingPanel;
