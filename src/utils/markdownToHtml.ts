/**
 * Simple Markdown to HTML Converter for News Articles
 * Converts markdown syntax to Google News compliant HTML
 */

export function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(/^## (.+)$/gm, '<h2 class="section-heading">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="sub-heading">$1</h3>');

  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr class="section-divider" />');

  // Convert blockquotes to styled divs
  html = html.replace(/^> (.+)$/gm, (match, content) => {
    if (content.includes('💡') || content.includes('नोट')) {
      return `<div class="info-box"><p>${content}</p></div>`;
    } else if (content.includes('⚠️') || content.includes('चेतावनी')) {
      return `<div class="warning-box"><p>${content}</p></div>`;
    } else if (content.includes('📊') || content.includes('डेटा')) {
      return `<div class="data-box"><p>${content}</p></div>`;
    } else if (content.includes('💰') || content.includes('🛡️') || content.includes('🏡') || content.includes('🧮') || content.includes('🚨') || content.includes('📚')) {
      return `<div class="info-box"><p>${content}</p></div>`;
    } else {
      return `<blockquote class="expert-quote"><p>${content}</p></blockquote>`;
    }
  });

  // Convert bold text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert lists
  const lines = html.split('\n');
  const processed: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        processed.push('<ul>');
        inList = true;
      }
      const content = trimmed.substring(2);
      processed.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      
      // Wrap non-empty, non-HTML lines in <p> tags
      if (trimmed && !trimmed.startsWith('<')) {
        processed.push(`<p>${line}</p>`);
      } else if (trimmed) {
        processed.push(line);
      } else {
        processed.push('');
      }
    }
  }

  if (inList) {
    processed.push('</ul>');
  }

  html = processed.join('\n');

  // Clean up double paragraph tags
  html = html.replace(/<p><h([1-6])/g, '<h$1');
  html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  html = html.replace(/<p><div/g, '<div');
  html = html.replace(/<\/div><\/p>/g, '</div>');
  html = html.replace(/<p><hr/g, '<hr');
  html = html.replace(/\/><\/p>/g, '/>');
  html = html.replace(/<p><ul>/g, '<ul>');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');
  html = html.replace(/<p><blockquote/g, '<blockquote');
  html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

