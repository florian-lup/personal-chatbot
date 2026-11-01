export interface OutfitPhoto {
  src: string;
  alt: string;
}

/**
 * Slides shown when a reply includes the outfits gallery token.
 * Add a file under public/outfits and a matching entry here.
 */
export const OUTFITS: readonly OutfitPhoto[] = [
  {
    src: '/outfits/outfit-1.JPEG',
    alt: 'Brown check blazer, cream cable-knit sweater, and light trousers',
  },
  {
    src: '/outfits/outfit-2.JPG',
    alt: 'Navy overcoat over a burgundy sweater and grey trousers',
  },
  {
    src: '/outfits/outfit-3.png',
    alt: 'Camel overcoat with a navy tie and cream sweater',
  },
  {
    src: '/outfits/outfit-4.png',
    alt: 'Grey overcoat, black turtleneck, and sunglasses',
  },
  {
    src: '/outfits/outfit-5.JPG',
    alt: 'Beige double-breasted suit with a cream sweater and striped tie',
  },
  {
    src: '/outfits/outfit-6.JPG',
    alt: 'Dark green double-breasted coat, navy sweater, and grey trousers',
  },
  {
    src: '/outfits/outfit-7.JPG',
    alt: 'Cream double-breasted coat over a cream turtleneck',
  },
  {
    src: '/outfits/outfit-8.JPG',
    alt: 'Grey overcoat, black turtleneck, and light trousers',
  },
  {
    src: '/outfits/outfit-9.JPG',
    alt: 'Brown overcoat, cream turtleneck, and dark trousers',
  },
  {
    src: '/outfits/outfit-10.jpg',
    alt: 'White linen shirt and navy trousers',
  },
];
