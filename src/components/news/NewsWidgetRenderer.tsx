import React, { Suspense, lazy } from 'react';

const MiniEMICalculator = lazy(() => import('./widgets/MiniEMICalculator'));
const ScamProofBlock = lazy(() => import('./widgets/ScamProofBlock'));
const SubsidyCalculator = lazy(() => import('./widgets/SubsidyCalculator'));

interface NewsWidgetRendererProps {
  widgetId: string;
}

const NewsWidgetRenderer: React.FC<NewsWidgetRendererProps> = ({ widgetId }) => {
  const renderWidget = () => {
    switch (widgetId.toLowerCase()) {
      case 'mini-emi':
        return <MiniEMICalculator />;
      case 'scam-proof':
      case 'scam-verify':
        return <ScamProofBlock />;
      case 'subsidy-calculator':
      case 'pmegp-calc':
        return <SubsidyCalculator />;
      default:
        return (
          <div className="p-4 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-xs font-black uppercase tracking-widest text-center">
            Widget [{widgetId}] Not Found
          </div>
        );
    }
  };

  return (
    <Suspense fallback={
      <div className="w-full h-32 bg-slate-50 animate-pulse rounded-2xl flex items-center justify-center text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
        Loading Liquid Tool...
      </div>
    }>
      {renderWidget()}
    </Suspense>
  );
};

export default NewsWidgetRenderer;
