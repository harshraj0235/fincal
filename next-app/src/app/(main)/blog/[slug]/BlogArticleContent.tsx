import Link from 'next/link';

type ContentBlock =
  | { type: 'paragraph'; content?: string }
  | { type: 'heading'; content?: string }
  | { type: 'subheading'; content?: string }
  | { type: 'list'; items?: string[] }
  | { type: 'image'; url?: string; caption?: string }
  | { type: 'quote'; content?: string };

/** Parse [text](url) in a string and return React nodes (text + Link). */
function parseInlineLinks(text: string) {
  const parts: (string | { text: string; url: string })[] = [];
  let remaining = text;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(remaining)) !== null) {
    if (m.index > lastIndex) {
      parts.push(remaining.slice(lastIndex, m.index));
    }
    parts.push({ text: m[1], url: m[2] });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < remaining.length) parts.push(remaining.slice(lastIndex));
  return parts;
}

export default function BlogArticleContent({
  content,
}: {
  content: ContentBlock[];
}) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="prose prose-gray max-w-none">
      {content.map((block, i) => {
        const key = `block-${i}`;
        if (block.type === 'paragraph' && block.content) {
          const parts = parseInlineLinks(block.content);
          return (
            <p key={key} className="mb-4 text-gray-700 leading-relaxed">
              {parts.map((part, j) =>
                typeof part === 'string' ? (
                  <span key={j}>{part}</span>
                ) : (
                  <Link
                    key={j}
                    href={part.url.startsWith('/') ? part.url : part.url}
                    className="text-blue-600 hover:underline"
                  >
                    {part.text}
                  </Link>
                )
              )}
            </p>
          );
        }
        if (block.type === 'heading' && block.content) {
          return (
            <h2 key={key} className="text-xl font-bold text-gray-900 mt-6 mb-2">
              {block.content}
            </h2>
          );
        }
        if (block.type === 'subheading' && block.content) {
          return (
            <h3 key={key} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              {block.content}
            </h3>
          );
        }
        if (block.type === 'list' && block.items?.length) {
          return (
            <ul key={key} className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'image' && block.url) {
          return (
            <figure key={key} className="my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt={block.caption || ''}
                className="rounded-lg w-full max-w-2xl"
              />
              {block.caption && (
                <figcaption className="text-sm text-gray-500 mt-1">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === 'quote' && block.content) {
          return (
            <blockquote
              key={key}
              className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700"
            >
              {block.content}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
