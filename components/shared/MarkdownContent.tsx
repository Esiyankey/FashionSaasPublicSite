function inline(text: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index} className="rounded bg-stone-100 px-1">{token.slice(1, -1)}</code>;
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (/^(https?:\/\/|\/)/.test(href)) return <a key={index} href={href} className="underline underline-offset-4">{label}</a>;
      return label;
    }
    return token;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/).filter(Boolean);
  return <div className="space-y-5 leading-8 text-slate-700">
    {blocks.map((block, index) => {
      const lines = block.split(/\r?\n/);
      if (lines.every((line) => /^\s*[-*]\s+/.test(line))) return <ul key={index} className="list-disc space-y-2 pl-6">{lines.map((line, lineIndex) => <li key={lineIndex}>{inline(line.replace(/^\s*[-*]\s+/, ""))}</li>)}</ul>;
      const heading = block.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        const text = inline(heading[2]);
        if (heading[1].length === 1) return <h2 key={index} className="text-3xl font-semibold text-slate-900">{text}</h2>;
        if (heading[1].length === 2) return <h3 key={index} className="text-2xl font-semibold text-slate-900">{text}</h3>;
        return <h4 key={index} className="text-xl font-semibold text-slate-900">{text}</h4>;
      }
      if (block.startsWith("> ")) return <blockquote key={index} className="border-l-2 border-primary pl-5 italic">{inline(block.replace(/^>\s?/, ""))}</blockquote>;
      return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{lineIndex > 0 && <br />}{inline(line)}</span>)}</p>;
    })}
  </div>;
}
