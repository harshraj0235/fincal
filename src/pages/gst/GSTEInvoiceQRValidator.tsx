import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import { ArrowLeft, QrCode, Info, AlertTriangle, CheckCircle2, Download, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface QRPayload {
  SellerGstin?: string;
  BuyerGstin?: string;
  DocNo?: string;
  DocDt?: string;
  TotalValue?: number | string;
  IRN?: string;
  AckNo?: string | number;
  AckDt?: string;
}

const REQUIRED_FIELDS: Array<keyof QRPayload> = [
  'SellerGstin',
  'BuyerGstin',
  'DocNo',
  'DocDt',
  'TotalValue',
  'IRN'
];

const GSTEInvoiceQRValidator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [rawInput, setRawInput] = useState<string>('');
  const samplePayload = `{
  "SellerGstin": "27ABCDE1234F1Z5",
  "BuyerGstin": "29PQRSX1234L1Z2",
  "DocNo": "INV-2026-001",
  "DocDt": "2026-02-12",
  "TotalValue": 125000,
  "IRN": "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "AckNo": 1122334455,
  "AckDt": "2026-02-12T10:12:00"
}`;

  const parsed: { payload: QRPayload | null; error: string | null } = useMemo(() => {
    if (!rawInput.trim()) return { payload: null, error: null };
    try {
      const json = JSON.parse(rawInput.trim());
      return { payload: json as QRPayload, error: null };
    } catch {
      return { payload: null, error: 'Invalid JSON. Paste the QR payload JSON text.' };
    }
  }, [rawInput]);

  const validation = useMemo(() => {
    if (!parsed.payload) return { ok: false, missing: REQUIRED_FIELDS, issues: ['Awaiting input'] };
    const missing = REQUIRED_FIELDS.filter((k) => !parsed.payload || parsed.payload[k] === undefined || parsed.payload[k] === '');
    const issues: string[] = [];
    const IRN = parsed.payload.IRN ?? '';
    if (typeof IRN !== 'string' || IRN.length < 10) {
      issues.push('IRN appears invalid (length check failed).');
    }
    const seller = parsed.payload.SellerGstin ?? '';
    const buyer = parsed.payload.BuyerGstin ?? '';
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (seller && !gstinRegex.test(seller)) issues.push('Seller GSTIN format looks invalid.');
    if (buyer && !gstinRegex.test(buyer)) issues.push('Buyer GSTIN format looks invalid.');
    return { ok: missing.length === 0 && issues.length === 0, missing, issues };
  }, [parsed]);

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('gst-einvoice-qr-validation.pdf');
  };

  return (
    <>
      <SEOHelmet
        title="GST E-Invoice QR Validator India | IRN and GSTIN Field Check | MoneyCal"
        description="Validate GST e-invoice QR payload fields including IRN, seller GSTIN, buyer GSTIN, document details, and value format checks."
        keywords="gst e invoice qr validator india, irn validation tool, gstin format checker e invoice, invoice qr payload validator, gst compliance qr checker"
        url="/tools/gst-einvoice-qr-validator"
        type="website"
        image="/images/gst-einvoice-qr.jpg"
        tags={["gst", "einvoice", "qr", "irn", "validator"]}
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="h-12 w-12 text-amber-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">GST E-Invoice QR Validator</h1>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Paste your QR payload JSON from the e-invoice into the input below to validate required fields.
              We check GSTIN formats and IRN length for a quick sanity check, and display a structured summary.
            </p>
          </div>

          <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">QR Payload (JSON)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => setRawInput(samplePayload)}
                className="px-3 py-1.5 text-xs rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200"
              >
                Load Sample Payload
              </button>
              <button
                onClick={() => setRawInput('')}
                className="px-3 py-1.5 text-xs rounded-md bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              >
                Clear
              </button>
            </div>
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              rows={8}
              placeholder='{"SellerGstin":"27ABCDE1234F1Z5","BuyerGstin":"09PQRSX1234L1Z2","DocNo":"INV-001","DocDt":"2024-12-31","TotalValue":12500,"IRN":"<hash>"}'
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border"
                   style={{ borderColor: validation.ok ? '#34d399' : '#fca5a5', background: validation.ok ? '#ecfdf5' : '#fef2f2' }}>
                <div className="text-xs" style={{ color: validation.ok ? '#065f46' : '#991b1b' }}>Validation Status</div>
                <div className="text-2xl font-bold flex items-center" style={{ color: validation.ok ? '#065f46' : '#991b1b' }}>
                  {validation.ok ? <CheckCircle2 className="h-5 w-5 mr-2" /> : <AlertTriangle className="h-5 w-5 mr-2" />}
                  {validation.ok ? 'Valid' : 'Issues Found'}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-xs text-blue-700">Missing Fields</div>
                <div className="text-sm text-blue-900">{validation.missing.length ? validation.missing.join(', ') : 'None'}</div>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                <div className="text-xs text-amber-700">Format Issues</div>
                <div className="text-sm text-amber-900">{validation.issues.length ? validation.issues.join(' | ') : 'None'}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Seller GSTIN</div>
                <div className="text-lg font-semibold">{parsed.payload?.SellerGstin || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Buyer GSTIN</div>
                <div className="text-lg font-semibold">{parsed.payload?.BuyerGstin || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Document No</div>
                <div className="text-lg font-semibold">{parsed.payload?.DocNo || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Document Date</div>
                <div className="text-lg font-semibold">{parsed.payload?.DocDt || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Total Value</div>
                <div className="text-lg font-semibold">{parsed.payload?.TotalValue ?? '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">IRN</div>
                <div className="break-all text-sm font-mono">{parsed.payload?.IRN || '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Ack No</div>
                <div className="text-lg font-semibold">{parsed.payload?.AckNo ?? '—'}</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs text-gray-600">Ack Date</div>
                <div className="text-lg font-semibold">{parsed.payload?.AckDt || '—'}</div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" /> How to use this tool
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                <li>From your e-invoice system, copy the QR payload JSON string.</li>
                <li>Paste it into the input above; we auto-validate required fields.</li>
                <li>Review the summary and download a PDF validation report.</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">Note: This tool validates structure and field presence/format only. For cryptographic signature verification or QR image decode, use official portals/APIs.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" /> Related GST Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <RouterLink to="/tools/gst-liability-calculator" className="text-blue-600 hover:text-blue-800 underline">GST Liability Calculator</RouterLink>
                <RouterLink to="/tools/gst-rate-impact-analyzer" className="text-blue-600 hover:text-blue-800 underline">GST Rate Impact Analyzer</RouterLink>
                <RouterLink to="/tools/gst-eway-distance-calculator" className="text-blue-600 hover:text-blue-800 underline">GST E-Way Bill Distance Calculator</RouterLink>
                <RouterLink to="/tools/gst-turnover-tracker" className="text-blue-600 hover:text-blue-800 underline">GST Annual Turnover Tracker</RouterLink>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={downloadPDF} className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </button>
          </div>

          <div className="mt-10 prose prose-amber max-w-none bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2>GST E-Invoice QR Validation Guide for India</h2>
            <p>
              Under India's e-invoicing framework, B2B invoices are registered on the IRP and
              receive an IRN plus a QR payload carrying key invoice fields. Before filing and
              sharing documents downstream, businesses often need a quick field-quality check. This
              validator supports that workflow by checking field presence and basic format quality.
            </p>
            <p>
              The tool is useful for finance teams, GST practitioners, implementation partners, and
              software QA teams who need to validate generated payloads in testing and production.
              It does not replace official signature verification, but it helps catch common issues
              early, like missing buyer GSTIN, malformed seller GSTIN, blank doc numbers, or weak
              IRN string patterns in staging data.
            </p>
            <h3>Practical use cases</h3>
            <p>
              Use this page when onboarding a new billing system, reviewing ERP integrations,
              preparing API payload checks, validating vendor-generated invoice JSON, or auditing
              invoice data hygiene before return cycles. It is especially useful when multiple
              branches or software providers create invoice payloads with inconsistent standards.
            </p>
            <p>
              This page is optimized for search intent like <strong>GST e-invoice QR validator
              India</strong>, <strong>IRN field checker</strong>, and <strong>GSTIN payload format
              validator</strong>. For complete workflow control, combine this with GST liability
              estimation, e-way bill distance planning, and turnover threshold tracking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTEInvoiceQRValidator;


