import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08] px-6 py-12 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/Blueprinter - Logo Design - final_Icoon Los - Black.svg"
            alt="Blueprinter"
            width={20}
            height={20}
          />
          <span className="text-xs font-light tracking-[0.15em] text-gray-mid uppercase">
            Blueprinter
          </span>
        </div>
        <p className="text-xs text-gray-mid">
          &copy; {new Date().getFullYear()} Blueprinter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
