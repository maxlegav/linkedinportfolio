import type { User } from "@/data/portfolio";
import { ProfileAvatar } from "./ProfileAvatar";
import { ShellCard } from "./ShellCard";

type ComposerStubProps = {
  user: User;
};

function initials(user: User) {
  return user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ComposerStub({ user }: ComposerStubProps) {
  const ini = initials(user);
  return (
    <ShellCard className="mb-2 flex gap-3 p-3">
      <ProfileAvatar src={user.avatarUrl} initials={ini} size={48} className="border border-transparent" />
      <a
        href={`mailto:${user.email}?subject=Hello Max`}
        className="flex h-14 flex-1 items-center rounded-full border border-black/[0.18] px-4 text-left text-[14px] text-[rgba(0,0,0,0.54)] transition hover:bg-black/[0.04] hover:border-[var(--li-blue)]"
      >
        Start a post
      </a>
    </ShellCard>
  );
}
