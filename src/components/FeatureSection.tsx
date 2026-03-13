"use client";

import { useEffect, useRef, useState } from "react";
import {
  Crosshair,
  Megaphone,
  MessageCircleHeart,
  PackageSearch,
  LayoutGrid,
  ShieldCheck,
  Users,
  TrendingUpDown,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Crosshair,
  Megaphone,
  MessageCircleHeart,
  PackageSearch,
  LayoutGrid,
  ShieldCheck,
  Users,
  TrendingUpDown,
};

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureSectionProps {
  id: string;
  label: string;
  heading: string;
  features: Feature[];
  variant?: "default" | "alternate";
}

export default function FeatureSection({
  id,
  label,
  heading,
  features,
  variant = "default",
}: FeatureSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index
            );
            setVisibleCards((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = grid.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const isAlt = variant === "alternate";

  return (
    <section
      id={id}
      className="section-wrapper relative flex justify-center"
    >
      <div
        className={`w-full max-w-[1200px] px-6 py-16 md:px-16 md:py-24 lg:px-24 ${
          isAlt ? "bg-black/[0.03]" : ""
        }`}
        style={
          isAlt
            ? {
                backgroundImage:
                  "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }
            : undefined
        }
      >
      <div className="mx-auto max-w-[860px]">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gray-mid uppercase">
          {label}
        </p>
        <h2 className="mb-10 max-w-lg text-2xl font-bold tracking-tight text-black md:text-3xl">
          {heading}
        </h2>
        <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            const isVisible = visibleCards.has(i);

            return (
              <div
                key={i}
                data-index={i}
                className={`group rounded-lg border border-t-2 p-6 transition-all duration-300 ${
                  isAlt
                    ? "border-black/[0.06] border-t-transparent bg-white hover:border-black/[0.12] hover:border-t-black hover:shadow-sm"
                    : "border-black/[0.06] border-t-transparent bg-gray-off hover:border-black/[0.12] hover:border-t-black hover:bg-gray-light hover:shadow-sm"
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 120}ms` : "0ms",
                }}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                    isAlt ? "bg-gray-mid/15" : "border border-black/10 bg-white"
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={isAlt ? "text-gray-mid" : "text-black"}
                    />
                  )}
                </div>
                <h3 className="mb-1 text-base font-semibold text-black">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-mid">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
