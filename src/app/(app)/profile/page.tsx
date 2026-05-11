import Image from "next/image";
import { ProfileAvatar } from "@/components/feed/ProfileAvatar";
import { ShellCard } from "@/components/feed/ShellCard";
import { certifications, education, experiences, me, randomImage, skills } from "@/data/portfolio";

function LogoBox({
  logoUrl, logoLetter, color, size = 48,
}: {
  logoUrl?: string;
  logoLetter: string;
  color?: string;
  size?: number;
}) {
  if (logoUrl) {
    return (
      <div
        className="shrink-0 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm"
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt={logoLetter}
          width={size}
          height={size}
          className="h-full w-full object-contain p-1"
          unoptimized
        />
      </div>
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
      style={{ width: size, height: size, backgroundColor: color ?? "#0a66c2" }}
    >
      {logoLetter}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[860px] space-y-4 pb-20">
      {/* Header — banner then avatar on top */}
      <header className="li-card animate-fade-in-up overflow-hidden">
        {/* Banner */}
        <div className="relative h-44 sm:h-56">
          <Image
            src={me.bannerUrl || randomImage("profile-banner", 1200, 600)}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Avatar overlapping banner — positioned absolutely so it sits ON TOP */}
        <div className="relative px-6 pb-5">
          <ProfileAvatar
            src={me.avatarUrl || randomImage("profile-avatar", 300, 300)}
            alt={me.name}
            size={104}
            className="absolute -top-[52px] left-6 border-4 border-white bg-white shadow-md ring-2 ring-[var(--li-blue)]/20"
            priority
          />
          {/* Spacer so content doesn't overlap avatar */}
          <div className="h-9" />
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">{me.name}</h1>
              <p className="text-[15px] text-[var(--li-text-muted)]">{me.headline}</p>
              <p className="mt-1 text-sm text-[var(--li-text-muted)]">
                {me.location} · <span className="font-semibold text-[var(--li-blue)]">{me.connectionsLabel}</span>
              </p>
              <p className="mt-1 text-sm text-[var(--li-text-muted)]">
                {me.phone} ·{" "}
                <a href={`mailto:${me.email}`} className="text-[var(--li-blue)] hover:underline">{me.email}</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={me.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[var(--li-blue)] px-4 py-1.5 text-sm font-semibold text-white shadow transition-all hover:bg-[var(--li-blue-hover)] hover:shadow-md active:scale-95"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                Download CV
              </a>
              <a
                href={me.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[var(--li-blue)] px-4 py-1.5 text-sm font-semibold text-[var(--li-blue)] transition-all hover:bg-[var(--li-blue)]/10 active:scale-95"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <ShellCard className="animate-fade-in-up stagger-1">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--li-text)]">{me.about}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {me.languages.map((lang) => (
            <span key={lang} className="rounded-full bg-[var(--li-blue)]/10 px-3 py-1 text-xs font-semibold text-[var(--li-blue)]">
              {lang}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-black/[0.06] pt-3 text-xs text-[var(--li-text-muted)]">
          <span>♟ 2000 Elo chess (top 2% worldwide)</span>
          <span>🥋 Black belt in Judo</span>
          <span>🏄 Surfing</span>
          <span>🏃 Running</span>
        </div>
      </ShellCard>

      {/* Skills */}
      <ShellCard className="animate-fade-in-up stagger-2">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white p-2 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--li-blue)]/30 hover:shadow-md"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <Image
                src={skill.iconUrl}
                alt={skill.name}
                width={36}
                height={36}
                className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-110"
                unoptimized
              />
              <span className="text-center text-[10px] font-medium leading-tight text-[var(--li-text-muted)]">{skill.name}</span>
            </div>
          ))}
        </div>
      </ShellCard>

      {/* Experience */}
      <ShellCard className="animate-fade-in-up stagger-3">
        <h2 className="text-lg font-semibold">Experience</h2>
        <ul className="mt-4 space-y-6 divide-y divide-black/[0.06]">
          {experiences.map((exp) => (
            <li key={exp.id} className="flex gap-4 pt-4 first:pt-0">
              <LogoBox logoUrl={exp.logoUrl} logoLetter={exp.logoLetter} color={exp.color} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--li-text)]">{exp.role}</p>
                <p className="text-sm font-medium text-[var(--li-blue)]">{exp.company}</p>
                <p className="text-xs text-[var(--li-text-faint)]">{exp.startDate} – {exp.endDate} · {exp.location}</p>
                <ul className="mt-2 space-y-1.5">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[var(--li-text)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--li-blue)]" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </ShellCard>

      {/* Education */}
      <ShellCard className="animate-fade-in-up stagger-4">
        <h2 className="text-lg font-semibold">Education</h2>
        <ul className="mt-4 space-y-6 divide-y divide-black/[0.06]">
          {education.map((ed) => (
            <li key={ed.id} className="flex gap-4 pt-4 first:pt-0">
              <LogoBox logoUrl={ed.logoUrl} logoLetter={ed.logoLetter} color="#0a66c2" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--li-text)]">{ed.school}</p>
                <p className="text-sm text-[var(--li-text-muted)]">{ed.degree} · {ed.field}</p>
                <p className="text-xs text-[var(--li-text-faint)]">{ed.startYear} – {ed.endYear} · {ed.location}</p>
                {ed.gpa && (
                  <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    GPA {ed.gpa}
                  </span>
                )}
                {ed.courses && (
                  <p className="mt-1.5 text-xs text-[var(--li-text-muted)]">
                    <span className="font-semibold">Courses:</span> {ed.courses.join(", ")}
                  </p>
                )}
                {ed.description && (
                  <p className="mt-2 text-sm text-[var(--li-text)]">{ed.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </ShellCard>

      {/* Certifications */}
      <ShellCard className="animate-fade-in-up stagger-5">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <LogoBox logoUrl={cert.logoUrl} logoLetter={cert.logoLetter} color={cert.color} size={40} />
              <div>
                <p className="text-sm font-semibold text-[var(--li-text)]">{cert.name}</p>
                <p className="text-xs text-[var(--li-text-muted)]">{cert.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </ShellCard>
    </div>
  );
}
