import React, { lazy, Suspense, useMemo, useState } from 'react';
import { SourceLink } from '../lib/llmEngine';
import StockLiveWidget from './StockLiveWidget';
import { Share2, Check } from 'lucide-react';

const MiniSIP = lazy(() => import('./MiniSIP'));
const MiniEMI = lazy(() => import('./MiniEMI'));

interface FinanceGPTResponseRendererProps {
  text: string;
  sources?: SourceLink[];
}

/**
 * Renders the AI response with rich inline elements:
 * - Markdown (bold, headings, lists, tables)
 * - ```stock TICKER``` → stock widget placeholder
 * - ```chart {...}``` → chart widget
 * - ```calculator sip|emi``` → embedded mini calculators
 * - [1] inline citations → hoverable tooltips mapped to sources
 */
const FinanceGPTResponseRenderer: React.FC<FinanceGPTResponseRendererProps> = ({ text, sources = [] }) => {
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    const snippet = text.replace(/```[\s\S]*?```/g, '').replace(/\[\d+\]/g, '').trim().substring(0, 150) + '...';
    
    const shareData = {
      title: 'Moneycal - India\'s #1 AI Financial Advisor',
      text: `I just asked Moneycal for financial advice:\n\n"${snippet}"\n\nAsk your own questions for free on Moneycal!`,
      url: 'https://moneycal.in'
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 3000);
      }
    } catch (err) {
      console.log('Share aborted or failed', err);
    }
  };

  const renderedBlocks = useMemo(() => {
    if (!text) return [];

    // Split text into blocks: code fences vs regular text
    const blocks: Array<{ type: 'text' | 'stock' | 'chart' | 'calculator'; content: string }> = [];
    const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Push text before this code block
      if (match.index > lastIndex) {
        blocks.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      const lang = match[1].toLowerCase();
      const body = match[2].trim();
      if (lang === 'stock') {
        blocks.push({ type: 'stock', content: body });
      } else if (lang === 'chart') {
        blocks.push({ type: 'chart', content: body });
      } else if (lang === 'calculator') {
        blocks.push({ type: 'calculator', content: body });
      } else {
        // generic code block → render as code
        blocks.push({ type: 'text', content: `\`\`\`${lang}\n${body}\n\`\`\`` });
      }
      lastIndex = match.index + match[0].length;
    }
    // Push remaining text
    if (lastIndex < text.length) {
      blocks.push({ type: 'text', content: text.slice(lastIndex) });
    }
    return blocks;
  }, [text]);

  // Convert markdown text to HTML
  const markdownToHtml = (md: string): string => {
    let html = md;

    // Tables
    html = html.replace(/^(\|.+\|)\n(\|[-:| ]+\|)\n((?:\|.+\|\n?)*)/gm, (_match, headerRow, _sep, bodyRows) => {
      const headers = headerRow.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('');
      const rows = bodyRows.trim().split('\n').map((row: string) => {
        const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<div class="gpt-table-wrapper"><table class="gpt-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // Headings
    html = html.replace(/^### (.+)$/gm, '<h3 class="gpt-h3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="gpt-h2">$1</h2>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li class="gpt-li">$1</li>');
    html = html.replace(/((?:<li class="gpt-li">.*<\/li>\n?)+)/g, '<ul class="gpt-ul">$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\.\s(.+)$/gm, '<li class="gpt-oli">$1</li>');
    html = html.replace(/((?:<li class="gpt-oli">.*<\/li>\n?)+)/g, '<ol class="gpt-ol">$1</ol>');

    // Markdown links [text](url) — internal links open in same tab, external in new tab
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, linkText, url) => {
      const isInternal = url.startsWith('/') || url.includes('moneycal.in');
      if (isInternal) {
        const cleanUrl = url.replace(/https?:\/\/(www\.)?moneycal\.in/, '');
        return `<a href="${cleanUrl}" class="gpt-link gpt-link-internal">${linkText}</a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="gpt-link">${linkText} ↗</a>`;
    });

    // Auto-detect bare URLs (http/https) not already inside href
    html = html.replace(/(?<!href="|">)(https?:\/\/[^\s<"]+)/g, (url) => {
      const isInternal = url.includes('moneycal.in');
      const displayUrl = url.replace(/https?:\/\/(www\.)?/, '').slice(0, 40);
      if (isInternal) {
        const cleanUrl = url.replace(/https?:\/\/(www\.)?moneycal\.in/, '');
        return `<a href="${cleanUrl}" class="gpt-link gpt-link-internal">🔗 ${displayUrl}</a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="gpt-link">🔗 ${displayUrl}… ↗</a>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="gpt-code">$1</code>');

    // Citation numbers [1], [2], etc. → tooltip
    html = html.replace(/\[(\d+)\]/g, (_m, num) => {
      const idx = parseInt(num) - 1;
      const source = sources[idx];
      if (source) {
        return `<span class="gpt-citation" title="${source.title} — ${source.domain}">[${num}]</span>`;
      }
      return `<span class="gpt-citation">[${num}]</span>`;
    });

    // Paragraphs (double newline)
    html = html.replace(/\n\n/g, '</p><p class="gpt-p">');
    html = `<p class="gpt-p">${html}</p>`;
    // Clean empty paragraphs
    html = html.replace(/<p class="gpt-p"><\/p>/g, '');
    html = html.replace(/<p class="gpt-p">(<h[23])/g, '$1');
    html = html.replace(/(<\/h[23]>)<\/p>/g, '$1');
    html = html.replace(/<p class="gpt-p">(<ul|<ol|<div)/g, '$1');
    html = html.replace(/(<\/ul>|<\/ol>|<\/div>)<\/p>/g, '$1');

    // Disclaimers
    html = html.replace(/⚠️(.*?)(?=<\/p>|$)/g, '<span class="gpt-disclaimer">⚠️$1</span>');

    return html;
  };

  return (
    <div className="gpt-response">
      {renderedBlocks.map((block, idx) => {
        if (block.type === 'text') {
          return (
            <div
              key={idx}
              className="gpt-text-block"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(block.content) }}
            />
          );
        }
        if (block.type === 'stock') {
          return (
            <div key={idx} className="gpt-widget-block">
              <StockLiveWidget ticker={block.content} />
            </div>
          );
        }
        if (block.type === 'chart') {
          try {
            const chartData = JSON.parse(block.content);
            return (
              <div key={idx} className="gpt-widget-block">
                <div className="gpt-chart-widget">
                  <h4 className="gpt-chart-title">{chartData.title || 'Comparison Chart'}</h4>
                  <div className="gpt-chart-bars">
                    {chartData.data?.map((item: { name: string; value: number }, i: number) => {
                      const maxVal = Math.max(...chartData.data.map((d: { value: number }) => d.value));
                      const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                      const formatted = chartData.yAxisFormatter === 'currency'
                        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.value)
                        : item.value.toLocaleString('en-IN');
                      return (
                        <div key={i} className="gpt-chart-bar-row">
                          <span className="gpt-chart-bar-label">{item.name}</span>
                          <div className="gpt-chart-bar-track">
                            <div
                              className="gpt-chart-bar-fill"
                              style={{ width: `${pct}%`, animationDelay: `${i * 0.15}s` }}
                            />
                          </div>
                          <span className="gpt-chart-bar-value">{formatted}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          } catch {
            return <div key={idx} className="gpt-text-block"><code>{block.content}</code></div>;
          }
        }
        if (block.type === 'calculator') {
          const calcType = block.content.toLowerCase().trim();
          return (
            <div key={idx} className="gpt-widget-block">
              <Suspense fallback={<div className="gpt-calc-loading">Loading calculator...</div>}>
                {calcType === 'sip' ? <MiniSIP /> : calcType === 'emi' ? <MiniEMI /> : (
                  <div className="gpt-text-block"><em>Calculator: {block.content}</em></div>
                )}
              </Suspense>
            </div>
          );
        }
        return null;
      })}

      {text.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 rounded-full transition-colors border border-gray-200"
            title="Share this answer"
          >
            {isShared ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FinanceGPTResponseRenderer;
