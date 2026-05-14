import { faqItems } from "@/lib/faq";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-wrapper relative flex justify-center"
    >
      <div className="w-full max-w-[1200px] px-6 py-16 md:px-16 md:py-24 lg:px-24">
        <div className="mx-auto max-w-[860px]">
          <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gray-mid uppercase">
            FAQ
          </p>
          <h2 className="mb-10 max-w-lg text-2xl font-bold tracking-tight text-black md:text-3xl">
            Frequently asked questions.
          </h2>
          <div className="divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold text-black">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-gray-mid transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-gray-mid">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
