import React from 'react';
import { useParams } from 'react-router-dom';
import { getCalculatorById } from '../data/calculatorData';

// Import core calculators for embedding
import { EmiCalculator } from '../calculators/EmiCalculator';
import { SipCalculator } from '../calculators/SipCalculator';
import { IncomeTaxCalculator } from '../calculators/IncomeTaxCalculator';
import { HomeLoanCalculator } from '../calculators/HomeLoanCalculator';
import { PersonalLoanCalculator } from '../calculators/PersonalLoanCalculator';
import { CarLoanCalculator } from '../calculators/CarLoanCalculator';
import { GstCalculator } from '../calculators/GstCalculator';
import { PpfCalculator } from '../calculators/PpfCalculator';
import { FdCalculator } from '../calculators/FdCalculator';
import { MutualFundReturnsCalculator } from '../calculators/MutualFundReturnsCalculator';
import { CompoundInterestCalculator } from '../calculators/CompoundInterestCalculator';
import { SimpleInterestCalculator } from '../calculators/SimpleInterestCalculator';
import { RetirementCalculator } from '../calculators/RetirementCalculator';
import { GratuityCalculator } from '../calculators/GratuityCalculator';
import { InflationCalculator } from '../calculators/InflationCalculator';
import { SukanyaSamriddhiCalculator } from '../calculators/SukanyaSamriddhiCalculator';
import { NpsCalculator } from '../calculators/NpsCalculator';
import { EpfCalculator } from '../calculators/EpfCalculator';
import { Section80CCalculator } from '../calculators/Section80CCalculator';
import { CapitalGainsTaxCalculator } from '../calculators/CapitalGainsTaxCalculator';
import { StepUpSipCalculator } from '../calculators/StepUpSipCalculator';

const EmbedPage: React.FC = () => {
    const { calculatorId } = useParams<{ calculatorId: string }>();
    const calculator = calculatorId ? getCalculatorById(calculatorId) : null;

    const renderCalculator = () => {
        switch (calculatorId) {
            case 'emi-calculator': return <EmiCalculator />;
            case 'sip-calculator': return <SipCalculator />;
            case 'income-tax-calculator': return <IncomeTaxCalculator />;
            case 'home-loan-calculator': return <HomeLoanCalculator />;
            case 'personal-loan-calculator': return <PersonalLoanCalculator />;
            case 'car-loan-calculator': return <CarLoanCalculator />;
            case 'gst-calculator': return <GstCalculator />;
            case 'ppf-calculator': return <PpfCalculator />;
            case 'fd-calculator': return <FdCalculator />;
            case 'mutual-fund-returns-calculator': return <MutualFundReturnsCalculator />;
            case 'compound-interest-calculator': return <CompoundInterestCalculator />;
            case 'simple-interest-calculator': return <SimpleInterestCalculator />;
            case 'retirement-calculator': return <RetirementCalculator />;
            case 'gratuity-calculator': return <GratuityCalculator />;
            case 'inflation-calculator': return <InflationCalculator />;
            case 'sukanya-samriddhi-calculator': return <SukanyaSamriddhiCalculator />;
            case 'nps-calculator': return <NpsCalculator />;
            case 'epf-calculator': return <EpfCalculator />;
            case 'section-80c-calculator': return <Section80CCalculator />;
            case 'capital-gains-tax-calculator': return <CapitalGainsTaxCalculator />;
            case 'step-up-sip-calculator': return <StepUpSipCalculator />;
            default: return <div className="p-8 text-center text-gray-500">Calculator not available for embedding.</div>;
        }
    };

    if (!calculator) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-gray-500">Calculator not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 py-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{calculator.name}</h2>
                {renderCalculator()}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <a
                        href={`https://moneycal.in/calculators/${calculatorId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
                        </svg>
                        Powered by MoneyCal.in — Free Financial Calculators for India
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmbedPage;
