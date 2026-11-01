'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { OUTFITS } from '@/lib/outfits';

import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';

export function OutfitCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (api === undefined) {
      return;
    }

    const sync = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    sync();
    api.on('select', sync);

    return () => {
      api.off('select', sync);
    };
  }, [api]);

  if (OUTFITS.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Carousel
        opts={{ align: 'start', loop: true }}
        setApi={setApi}
        aria-label="Outfit photos"
        className="mx-auto w-full max-w-xl"
      >
        <CarouselContent>
          {OUTFITS.map(outfit => (
            <CarouselItem key={outfit.src} className="basis-1/2">
              <Card className="overflow-hidden py-0 shadow-sm">
                <CardContent className="p-0">
                  <Image
                    src={outfit.src}
                    alt={outfit.alt}
                    width={768}
                    height={1024}
                    unoptimized={outfit.src.endsWith('.svg')}
                    className="aspect-[3/4] h-auto w-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <p className="text-muted-foreground text-center text-xs">
        {current} / {OUTFITS.length}
      </p>
    </div>
  );
}
