import { ShellCard } from "./ShellCard";

type AsideItem =
  | { title: string; subtitle: string; href?: undefined }
  | { title: string; subtitle: string; href: string };

type FeedAsideProps = {
  title: string;
  items: readonly AsideItem[];
};

export function FeedAside({ title, items }: FeedAsideProps) {
  return (
    <ShellCard className="sticky top-[60px] p-4">
      <h3 className="text-[16px] font-semibold tracking-tight text-[var(--li-text)]">{title}</h3>
      <ul className="mt-3 divide-y divide-black/[0.08] rounded-md border border-black/[0.08] bg-white">
        {items.map((item) => (
          <li key={item.title}>
            {"href" in item && item.href ? (
              <a
                href={item.href}
                target={item.title === "My Profile" ? undefined : "_blank"}
                rel={item.title === "My Profile" ? undefined : "noopener noreferrer"}
                className="flex gap-3 px-3 py-3 text-left hover:bg-black/[0.025]"
              >
                <Bullet />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug text-[var(--li-text)] hover:text-[var(--li-blue)]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--li-text-muted)]">{item.subtitle}</p>
                </div>
              </a>
            ) : (
              <div className="flex gap-3 px-3 py-3">
                <Bullet />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug text-[var(--li-text)]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--li-text-muted)]">{item.subtitle}</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] leading-snug text-[var(--li-text-muted)]">
        Quick links from Max&apos;s profile — CV, LinkedIn, and contact.
      </p>
    </ShellCard>
  );
}

function Bullet() {
  return (
    <span className="mt-1 inline-block h-2 w-[3px] shrink-0 rounded-sm bg-black/[0.45]" aria-hidden />
  );
}
