import React, { useMemo, useState, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { findGoldTool, GoldToolConfig } from '../../data/goldTools';
import { ArrowLeft, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PurityTool: React.FC = () => {
  const [karat, setKarat] = useState<number>(22);
  const purity = useMemo(() => (karat / 24) * 100, [karat]);
  const fineness = useMemo(() => Math.round((purity / 100) * 1000), [purity]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Karat (K)</label>
        <input type="number" min={1} max={24} value={karat} onChange={(e) => setKarat(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-amber-50 border">Purity: {purity.toFixed(2)}%</div>
      <div className="p-4 rounded bg-yellow-50 border">Fineness: {fineness}</div>
    </div>
  );
};

const ValueEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number>(10);
  const [purityPct, setPurityPct] = useState<number>(91.6);
  const [pricePerGram, setPricePerGram] = useState<number>(6500);
  const pureGrams = useMemo(() => (weight * purityPct) / 100, [weight, purityPct]);
  const value = useMemo(() => pureGrams * pricePerGram, [pureGrams, pricePerGram]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Weight (g)</label>
        <input type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purity (%)</label>
        <input type="number" min={0} max={100} step={0.1} value={purityPct} onChange={(e) => setPurityPct(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price/Gram (₹)</label>
        <input type="number" min={0} value={pricePerGram} onChange={(e) => setPricePerGram(Number(e.target.value))} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="p-4 rounded bg-emerald-50 border">Estimated Value: ₹{value.toFixed(2)}</div>
    </div>
  );
};

const GoldToolPage: React.FC = () => {
  const { toolSlug } = useParams();
  const tool = toolSlug ? findGoldTool(toolSlug) : undefined;
  const resultsRef = useRef<HTMLDivElement>(null);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Tool not found</div>
          <RouterLink to="/gold-tools" className="text-amber-700 underline">Back to Gold Tools</RouterLink>
        </div>
      </div>
    );
  }

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; const pageHeight = 295; const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight; let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) { position = heightLeft - imgHeight; pdf.addPage(); pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); heightLeft -= pageHeight; }
    pdf.save(`${tool.slug}.pdf`);
  };

  return (
    <>
      <SEOHelmet
        title={`${tool.seo?.title || tool.name} | Gold Tools | MoneyCal.in`}
        description={tool.seo?.description || tool.description}
        keywords={(tool.seo?.keywords || [tool.slug, 'gold tools', 'india']).join(', ')}
        url={`/gold-tools/${tool.slug}`}
        type="website"
        image="/android-chrome-512x512.png"
        tags={[tool.slug, 'gold']}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <RouterLink to={`/gold-tools`} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Gold Tools
            </RouterLink>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {(tool.type === 'purity' || tool.type === 'karatToPurity') && <PurityTool />}
            {(tool.type === 'value' || tool.type === 'jewelleryEstimator' || tool.type === 'scrapValue' || tool.type === 'pricePerGram') && <ValueEstimator />}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/gold-tools" className="text-amber-700 hover:text-amber-800 underline">All Gold Tools</RouterLink>
                <RouterLink to="/finance-tools/asset-allocation-tool" className="text-amber-700 hover:text-amber-800 underline">Asset Allocation Tool</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldToolPage;


