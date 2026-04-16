"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
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
    <section className="w-full bg-white px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-amber-600 font-semibold text-sm mb-2 tracking-wider uppercase">
            Style Discovery
          </p>

          <h2 className="mb-3 text-center text-4xl text-gray-900 md:text-5xl">
            Find Your <span className=" font-heading">Perfect</span>{" "}
            Outfit
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm font-sans">
            Personalized curation based on your unique silhouette and the magic
            of the occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 rounded-[1.5rem] border border-amber-100 bg-stone-50/70 p-6 shadow-sm lg:grid-cols-12 lg:p-8">
          <div className="lg:col-span-3">
            <div className="mb-8 flex flex-wrap gap-3">
              {["FEMALE", "MALE"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g as Gender)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    gender === g
                      ? "bg-amber-500 text-gray-900"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 font-sans">
                01. BODY TYPE
              </h3>

              <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col">
                {bodyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setBodyType(type)}
                    className={`relative shrink-0 overflow-hidden  bg-white transition-all ${
                      bodyType === type
                        ? "border-2 border-amber-500 shadow-md"
                        : "border border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={bodyTypeImages[type]}
                      alt={`${bodyTypeLabels[type]} body type`}
                      width={80}
                      height={96}
                      className="h-24 w-20 object-cover"
                    />
                    <p className="bg-white px-2 py-2 text-xs font-sans text-gray-800">
                      {bodyTypeLabels[type]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 font-sans">
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
                    aria-label={`Choose ${tone.replaceAll("_", " ").toLowerCase()} skin tone`}
                    title={tone.replaceAll("_", " ")}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-6">
            <div className="relative h-[420px] w-full overflow-hidden  bg-white shadow-lg sm:h-[520px] lg:h-[650px] lg:max-w-xl">
              <Image
                src={currentOutfit.image}
                alt={currentOutfit.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className=" bg-white p-6 shadow-sm">
            <Badge className="mb-4 bg-amber-100 text-amber-800 font-sans">
              {currentOutfit.category}
            </Badge>

            <h3 className="mb-6 text-3xl font-heading text-gray-900">
              {currentOutfit.title}
            </h3>

            <div className="relative mb-6 h-32 overflow-hidden ">
              <Image
                src={currentOutfit.fabricImage}
                alt={`${currentOutfit.title} fabric detail`}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>

            <p className="text-gray-600 text-sm mb-6 font-sans">
              {currentOutfit.description}
            </p>

            <button className="mb-4 flex w-full items-center justify-center gap-2  bg-amber-500 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-400">
              <ShoppingBag size={18} />
              Shop This Look
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1  border border-gray-300 py-2 transition-colors hover:bg-gray-50"
              >
                {savedItems.includes(currentOutfit.id) ? "Saved" : "Save"}
              </button>

              <button
                onClick={handleRefresh}
                className="flex-1  border border-gray-300 py-2 transition-colors hover:bg-gray-50"
              >
                Refresh
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
