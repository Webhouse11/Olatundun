import React, { useState, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 600'%3E%3Crect fill='%23f1f5f9' width='800' height='600'/%3E%3Ctext fill='%23cbd5e1' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EImage Not Found%3C/text%3E%3C/svg%3E", 
  className,
  loading = "lazy",
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  // Update imgSrc if src prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (!src) return null;

  const isExternal = src.startsWith('http');

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy={isExternal ? "no-referrer" : undefined}
    />
  );
}
