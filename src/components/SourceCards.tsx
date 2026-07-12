import React from 'react';
import { SourceLink } from '../lib/llmEngine';

interface SourceCardsProps {
  sources: SourceLink[];
}

const SourceCards: React.FC<SourceCardsProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="source-cards-container">
      <div className="source-cards-label">Sources</div>
      <div className="source-cards-scroll">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-card"
            title={source.title}
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${source.domain}&sz=32`}
              alt=""
              className="source-card-favicon"
              width={16}
              height={16}
              loading="lazy"
            />
            <div className="source-card-info">
              <span className="source-card-title">{source.title}</span>
              <span className="source-card-domain">{source.domain}</span>
            </div>
            <span className="source-card-number">{idx + 1}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SourceCards;
