import mammoth from "mammoth";

export type DocxImportResult = {
  html: string;
  titleSuggestion?: string;
  excerptSuggestion?: string;
  warnings: string[];
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function titleFromFilename(fileName: string) {
  return fileName.replace(/\.docx$/i, "").replace(/[-_]+/g, " ").trim();
}

function excerptFromHtml(html: string, maxLen = 160) {
  const text = stripHtml(html);
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trim()}…`;
}

/** Chuyển file Word (.docx) sang HTML để dùng trong contentHtml. */
export async function convertDocxToHtml(file: File): Promise<DocxImportResult> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Heading 2'] => h3:fresh",
      ],
    },
  );

  const html = result.value.trim();
  const warnings = result.messages.map((m) => m.message);

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const titleSuggestion =
    (h1Match ? stripHtml(h1Match[1]) : "") || titleFromFilename(file.name) || undefined;

  return {
    html,
    titleSuggestion,
    excerptSuggestion: excerptFromHtml(html) || undefined,
    warnings,
  };
}
