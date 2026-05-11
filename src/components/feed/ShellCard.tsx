import type { ReactNode } from "react";

type ShellCardProps = {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

export function ShellCard({ children, className = "", noPadding }: ShellCardProps) {
  return (
    <div
      className={`li-card overflow-hidden text-left shadow-[0px_1px_2px_rgba(0,0,0,0.06)] ${noPadding ? "" : "p-4"} ${className}`}
    >
      {children}
    </div>
  );
}
