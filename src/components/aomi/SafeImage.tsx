import { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** shown when the image fails to load */
  fallbackClassName?: string;
};

/**
 * Image with a graceful degradation path: if the asset 404s in production the
 * layout keeps its box and renders a soft washi-toned placeholder instead of
 * a broken-image icon.
 */
export function SafeImage({ src, alt, className, fallbackClassName, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={
          fallbackClassName ??
          `${className ?? ""} aspect-[4/3] rounded-full bg-gradient-to-b from-secondary to-background opacity-60`
        }
      />
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />
  );
}
