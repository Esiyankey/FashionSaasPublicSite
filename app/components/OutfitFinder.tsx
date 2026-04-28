"use client";

import { useState } from "react";
import { ChevronLeft, User, Heart, Share2, Star } from "lucide-react";

// Step 1: Body Types
const bodyTypes = [
  { id: "hourglass", name: "HOURGLASS" },
  { id: "pear", name: "PEAR" },
  { id: "rectangle", name: "RECTANGLE" },
  { id: "inverted-triangle", name: "INVERTED\nTRIANGLE" },
  { id: "apple", name: "APPLE" },
  { id: "athletic", name: "ATHLETIC" },
];

// Step 2: Skin Tones
const skinTones = [
  { id: "porcelain", name: "Porcelain", color: "#FDEBD0" },
  { id: "ivory", name: "Ivory", color: "#F5CBA7" },
  { id: "sand", name: "Sand", color: "#E8A87C" },
  { id: "peach", name: "Peach", color: "#D4845A" },
  { id: "warm-tan", name: "Warm Tan", color: "#C06A3A" },
  { id: "caramel", name: "Caramel", color: "#8B4513" },
  { id: "espresso", name: "Espresso", color: "#5C2E00" },
  { id: "ebony", name: "Deep Ebony", color: "#3B1A08" },
];

// Step 3: Occasions
const occasions = [
  {
    id: "grand-wedding",
    name: "Grand Wedding",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=280&fit=crop",
  },
  {
    id: "cocktail-party",
    name: "Cocktail Party",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop",
  },
  {
    id: "weekend-casual",
    name: "Weekend Casual",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=280&fit=crop",
  },
  {
    id: "executive-formal",
    name: "Executive Formal",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=280&fit=crop",
  },
];

// Step Photos
const stepPhotos = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=450&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=450&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=450&h=600&fit=crop",
];

export function OutfitFinder() {
  const [step, setStep] = useState(0);
  const [bodyType, setBodyType] = useState("hourglass");
  const [skinTone, setSkinTone] = useState("peach");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progressPercentage = showResult ? 100 : ((step + 1) / 3) * 100;

  const handleStepNext = () => {
    if (step < 2) {
      setCompletedSteps(new Set([...completedSteps, step]));
      setStep(step + 1);
    } else if (step === 2 && occasion) {
      setCompletedSteps(new Set([...completedSteps, step]));
      setIsLoading(true);
      setTimeout(() => {
        setShowResult(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleStepBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setBodyType("hourglass");
    setSkinTone("peach");
    setOccasion(null);
    setShowResult(false);
    setCompletedSteps(new Set());
  };

  if (showResult) {
    return (
      <ResultPage
        bodyType={bodyType}
        skinTone={skinTone}
        occasion={occasion!}
        onReset={handleReset}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0EDE6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#6B6B6B] text-sm">Curating your look...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      {/* Top Navigation */}
      <nav className="  flex justify-around items-center pt-12 px-6">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 bg-[#1A1A1A]"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
          <span className="text-lg font-serif font-bold text-[#1A1A1A]">
            Find Your Style
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mr-2">
            Personalization Progress
          </span>
          <div className="w-32 h-1 bg-gray-200">
            <div
              className="h-full bg-[#1A1A1A] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white  overflow-hidden flex gap-6 min-h-[500px]">
            {/* Left Column - Photo */}
            <div className="hidden md:block md:w-[40%] overflow-hidden">
              <img
                src={stepPhotos[step]}
                alt="Step"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Column - Content */}
            <div className="flex-1 p-12 flex flex-col justify-between">
              {/* Step Indicator */}
              <div className="flex gap-6 items-start mb-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                        i < step || completedSteps.has(i)
                          ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                          : i === step
                            ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                            : "bg-white text-[#6B6B6B] border-[#CCCCCC]"
                      }`}
                    >
                      {completedSteps.has(i) ? "✓" : i + 1}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#6B6B6B] whitespace-nowrap">
                      {["Body Type", "Skin Tone", "Event"][i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                {step === 0 && (
                  <Step1BodyType selected={bodyType} onChange={setBodyType} />
                )}
                {step === 1 && (
                  <Step2SkinTone selected={skinTone} onChange={setSkinTone} />
                )}
                {step === 2 && (
                  <Step3Occasion selected={occasion} onChange={setOccasion} />
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button
                    onClick={handleStepBack}
                    className="flex items-center gap-1 text-[#6B6B6B] text-sm hover:text-[#1A1A1A]"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
                <button
                  onClick={handleStepNext}
                  disabled={step === 2 && !occasion}
                  className="ml-auto px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium  hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {step === 2
                    ? "Find My Perfect Look →"
                    : "Step " +
                      (step + 2) +
                      ": " +
                      ["Choose Skin Tone", "Choose Event", ""][step] +
                      " →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Body Type
function Step1BodyType({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-2">
        Define Your Silhouette
      </h1>
      <p className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-8">
        Step 1: Understand Your Unique Proportions
      </p>
      <p className="text-sm text-[#6B6B6B] mb-6">
        Select the silhouette that most accurately reflects your natural
        proportions.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {bodyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`p-4 border-2  transition-all flex flex-col items-center justify-center gap-3 ${
              selected === type.id
                ? "border-[#1A1A1A] bg-[#F5F5F5]"
                : "border-[#CCCCCC] hover:border-[#1A1A1A]"
            }`}
          >
            <div className="w-12 h-16 bg-gray-300 rounded flex items-center justify-center text-2xl">
              📐
            </div>
            <span className="text-xs font-medium text-[#1A1A1A] whitespace-pre-line text-center">
              {type.name}
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-[#6B6B6B] mt-6">
        Your selection helps us curate outfits that uniquely complement your
        form.
      </p>
    </div>
  );
}

// Step 2: Skin Tone
function Step2SkinTone({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-2">
        Define Your Radiance
      </h1>
      <p className="text-sm text-[#6B6B6B] max-w-sm mb-8">
        Color harmony begins with your unique undertone. Select the shade that
        best represents your natural complexion.
      </p>

      <div className="flex gap-3 mb-4">
        {skinTones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            className="relative group "
            title={tone.name}
          >
            <div
              className={`w-9 h-9  border-3 transition-all rounded-full ${
                selected === tone.id
                  ? "border-[#1A1A1A] ring-2 ring-[#1A1A1A] ring-offset-2"
                  : "border-gray-300 hover:border-[#1A1A1A]"
              }`}
              style={{ backgroundColor: tone.color }}
            />
          </button>
        ))}
      </div>

      <div className="flex text-[10px] uppercase tracking-widest text-[#6B6B6B] gap-12 mb-6">
        <span>Light Spectrum</span>
        <span>Neutral Tones</span>
        <span>Deep Spectrum</span>
      </div>

      <div className="text-xs  text-[#1A1A1A] font-medium mb-4">
        {skinTones.find((t) => t.id === selected)?.name.toUpperCase()}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#6B6B6B] p-3 bg-gray-50  mb-6">
        <span>ⓘ</span>
        <span>
          Our algorithm calculates contrast ratios based on your choice.
        </span>
      </div>
    </div>
  );
}

// Step 3: Occasion
function Step3Occasion({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-serif italic font-bold text-[#1A1A1A] mb-2">
        Where are you going?
      </h1>
      <p className="text-sm text-[#6B6B6B] max-w-sm mb-8">
        Select the occasion to help our editorial engine curate the perfect
        silhouette for your moment.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {occasions.map((occ) => (
          <button
            key={occ.id}
            onClick={() => onChange(occ.id)}
            className={`relative overflow-hidden  h-32 border-2 transition-all ${
              selected === occ.id
                ? "border-white ring-2 ring-white"
                : "border-transparent"
            }`}
          >
            <img
              src={occ.image}
              alt={occ.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35 hover:bg-black/20 transition-all" />
            {selected === occ.id && (
              <div className="absolute top-2 left-2 w-4 h-4 bg-white  flex items-center justify-center text-xs text-[#1A1A1A] font-bold">
                ✓
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
              <div className="text-xs uppercase tracking-widest mb-1">
                Occasion
              </div>
              <div className="text-sm font-bold">{occ.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Result Page
function ResultPage({
  bodyType,
  skinTone,
  occasion,
  onReset,
}: {
  bodyType: string;
  skinTone: string;
  occasion: string;
  onReset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      {/* Top Navigation */}
      <nav className="pt-12 flex items-center justify-around px-6 flex-col md:flex-row ">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 bg-[#1A1A1A]"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
          <span className="text-lg font-serif font-bold text-[#1A1A1A]">
            Find Your Style
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mr-2">
            Personalization Complete
          </span>
          <div className="w-32 h-1 bg-[#1A1A1A]" />
        </div>
      </nav>

      {/* Result Content */}
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Card */}
          <div className="bg-white  p-8 mb-12 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#1A1A1A] bg-[#1A1A1A] text-white px-2 py-1 rounded">
                  ✦ Expert Pick
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1595777707802-08d01897d960?w=400&h=500&fit=crop"
                alt="Outfit"
                className="w-full "
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">
                  Your Curated Look
                </p>
                <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-4">
                  The Amber Gala Set
                </h2>

                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-gray-200 text-[#1A1A1A] px-2 py-1 ">
                    Sustainable IRL
                  </span>
                  <span className="text-xs bg-gray-200 text-[#1A1A1A] px-2 py-1 ">
                    Limited Edition
                  </span>
                  <span className="text-xs bg-gray-200 text-[#1A1A1A] px-2 py-1 ">
                    Hand Finished
                  </span>
                </div>

                <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">
                  Exquisitely tailored for a formal presence, this silk blend
                  ensemble features a high waist fluid drape and a structured
                  bodice. The golden amber hue is specifically selected to
                  complement your warm undertones and athletic silhouette.
                </p>

                <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6">
                  <span>ⓘ</span>
                  <span>Available in your preferred size: 38 (EU)</span>
                </div>

                <p className="text-2xl font-bold text-[#1A1A1A] mb-6">
                  $1,250.00
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#1A1A1A] text-white py-3  flex items-center justify-center gap-2 hover:bg-gray-900 transition">
                    <span>🛍️</span> Shop This Look
                  </button>
                  <button className="flex-1 border-2 border-[#1A1A1A] text-[#1A1A1A] py-3 hover:bg-gray-50 transition">
                    Try Another
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
                  <button className="text-[#6B6B6B] hover:text-[#1A1A1A]">
                    <Heart size={18} />
                  </button>
                  <button className="text-[#6B6B6B] hover:text-[#1A1A1A]">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Complete the Look */}
          <div className="bg-white  p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6B6B6B] mb-1">
                  — Personal Stylist Suggestions
                </p>
                <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  Complete the Look
                </h3>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="px-4 py-2 bg-[#1A1A1A] text-white text-sm ">
                  Accessories
                </button>
                <button className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm ">
                  Outerwear
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {[
                {
                  name: "Gold Leaf Stilettos",
                  category: "FOOTWEAR",
                  price: "$240",
                },
                {
                  name: "Amber Drop Earrings",
                  category: "JEWELRY",
                  price: "$115",
                },
                {
                  name: "Silk Chiffon Clutch",
                  category: "BAGS",
                  price: "$185",
                },
                {
                  name: "Velvet Waist Cincher",
                  category: "BELTS",
                  price: "$95",
                },
                { name: "Pearl Hair Pin Set", category: "HAIR", price: "$45" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="shrink-0 w-40 bg-gray-50 overflow-hidden border border-gray-200"
                >
                  <div className="w-full h-32 bg-gray-300 relative">
                    <button className="absolute top-2 right-2 text-gray-600 hover:text-[#1A1A1A]">
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-xs uppercase text-[#6B6B6B] mb-1">
                      {item.category}
                    </p>
                    <p className="text-sm font-bold text-[#1A1A1A] mb-2">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-[#1A1A1A]">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white p-6 mt-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#1A1A1A] mb-1">
                How did we do?
              </p>
              <p className="text-xs text-[#6B6B6B]">
                Your feedback helps refine our tailoring algorithm for future
                looks.
              </p>
            </div>
            <div className="flex gap-3 mt-2 md:mt-0">
              <button className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm  hover:bg-gray-50 transition">
                Perfect Match
              </button>
              <button className="px-4 py-2 border border-[#6B6B6B] text-[#6B6B6B] text-sm  hover:bg-gray-50 transition">
                Not My Style
              </button>
              <button
                onClick={onReset}
                className="ml-auto px-4 py-2 bg-[#1A1A1A] text-white text-sm  hover:bg-gray-900 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
