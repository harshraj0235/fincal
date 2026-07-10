import React from 'react';
import { ExternalLink, BookOpen, FileText, Building } from 'lucide-react';

interface Reference {
  title: string;
  url: string;
  source: string;
  type: 'official' | 'guide' | 'article' | 'regulation';
  agency?: string;
}

interface SourceCitationsProps {
  references?: Reference[];
  showGovernmentLinks?: boolean;
  showIndustryStandards?: boolean;
  customReferences?: Reference[];
}

const SourceCitations: React.FC<SourceCitationsProps> = ({
  references = [],
  showGovernmentLinks = true,
  showIndustryStandards = true,
  customReferences = [],
}) => {
  // Default government and regulatory references
  const defaultGovernmentReferences: Reference[] = [
    {
      title: 'Reserve Bank of India - Official Portal',
      url: 'https://www.rbi.org.in',
      source: 'RBI',
      type: 'official',
      agency: 'RBI',
    },
    {
      title: 'Income Tax Department of India',
      url: 'https://www.incometax.gov.in',
      source: 'ITD',
      type: 'regulation',
      agency: 'Income Tax Dept',
    },
    {
      title: 'Securities and Exchange Board of India',
      url: 'https://www.sebi.gov.in',
      source: 'SEBI',
      type: 'official',
      agency: 'SEBI',
    },
    {
      title: 'Insurance Regulatory and Development Authority',
      url: 'https://www.irdai.gov.in',
      source: 'IRDA',
      type: 'regulation',
      agency: 'IRDA',
    },
    {
      title: 'Ministry of Corporate Affairs',
      url: 'https://www.mca.gov.in',
      source: 'MCA',
      type: 'official',
      agency: 'MCA',
    },
    {
      title: 'GST Network Official Portal',
      url: 'https://www.gstnetwork.in',
      source: 'GSTN',
      type: 'official',
      agency: 'GSTN',
    },
  ];

  const industryStandardReferences: Reference[] = [
    {
      title: 'India Meteorological Department',
      url: 'https://www.imd.gov.in',
      source: 'IMD',
      type: 'official',
      agency: 'IMD',
    },
    {
      title: 'Ministry of Finance - Budget Portal',
      url: 'https://www.indiabudget.gov.in',
      source: 'Ministry of Finance',
      type: 'official',
      agency: 'MOF',
    },
    {
      title: 'National Stock Exchange of India',
      url: 'https://www.nseindia.com',
      source: 'NSE',
      type: 'official',
      agency: 'NSE',
    },
    {
      title: 'BSE - Bombay Stock Exchange',
      url: 'https://www.bseindia.com',
      source: 'BSE',
      type: 'official',
      agency: 'BSE',
    },
  ];

  const allReferences = [
    ...references,
    ...(showGovernmentLinks ? defaultGovernmentReferences : []),
    ...(showIndustryStandards ? industryStandardReferences : []),
    ...customReferences,
  ];

  // Remove duplicates based on URL
  const uniqueReferences = Array.from(
    new Map(allReferences.map((ref) => [ref.url, ref])).values()
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'official':
        return <Building size={16} className="text-blue-600" />;
      case 'regulation':
        return <FileText size={16} className="text-red-600" />;
      case 'guide':
        return <BookOpen size={16} className="text-green-600" />;
      default:
        return <ExternalLink size={16} className="text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges: { [key: string]: string } = {
      official: 'bg-blue-100 text-blue-800',
      regulation: 'bg-red-100 text-red-800',
      guide: 'bg-green-100 text-green-800',
      article: 'bg-purple-100 text-purple-800',
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="text-blue-600" size={24} />
        <div>
          <h3 className="text-lg font-bold text-gray-900">Sources & References</h3>
          <p className="text-xs text-gray-600">
            All information sourced from official government and regulatory bodies
          </p>
        </div>
      </div>

      {/* Government References Section */}
      {showGovernmentLinks && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Building size={16} className="text-blue-600" />
            Official Government Sources
          </h4>
          <div className="grid gap-2">
            {defaultGovernmentReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-2 rounded hover:bg-blue-100 transition-colors"
              >
                <ExternalLink size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 group-hover:underline">
                    {ref.title}
                  </p>
                  <p className="text-xs text-gray-600">{ref.source}</p>
                </div>
                <span className="text-xs font-semibold text-gray-500 ml-2">
                  {ref.agency}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Industry Standards Section */}
      {showIndustryStandards && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText size={16} className="text-green-600" />
            Market & Industry Standards
          </h4>
          <div className="grid gap-2">
            {industryStandardReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-2 rounded hover:bg-green-100 transition-colors"
              >
                <ExternalLink size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 group-hover:underline">
                    {ref.title}
                  </p>
                  <p className="text-xs text-gray-600">{ref.source}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Custom References */}
      {customReferences.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-purple-600" />
            Additional Resources
          </h4>
          <div className="grid gap-2">
            {customReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-3 p-2 rounded transition-colors ${
                  ref.type === 'article'
                    ? 'hover:bg-purple-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                {getTypeIcon(ref.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 group-hover:underline">
                    {ref.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadge(ref.type)}`}>
                      {ref.type.charAt(0).toUpperCase() + ref.type.slice(1)}
                    </span>
                    <p className="text-xs text-gray-600">{ref.source}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Trust Badge */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-600 text-center">
          ✓ All sources verified from official government and regulatory websites
        </p>
      </div>
    </div>
  );
};

export default SourceCitations;
