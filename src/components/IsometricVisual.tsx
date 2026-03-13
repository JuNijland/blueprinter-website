"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const highlights = [
  { label: "Product Image", x: 48, y: 6, delay: 0 },
  { label: "Pricing", x: 73, y: 23, delay: 0.5 },
  { label: "Inventory", x: 78, y: 32, delay: 1 },
  { label: "Description", x: 74, y: 47, delay: 1.5 },
  { label: "Rating", x: 30, y: 61, delay: 2 },
  { label: "Reviews", x: 30, y: 70, delay: 2.5 },
];

const tableColumns = ["Product", "Price", "Stock", "Rating"];

const extractedRows = [
  { product: "Velora X1 Headset", price: "€149.99", stock: "In Stock", rating: "4.2 (1,847)" },
  { product: "Nimbus Air Purifier", price: "€289.50", stock: "In Stock", rating: "4.5 (2,103)" },
  { product: "Terrik Desk Lamp", price: "€79.00", stock: "Low Stock", rating: "3.9 (956)" },
  { product: "Orin Smart Scale", price: "€119.99", stock: "In Stock", rating: "4.7 (3,412)" },
  { product: "Pulso Fitness Band", price: "€59.99", stock: "Out of Stock", rating: "4.0 (724)" },
  { product: "Zephyr Fan Heater", price: "€199.00", stock: "In Stock", rating: "4.3 (1,290)" },
  { product: "Kova Travel Mug", price: "€34.99", stock: "In Stock", rating: "4.6 (2,841)" },
  { product: "Axton Power Bank", price: "€44.50", stock: "Low Stock", rating: "4.1 (413)" },
  { product: "Lyric Mini Speaker", price: "€69.99", stock: "In Stock", rating: "4.4 (1,567)" },
];

const newRow = {
  product: "Brizo Water Filter",
  price: "€24.99",
  stock: "In Stock",
  rating: "4.8 (892)",
};

// Cell changes revealed one by one after extraction
const cellChanges = [
  { row: 0, col: "price", value: "€139.99", bg: "rgba(16,185,129,0.08)", color: "#047857", indicator: "↓" },
  { row: 1, col: "price", value: "€299.00", bg: "rgba(239,68,68,0.07)", color: "#b91c1c", indicator: "↑" },
  { row: 2, col: "rating", value: "3.9 (1,012)", bg: "rgba(245,158,11,0.07)", color: "#92400e", indicator: null },
  { row: 3, col: "stock", value: "Out of Stock", bg: "rgba(239,68,68,0.07)", color: "#b91c1c", indicator: null },
];

// Timing constants
const TABLE_START = 3.5;
const SLIDE_DURATION = 0.8;
const ROW_STAGGER = 0.2;
const CHANGES_PAUSE = 0.5;
const CHANGE_STAGGER = 0.3;

export default function IsometricVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [slideLeft, setSlideLeft] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  const [changesPhase, setChangesPhase] = useState(false);
  const [showNewRow, setShowNewRow] = useState(false);
  const [visibleChanges, setVisibleChanges] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: slide card to the left
    timers.push(setTimeout(() => setSlideLeft(true), TABLE_START * 1000));

    // Step 2: show arrow + table
    const tableAt = TABLE_START + SLIDE_DURATION;
    timers.push(setTimeout(() => setShowTable(true), tableAt * 1000));

    // Step 3: rows appear one by one
    const rowsAt = tableAt + 0.3;
    extractedRows.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleRows(i + 1), (rowsAt + i * ROW_STAGGER) * 1000)
      );
    });

    // Step 4: changes phase
    const allRowsDone = rowsAt + (extractedRows.length - 1) * ROW_STAGGER + 0.4;
    const changesAt = allRowsDone + CHANGES_PAUSE;

    // Show heading change
    timers.push(setTimeout(() => setChangesPhase(true), changesAt * 1000));

    // New row appears first
    timers.push(setTimeout(() => setShowNewRow(true), (changesAt + 0.3) * 1000));

    // Cell changes one by one
    cellChanges.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setVisibleChanges(i + 1),
          (changesAt + 0.3 + CHANGE_STAGGER + i * CHANGE_STAGGER) * 1000
        )
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Helper: check if a cell has an active change
  const getChange = (rowIdx: number, col: string) => {
    const idx = cellChanges.findIndex((c) => c.row === rowIdx && c.col === col);
    if (idx === -1 || idx >= visibleChanges) return null;
    return cellChanges[idx];
  };

  const renderCell = (
    rowIdx: number,
    col: string,
    originalValue: string,
    className: string
  ) => {
    const change = getChange(rowIdx, col);
    return (
      <div
        className="flex items-center px-3 py-2.5 relative"
        style={{
          backgroundColor: change ? change.bg : "transparent",
          transition: "background-color 0.5s ease",
        }}
      >
        {col === "rating" && (
          <svg
            className="h-3 w-3 mr-1 shrink-0"
            viewBox="0 0 20 20"
            fill="rgba(0,0,0,0.2)"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1"
          >
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78L10 1z" />
          </svg>
        )}
        <span
          className={className}
          style={{
            color: change ? change.color : undefined,
            transition: "color 0.4s ease",
          }}
        >
          {change ? change.value : originalValue}
          {change?.indicator && (
            <span
              className="ml-1 text-[10px] font-semibold"
              style={{ color: change.color }}
            >
              {change.indicator}
            </span>
          )}
        </span>
      </div>
    );
  };

  const totalRows = showNewRow ? extractedRows.length + 1 : visibleRows;

  return (
    <section className="relative px-6 py-24 md:px-16 md:py-40 lg:px-24" ref={ref}>
      {/* Top divider: line + diagonal strokes + line */}
      <div className="absolute top-0 left-0 w-full">
        <div className="h-px w-full bg-black/[0.08]" />
        <div className="diagonal-strokes mx-auto h-[40px] max-w-[1200px]" />
        <div className="h-px w-full bg-black/[0.08]" />
      </div>
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-16 text-center text-sm font-semibold tracking-[0.15em] text-gray-mid uppercase">
          Extract what matters
          <span
            className="inline-block overflow-hidden whitespace-nowrap align-bottom"
            style={{
              maxWidth: changesPhase ? "14.5em" : "0",
              opacity: changesPhase ? 1 : 0,
              transition: "max-width 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
            }}
          >
            , see what changed
          </span>
        </p>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-0">
          {/* Left spacer */}
          <div
            className="hidden lg:block"
            style={{
              flex: slideLeft ? "0 0 160px" : "1 1 0px",
              transition: "flex 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Isometric product card */}
          <div className="relative aspect-[5/6] w-full max-w-sm shrink-0">
            <div
              className="absolute inset-0 animate-float"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative h-full w-full rounded-lg border border-black/10 bg-gray-off"
                style={{
                  transform: slideLeft
                    ? "rotateX(8deg) rotateY(8deg)"
                    : "rotateX(8deg) rotateY(-8deg)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Grid inside the card */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Simulated product listing structure */}
                <div className="absolute inset-6 flex flex-col gap-3">
                  {/* Top half: image left, pricing/inventory right */}
                  <div className="flex gap-3" style={{ height: "40%" }}>
                    <div className="w-[55%] overflow-hidden rounded border border-black/[0.06]">
                      <img
                        src="/product-illustration.png"
                        alt="Product illustration — kitchen mixer"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex w-[45%] flex-col justify-between py-1">
                      <div className="flex flex-col gap-1.5 pt-20">
                        <div className="h-6 w-20 rounded bg-black/[0.10]" />
                        <div className="h-3.5 w-14 rounded bg-black/[0.05]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-[70%] rounded bg-black/[0.05]" />
                        <div className="h-3 w-[50%] rounded bg-black/[0.05]" />
                      </div>
                    </div>
                  </div>

                  {/* Product description */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="h-3 w-full rounded bg-black/[0.08]" />
                    <div className="h-3 w-[90%] rounded bg-black/[0.06]" />
                    <div className="h-3 w-[75%] rounded bg-black/[0.06]" />
                    <div className="h-3 w-[60%] rounded bg-black/[0.05]" />
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-1 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill={i < 4 ? "rgba(0,0,0,0.15)" : "none"}
                        stroke="rgba(0,0,0,0.12)"
                        strokeWidth="1.5"
                      >
                        <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78L10 1z" />
                      </svg>
                    ))}
                    <div className="ml-1 h-3 w-10 rounded bg-black/[0.05]" />
                  </div>

                  {/* Reviews */}
                  <div className="flex flex-col gap-2 pt-1">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded border border-black/[0.05] bg-white/40 p-2"
                      >
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <div className="h-4 w-4 rounded-full bg-black/[0.08]" />
                          <div className="h-2.5 w-14 rounded bg-black/[0.07]" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div
                            className="h-2 rounded bg-black/[0.05]"
                            style={{ width: i === 0 ? "100%" : "85%" }}
                          />
                          <div
                            className="h-2 rounded bg-black/[0.04]"
                            style={{ width: i === 0 ? "70%" : "60%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight callouts */}
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="absolute"
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.8)",
                      transition: `all 0.5s ease ${h.delay + 0.3}s`,
                    }}
                  >
                    <div className="relative flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-300 animate-pulse-highlight" />
                      <span className="whitespace-nowrap rounded border border-black/10 bg-white/90 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                        {h.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow + table wrapper */}
          <div
            className="hidden lg:flex lg:items-center lg:gap-0 overflow-hidden"
            style={{
              flex: "1 1 0px",
              opacity: showTable ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {/* Arrow connector */}
            <div className="shrink-0 px-6 flex flex-col items-center gap-1.5">
              <ArrowRight className="h-5 w-5 text-black/30" strokeWidth={1.5} />
              <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.1em] text-gray-mid uppercase">
                Extract&hellip;
              </span>
            </div>

            {/* Table */}
            <div className="min-w-0 max-w-md">
              <div className="overflow-hidden rounded-lg border border-black/10">
                {/* Header */}
                <div className="grid grid-cols-4 border-b border-black/10 bg-gray-off">
                  {tableColumns.map((col) => (
                    <div
                      key={col}
                      className="px-3 py-2.5 text-[11px] font-semibold tracking-wider text-gray-mid uppercase"
                    >
                      {col}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                <div>
                  {extractedRows.map((row, i) => {
                    const isVisible = i < visibleRows;
                    const isLatest = i === visibleRows - 1 && !changesPhase;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-4 border-b border-black/[0.05]"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateY(0)" : "translateY(8px)",
                          maxHeight: isVisible ? "60px" : "0px",
                          transition: "all 0.4s ease",
                          background: isLatest ? "rgba(0,0,0,0.02)" : "transparent",
                        }}
                      >
                        <div className="flex items-center px-3 py-2.5">
                          <span className="truncate text-xs font-medium text-black">
                            {row.product}
                          </span>
                        </div>
                        {renderCell(i, "price", row.price, "text-xs tabular-nums text-gray-dark")}
                        {renderCell(
                          i,
                          "stock",
                          row.stock,
                          `text-xs ${
                            (getChange(i, "stock")?.value ?? row.stock) === "Out of Stock"
                              ? "text-gray-mid"
                              : row.stock === "Low Stock"
                                ? "text-gray-dark"
                                : "text-black"
                          }`
                        )}
                        {renderCell(i, "rating", row.rating, "text-xs tabular-nums text-gray-dark")}
                      </div>
                    );
                  })}

                  {/* New row */}
                  <div
                    className="grid grid-cols-4 border-b border-black/[0.05] last:border-b-0"
                    style={{
                      opacity: showNewRow ? 1 : 0,
                      transform: showNewRow ? "translateY(0)" : "translateY(8px)",
                      maxHeight: showNewRow ? "60px" : "0px",
                      transition: "all 0.5s ease",
                      backgroundColor: showNewRow ? "rgba(16,185,129,0.05)" : "transparent",
                    }}
                  >
                    <div
                      className="flex items-center px-3 py-2.5"
                      style={{ backgroundColor: "rgba(16,185,129,0.05)" }}
                    >
                      <span className="truncate text-xs font-medium" style={{ color: "#047857" }}>
                        {newRow.product}
                      </span>
                      <span
                        className="ml-1.5 rounded px-1 py-0.5 text-[9px] font-semibold uppercase leading-none"
                        style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#047857" }}
                      >
                        new
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-2.5">
                      <span className="text-xs tabular-nums text-gray-dark">
                        {newRow.price}
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-2.5">
                      <span className="text-xs text-black">{newRow.stock}</span>
                    </div>
                    <div className="flex items-center px-3 py-2.5">
                      <svg className="h-3 w-3 mr-1 shrink-0" viewBox="0 0 20 20" fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.15)" strokeWidth="1">
                        <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78L10 1z" />
                      </svg>
                      <span className="text-xs tabular-nums text-gray-dark">
                        {newRow.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row counter */}
              <div
                className="mt-3 text-right text-[11px] tabular-nums text-gray-mid"
                style={{
                  opacity: visibleRows > 0 ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {totalRows} of {extractedRows.length + (showNewRow ? 1 : 0)} rows extracted
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
