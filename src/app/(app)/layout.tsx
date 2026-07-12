import { LanguageProvider } from "@/components/spotify/LanguageContext";
import { MobileNav } from "@/components/spotify/MobileNav";
import { NowPlayingBar } from "@/components/spotify/NowPlayingBar";
import { OnboardingTour } from "@/components/spotify/OnboardingTour";
import { PlayerProvider } from "@/components/spotify/PlayerContext";
import { SearchProvider } from "@/components/spotify/SearchContext";
import { Sidebar } from "@/components/spotify/Sidebar";
import { TopBar } from "@/components/spotify/TopBar";

export default function SpotifyShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <PlayerProvider>
        <SearchProvider>
        <div className="min-h-screen bg-sp-bg">
          <Sidebar />
          <div className="pb-[130px] md:ml-[240px] md:pb-[100px]">
            <TopBar />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
          </div>
          <NowPlayingBar />
          <MobileNav />
          <OnboardingTour />
        </div>
        </SearchProvider>
      </PlayerProvider>
    </LanguageProvider>
  );
}
