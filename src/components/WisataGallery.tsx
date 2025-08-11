"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
type WisataGalleryProps = { images: any[] | null | undefined; name: string };
export function WisataGallery({ images, name }: WisataGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const close = () => setLightboxOpen(false);
  const openAt = (i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  };
  const showPrev = React.useCallback(
    (e?: React.UIEvent | React.KeyboardEvent) => {
      if (e) e.stopPropagation();
      setIndex((prev) =>
        images ? (prev - 1 + images.length) % images.length : prev
      );
    },
    [images]
  );
  const showNext = React.useCallback(
    (e?: React.UIEvent | React.KeyboardEvent) => {
      if (e) e.stopPropagation();
      setIndex((prev) => (images ? (prev + 1) % images.length : prev));
    },
    [images]
  );
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, showPrev, showNext]);
  if (!images || images.length === 0) return null;
  return (
    <div className="mb-10">
      <Carousel
        className="relative w-full max-w-6xl"
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent>
          {images.map((img: any, i: number) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => openAt(i)}
                className="group block w-full overflow-hidden rounded-[20px] shadow-md focus:ring-2 focus:ring-lemon focus:outline-none"
              >
                <Image
                  src={urlFor(img).width(800).height(500).url()}
                  alt={`${name} - ${i + 1}`}
                  width={800}
                  height={500}
                  className="h-64 w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={img?.asset?.metadata?.lqip}
                  priority={i === 0}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 text-zaitun md:-left-12" />
        <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2 text-zaitun md:-right-12" />
      </Carousel>
      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={close}
          >
            <div className="relative flex max-h-full w-full max-w-6xl items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                aria-label="Tutup"
                className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev(e as any);
                    }}
                    aria-label="Sebelumnya"
                    className={cn(
                      "absolute left-2 z-10 hidden rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 md:flex"
                    )}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext(e as any);
                    }}
                    aria-label="Berikutnya"
                    className={cn(
                      "absolute right-2 z-10 hidden rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 md:flex"
                    )}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <Image
                key={index}
                src={urlFor(images[index]).width(1600).height(1000).url()}
                alt={`${name} - fullscreen ${index + 1}`}
                width={1600}
                height={1000}
                className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
                placeholder="blur"
                blurDataURL={images[index]?.asset?.metadata?.lqip}
                priority
                onClick={(e) => e.stopPropagation()}
              />
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Ke gambar ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIndex(i);
                      }}
                      className={cn(
                        "h-2 w-2 rounded-full",
                        i === index ? "bg-lemon" : "bg-white/40"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
export default WisataGallery;
