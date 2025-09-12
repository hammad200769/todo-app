import { TweetPosition, WatermarkPosition } from '@/types/types';
import { dmSans, inter, poppins } from '@/utils/constants';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface TweetCanvasProps {
  stylings?: {
    maxWidth?: string;
    backgroundColor?: string;
    gradientColor?: string;
    gradientDirection?: string;
    paddingX?: number;
    paddingY?: number;
    borderRadius?: string;
    bgImage?: string | null;
    size?: {
      width: string | number;
      height: string | number;
      aspectRatio?: string | number;
      paddingX?: number;
      paddingY?: number;
    };
    border?: string;
  };
  children: React.ReactNode;
  scale?: number;
  tweetWidth?: number;
  divRef?: React.RefObject<HTMLDivElement>;
  tilt?: { x: number; y: number };
  isDragging?: React.MutableRefObject<boolean>;
  position?: TweetPosition;
  shadow: number;
  rounded: number;
  tweetBg: string;
  showWaterMark?: boolean;
  watermarkText?: string;
  watermarkPosition?: WatermarkPosition;
  watermarkColor?: string;
  fontStyle: string;
}

function TweetCanvas({
  stylings,
  children,
  scale = 100,
  tweetWidth = 82,
  divRef,
  tilt,
  isDragging,
  position = 'middle-center',
  shadow,
  rounded,
  tweetBg,
  showWaterMark,
  watermarkText,
  watermarkPosition = 'bottom-right',
  watermarkColor,
  fontStyle,
}: TweetCanvasProps) {
  const { width, height, aspectRatio } = stylings?.size || {};
  const backgroundColor = stylings?.backgroundColor;
  const x = tilt?.x ?? 0;
  const y = tilt?.y ?? 0;

  // Alternative: If you prefer CSS custom properties approach
  function getFontStyle(fontStyle: string): React.CSSProperties {
    const fontMap: Record<string, React.CSSProperties> = {
      Inter: { fontFamily: inter.style.fontFamily },
      Poppins: { fontFamily: poppins.style.fontFamily },
      Pop: { fontFamily: poppins.style.fontFamily },
      'DM Sans': { fontFamily: dmSans.style.fontFamily },

      'Work Sans': {
        fontFamily:
          '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
    };

    return fontMap[fontStyle] || { fontFamily: inter.style.fontFamily };
  }

  function getLinearGradientDirection(direction?: string): string {
    if (!direction) return '135deg';

    const directionMap = {
      'to-b': '180deg',
      'to-t': '0deg',
      'to-r': '90deg',
      'to-l': '270deg',
      'to-br': '135deg',
      'to-bl': '225deg',
      'to-tr': '45deg',
      'to-tl': '315deg',
    };

    return directionMap[direction as keyof typeof directionMap] || direction;
  }

  // Rest of your existing code remains the same...
  const isAutoWidth = width === 'auto';
  const isAutoHeight = height === 'auto';

  function getSafePadding() {
    const basePadding = 32;
    const basePaddingX =
      stylings?.paddingX ?? stylings?.size?.paddingX ?? basePadding;
    const basePaddingY =
      stylings?.paddingY ?? stylings?.size?.paddingY ?? basePadding;

    if (isAutoWidth && isAutoHeight) {
      return {
        x: Math.min(basePaddingX as number, 100),
        y: Math.min(basePaddingY as number, 100),
      };
    }

    const numericWidth =
      typeof width === 'number' ? width : parseInt(width as string) || 800;
    const numericHeight =
      typeof height === 'number' ? height : parseInt(height as string) || 600;

    const maxSafePaddingX = numericWidth * 0.25;
    const maxSafePaddingY = numericHeight * 0.25;

    return {
      x: Math.min(basePaddingX as number, maxSafePaddingX),
      y: Math.min(basePaddingY as number, maxSafePaddingY),
    };
  }

  const safePadding = getSafePadding();

  function getShadowStyle(shadowValue: number) {
    const clampedShadow = Math.max(0, Math.min(10, shadowValue));

    if (clampedShadow === 0) {
      return 'none';
    }

    const baseBlur = clampedShadow * 2;
    const baseOffset = Math.floor(clampedShadow / 2);
    const opacity = 0.1 + clampedShadow * 0.02;

    if (clampedShadow <= 3) {
      return `0px ${baseOffset}px ${baseBlur}px rgba(0, 0, 0, ${opacity})`;
    } else if (clampedShadow <= 6) {
      return `
        0px ${baseOffset}px ${baseBlur}px rgba(0, 0, 0, ${opacity}),
        0px ${Math.floor(baseOffset / 2)}px ${Math.floor(
        baseBlur / 2
      )}px rgba(0, 0, 0, ${opacity * 0.5})
      `
        .replace(/\s+/g, ' ')
        .trim();
    } else {
      return `
        0px ${baseOffset}px ${baseBlur}px rgba(0, 0, 0, ${opacity}),
        0px ${Math.floor(baseOffset / 2)}px ${Math.floor(
        baseBlur / 2
      )}px rgba(0, 0, 0, ${opacity * 0.6}),
        0px ${baseOffset * 2}px ${baseBlur * 2}px rgba(0, 0, 0, ${
        opacity * 0.3
      })
      `
        .replace(/\s+/g, ' ')
        .trim();
    }
  }

  function getBorderRadius(roundedValue: number) {
    const clampedRounded = Math.max(0, Math.min(10, roundedValue));
    if (clampedRounded === 0) return '0px';
    const maxRadius = 24;
    const radiusPx = (clampedRounded / 10) * maxRadius;
    return `${radiusPx}px`;
  }

  // Calculate the tweet container dimensions
  const tweetContainerStyle = useMemo(() => {
    const scaleValue = scale / 100;
    const baseTweetWidth = 800;
    const scaledBaseTweetWidth = Math.round(baseTweetWidth * scaleValue);
    const finalTweetWidth = Math.round(
      scaledBaseTweetWidth * (tweetWidth / 100)
    );

    const userShadow = getShadowStyle(shadow);
    let combinedShadow = 'none';

    if (shadow > 0) {
      const tiltShadow = `${-y}px ${x}px 20px rgba(0,0,0,0.3)`;
      combinedShadow =
        userShadow === 'none' ? tiltShadow : `${tiltShadow}, ${userShadow}`;
    }

    const borderRadius = getBorderRadius(rounded);

    return {
      width: `${finalTweetWidth}px`,
      transform: `perspective(600px) rotateX(${-x}deg) rotateY(${-y}deg)`,
      boxShadow: combinedShadow,
      background: tweetBg,
      borderRadius: borderRadius,
      // Use the CSS style approach for fonts
      ...getFontStyle(fontStyle),
      transition: isDragging?.current
        ? 'none'
        : 'width 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease, font-family 0.3s ease',
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
      minWidth: '400px',
      flexShrink: 0,
    } as React.CSSProperties;
  }, [
    scale,
    tweetWidth,
    shadow,
    rounded,
    x,
    y,
    tweetBg,
    isDragging,
    fontStyle,
  ]);

  // Rest of your component logic...
  function getWatermarkStyles(position: WatermarkPosition) {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0.5,
      fontSize: '14px',
      fontWeight: 'bold',
      color: watermarkColor ? watermarkColor : 'rgb(107, 114, 128)',
      zIndex: 10,
    };

    const spacing = '8px';

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: spacing, left: spacing };
      case 'top-center':
        return {
          ...baseStyles,
          top: spacing,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'top-right':
        return { ...baseStyles, top: spacing, right: spacing };
      case 'middle-left':
        return {
          ...baseStyles,
          top: '50%',
          left: spacing,
          transform: 'translateY(-50%)',
        };
      case 'middle-center':
        return {
          ...baseStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      case 'middle-right':
        return {
          ...baseStyles,
          top: '50%',
          right: spacing,
          transform: 'translateY(-50%)',
        };
      case 'bottom-left':
        return { ...baseStyles, bottom: spacing, left: spacing };
      case 'bottom-center':
        return {
          ...baseStyles,
          bottom: spacing,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom-right':
      default:
        return { ...baseStyles, bottom: spacing, right: spacing };
    }
  }

  const canvasContainerStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      transition: 'all 0.3s ease-in-out',
      position: 'relative',
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
      backgroundColor: backgroundColor?.length !== 0 ? backgroundColor : '',
      boxSizing: 'border-box',
      backgroundImage: stylings?.bgImage ? `url(${stylings.bgImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };

    if (isAutoWidth && isAutoHeight) {
      return {
        ...baseStyle,
        width: '100%',
        maxWidth: 'fit-content',
        minWidth: `${800 + safePadding.x * 2}px`,
        height: `auto`,
        minHeight: `auto`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      };
    } else if (isAutoWidth) {
      const numericHeight =
        typeof height === 'number' ? height : parseInt(height as string) || 600;
      return {
        ...baseStyle,
        width: '100%',
        maxWidth: '1200px',
        minWidth: `${800 + safePadding.x * 2}px`,
        height: `${numericHeight}px`,
        minHeight: `${Math.max(500, numericHeight)}px`,
      };
    } else if (isAutoHeight) {
      const numericWidth =
        typeof width === 'number' ? width : parseInt(width as string) || 800;
      return {
        ...baseStyle,
        width: `${numericWidth}px`,
        maxWidth: '100%',
        height: 'auto',
        minHeight: `${500 + safePadding.y * 2}px`,
      };
    } else {
      const numericWidth =
        typeof width === 'number' ? width : parseInt(width as string) || 800;
      const numericHeight =
        typeof height === 'number' ? height : parseInt(height as string) || 600;
      return {
        ...baseStyle,
        width: `${numericWidth}px`,
        height: `${numericHeight}px`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        maxWidth: 'none',
        maxHeight: 'none',
        overflow: 'hidden',
      };
    }
  }, [
    backgroundColor,
    stylings?.bgImage,
    isAutoWidth,
    isAutoHeight,
    safePadding.x,
    safePadding.y,
    aspectRatio,
    height,
    width,
  ]);

  function getAlignmentClasses(position: TweetPosition) {
    const alignmentMap = {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'middle-left': 'items-center justify-start',
      'middle-center': 'items-center justify-center',
      'middle-right': 'items-center justify-end',
      'bottom-left': 'items-end justify-start',
      'bottom-center': 'items-end justify-center',
      'bottom-right': 'items-end justify-end',
    };
    return alignmentMap[position];
  }

  function getPaddingStyle() {
    const paddingStyle: React.CSSProperties = {
      paddingTop: safePadding.y,
      paddingBottom: safePadding.y,
      paddingLeft: safePadding.x,
      paddingRight: safePadding.x,
    };

    switch (position) {
      case 'top-left':
        paddingStyle.paddingBottom = safePadding.y;
        paddingStyle.paddingRight = safePadding.x;
        paddingStyle.paddingTop = Math.min(safePadding.y * 0.5, 16);
        paddingStyle.paddingLeft = Math.min(safePadding.x * 0.5, 16);
        break;
      case 'top-center':
        paddingStyle.paddingBottom = safePadding.y;
        paddingStyle.paddingTop = Math.min(safePadding.y * 0.5, 16);
        paddingStyle.paddingLeft = safePadding.x;
        paddingStyle.paddingRight = safePadding.x;
        break;
      case 'top-right':
        paddingStyle.paddingBottom = safePadding.y;
        paddingStyle.paddingLeft = safePadding.x;
        paddingStyle.paddingTop = Math.min(safePadding.y * 0.5, 16);
        paddingStyle.paddingRight = Math.min(safePadding.x * 0.5, 16);
        break;
      case 'middle-left':
        paddingStyle.paddingTop = safePadding.y;
        paddingStyle.paddingBottom = safePadding.y;
        paddingStyle.paddingLeft = Math.min(safePadding.x * 0.5, 16);
        paddingStyle.paddingRight = safePadding.x;
        break;
      case 'middle-center':
        break;
      case 'middle-right':
        paddingStyle.paddingTop = safePadding.y;
        paddingStyle.paddingBottom = safePadding.y;
        paddingStyle.paddingLeft = safePadding.x;
        paddingStyle.paddingRight = Math.min(safePadding.x * 0.5, 16);
        break;
      case 'bottom-left':
        paddingStyle.paddingTop = safePadding.y;
        paddingStyle.paddingRight = safePadding.x;
        paddingStyle.paddingBottom = Math.min(safePadding.y * 0.5, 16);
        paddingStyle.paddingLeft = Math.min(safePadding.x * 0.5, 16);
        break;
      case 'bottom-center':
        paddingStyle.paddingTop = safePadding.y;
        paddingStyle.paddingLeft = safePadding.x;
        paddingStyle.paddingRight = safePadding.x;
        paddingStyle.paddingBottom = Math.min(safePadding.y * 0.5, 16);
        break;
      case 'bottom-right':
        paddingStyle.paddingTop = safePadding.y;
        paddingStyle.paddingLeft = safePadding.x;
        paddingStyle.paddingBottom = Math.min(safePadding.y * 0.5, 16);
        paddingStyle.paddingRight = Math.min(safePadding.x * 0.5, 16);
        break;
    }

    return paddingStyle;
  }

  const outerContainerStyle = useMemo(() => {
    if (!isAutoWidth && !isAutoHeight) {
      return {
        width: 'fit-content',
        maxWidth: 'none',
        margin: '0 auto',
      };
    }
    return {};
  }, [isAutoWidth, isAutoHeight]);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        canvasSize: { width, height },
        scale: scale / 100,
        ...child.props,
      });
    }
    return child;
  });

  function getBackgroundStyle() {
    if (stylings?.gradientColor && backgroundColor) {
      const direction = stylings?.gradientDirection;

      if (direction === 'radial') {
        return {
          backgroundImage: `radial-gradient(circle, ${backgroundColor}, ${stylings.gradientColor})`,
        };
      } else {
        const linearDirection = getLinearGradientDirection(direction);
        return {
          backgroundImage: `linear-gradient(${linearDirection}, ${backgroundColor}, ${stylings.gradientColor})`,
        };
      }
    }
    return {};
  }

  return (
    <div className='w-full flex justify-center overflow-auto min-h-[100vh] pt-10 mt-5'>
      <div className='w-full max-w-7xl' style={outerContainerStyle}>
        <div
          ref={divRef}
          className={clsx(
            'canvas mx-auto overflow-hidden duration-300 flex origin-top relative',
            backgroundColor === 'transparent'
              ? ''
              : 'border border-gray-200 dark:border-gray-700 shadow-lg',
            backgroundColor?.length === 0 ? 'bg-white dark:bg-gray-900' : '',
            getAlignmentClasses(position)
          )}
          style={{
            ...canvasContainerStyle,
            ...getBackgroundStyle(),
          }}
          data-screenshot-target='true'
        >
          <div
            className={`w-full h-full flex ${getAlignmentClasses(position)}`}
            style={{
              minHeight: isAutoHeight ? 'auto' : `${500 + safePadding.y * 2}px`,
              ...getPaddingStyle(),
              boxSizing: 'border-box',
            }}
          >
            <div
              className='overflow-hidden shadow-sm border'
              style={tweetContainerStyle}
              data-tweet-container='true'
            >
              {childrenWithProps}
            </div>
          </div>
          {showWaterMark && (
            <div
              className='dark:text-gray-400'
              style={getWatermarkStyles(watermarkPosition)}
            >
              {watermarkText || 'X Post Screenshot'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TweetCanvas;
