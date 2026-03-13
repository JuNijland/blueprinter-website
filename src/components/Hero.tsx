export default function Hero() {
  return (
    <section className="section-wrapper relative flex min-h-screen items-center justify-center px-6 py-24 pt-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[860px] text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-gray-off px-2.5 py-0.5 text-xs font-medium text-gray-mid">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Realtime e-commerce data
        </span>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
          Turn signals
          <br />
          into action.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground font-medium text-gray-mid">
          Automate how you gather data from the web. Integrate multiple online
          sources into unified, structured pipelines.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#cta"
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-dark"
          >
            Stay informed
          </a>
          <a
            href="#ecommerce"
            className="inline-flex h-9 items-center rounded-md border border-black/20 px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
