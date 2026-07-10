import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Wrench } from 'lucide-react';

const prettyTitle = (slug: string) => slug
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const GSTToolPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const title = prettyTitle(slug);
  const recommendedGstTools = [
    { name: 'GST Calculator', path: '/gst-tools/gst-calculator' },
    { name: 'GST Due Date Tracker', path: '/gst-tools/gst-due-date-tracker' },
    { name: 'GST HSN/SAC Finder', path: '/gst-tools/gst-hsn-sac-finder' },
    { name: 'GST Slab Finder', path: '/gst-tools/gst-slab-finder' },
    { name: 'GST Liability Calculator', path: '/gst-tools/gst-liability-calculator' },
    { name: 'GST Invoice Generator', path: '/gst-tools/gst-invoice-generator' },
  ];

  return (
    <>
      <SEOHelmet
        title={`${title} - GST Tool | MoneyCal.in`}
        description={`GST resource guide for ${title}. Browse official GST tools, calculators, and compliance helpers.`}
        keywords={`gst ${slug}, ${title}, gst tool`}
        url={`/gst-tools/${slug}`}
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", slug]}
        noIndex
      />
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
            <p className="text-gray-600">
              We could not find a dedicated GST tool for <span className="font-semibold">{title}</span>. Use the curated GST toolkit
              below to calculate tax, plan compliance, and generate documentation.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommended GST tools</h2>
            <p className="text-gray-700 mb-4">
              These GST tools cover the most common compliance and calculation needs for Indian businesses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendedGstTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 hover:border-amber-300 hover:bg-amber-50"
                >
                  {tool.name}
                  <span className="text-amber-600">Open</span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/gst-tools" className="inline-flex items-center text-amber-700 font-semibold">
                View all GST tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTToolPlaceholder;


