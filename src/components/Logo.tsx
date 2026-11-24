import Image from "next/image";

type LogoProps = {
  /** Rendered edge length in px. */
  size?: number;
  className?: string;
};

/** The site avatar as a circle; decorative, so the surrounding link carries the name. */
export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}
