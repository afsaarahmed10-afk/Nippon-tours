import { Clock, RotateCw } from "lucide-react";
import { SITE } from "@/data/site";
import { formatJPY } from "@/lib/utils";
import { renderChatText } from "@/lib/chat/format";
import { LocaleLink } from "@/components/site/LocaleLink";
import { useCommon } from "@/i18n";
import type { ChatCta, ChatMessage, ChatTourSummary } from "@/lib/chat/types";

function CtaButton({ cta }: { cta: ChatCta }) {
  if (cta.type === "none") return null;
  if (cta.type === "plan-trip") {
    return (
      <LocaleLink to="/plan-my-trip" className="btn-accent !px-4 !py-2 text-xs">
        {cta.label}
      </LocaleLink>
    );
  }
  if (cta.type === "tours") {
    return (
      <LocaleLink to="/tours" className="btn-accent !px-4 !py-2 text-xs">
        {cta.label}
      </LocaleLink>
    );
  }
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-accent !px-4 !py-2 text-xs"
    >
      {cta.label}
    </a>
  );
}

function TourMiniCard({ tour }: { tour: ChatTourSummary }) {
  return (
    <LocaleLink
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 transition-colors hover:border-accent/60"
    >
      {tour.image && (
        <img
          src={tour.image}
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 shrink-0 rounded-xl object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-foreground">{tour.title}</p>
        <p className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {tour.days}d
          </span>
          <span>·</span>
          <span className="font-semibold text-accent">{formatJPY(tour.price)}pp</span>
        </p>
      </div>
    </LocaleLink>
  );
}

export function ChatMessageBubble({
  message,
  showQuickReplies,
  onQuickReply,
  onRetry,
}: {
  message: ChatMessage;
  showQuickReplies: boolean;
  onQuickReply: (text: string) => void;
  onRetry: () => void;
}) {
  const t = useCommon().chat;
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground">
        {message.text}
      </div>
    );
  }

  if (message.isError) {
    return (
      <div className="max-w-[90%] space-y-2">
        <div className="rounded-2xl rounded-bl-md border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-foreground">
          {renderChatText(message.text)}
        </div>
        <button type="button" onClick={onRetry} className="btn-outline !px-3 !py-1.5 text-xs">
          <RotateCw className="h-3 w-3" /> {t.retry}
        </button>
      </div>
    );
  }

  const envelope = message.envelope;

  return (
    <div className="max-w-[90%] space-y-2">
      <div className="flex items-start gap-2">
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs"
          aria-hidden="true"
        >
          🇯🇵
        </span>
        <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5 text-sm leading-relaxed text-foreground">
          {renderChatText(message.text)}
        </div>
      </div>

      {envelope && envelope.tours.length > 0 && (
        <div className="ml-9 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {t.recommendedForYou}
          </p>
          {envelope.tours.map((tour) => (
            <TourMiniCard key={tour.slug} tour={tour} />
          ))}
        </div>
      )}

      {envelope?.cta && (
        <div className="ml-9">
          <CtaButton cta={envelope.cta} />
        </div>
      )}

      {showQuickReplies && envelope && envelope.quickReplies.length > 0 && (
        <div className="ml-9 flex flex-wrap gap-1.5 pt-1">
          {envelope.quickReplies.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onQuickReply(q)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
