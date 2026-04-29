import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const images = [
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486468/IMG-20251106-WA0025_loo84h.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486899/IMG-20251015-WA0017_cu4sku.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487053/IMG-20251016-WA0028_ndswgt.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487109/IMG-20251017-WA0076_kprr1j.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487224/IMG-20251021-WA0038_v8orz0.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487257/IMG-20251021-WA0046_zkkedm.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487270/IMG-20251021-WA0047_n10fkk.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487296/IMG-20251021-WA0050_ksguzn.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487479/IMG-20251015-WA0100_x11u8u.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487488/IMG-20251016-WA0044_ve9sb9.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487619/IMG-20251017-WA0012_ndbfuz.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487556/IMG-20251016-WA0033_siryf6.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487719/IMG-20251021-WA0050_vta1s0.jpg",
    alt: "Equipamiento para stand",
    ratio: 9 / 16,
    placeholder: "https://placehold.co/900x1600",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486098/IMG-20251014-WA0109_deboxb.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487706/IMG-20251017-WA0039_awv0bn.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487635/IMG-20251017-WA0024_yo6bnp.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487563/IMG-20251016-WA0115_rodcyl.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487571/IMG-20251016-WA0116_gra0cf.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487304/IMG-20251106-WA0014_afx4ny.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487369/IMG-20251106-WA0009_cblnys.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487399/IMG-20251016-WA0104_vluaol.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487471/IMG-20251014-WA0091_lcrfl0.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487471/IMG-20251014-WA0091_lcrfl0.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487429/IMG-20251015-WA0040_boqb9e.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487440/IMG-20251015-WA0097_fjcwtq.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487140/IMG-20251017-WA0040_wybgrk.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487172/IMG-20251017-WA0100_zwgykn.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487194/IMG-20251017-WA0108_sh9kva.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487078/IMG-20251017-WA0075_t02x3g.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487023/IMG-20251015-WA0134_s9mch8.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486937/IMG-20251015-WA0091_kvuxx0.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777487002/IMG-20251015-WA0102_zorewu.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486972/IMG-20251015-WA0096_yieloc.jpg",
    alt: "Living para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486380/IMG-20251014-WA0082_nrihwk.jpg",
    alt: "Equipamiento para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
  {
    src: "https://res.cloudinary.com/dygsjthl9/image/upload/v1777486756/IMG-20251015-WA0095_rcbwdg.jpg",
    alt: "Equipamiento para stand",
    ratio: 4 / 3,
    placeholder: "https://placehold.co/1200x900",
  },
];

const shuffledImages = [...images].sort(() => Math.random() - 0.5);

const columns = [
  shuffledImages.filter((_, index) => index % 3 === 0),
  shuffledImages.filter((_, index) => index % 3 === 1),
  shuffledImages.filter((_, index) => index % 3 === 2),
];

export function ImageGallery() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, col) => (
          <div key={col} className="grid content-start gap-6">
            {column.map((image, index) => (
              <AnimatedImage
                key={`${col}-${index}-${image.src}`}
                alt={image.alt}
                src={image.src}
                ratio={image.ratio}
                placeholder={image.placeholder}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
  ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className="bg-accent relative size-full rounded-lg border"
    >
      <img
        alt={alt}
        src={imgSrc}
        className={cn(
          "size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out",
          {
            "opacity-100": isInView && !isLoading,
          },
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
      />
    </AspectRatio>
  );
}
