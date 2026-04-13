'use client'

import { useState } from 'react'
import { Heart, Bookmark, RotateCcw, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Gender = 'FEMALE' | 'MALE'
type BodyType = 'INVERTED_TRIANGLE' | 'PEAR' | 'HOURGLASS' | 'CURVY'


type SkinTone = 'VERY_LIGHT' | 'LIGHT' | 'MEDIUM' | 'TAN' | 'DARK' | 'DEEP_DARK'
type Occasion = 'Wedding' | 'Casual Outing' | 'Corporate' | 'Party' | 'Date Night'

interface Outfit {
  id: string
  title: string
  category: string
  description: string
  price?: string
  image: string
  fabricImage: string
}

const outfitDatabase: Record<string, Outfit[]> = {
  'FEMALE_CURVY_MEDIUM_Wedding': [
    {
      id: '1',
      title: 'Celestial Silk Gown',
      category: 'GRAND WEDDING LOOK',
      description: 'This ethereal A-line silhouette is specifically tailored to embrace your curves while offering a majestic flow. The silk-satin drapes and blends light beautifully, ensuring you\'re the most radiant guest of the evening.',
      price: '$2,999',
      image: 'https://images.unsplash.com/photo-1595777707802-e2b1f765a986?w=500&h=700&fit=crop',
      fabricImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop'
    }
  ],
  'FEMALE_PETITE_LIGHT_Wedding': [
    {
      id: '2',
      title: 'Delicate Lace Dress',
      category: 'ELEGANT WEDDING LOOK',
      description: 'A perfect fit for petite frames, this dress features delicate lace detailing and a fitted bodice that creates a beautiful silhouette. The lightweight fabric ensures comfort throughout the celebration.',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=700&fit=crop',
      fabricImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=150&h=150&fit=crop'
    }
  ],
  'FEMALE_TALL_DARK_Wedding': [
    {
      id: '3',
      title: 'Dramatic Velvet Gown',
      category: 'LUXURY WEDDING LOOK',
      description: 'Embrace your height with this stunning floor-length velvet gown. The deep jewel tones complement darker skin beautifully, while the long lines create an incredibly elegant and dramatic presence.',
      price: '$3,299',
      image: 'https://images.unsplash.com/photo-1581101767014-48ea170a779d?w=500&h=700&fit=crop',
      fabricImage: 'https://images.unsplash.com/photo-1599859431579-d57c56f41c9d?w=150&h=150&fit=crop'
    }
  ],
  'MALE_ATHLETIC_MEDIUM_Wedding': [
    {
      id: '4',
      title: 'Classic Tailored Tuxedo',
      category: 'PREMIUM WEDDING LOOK',
      description: 'A perfectly fitted tuxedo designed to showcase your athletic build. Premium wool fabric with subtle texture details ensures you look sharp and sophisticated throughout the evening.',
      price: '$1,899',
      image: 'https://images.unsplash.com/photo-1591047990508-253bf370895b?w=500&h=700&fit=crop',
      fabricImage: 'https://images.unsplash.com/photo-1569887941648-a66f5c9ee649?w=150&h=150&fit=crop'
    }
  ],
  'default': [
    {
      id: '1',
      title: 'Celestial Silk Gown',
      category: 'GRAND WEDDING LOOK',
      description: 'This ethereal A-line silhouette is specifically tailored to embrace your curves while offering a majestic flow. The silk-satin drapes and blends light beautifully, ensuring you\'re the most radiant guest of the evening.',
      price: '$2,999',
      image: 'https://images.unsplash.com/photo-1595777707802-e2b1f765a986?w=500&h=700&fit=crop',
      fabricImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop'
    }
  ]
}

export function OutfitFinder() {
  const [gender, setGender] = useState<Gender>('FEMALE')
  const [bodyType, setBodyType] = useState<BodyType>('CURVY' as BodyType)
  const [skinTone, setSkinTone] = useState<SkinTone>('MEDIUM')
  const [occasion, setOccasion] = useState<Occasion>('Wedding')
  const [savedItems, setSavedItems] = useState<string[]>([])

  const bodyTypes: BodyType[] = ['CURVY', 'INVERTED_TRIANGLE', 'PEAR', 'HOURGLASS']
  const bodyTypeLabels: Record<string, string> = {
    'CURVY': 'Apple',
    'INVERTED_TRIANGLE': 'Inverted Triangle',
    'PEAR': 'Pear',
    'HOURGLASS': 'Hourglass'
  }
  const bodyTypeImages: Record<string, string> = {
    'CURVY': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-shape-4mHWkD0OjYlE5FtwXuy57eKTi7vRc2.jpg',
    'INVERTED_TRIANGLE': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/inverted-triangle-QCLJ4GHBwPl610YP2vhdIii4RPjr4k.jpg',
    'PEAR': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pear-shaped-qxo1q5wkO1PaOX6ycsl4jLTxBTtiCG.jpg',
    'HOURGLASS': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hourglass-7qf9RhanKUIgfxeVCq4bS6NGiv1ouL.jpg'
  }

  const skinTones: SkinTone[] = ['VERY_LIGHT', 'LIGHT', 'MEDIUM', 'TAN', 'DARK', 'DEEP_DARK']
  const occasions: Occasion[] = ['Wedding', 'Casual Outing', 'Corporate', 'Party', 'Date Night']

  const skinToneLabels: Record<SkinTone, string> = {
    'VERY_LIGHT': 'VERY LIGHT',
    'LIGHT': 'LIGHT',
    'MEDIUM': 'MEDIUM',
    'TAN': 'TAN',
    'DARK': 'DARK',
    'DEEP_DARK': 'DEEP DARK'
  }

  const skinToneColors: Record<SkinTone, string> = {
    'VERY_LIGHT': '#F5E6D3',
    'LIGHT': '#E8D5C4',
    'MEDIUM': '#D4A574',
    'TAN': '#B8956A',
    'DARK': '#704B3E',
    'DEEP_DARK': '#3D2817'
  }

  const getOutfit = (): Outfit => {
    const key = `${gender}_${bodyType}_${skinTone}_${occasion}`
    return (outfitDatabase[key] || outfitDatabase['default'])[0]
  }

  const currentOutfit = getOutfit()
  const isSaved = savedItems.includes(currentOutfit.id)

  const handleSave = () => {
    setSavedItems(prev => 
      prev.includes(currentOutfit.id)
        ? prev.filter(id => id !== currentOutfit.id)
        : [...prev, currentOutfit.id]
    )
  }

  const handleRefresh = () => {
    // Cycle through outfits or randomly select
    const randomBodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)]
    const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)]
    setBodyType(randomBodyType)
    setOccasion(randomOccasion)
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm mb-2">Style Discovery</p>
          <h1 className="text-4xl md:text-5xl font-light text-center mb-3">
            Find Your <span className="italic font-serif">Perfect</span> Outfit
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Personalized curation based on your unique silhouette and the magic of the occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            {/* Gender Tabs */}
            <div className="flex gap-3 mb-8">
              {['FEMALE', 'MALE'].map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g as Gender)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    gender === g
                      ? 'bg-amber-200 text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Body Type */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-semibold text-sm mb-4">01. BODY TYPE</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {bodyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setBodyType(type)}
                    className={`relative flex-shrink-0 p-0 text-center  transition-all overflow-hidden ${
                      bodyType === type
                        ? 'border-3 border-amber-400'
                        : 'border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={bodyTypeImages[type]}
                      alt={bodyTypeLabels[type]}
                      className="w-20 h-24 object-cover"
                    />
                    {bodyType === type && (
                      <span className="absolute top-1 right-1 text-amber-500 text-sm">★</span>
                    )}
                    <p className="text-xs font-semibold text-gray-800 bg-white py-1 px-0.5 whitespace-nowrap">{bodyTypeLabels[type]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-semibold text-sm mb-4">02. SKIN TONE</h3>
              <div className="flex flex-wrap gap-3">
                {skinTones.map(tone => (
                  <button
                    key={tone}
                    onClick={() => setSkinTone(tone)}
                    className={`relative group`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full transition-all cursor-pointer ${
                        skinTone === tone
                          ? 'ring-2 ring-amber-400 ring-offset-2 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: skinToneColors[tone] }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {skinToneLabels[tone]}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-8">{skinToneLabels[skinTone]}</p>
            </div>

            {/* Occasion */}
            <div>
              <h3 className="text-gray-900 font-semibold text-sm mb-4">03. THE OCCASION</h3>
              <div className="grid grid-cols-2 gap-2">
                {occasions.map(occ => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      occasion === occ
                        ? 'bg-amber-400 text-gray-900'
                        : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Outfit Preview */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="bg-gray-300  overflow-hidden w-full max-w-sm h-96 md:h-[650px]">
              <img
                src={currentOutfit.image}
                alt={currentOutfit.title}
                className="w-full h-full object-cover"
              />
              <div className="bg-gray-700 text-white px-4 py-3">
                <p className="text-xs font-semibold flex items-center gap-2">
                  👤 {gender === 'FEMALE' ? 'Female' : 'Male'} • {bodyType} • Medium Tone • {occasion}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Product Details */}
          <div className="lg:col-span-1/2">
            <Badge className="bg-amber-100 text-amber-700 mb-4">
              {currentOutfit.category}
            </Badge>

            <h2 className="text-3xl font-serif text-gray-900 mb-6">
              {currentOutfit.title}
            </h2>

            {/* Fabric Image */}
            <div className="mb-6">
              <img
                src={currentOutfit.fabricImage}
                alt="Fabric detail"
                className="w-full h-32 object-cover "
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {currentOutfit.description}
            </p>

            {/* Shop Button */}
            <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg mb-6 flex items-center justify-center gap-2 transition-colors">
              <ShoppingBag size={20} />
              Shop This Look
            </button>

            {/* Save and Refresh Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                  isSaved
                    ? 'bg-amber-100 text-amber-700'
                    : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                Save
              </button>
              <button
                onClick={handleRefresh}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:border-gray-400 py-2 rounded-lg transition-colors"
              >
                <RotateCcw size={18} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
