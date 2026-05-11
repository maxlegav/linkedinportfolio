import Image from "next/image";

type ProfileAvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export function ProfileAvatar({
  src,
  alt = "",
  initials,
  size,
  className = "",
  priority,
  unoptimized,
}: ProfileAvatarProps) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dce6f1] text-[13px] font-semibold text-[var(--li-blue-hover)] ${className}`}
      style={{ width: size, height: size, aspectRatio: "1 / 1" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="scale-[1.08] object-cover object-center"
          priority={priority}
          unoptimized={unoptimized}
        />
      ) : (
        initials
      )}
    </div>
  );
}
