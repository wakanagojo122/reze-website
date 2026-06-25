import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { Sliders } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";

// Import default images from assets
import heroBgImg from "./assets/images/csm_hero_bg_1782359794782.jpg";
import storefrontImg from "./assets/images/csm_storefront_1782359812329.jpg";
import makimaImg from "./assets/images/csm_makima_1782359828151.jpg";
import akiImg from "./assets/images/csm_aki_1782359842976.jpg";
import kobeniImg from "./assets/images/csm_kobeni_1782359858830.jpg";
import makimaDenjiImg from "./assets/images/csm_makima_denji_1782359879946.jpg";
import angelDevilImg from "./assets/images/csm_angel_devil_1782359897749.jpg";

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
  heroBg: heroBgImg,
  storefront: storefrontImg,
  makima: makimaImg,
  aki: akiImg,
  kobeni: kobeniImg,
  makimaDenji: makimaDenjiImg,
  angelDevil: angelDevilImg,
  
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

function sanitizeContent(data: Partial<EditableContent>): EditableContent {
  const sanitized = { ...DEFAULT_CONTENT };
  (Object.keys(DEFAULT_CONTENT) as Array<keyof EditableContent>).forEach((key) => {
    const value = data[key];
    if (value && value !== "/your-image-here.jpg" && value !== "your-image-here.jpg" && String(value).trim() !== "") {
      sanitized[key] = value as any;
    }
  });
  return sanitized;
}

export default function App() {
  const [content, setContent] = useState<EditableContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return sanitizeContent(JSON.parse(saved));
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
        let docSnap;
        try {
          docSnap = await getDoc(docRef);
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, "editorials/main");
          return;
        }
        
        let remoteTextData: Partial<EditableContent> = {};
        if (docSnap.exists()) {
          remoteTextData = docSnap.data() as Partial<EditableContent>;
        }

        const IMAGE_KEYS = [
          "heroBg",
          "storefront",
          "makima",
          "aki",
          "kobeni",
          "makimaDenji",
          "angelDevil"
        ] as const;

        const imagePromises = IMAGE_KEYS.map(async (key) => {
          const imgRef = doc(db, "editorials", "main", "images", key);
          try {
            const imgSnap = await getDoc(imgRef);
            if (imgSnap.exists()) {
              return { key, url: imgSnap.data().url as string };
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `editorials/main/images/${key}`);
          }
          return null;
        });

        const images = await Promise.all(imagePromises);
        const remoteImageData: Record<string, string> = {};
        images.forEach((item) => {
          if (item) {
            remoteImageData[item.key] = item.url;
          }
        });

        const mergedData = sanitizeContent({
          ...remoteTextData,
          ...remoteImageData
        });

        if (docSnap.exists() || Object.keys(remoteImageData).length > 0) {
          setContent(mergedData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedData));
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
      const IMAGE_KEYS = [
        "heroBg",
        "storefront",
        "makima",
        "aki",
        "kobeni",
        "makimaDenji",
        "angelDevil"
      ] as const;

      const textData: Record<string, string> = {};
      const imageData: Record<string, string> = {};

      Object.entries(newContent).forEach(([key, value]) => {
        if (IMAGE_KEYS.includes(key as any)) {
          imageData[key] = value;
        } else {
          textData[key] = value;
        }
      });

      // Save texts to main document
      const docRef = doc(db, "editorials", "main");
      try {
        await setDoc(docRef, textData);
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, "editorials/main");
      }

      // Save each image separately under main document
      const imagePromises = Object.entries(imageData).map(async ([key, url]) => {
        const imgRef = doc(db, "editorials", "main", "images", key);
        try {
          await setDoc(imgRef, { url });
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, `editorials/main/images/${key}`);
        }
      });

      await Promise.all(imagePromises);
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
      const IMAGE_KEYS = [
        "heroBg",
        "storefront",
        "makima",
        "aki",
        "kobeni",
        "makimaDenji",
        "angelDevil"
      ] as const;

      const textData: Record<string, string> = {};
      const imageData: Record<string, string> = {};

      Object.entries(DEFAULT_CONTENT).forEach(([key, value]) => {
        if (IMAGE_KEYS.includes(key as any)) {
          imageData[key] = value;
        } else {
          textData[key] = value;
        }
      });

      const docRef = doc(db, "editorials", "main");
      try {
        await setDoc(docRef, textData);
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, "editorials/main");
      }

      const imagePromises = Object.entries(imageData).map(async ([key, url]) => {
        const imgRef = doc(db, "editorials", "main", "images", key);
        try {
          await setDoc(imgRef, { url });
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, `editorials/main/images/${key}`);
        }
      });

      await Promise.all(imagePromises);
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
