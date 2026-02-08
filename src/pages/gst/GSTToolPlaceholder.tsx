import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { ArrowLeft, Wrench, Download } from 'lucide-react';
import { getPdfLibs } from '../../lib/pdfExportClient';

const prettyTitle = (slug: string) => slug
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const GSTToolPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const title = prettyTitle(slug);
  const resultsRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const { html2canvas, jsPDF } = await getPdfLibs();
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight; let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`${slug}.pdf`);
  };

  return (
    <>
      <SEOHelmet
        title={`${title} - GST Tool | MoneyCal.in`}
        description={`Interactive GST helper: ${title}. Free, no login, with PDF export.`}
        keywords={`gst ${slug}, ${title}, gst tool`}
        url={`/gst-tools/${slug}`}
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", slug]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Wrench className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
            </div>
            <p className="text-gray-600">This tool page is ready and will be enhanced with full functionality next. You can still export a PDF with the page summary.</p>
          </div>
          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About this GST tool</h2>
            <p className="text-gray-700">Use this GST helper for {title.toLowerCase()}. This page includes SEO metadata, routing, and PDF export capability.</p>
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

export default GSTToolPlaceholder;


