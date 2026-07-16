"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "en" | "fr";

const STORAGE_KEY = "portfolio-lang";

const en = {
  navHome: "Home",
  navSearch: "Search",
  navLibrary: "Your Library",
  downloadCv: "Download CV",
  profile: "Profile",
  artist: "Artist",
  searchPlaceholder: "What do you want to explore?",
  goodMorning: "Good morning",
  goodAfternoon: "Good afternoon",
  goodEvening: "Good evening",
  featuredArtist: "Featured Artist",
  visitProfile: "Visit Profile",
  wrappedKicker: "Portfolio Wrapped",
  wrappedBannerTitle: "Your 2025 Wrapped is here 🦖",
  wrappedBannerText:
    "Play the dino runner, dodge the bugs and rack up streams while you discover my year in review.",
  wrappedBannerCta: "Play the mini-game",
  wrappedTitle1: "I shipped all year.",
  wrappedTitle2: "Now it's your turn to run.",
  wrappedSubtitle: "12 projects · multiple hackathons · 1 SaaS exited - dodge the bugs like I did. Press",
  wrappedSubtitleEnd: "/ tap to jump.",
  startRun: "Start the run",
  playAgain: "Play again",
  gameOver: "Game over!",
  score: "Score",
  best: "Best",
  congrats: "Well played! 🎉 Share your score with me on LinkedIn",
  shareOnLinkedin: "Message me on LinkedIn",
  yourName: "Your name",
  submitScore: "Submit score",
  submitting: "Submitting...",
  submitError: "Could not save your score - try again.",
  leaderboard: "Leaderboard",
  leaderboardEmpty: "No scores yet - be the first!",
  backToPortfolio: "Back to the portfolio",
  yourLibrary: "Your Library",
  clearCategory: "Clear category filter",
  all: "All",
  nothingHere: "Nothing here yet - try another filter.",
  tourWelcomeTitle: "Welcome to my Portfolio 🎧",
  tourWelcomeText:
    "This portfolio works like a music app: every project is an album, tags are the tracks, and likes are the streams. Here's a quick tour.",
  tourSidebarTitle: "Your Library",
  tourSidebarText:
    "Browse every project from the sidebar: Hackathons & SaaS founded, Professional Experience, and Made by Max.",
  tourFeaturedTitle: "Featured Artist",
  tourFeaturedText:
    "That's me! Visit my artist page for the About section, highlights, and the full discography.",
  tourCarouselsTitle: "Projects as albums",
  tourCarouselsText:
    "Scroll the carousels and click any cover to open the project page with all the details and links.",
  tourPlayerTitle: "Now playing",
  tourPlayerText:
    "The player bar always shows the selected project. Press play to launch a demo video when one is available.",
  skip: "Skip",
  next: "Next",
  done: "Done",
};

export type Dict = typeof en;

const fr: Dict = {
  navHome: "Accueil",
  navSearch: "Recherche",
  navLibrary: "Bibliothèque",
  downloadCv: "Télécharger le CV",
  profile: "Profil",
  artist: "Artiste",
  searchPlaceholder: "Que veux-tu explorer ?",
  goodMorning: "Bonjour",
  goodAfternoon: "Bon après-midi",
  goodEvening: "Bonsoir",
  featuredArtist: "Artiste à la une",
  visitProfile: "Voir le profil",
  wrappedKicker: "Portfolio Wrapped",
  wrappedBannerTitle: "Ton Wrapped 2025 est là 🦖",
  wrappedBannerText:
    "Joue au dino runner, évite les bugs et cumule les streams en découvrant mon année.",
  wrappedBannerCta: "Jouer au mini-jeu",
  wrappedTitle1: "J'ai shippé toute l'année.",
  wrappedTitle2: "À toi de courir maintenant.",
  wrappedSubtitle: "12 projets · plusieurs hackathons · 1 SaaS vendu - évite les bugs comme moi. Appuie sur",
  wrappedSubtitleEnd: "/ tape pour sauter.",
  startRun: "Lancer la course",
  playAgain: "Rejouer",
  gameOver: "Game over !",
  score: "Score",
  best: "Record",
  congrats: "Bien joué ! 🎉 Partage-moi ton score sur LinkedIn",
  shareOnLinkedin: "M'écrire sur LinkedIn",
  yourName: "Ton nom",
  submitScore: "Enregistrer le score",
  submitting: "Envoi...",
  submitError: "Impossible d'enregistrer ton score - réessaie.",
  leaderboard: "Classement",
  leaderboardEmpty: "Aucun score pour l'instant - sois le premier !",
  backToPortfolio: "Retour au portfolio",
  yourLibrary: "Bibliothèque",
  clearCategory: "Effacer le filtre de catégorie",
  all: "Tout",
  nothingHere: "Rien ici pour l'instant - essaie un autre filtre.",
  tourWelcomeTitle: "Bienvenue sur mon portfolio 🎧",
  tourWelcomeText:
    "Ce portfolio fonctionne comme une app de musique : chaque projet est un album, les tags sont les titres et les likes sont les streams. Petite visite guidée.",
  tourSidebarTitle: "Ta bibliothèque",
  tourSidebarText:
    "Parcours tous les projets depuis la barre latérale : Hackathons & SaaS founded, Professional Experience et Made by Max.",
  tourFeaturedTitle: "Artiste à la une",
  tourFeaturedText:
    "C'est moi ! Visite ma page artiste pour la section À propos, les highlights et toute la discographie.",
  tourCarouselsTitle: "Des projets comme des albums",
  tourCarouselsText:
    "Fais défiler les carrousels et clique sur une pochette pour ouvrir la page du projet avec tous les détails et liens.",
  tourPlayerTitle: "En cours de lecture",
  tourPlayerText:
    "Le lecteur affiche toujours le projet sélectionné. Appuie sur play pour lancer une vidéo démo quand elle est disponible.",
  skip: "Passer",
  next: "Suivant",
  done: "Terminé",
};

const DICTS: Record<Lang, Dict> = { en, fr };

type LanguageState = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const t = setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") setLangState(stored);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: DICTS[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
