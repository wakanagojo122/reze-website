import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { Sliders } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Import Custom Modular Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import DesignIdeasSection from "./components/DesignIdeasSection";
import LoveMakimaSection from "./components/LoveMakimaSection";
import TrailerSection from "./components/TrailerSection";
import CharacterGallery from "./components/CharacterGallery";
import PhoneMockup from "./components/PhoneMockup";
import EditorialDashboard from "./components/EditorialDashboard";
import { EditableContent } from "./types";

const LOCAL_STORAGE_KEY = "harshx_csm_editorial_v2";

const DEFAULT_CONTENT: EditableContent = {
  heroBg: "/your-image-here.jpg",
  storefront: "/your-image-here.jpg",
  makima: "/your-image-here.jpg",
  aki: "/your-image-here.jpg",
  kobeni: "/your-image-here.jpg",
  makimaDenji: "/your-image-here.jpg",
  angelDevil: "/your-image-here.jpg",
  
  heroTitle: "Chainsaw\nMan Anime",
  heroDesc: "The anime version is scheduled to premiere on September 19, 2022, and the author also revealed that he is preparing to publish the second manga series this summer. Step into Fujimoto's visceral urban nightmare where demons feed on human fears and devil hunters pay the ultimate price.",
  section1Title: "DESIGN IDEAS",
  makimaCardTitle: "Scene : Makima gets shot Bang",
  makimaCardDesc: "A high-contrast cinematic shot exploring the absolute cold composure of Makima. Under pressure, she remains flawless.",
  akiCardTitle: "Boyfriend Aki Hayakawa",
  akiCardDesc: "A tragic hero, carrying the weight of his family's vengeance, walking a pre-determined path to death.",
  kobeniCardTitle: "Girl cosplay Kobeni Higashiyama",
  kobeniCardDesc: "The frantic, terrified, yet unbelievably deadly devil hunter who survived everything.",
  section2Title: "LOVE MAKIMA",
  section2Percent: "100%",
  section2Quote: "Tatsuki Fujimoto has written this story to be set in a fantasy world where there are not only humans but also demons living there.",
  trailerTitle: "TRAILER",
  trailerSub: "チェンソーマン",
  trailerDesc: "The official anime PV showcases MAPPA's breathtaking cinematic direction, gritty hand-drawn style combined with brutal fight sequences, and Kensuke Ushio's industrial soundtrack. Witness the rise of Chainsaw Man.",
  // Default to the user's requested trailer link!
  trailerYoutubeUrl: "https://youtu.be/EPaoHkV0dYw?si=CJGXKkgzmR566bU0",
};

export default function App() {
  const [content, setContent] = useState<EditableContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to load saved editorial content", e);
    }
    return DEFAULT_CONTENT;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Fetch published state from Firestore asynchronously on mount
  useEffect(() => {
    const loadPublishedState = async () => {
      try {
        const docRef = doc(db, "editorials", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as EditableContent;
          setContent(prev => ({ ...prev, ...remoteData }));
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
        }
      } catch (e) {
        console.error("Failed to fetch published state from Firestore:", e);
      }
    };
    loadPublishedState();
  }, []);

  const handleSave = async (newContent: EditableContent): Promise<boolean> => {
    setContent(newContent);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn("Failed to save content to local storage", e);
    }

    try {
      const docRef = doc(db, "editorials", "main");
      await setDoc(docRef, newContent);
      return true;
    } catch (e) {
      console.error("Failed to save content to Firestore", e);
      return false;
    }
  };

  const handleReset = async () => {
    setContent(DEFAULT_CONTENT);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear local storage", e);
    }

    try {
      const docRef = doc(db, "editorials", "main");
      await setDoc(docRef, DEFAULT_CONTENT);
    } catch (e) {
      console.error("Failed to reset Firestore content", e);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4f4f0] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 1. Header / Top Navigation Bar */}
      <Header onOpenEditor={() => setIsEditorOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 2. Hero Section (Full Viewport) */}
        <HeroSection 
          heroBgUrl={content.heroBg} 
          storefrontUrl={content.storefront} 
          title={content.heroTitle}
          desc={content.heroDesc}
        />

        {/* 3. Section 01: Design Ideas Grid */}
        <DesignIdeasSection 
          makimaUrl={content.makima} 
          akiUrl={content.aki} 
          kobeniUrl={content.kobeni}
          sectionTitle={content.section1Title}
          makimaTitle={content.makimaCardTitle}
          makimaDesc={content.makimaCardDesc}
          akiTitle={content.akiCardTitle}
          akiDesc={content.akiCardDesc}
          kobeniTitle={content.kobeniCardTitle}
          kobeniDesc={content.kobeniCardDesc}
        />

        {/* 4. Section 02: Love Makima Centerpiece */}
        <LoveMakimaSection 
          makimaDenjiUrl={content.makimaDenji} 
          girlLookingBackUrl={content.kobeni} 
          boyLookingForwardUrl={content.aki} 
          smallArtPanelUrl={content.heroBg} 
          section2Title={content.section2Title}
          section2Percent={content.section2Percent}
          section2Quote={content.section2Quote}
        />

        {/* 5. Section 03: Trailer Cinematic PV Section */}
        <TrailerSection 
          trailerBgUrl={content.heroBg} 
          title={content.trailerTitle}
          subTitle={content.trailerSub}
          desc={content.trailerDesc}
          youtubeUrl={content.trailerYoutubeUrl}
        />

        {/* 6. Section 04: Character Gallery & Footer Spread */}
        <CharacterGallery 
          akiUrl={content.aki} 
          makimaUrl={content.makima} 
          angelDevilUrl={content.angelDevil} 
        />
      </main>

      {/* 7. Floating Realistic Phone Mockup (Desktop only, responsive hover floating) */}
      <PhoneMockup 
        heroBgUrl={content.heroBg}
        storefrontUrl={content.storefront}
        makimaUrl={content.makima}
        akiUrl={content.aki}
        kobeniUrl={content.kobeni}
        heroTitle={content.heroTitle}
        heroDesc={content.heroDesc}
      />

      {/* 8. Editorial Studio Control Dashboard Drawer */}
      <EditorialDashboard 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={content}
        onSave={handleSave}
        onReset={handleReset}
      />

    </div>
  );
}
