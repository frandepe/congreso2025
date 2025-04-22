"use client";

import Zoom from "react-medium-image-zoom";
import { cn } from "@/lib/utils";

function getImageSrc(src: any["src"]): string {
  if (typeof src === "string") return src;
  if ("default" in src) return src.default.src;
  return src.src;
}

export function ImageZoom({
  zoomInProps,
  zoomProps,
  className,
  children,
  ...props
}: any) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Zoom
        classDialog={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
        classOverlay={cn(
          "absolute inset-0 transition-colors bg-background/80",
          "cursor-zoom-out"
        )}
        closeText="Close"
        zoomMargin={20}
        wrapElement="span"
        {...zoomProps}
        zoomImg={{
          src: getImageSrc(props.src),
          sizes: undefined,
          className: cn(
            "image-rendering-high-quality cursor-zoom-out",
            zoomInProps?.className
          ),
          ...zoomInProps,
        }}
      >
        {children ?? (
          <img
            className={cn(
              "cursor-zoom-in rounded-md transition-all",
              className
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            {...props}
          />
        )}
      </Zoom>
    </div>
  );
}
