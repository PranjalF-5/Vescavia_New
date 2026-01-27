import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

/**
 * OptimizedImage component with WebP support and fallback
 * Automatically uses WebP version if available, falls back to original format
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
}) => {
  // Generate WebP path from original image path
  const getWebPPath = (imagePath: string): string => {
    const lastDot = imagePath.lastIndexOf('.');
    if (lastDot === -1) return imagePath;
    return imagePath.substring(0, lastDot) + '.webp';
  };

  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {/* WebP version for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
};

export default OptimizedImage;
