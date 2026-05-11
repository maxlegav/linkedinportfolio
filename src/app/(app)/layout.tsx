import { ClientAppShell } from "@/components/layout/ClientAppShell";

export default function LinkedInShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientAppShell>{children}</ClientAppShell>;
}
