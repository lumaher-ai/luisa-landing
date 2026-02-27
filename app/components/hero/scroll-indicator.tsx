import { MouseIcon } from "@/app/components/ui/mouse-icon";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 animate-bounce-slow">
      <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
        Scroll down
      </span>
      <MouseIcon />
    </div>
  );
}
