"use client";

import { useState } from "react";
import { Heart, Bookmark, RotateCcw, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Gender = "FEMALE" | "MALE";
type BodyType = "INVERTED_TRIANGLE" | "PEAR" | "HOURGLASS" | "CURVY";
type SkinTone =
  | "VERY_LIGHT"
  | "LIGHT"
  | "MEDIUM"
  | "TAN"
  | "DARK"
  | "DEEP_DARK";
type Occasion =
  | "Wedding"
  | "Casual Outing"
  | "Corporate"
  | "Party"
  | "Date Night";

interface Outfit {
  id: string;
  title: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  fabricImage: string;
}

const outfitDatabase: Record<string, Outfit[]> = {
  FEMALE_CURVY_MEDIUM_Wedding: [
    {
      id: "1",
      title: "Celestial Silk Gown",
      category: "GRAND WEDDING LOOK",
      description:
        "This ethereal A-line silhouette is specifically tailored to embrace your curves while offering a majestic flow. The silk-satin drapes and blends light beautifully, ensuring you're the most radiant guest of the evening.",
      price: "$2,999",
      image:
        "https://images.unsplash.com/photo-1595777707802-e2b1f765a986?w=500&h=700&fit=crop",
      fabricImage:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop",
    },
  ],
  FEMALE_PETITE_LIGHT_Wedding: [
    {
      id: "2",
      title: "Delicate Lace Dress",
      category: "ELEGANT WEDDING LOOK",
      description:
        "A perfect fit for petite frames, this dress features delicate lace detailing and a fitted bodice that creates a beautiful silhouette. The lightweight fabric ensures comfort throughout the celebration.",
      price: "$2,499",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=700&fit=crop",
      fabricImage:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=150&h=150&fit=crop",
    },
  ],
  FEMALE_TALL_DARK_Wedding: [
    {
      id: "3",
      title: "Dramatic Velvet Gown",
      category: "LUXURY WEDDING LOOK",
      description:
        "Embrace your height with this stunning floor-length velvet gown. The deep jewel tones complement darker skin beautifully, while the long lines create an incredibly elegant and dramatic presence.",
      price: "$3,299",
      image:
        "https://images.unsplash.com/photo-1581101767014-48ea170a779d?w=500&h=700&fit=crop",
      fabricImage:
        "https://images.unsplash.com/photo-1599859431579-d57c56f41c9d?w=150&h=150&fit=crop",
    },
  ],
  MALE_ATHLETIC_MEDIUM_Wedding: [
    {
      id: "4",
      title: "Classic Tailored Tuxedo",
      category: "PREMIUM WEDDING LOOK",
      description:
        "A perfectly fitted tuxedo designed to showcase your athletic build. Premium wool fabric with subtle texture details ensures you look sharp and sophisticated throughout the evening.",
      price: "$1,899",
      image:
        "https://images.unsplash.com/photo-1591047990508-253bf370895b?w=500&h=700&fit=crop",
      fabricImage:
        "https://images.unsplash.com/photo-1569887941648-a66f5c9ee649?w=150&h=150&fit=crop",
    },
  ],
  default: [
    {
      id: "1",
      title: "Celestial Silk Gown",
      category: "GRAND WEDDING LOOK",
      description:
        "This ethereal A-line silhouette is specifically tailored to embrace your curves while offering a majestic flow. The silk-satin drapes and blends light beautifully, ensuring you're the most radiant guest of the evening.",
      price: "$2,999",
      image:
        "https://images.unsplash.com/photo-1595777707802-e2b1f765a986?w=500&h=700&fit=crop",
      fabricImage:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop",
    },
  ],
};

export function OutfitFinder() {
  const [gender, setGender] = useState<Gender>("FEMALE");
  const [bodyType, setBodyType] = useState<BodyType>("CURVY");
  const [skinTone, setSkinTone] = useState<SkinTone>("MEDIUM");
  const [occasion, setOccasion] = useState<Occasion>("Wedding");
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const bodyTypes: BodyType[] = [
    "CURVY",
    "INVERTED_TRIANGLE",
    "PEAR",
    "HOURGLASS",
  ];

  const bodyTypeLabels: Record<string, string> = {
    CURVY: "Apple",
    INVERTED_TRIANGLE: "Inverted Triangle",
    PEAR: "Pear",
    HOURGLASS: "Hourglass",
  };

  const bodyTypeImages: Record<string, string> = {
    CURVY:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-shape-4mHWkD0OjYlE5FtwXuy57eKTi7vRc2.jpg",
    INVERTED_TRIANGLE:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/inverted-triangle-QCLJ4GHBwPl610YP2vhdIii4RPjr4k.jpg",
    PEAR: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pear-shaped-qxo1q5wkO1PaOX6ycsl4jLTxBTtiCG.jpg",
    HOURGLASS:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hourglass-7qf9RhanKUIgfxeVCq4bS6NGiv1ouL.jpg",
  };

  const skinTones: SkinTone[] = [
    "VERY_LIGHT",
    "LIGHT",
    "MEDIUM",
    "TAN",
    "DARK",
    "DEEP_DARK",
  ];
  const occasions: Occasion[] = [
    "Wedding",
    "Casual Outing",
    "Corporate",
    "Party",
    "Date Night",
  ];

  const skinToneLabels: Record<SkinTone, string> = {
    VERY_LIGHT: "VERY LIGHT",
    LIGHT: "LIGHT",
    MEDIUM: "MEDIUM",
    TAN: "TAN",
    DARK: "DARK",
    DEEP_DARK: "DEEP DARK",
  };

  const skinToneColors: Record<SkinTone, string> = {
    VERY_LIGHT: "#F5E6D3",
    LIGHT: "#E8D5C4",
    MEDIUM: "#D4A574",
    TAN: "#B8956A",
    DARK: "#704B3E",
    DEEP_DARK: "#3D2817",
  };

  const getOutfit = (): Outfit => {
    const key = `${gender}_${bodyType}_${skinTone}_${occasion}`;
    return (outfitDatabase[key] || outfitDatabase.default)[0];
  };

  const currentOutfit = getOutfit();
  const isSaved = savedItems.includes(currentOutfit.id);

  const handleSave = () => {
    setSavedItems((prev) =>
      prev.includes(currentOutfit.id)
        ? prev.filter((id) => id !== currentOutfit.id)
        : [...prev, currentOutfit.id],
    );
  };

  const handleRefresh = () => {
    const randomBodyType =
      bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
    const randomOccasion =
      occasions[Math.floor(Math.random() * occasions.length)];
    setBodyType(randomBodyType);
    setOccasion(randomOccasion);
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm mb-2 tracking-wider uppercase">
            Style Discovery
          </p>

          <h1 className="text-4xl md:text-5xl  text-center mb-3 text-gray-900">
            Find Your <span className=" font-heading">Perfect</span>{" "}
            Outfit
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm font-sans">
            Personalized curation based on your unique silhouette and the magic
            of the occasion.
          </p>
        </div>

        {/* GRID FIXED */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-3">
            {/* Gender */}
            <div className="flex gap-3 mb-8">
              {["FEMALE", "MALE"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g as Gender)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    gender === g
                      ? "bg-amber-500 text-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Body Type */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-semibold text-sm mb-4 font-sans">
                01. BODY TYPE
              </h3>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {bodyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setBodyType(type)}
                    className={`relative shrink-0 transition-all overflow-hidden ${
                      bodyType === type
                        ? "border-2 border-amber-500"
                        : "border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={bodyTypeImages[type]}
                      className="w-20 h-24 object-cover"
                    />
                    <p className="text-xs font-sans text-gray-800 bg-white py-1 px-1">
                      {bodyTypeLabels[type]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone */}
            <div>
              <h3 className="text-gray-900 font-semibold text-sm mb-4 font-sans">
                02. SKIN TONE
              </h3>

              <div className="flex flex-wrap gap-3">
                {skinTones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSkinTone(tone)}
                    className="w-10 h-10 rounded-full"
                    style={{
                      backgroundColor: skinToneColors[tone],
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE (BIG) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg lg:max-w-xl h-[650px] overflow-hidden">
              <img
                src={currentOutfit.image}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT (SMALLER) */}
          <div className="lg:col-span-3">
            <Badge className="bg-amber-100 text-amber-800 mb-4 font-sans">
              {currentOutfit.category}
            </Badge>

            <h2 className="text-3xl font-heading text-gray-900 mb-6">
              {currentOutfit.title}
            </h2>

            <img
              src={currentOutfit.fabricImage}
              className="w-full h-32 object-cover mb-6"
            />

            <p className="text-gray-600 text-sm mb-6 font-sans">
              {currentOutfit.description}
            </p>

            <button className="w-full bg-amber-600 text-gray-900 py-3 font-semibold mb-4 flex items-center justify-center gap-2">
              <ShoppingBag size={18} />
              Shop This Look
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 border border-gray-300 py-2"
              >
                Save
              </button>

              <button
                onClick={handleRefresh}
                className="flex-1 border border-gray-300 py-2"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
