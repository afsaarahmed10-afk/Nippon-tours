// Renders a small, safe subset of markdown (**bold** + line breaks) as React nodes —
// never via dangerouslySetInnerHTML, so there's no HTML/script injection surface even
// though this text ultimately comes from the AI.
import { Fragment, type ReactNode } from "react";

export function renderChatText(text: string): ReactNode {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return (
      <Fragment key={lineIndex}>
        {lineIndex > 0 && <br />}
        {parts.map((part, partIndex) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={partIndex}>{part.slice(2, -2)}</strong>
          ) : (
            <Fragment key={partIndex}>{part}</Fragment>
          ),
        )}
      </Fragment>
    );
  });
}
