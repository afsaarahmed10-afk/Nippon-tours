import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}
