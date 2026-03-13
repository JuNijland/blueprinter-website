"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { Send } from "lucide-react";

const DURATION = 5000;

/** Build a cubic-bezier flight path (with loop) that spans the full container. */
function makePath(w: number, h: number): string {
  const y = h * 0.75;
  const lx = w * 0.42;
  return [
    `M ${-30} ${y}`,
    `C ${w * 0.15} ${y - 5}, ${w * 0.28} ${y - 15}, ${lx} ${y - 35}`,
    `C ${lx + 65} ${y - 65}, ${lx + 90} ${y - 170}, ${lx + 45} ${y - 195}`,
    `C ${lx} ${y - 220}, ${lx - 55} ${y - 135}, ${lx - 30} ${y - 70}`,
    `C ${lx - 10} ${y - 35}, ${lx + 35} ${y - 25}, ${lx + 80} ${y - 30}`,
    `C ${w * 0.6} ${y - 25}, ${w * 0.8} ${y - 50}, ${w + 40} ${y - 60}`,
  ].join(" ");
}

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const [flightPath, setFlightPath] = useState("");
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  const startAnimation = useCallback(() => {
    const path = pathRef.current;
    const maskPath = maskPathRef.current;
    const icon = iconRef.current;
    if (!path || !maskPath || !icon) return;

    const totalLength = path.getTotalLength();

    // Initialise mask: fully hidden
    maskPath.style.strokeDasharray = `${totalLength}`;
    maskPath.style.strokeDashoffset = `${totalLength}`;

    icon.style.display = "block";
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const dist = eased * totalLength;
      const point = path!.getPointAtLength(dist);

      // Tangent angle from small delta
      const delta = Math.min(2, totalLength - dist);
      const ahead = path!.getPointAtLength(dist + delta);
      const angle =
        Math.atan2(ahead.y - point.y, ahead.x - point.x) * (180 / Math.PI);

      // Fade in / out
      let opacity = 1;
      if (t < 2) opacity = t / 2;
      else if (t > 3) opacity = (1 - t) / 0.1;

      icon!.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle + 45}deg)`;
      icon!.style.opacity = `${opacity}`;

      // Reveal trail behind the airplane
      maskPath!.style.strokeDashoffset = `${totalLength - dist}`;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        icon!.style.display = "none";
      }
    }

    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();

          // Measure and generate path right before animating
          const rect = container.getBoundingClientRect();
          setContainerSize({ w: rect.width, h: rect.height });
          setFlightPath(makePath(rect.width, rect.height));

          // Wait one frame for SVG to render with the new path
          requestAnimationFrame(() => requestAnimationFrame(startAnimation));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [startAnimation]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="section-wrapper relative flex min-h-[50vh] items-center px-6 py-24 md:px-16 md:py-32 lg:px-24"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full">
        <div className="diagonal-strokes mx-auto h-[40px] max-w-[1200px]" />
        <div className="h-px w-full bg-black/[0.08]" />
      </div>

      {/* Paper airplane flight layer */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
        aria-hidden="true"
      >
        {flightPath && (
          <svg
            width={containerSize.w}
            height={containerSize.h}
            className="absolute top-0 left-0"
          >
            <defs>
              <mask id="trail-mask">
                <path
                  ref={maskPathRef}
                  d={flightPath}
                  fill="none"
                  stroke="white"
                  strokeWidth="20"
                />
              </mask>
            </defs>
            {/* Hidden path for getPointAtLength calculations */}
            <path ref={pathRef} d={flightPath} fill="none" stroke="none" />
            {/* Visible dashed trail — revealed by mask */}
            <path
              d={flightPath}
              fill="none"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              mask="url(#trail-mask)"
            />
          </svg>
        )}
        <div
          ref={iconRef}
          className="absolute top-0 left-0"
          style={{ display: "none" }}
        >
          <Send
            size={28}
            strokeWidth={3}
            className="text-black/20"
            style={{ transform: "translate(-9px, -9px)" }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[860px] text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Stay in the loop
        </h2>
        <p className="mx-auto mb-8 max-w-sm text-sm text-gray-mid">
          Subscribe to our newsletter for product updates and e-commerce data
          insights.
        </p>
        {status === "success" ? (
          <p className="text-sm font-medium text-black">
            Thanks for subscribing.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-sm gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              className="h-9 flex-1 rounded-md border border-black/10 bg-gray-off px-3 text-sm text-black placeholder:text-gray-mid focus:border-black/30 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-9 items-center rounded-md bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-dark disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
