/* eslint-disable @next/next/no-img-element */
import type { Album } from "@/lib/spotify";

/**
 * Square album cover: uses the project image over a distinctive gradient,
 * falling back to a CSS-only typographic cover when no image exists.
 */
export function Cover({
  album,
  className = "",
  rounded = "rounded-md",
}: {
  album: Album;
  className?: string;
  rounded?: string;
}) {
  const img = album.post.imageUrl;
  const padding =
    album.post.imagePadding === "none" ? "p-0" : album.post.imagePadding === "tight" ? "p-[4%]" : "p-[12%]";
  return (
    <div
      className={`relative aspect-square overflow-hidden ${rounded} ${className}`}
      style={{ background: album.cover.gradient }}
    >
      {img ? (
        <img
          src={img}
          alt={album.title}
          className={`absolute inset-0 h-full w-full ${
            album.post.imageFit === "contain" ? `object-contain ${padding}` : "object-cover"
          }`}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-[8%]">
          <span className="font-black leading-none text-white [font-size:clamp(0.8rem,18cqw,2.2rem)]">
            {album.cover.label}
          </span>
        </div>
      )}
    </div>
  );
}
