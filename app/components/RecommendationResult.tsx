// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { Skeleton } from '@/components/ui/skeleton'

// export interface RecommendationResultProps {
//   bodyType: string
//   color: string
//   event: string
//   onBack?: () => void
// }

// const recommendations: Record<string, Record<string, Record<string, {
//   title: string
//   description: string
//   items: Array<{ name: string; price: string }>
//   tagline: string
// }>>> = {
//   hourglass: {
//     warm: {
//       cocktail: {
//         title: 'Effortless Sophistication',
//         description: 'Based on your silhouette and the upcoming cocktail event, we've selected a palette of warm neutrals and structured tailoring. This ensemble balances modern minimalism with timeless luxury, perfect for making a subtle yet powerful statement.',
//         items: [
//           { name: 'SILK BLEND BLAZER', price: '$450.00' },
//           { name: 'TAILORED TROUSERS', price: '$280.00' },
//           { name: 'LEATHER POINTED HEELS', price: '$320.00' },
//         ],
//         tagline: 'The Minimalist Evening',
//       },
//       professional: {
//         title: 'Power and Grace',
//         description: 'Designed for your hourglass figure in warm tones, this professional ensemble emphasizes your natural proportions while maintaining a sophisticated workplace presence.',
//         items: [
//           { name: 'WOOL CREPE BLAZER', price: '$395.00' },
//           { name: 'HIGH-WAIST TROUSERS', price: '$260.00' },
//           { name: 'CLASSIC PUMPS', price: '$285.00' },
//         ],
//         tagline: 'The Professional Edge',
//       },
//       casual: {
//         title: 'Relaxed Elegance',
//         description: 'Perfect for everyday wear, this casual ensemble celebrates your silhouette with comfortable yet stylish pieces in warm, inviting tones.',
//         items: [
//           { name: 'LINEN BLEND SHIRT', price: '$145.00' },
//           { name: 'TAILORED CHINOS', price: '$165.00' },
//           { name: 'SUEDE LOAFERS', price: '$210.00' },
//         ],
//         tagline: 'The Casual Statement',
//       },
//     },
//     cool: {
//       cocktail: {
//         title: 'Modern Elegance',
//         description: 'With your silhouette and cool undertones, this cocktail look combines crisp tailoring with a sophisticated color palette for an unforgettable impression.',
//         items: [
//           { name: 'SATIN WRAP DRESS', price: '$520.00' },
//           { name: 'BEADED CLUTCH', price: '$380.00' },
//           { name: 'METALLIC HEELS', price: '$350.00' },
//         ],
//         tagline: 'The Cool Sophisticate',
//       },
//       professional: {
//         title: 'Polished Confidence',
//         description: 'Cool-toned professional wear that emphasizes structure and confidence while flattering your hourglass shape.',
//         items: [
//           { name: 'NAVY PENCIL BLAZER', price: '$410.00' },
//           { name: 'WHITE SLIM-FIT PANTS', price: '$245.00' },
//           { name: 'POINTED-TOE FLATS', price: '$275.00' },
//         ],
//         tagline: 'The Boardroom Statement',
//       },
//       casual: {
//         title: 'Cool Comfort',
//         description: 'Everyday casual in cool tones that enhance your natural coloring and suit your figure perfectly.',
//         items: [
//           { name: 'COTTON TURTLENECK', price: '$125.00' },
//           { name: 'DENIM JEANS', price: '$180.00' },
//           { name: 'WHITE SNEAKERS', price: '$140.00' },
//         ],
//         tagline: 'The Casual Cool',
//       },
//     },
//     neutral: {
//       cocktail: {
//         title: 'Timeless Allure',
//         description: 'Neutral tones create a versatile foundation for this sophisticated cocktail look that flatters your proportions.',
//         items: [
//           { name: 'BEIGE SHIFT DRESS', price: '$485.00' },
//           { name: 'GOLD BELT', price: '$220.00' },
//           { name: 'NUDE HEELS', price: '$305.00' },
//         ],
//         tagline: 'The Neutral Evening',
//       },
//       professional: {
//         title: 'Balanced Presence',
//         description: 'Neutral professional styling that works seamlessly in any boardroom environment.',
//         items: [
//           { name: 'TAUPE BLAZER', price: '$385.00' },
//           { name: 'GRAY PANTS', price: '$240.00' },
//           { name: 'NEUTRAL FLATS', price: '$225.00' },
//         ],
//         tagline: 'The Professional Neutral',
//       },
//       casual: {
//         title: 'Versatile Style',
//         description: 'Neutral pieces that form the foundation of any great casual wardrobe.',
//         items: [
//           { name: 'CREAM SWEATER', price: '$110.00' },
//           { name: 'CAMEL PANTS', price: '$155.00' },
//           { name: 'BROWN FLATS', price: '$185.00' },
//         ],
//         tagline: 'The Casual Neutral',
//       },
//     },
//     deep: {
//       cocktail: {
//         title: 'Dramatic Elegance',
//         description: 'Deep, saturated tones create a bold statement for your cocktail event, emphasizing sophistication and presence.',
//         items: [
//           { name: 'BLACK SATIN GOWN', price: '$650.00' },
//           { name: 'DIAMOND NECKLACE', price: '$480.00' },
//           { name: 'BLACK HEELS', price: '$345.00' },
//         ],
//         tagline: 'The Black Tie Evening',
//       },
//       professional: {
//         title: 'Executive Presence',
//         description: 'Deep tones convey confidence and authority in professional settings.',
//         items: [
//           { name: 'CHARCOAL BLAZER', price: '$425.00' },
//           { name: 'BLACK TROUSERS', price: '$265.00' },
//           { name: 'PATENT PUMPS', price: '$320.00' },
//         ],
//         tagline: 'The Executive Look',
//       },
//       casual: {
//         title: 'Bold Casual',
//         description: 'Deep, rich tones add sophistication to casual everyday wear.',
//         items: [
//           { name: 'DEEP TEAL SWEATER', price: '$135.00' },
//           { name: 'NAVY JEANS', price: '$195.00' },
//           { name: 'CHOCOLATE LOAFERS', price: '$240.00' },
//         ],
//         tagline: 'The Deep Casual',
//       },
//     },
//   },
//   pear: {
//     warm: {
//       cocktail: {
//         title: 'Balanced Sophistication',
//         description: 'Designed for your pear-shaped silhouette in warm tones, this look balances your proportions with strategic styling for the perfect evening event.',
//         items: [
//           { name: 'A-LINE SKIRT', price: '$380.00' },
//           { name: 'FITTED BLOUSE', price: '$240.00' },
//           { name: 'SATIN HEELS', price: '$310.00' },
//         ],
//         tagline: 'The Pear Elegance',
//       },
//       professional: {
//         title: 'Flattering Professional',
//         description: 'Professional styling that emphasizes your upper half while flattering your curves.',
//         items: [
//           { name: 'STATEMENT BLAZER', price: '$420.00' },
//           { name: 'WIDE-LEG PANTS', price: '$255.00' },
//           { name: 'CLASSIC PUMPS', price: '$290.00' },
//         ],
//         tagline: 'The Professional Balance',
//       },
//       casual: {
//         title: 'Effortless Comfort',
//         description: 'Casual wear that celebrates your shape in comfortable, stylish pieces.',
//         items: [
//           { name: 'FITTED TOP', price: '$95.00' },
//           { name: 'A-LINE PANTS', price: '$150.00' },
//           { name: 'FLATS', price: '$160.00' },
//         ],
//         tagline: 'The Casual Comfort',
//       },
//     },
//     cool: {
//       cocktail: {
//         title: 'Cool Poise',
//         description: 'Cool-toned elegance tailored to your pear shape for an evening of confidence.',
//         items: [
//           { name: 'COOL-TONED GOWN', price: '$540.00' },
//           { name: 'SILVER ACCESSORIES', price: '$320.00' },
//           { name: 'HEELS', price: '$330.00' },
//         ],
//         tagline: 'The Cool Pear',
//       },
//       professional: {
//         title: 'Cool Confidence',
//         description: 'Professional attire in cool tones that works with your proportions.',
//         items: [
//           { name: 'ICE BLUE BLAZER', price: '$405.00' },
//           { name: 'SLACKS', price: '$245.00' },
//           { name: 'HEELS', price: '$305.00' },
//         ],
//         tagline: 'The Professional Cool',
//       },
//       casual: {
//         title: 'Cool Casual',
//         description: 'Everyday wear in cool, refreshing tones.',
//         items: [
//           { name: 'COOL-TONED SHIRT', price: '$115.00' },
//           { name: 'DENIM', price: '$170.00' },
//           { name: 'SNEAKERS', price: '$135.00' },
//         ],
//         tagline: 'The Casual Cool',
//       },
//     },
//     neutral: {
//       cocktail: {
//         title: 'Timeless Balance',
//         description: 'Neutral tones create an elegant canvas for your pear-shaped silhouette at any event.',
//         items: [
//           { name: 'BEIGE GOWN', price: '$495.00' },
//           { name: 'GOLD JEWELRY', price: '$400.00' },
//           { name: 'NEUTRAL HEELS', price: '$285.00' },
//         ],
//         tagline: 'The Neutral Evening',
//       },
//       professional: {
//         title: 'Professional Neutral',
//         description: 'Versatile neutrals that complement your shape in any work setting.',
//         items: [
//           { name: 'CAMEL BLAZER', price: '$390.00' },
//           { name: 'NEUTRAL PANTS', price: '$235.00' },
//           { name: 'HEELS', price: '$270.00' },
//         ],
//         tagline: 'The Work Neutral',
//       },
//       casual: {
//         title: 'Neutral Everyday',
//         description: 'Classic neutral pieces for daily wear.',
//         items: [
//           { name: 'SWEATER', price: '$120.00' },
//           { name: 'NEUTRALS', price: '$160.00' },
//           { name: 'FLATS', price: '$175.00' },
//         ],
//         tagline: 'The Daily Neutral',
//       },
//     },
//     deep: {
//       cocktail: {
//         title: 'Deep Drama',
//         description: 'Rich, deep tones that command attention for your evening event while flattering your pear shape.',
//         items: [
//           { name: 'DEEP BURGUNDY GOWN', price: '$580.00' },
//           { name: 'JEWELED ACCESSORIES', price: '$410.00' },
//           { name: 'HEELS', price: '$340.00' },
//         ],
//         tagline: 'The Deep Evening',
//       },
//       professional: {
//         title: 'Deep Authority',
//         description: 'Deep tones in professional wear that project confidence.',
//         items: [
//           { name: 'DEEP NAVY BLAZER', price: '$415.00' },
//           { name: 'DARK PANTS', price: '$260.00' },
//           { name: 'HEELS', price: '$315.00' },
//         ],
//         tagline: 'The Deep Professional',
//       },
//       casual: {
//         title: 'Deep Casual',
//         description: 'Rich casual wear for everyday style.',
//         items: [
//           { name: 'DEEP TEAL TOP', price: '$130.00' },
//           { name: 'NAVY PANTS', price: '$180.00' },
//           { name: 'LOAFERS', price: '$225.00' },
//         ],
//         tagline: 'The Deep Casual',
//       },
//     },
//   },
//   'inverted-triangle': {
//     warm: {
//       cocktail: {
//         title: 'Shoulder Definition',
//         description: 'For your inverted triangle silhouette, this warm-toned look balances your proportions with strategic styling that draws attention downward.',
//         items: [
//           { name: 'FLOWING SKIRT', price: '$420.00' },
//           { name: 'SIMPLE TOP', price: '$210.00' },
//           { name: 'HEELS', price: '$320.00' },
//         ],
//         tagline: 'The Balanced Evening',
//       },
//       professional: {
//         title: 'Professional Balance',
//         description: 'Professional attire designed to harmonize your shoulders with your lower half.',
//         items: [
//           { name: 'STRUCTURED JACKET', price: '$430.00' },
//           { name: 'FULL SKIRT', price: '$270.00' },
//           { name: 'PUMPS', price: '$300.00' },
//         ],
//         tagline: 'The Balanced Professional',
//       },
//       casual: {
//         title: 'Casual Harmony',
//         description: 'Everyday wear that creates visual balance for your figure.',
//         items: [
//           { name: 'SIMPLE SHIRT', price: '$100.00' },
//           { name: 'FLARED PANTS', price: '$165.00' },
//           { name: 'FLATS', price: '$155.00' },
//         ],
//         tagline: 'The Casual Harmony',
//       },
//     },
//     cool: {
//       cocktail: {
//         title: 'Cool Balance',
//         description: 'Cool-toned elegance that creates the perfect balance for your inverted triangle shape.',
//         items: [
//           { name: 'COOL GOWN', price: '$560.00' },
//           { name: 'SILVER JEWELRY', price: '$380.00' },
//           { name: 'HEELS', price: '$325.00' },
//         ],
//         tagline: 'The Cool Balance',
//       },
//       professional: {
//         title: 'Cool Professional',
//         description: 'Professional cool tones that work with your silhouette.',
//         items: [
//           { name: 'COOL BLAZER', price: '$410.00' },
//           { name: 'BALANCED PANTS', price: '$250.00' },
//           { name: 'HEELS', price: '$310.00' },
//         ],
//         tagline: 'The Cool Work',
//       },
//       casual: {
//         title: 'Cool Casual',
//         description: 'Casual wear in cool refreshing tones.',
//         items: [
//           { name: 'COOL TOP', price: '$120.00' },
//           { name: 'JEANS', price: '$175.00' },
//           { name: 'SNEAKERS', price: '$140.00' },
//         ],
//         tagline: 'The Casual Cool',
//       },
//     },
//     neutral: {
//       cocktail: {
//         title: 'Neutral Elegance',
//         description: 'Neutral tones create visual harmony for your inverted triangle figure at special events.',
//         items: [
//           { name: 'NEUTRAL GOWN', price: '$510.00' },
//           { name: 'ACCESSORIES', price: '$350.00' },
//           { name: 'HEELS', price: '$295.00' },
//         ],
//         tagline: 'The Neutral Evening',
//       },
//       professional: {
//         title: 'Neutral Professional',
//         description: 'Professional neutral styling that balances your proportions.',
//         items: [
//           { name: 'NEUTRAL BLAZER', price: '$400.00' },
//           { name: 'NEUTRAL PANTS', price: '$240.00' },
//           { name: 'FLATS', price: '$280.00' },
//         ],
//         tagline: 'The Neutral Work',
//       },
//       casual: {
//         title: 'Neutral Everyday',
//         description: 'Daily neutral wear.',
//         items: [
//           { name: 'NEUTRAL TOP', price: '$110.00' },
//           { name: 'PANTS', price: '$155.00' },
//           { name: 'FLATS', price: '$170.00' },
//         ],
//         tagline: 'The Daily Neutral',
//       },
//     },
//     deep: {
//       cocktail: {
//         title: 'Deep Elegance',
//         description: 'Deep tones create dramatic elegance for your inverted triangle silhouette.',
//         items: [
//           { name: 'DEEP GOWN', price: '$600.00' },
//           { name: 'STATEMENT JEWELRY', price: '$420.00' },
//           { name: 'HEELS', price: '$345.00' },
//         ],
//         tagline: 'The Deep Evening',
//       },
//       professional: {
//         title: 'Deep Authority',
//         description: 'Deep professional tones that project power and confidence.',
//         items: [
//           { name: 'DEEP BLAZER', price: '$435.00' },
//           { name: 'DARK PANTS', price: '$265.00' },
//           { name: 'HEELS', price: '$325.00' },
//         ],
//         tagline: 'The Deep Professional',
//       },
//       casual: {
//         title: 'Deep Casual',
//         description: 'Rich casual everyday style.',
//         items: [
//           { name: 'DEEP TOP', price: '$135.00' },
//           { name: 'DARK PANTS', price: '$190.00' },
//           { name: 'LOAFERS', price: '$230.00' },
//         ],
//         tagline: 'The Deep Casual',
//       },
//     },
//   },
// }

// export function RecommendationResult({
//   bodyType,
//   color,
//   event,
//   onBack = () => {},
// }: RecommendationResultProps) {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800)
//     return () => clearTimeout(timer)
//   }, [])

//   const recommendation = recommendations[bodyType]?.[color]?.[event]

//   if (!recommendation) {
//     return (
//       <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-stone-50">
//         <div className="text-center">
//           <p className="text-gray-600">Loading recommendation...</p>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="min-h-screen bg-stone-50 py-12 px-4">
//       <div className="w-full max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">
//             Personalized Recommendation
//           </p>
//           <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6">
//             {recommendation.title}
//           </h1>
//         </div>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
//           {/* Image Section */}
//           <div className="flex items-center justify-center">
//             {isLoading ? (
//               <div className="w-full aspect-square bg-gray-200 rounded-lg">
//                 <Skeleton className="w-full h-full" />
//               </div>
//             ) : (
//               <div className="w-full aspect-square bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg flex items-center justify-center overflow-hidden">
//                 <div className="text-center">
//                   <p className="text-sm text-gray-500 font-medium">Generated Outfit Image</p>
//                   <p className="text-xs text-gray-400 mt-2">{recommendation.tagline}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Details Section */}
//           <div className="flex flex-col justify-center">
//             <p className="text-gray-700 leading-relaxed mb-8">
//               {recommendation.description}
//             </p>

//             {/* Items List */}
//             <div className="space-y-4 mb-8">
//               {recommendation.items.map((item, index) => (
//                 <div key={index} className="flex justify-between items-baseline">
//                   <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
//                     {item.name}
//                   </span>
//                   <span className="text-sm text-gray-600">{item.price}</span>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Section */}
//             <div className="space-y-4">
//               <div className="flex gap-4">
//                 <button className="flex-1 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-sm transition-colors">
//                   ADD TO CART
//                 </button>
//                 <button className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-sm hover:bg-gray-50 transition-colors">
//                   SAVE TO WARDROBE
//                 </button>
//               </div>
//               <button
//                 onClick={onBack}
//                 className="w-full text-center text-xs text-gray-600 hover:text-gray-900 transition-colors py-2"
//               >
//                 ↺ TRY ANOTHER SELECTION
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
