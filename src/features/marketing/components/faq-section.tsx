import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Do I need to provide my own AI API keys?",
    answer:
      "No. NovaAI handles the AI provider connection for you. We currently support OpenAI and Gemini behind the scenes, and switch between them transparently.",
  },
  {
    question: "Can I use NovaAI for sensitive or confidential documents?",
    answer:
      "Yes. Documents are private by default and only visible to you unless you explicitly mark them public. Role-based access control on Team plans restricts who can view or edit shared content.",
  },
  {
    question: "What happens if I run out of AI tokens for the month?",
    answer:
      "You can keep using non-AI features (documents, organization, search) without interruption. AI features will prompt you to upgrade or wait until your monthly allowance resets.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, Pro plans include a 14-day free trial with no credit card required upfront.",
  },
  {
    question: "Can I export my documents if I cancel?",
    answer: "Yes, you can export all your documents and prompts at any time, on any plan, including after cancellation.",
  },
];

export function FaqSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
