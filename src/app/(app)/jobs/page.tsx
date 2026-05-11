import Image from "next/image";
import { ShellCard } from "@/components/feed/ShellCard";
import { jobOpportunities } from "@/data/portfolio";

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-[860px] space-y-3">
      <ShellCard className="p-4">
        <h1 className="text-xl font-semibold">Jobs</h1>
        <p className="mt-1 text-sm text-[var(--li-text-muted)]">
          Job suggestions aligned with your profile (freelance web, UI, and cybersecurity growth).
        </p>
      </ShellCard>

      {jobOpportunities.map((job) => (
        <ShellCard key={job.id} noPadding className="overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[220px_1fr]">
            <div className="relative flex h-[160px] items-center justify-center bg-[#f3f2ef] p-8 md:h-full">
              <Image src={job.imageUrl} alt="" fill sizes="220px" className="object-contain p-8" />
            </div>
            <div className="p-4">
              <p className="text-sm text-[var(--li-text-muted)]">{job.company}</p>
              <h2 className="mt-1 text-lg font-semibold">{job.role}</h2>
              <p className="mt-1 text-sm text-[var(--li-text-muted)]">
                {job.location} · {job.mode}
              </p>
              <p className="mt-3 text-sm text-[var(--li-text)]">{job.summary}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-full bg-[var(--li-blue)] px-4 py-1.5 text-sm font-semibold text-white" type="button">
                  Quick apply
                </button>
                <button className="rounded-full border border-black/20 px-4 py-1.5 text-sm font-semibold" type="button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </ShellCard>
      ))}
    </div>
  );
}
