'use client';

import { useTheme } from '@/hooks/hooks';
import { usePreset } from '@/hooks/swr';
import {
  TweetPosition,
  TweetPreset,
  TweetScreenShotData,
  TwitterScreenShotApiResponse,
  WatermarkPosition,
} from '@/types/types';
import { defaultColors } from '@/utils/constants';
import { findBestTwitterVideoUrl } from '@/utils/utils';
import { toJpeg, toPng } from 'html-to-image';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import PostEditor from './PostEditor';
import TweetBlock from './TweetBlock';
import TweetCanvas from './TweetCanvas';

function UrlForm() {
  const [url, setUrl] = useState('');
  const [apiData, setApiData] = useState<TweetScreenShotData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme: systemTheme } = useTheme();
  const [theme, setTheme] = useState<'dark' | 'light' | string>(systemTheme);
  const [bgImage, setBgImage] = useState<File | null>(null);

  // Sidebar state
  const [exportFormat, setExportFormat] = useState('png');
  const [colorMode, setColorMode] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState(
    () => defaultColors[theme].backgroundColor
  );
  const [gradientColor, setGradientColor] = useState('');
  const [font, setFont] = useState('Inter');
  const [logoStyle, setLogoStyle] = useState('X');
  const [type, setType] = useState('canvas');
  const [canvasHeight, setCanvasHeight] = useState<string>('auto');
  const [canvasWidth, setCanvasWidth] = useState<string>('auto');
  const [tweetWidth, setTweetWidth] = useState<number>(82);
  const [scale, setScale] = useState<number>(100);
  const divRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef();
  const isDragging = useRef(false);
  const [handlePos, setHandlePos] = useState({ x: 0, y: 0 });
  const [tweetPosition, setTweetPosition] =
    useState<TweetPosition>('middle-center');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [canvasAspectRatio, setCanvasAspectRatio] = useState<string>('auto');
  const [showRetweet, setShowRetweet] = useState<boolean>(false);
  const [showLike, setShowLike] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(true);
  const [showViewCount, setShowViewCount] = useState<boolean>(true);
  const [showDate, setShowDate] = useState<boolean>(true);
  const [showVerifiedBadge, setShowVerifiedBadge] = useState<boolean>(true);
  const [paddingX, setPaddingX] = useState<number>(32);
  const [paddingY, setPaddingY] = useState<number>(32);
  const [shadow, setShadow] = useState<number>(1);
  const [rounded, setRounded] = useState<number>(6);
  const [gradientDirection, setGradientDirection] = useState<string>('135deg');
  const [linkColor, setLinkColor] = useState<string>('blue');
  const [screenShotQuality, setScreenShotQuality] = useState<string>('1');
  const [tweetBg, setTweetBg] = useState<string>(
    () => defaultColors[theme].tweetBg
  );
  const [fontSize, setFontSize] = useState<number>(16);
  const [primaryColor, setPrimaryColor] = useState<string>(
    () => defaultColors[theme].primaryColor
  );
  const [secondaryColor, setSecondaryColor] = useState<string>(
    () => defaultColors[theme].secondaryColor
  );
  const [showWaterMark, setShowWaterMark] = useState<boolean>(false);
  const [watermarkText, setWatermarkText] = useState<string>('X Screenshot');

  const [watermarkColor, setWatermarkColor] = useState<string>();
  const [watermarkPosition, setWatermarkPosition] =
    useState<WatermarkPosition>('bottom-right');
  const [showMedia, setShowMedia] = useState<boolean>(true);
  const [editorType, setEditorType] = useState<string>('editor');
  const [presetName, setPresetName] = useState<string>('');
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: presets } = usePreset();
  const { mutate } = useSWRConfig();
  function isValidXUrl(url: string) {
    const twitterXRegex = /^https:\/\/x\.com\/[A-Za-z0-9_]{1,15}\/status\/\d+$/;
    return twitterXRegex.test(url);
  }
  async function handleClick() {
    setIsLoading(true);
    setApiData(null);
    setLink('');
    if (!isValidXUrl(url)) {
      toast.error('Please enter a valid X (Twitter) URL.');
      setIsLoading(false);
      return;
    }
    const res = await fetch(`/api/x-screenshot?url=${url}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      toast.error('Failed to fetch tweet data. Please check the URL.');
      setIsLoading(false);
      return;
    }
    const data: TwitterScreenShotApiResponse = await res.json();

    setDescription(data.tweetData.description);

    if (data && data?.tweetData.videoUrls) {
      const bestLink = findBestTwitterVideoUrl(data?.tweetData.videoUrls);
      setLink(bestLink?.url as string);
    }
    setApiData(data.tweetData);
    setIsLoading(false);
  }

  function handleExport() {
    alert(`Exporting as ${exportFormat} with current settings...`);
  }

  async function toWebP(element: HTMLElement, options: any): Promise<string> {
    try {
      // Step 1: Capture the HTML element as PNG using html-to-image
      const pngDataUrl = await toPng(element, options);

      // Step 2: Convert data URL to blob
      const response = await fetch(pngDataUrl);
      const blob = await response.blob();

      // Step 3: Create ImageBitmap from blob
      const imageBitmap = await createImageBitmap(blob);

      // Step 4: Use OffscreenCanvas for better performance (fallback to regular canvas)
      let canvas: OffscreenCanvas | HTMLCanvasElement;
      let ctx:
        | OffscreenCanvasRenderingContext2D
        | CanvasRenderingContext2D
        | null;

      if (typeof OffscreenCanvas !== 'undefined') {
        // Use OffscreenCanvas for better performance
        canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        ctx = canvas.getContext('2d');
      } else {
        // Fallback to regular canvas
        canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        ctx = canvas.getContext('2d');
      }

      if (!ctx) {
        throw new Error('Failed to get 2D rendering context');
      }

      // Step 5: Draw the ImageBitmap onto the canvas
      ctx.drawImage(imageBitmap, 0, 0);

      // Step 6: Convert to WebP blob using convertToBlob
      let webpBlob: Blob;

      if (canvas instanceof OffscreenCanvas) {
        // Use OffscreenCanvas convertToBlob method
        webpBlob = await canvas.convertToBlob({
          type: 'image/webp',
          quality: 0.9,
        });
      } else {
        // Fallback: Use regular canvas toBlob method
        webpBlob = await new Promise<Blob>((resolve, reject) => {
          (canvas as HTMLCanvasElement).toBlob(
            blob => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert canvas to blob'));
              }
            },
            'image/webp',
            0.9
          );
        });
      }

      // Step 7: Convert blob to data URL
      const webpDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(webpBlob);
      });

      // Clean up
      imageBitmap.close();

      return webpDataUrl;
    } catch (error) {
      console.error('WebP conversion failed:', error);

      // Fallback to PNG if WebP conversion fails
      console.warn('Falling back to PNG format');
      return await toPng(element, options);
    }
  }

  async function downloadImage(format: string) {
    if (!divRef.current) return;

    try {
      const videoElement = divRef.current.querySelector('video');
      let originalVideo = null;
      let replacementImg: any = null;

      // Only do video handling if video exists
      if (videoElement) {
        const posterUrl = videoElement.getAttribute('poster');

        if (posterUrl) {
          replacementImg = document.createElement('img');
          replacementImg.src = posterUrl;

          // Get computed styles from the video element
          const videoStyles = window.getComputedStyle(videoElement);

          // Copy all relevant styles
          replacementImg.style.cssText = videoStyles.cssText;
          replacementImg.style.width = `${videoElement.offsetWidth}px`;
          replacementImg.style.height = `${videoElement.offsetHeight}px`;
          replacementImg.style.objectFit = 'cover';
          replacementImg.style.borderRadius = videoStyles.borderRadius;
          replacementImg.style.position = videoStyles.position;
          replacementImg.style.display = videoStyles.display;
          replacementImg.style.transform = videoStyles.transform;
          replacementImg.style.transformOrigin = videoStyles.transformOrigin;
          replacementImg.style.backfaceVisibility =
            videoStyles.backfaceVisibility;

          originalVideo = videoElement;
          setIsPlaying(false);

          // Wait for the image to load before replacing
          await new Promise((resolve, reject) => {
            replacementImg.onload = resolve;
            replacementImg.onerror = reject;
            setTimeout(() => reject(new Error('Image load timeout')), 10000);
          });

          videoElement.parentNode?.replaceChild(replacementImg, videoElement);

          // Wait for DOM updates after video replacement
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          // Video exists but no poster - pause it for screenshot
          setIsPlaying(false);
          if (videoElement.pause) {
            videoElement.pause();
          }
          // Shorter wait for simple pause
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      // No video present - ensure DOM is stable before taking screenshot
      else {
        // Small delay to ensure any pending DOM updates are complete
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Get the actual rendered dimensions of the canvas container
      const canvasRect = divRef.current.getBoundingClientRect();
      const actualWidth = Math.ceil(canvasRect.width);
      const actualHeight = Math.ceil(canvasRect.height);

      // Validate dimensions
      if (actualWidth <= 0 || actualHeight <= 0) {
        throw new Error(
          'Invalid canvas dimensions - element may be hidden or have zero size'
        );
      }

      // Create unique cache-busting key using current timestamp and apiData
      const cacheBustKey = `${Date.now()}-${Math.random()}`;

      const options = {
        quality: screenShotQuality === '1' ? 0.9 : 1,
        pixelRatio: screenShotQuality === '1' ? 1 : 2,
        filter: (node: any) => {
          if (node.classList?.contains('no-screenshot')) return false;
          return true;
        },
        backgroundColor: backgroundColor || 'transparent',
        skipAutoScale: false,
        // Use the actual rendered dimensions
        width: actualWidth,
        height: actualHeight,
        canvasWidth: actualWidth * 2,
        canvasHeight: actualHeight * 2,
        style: {
          margin: '0',
          padding: '0',
          transform: 'translateX(0) translateY(0)',
        },
        // Enhanced cache busting - this is crucial for preventing stale screenshots
        cacheBust: true,
        // Add unique identifier to force re-render
        includeQueryParams: true,
        // Force DOM re-evaluation
        // Add custom data attribute for cache busting
        onCloneDocument: (
          document: any,
          element: { setAttribute: (arg0: string, arg1: string) => void }
        ) => {
          element.setAttribute('data-screenshot-id', cacheBustKey);
          return document;
        },
      };

      let dataUrl: string;
      let fileExtension: string;

      // Force multiple reflows to ensure layout is completely stable
      divRef.current.offsetHeight;
      await new Promise(resolve => setTimeout(resolve, 50));
      divRef.current.offsetWidth;
      await new Promise(resolve => setTimeout(resolve, 50));

      // Clear any existing image caches in the browser
      const images = divRef.current.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        if (img.src && !img.src.startsWith('data:')) {
          // Force reload images by appending timestamp
          const separator = img.src.includes('?') ? '&' : '?';
          img.src = `${img.src}${separator}t=${cacheBustKey}`;
        }
      });

      // Wait for images to reload
      await Promise.all(
        Array.from(images).map((img: HTMLImageElement) => {
          return new Promise(resolve => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true); // Continue even if image fails
              setTimeout(() => resolve(true), 1000); // Timeout after 1s
            }
          });
        })
      );

      switch (format) {
        case 'png':
          dataUrl = await toPng(divRef.current, options);
          fileExtension = 'png';
          break;
        case 'jpeg':
          dataUrl = await toJpeg(divRef.current, options);
          fileExtension = 'jpg';
          break;
        case 'webp':
          dataUrl = await toWebP(divRef.current, options);
          fileExtension = 'webp';
          break;
        default:
          throw new Error('Unsupported export format');
      }

      // Validate data URL
      if (!dataUrl || !dataUrl.startsWith('data:image/')) {
        throw new Error('Invalid image data generated');
      }

      // Create download link
      const link = document.createElement('a');
      link.download = `tweet-screenshot-${Date.now()}.${fileExtension}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore original video if it was replaced
      if (originalVideo && replacementImg && replacementImg.parentNode) {
        replacementImg.parentNode.replaceChild(originalVideo, replacementImg);
        setIsPlaying(true);
      } else if (videoElement && !replacementImg) {
        // Resume video that was paused but not replaced
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Export failed:', err);
      if (err instanceof Error) {
        if (err.message.includes('Image load timeout')) {
          alert(
            `Failed to load video poster image. Please try again or check if the video has a valid poster.`
          );
        } else if (err.message.includes('Invalid canvas dimensions')) {
          alert(
            `Cannot capture screenshot - the element appears to be hidden or has invalid dimensions.`
          );
        } else {
          alert(
            `Failed to capture screenshot as ${format.toUpperCase()}: ${
              err.message
            }`
          );
        }
      } else {
        alert(
          `Failed to capture screenshot as ${format.toUpperCase()}. Please try again.`
        );
      }
    }
  }

  async function copyImage() {
    // Prevent multiple simultaneous executions
    if (isCopying) {
      return;
    }

    if (!divRef.current) return;

    setIsCopying(true);

    try {
      const videoElement = divRef.current.querySelector('video');
      let originalVideo = null;
      let replacementImg: any = null;

      // Only do video handling if video exists
      if (videoElement) {
        const posterUrl = videoElement.getAttribute('poster');

        if (posterUrl) {
          replacementImg = document.createElement('img');
          replacementImg.src = posterUrl;

          // Get computed styles from the video element
          const videoStyles = window.getComputedStyle(videoElement);

          // Copy all relevant styles
          replacementImg.style.cssText = videoStyles.cssText;
          replacementImg.style.width = `${videoElement.offsetWidth}px`;
          replacementImg.style.height = `${videoElement.offsetHeight}px`;
          replacementImg.style.objectFit = 'cover';
          replacementImg.style.borderRadius = videoStyles.borderRadius;
          replacementImg.style.position = videoStyles.position;
          replacementImg.style.display = videoStyles.display;
          replacementImg.style.transform = videoStyles.transform;
          replacementImg.style.transformOrigin = videoStyles.transformOrigin;
          replacementImg.style.backfaceVisibility =
            videoStyles.backfaceVisibility;

          originalVideo = videoElement;
          setIsPlaying(false);

          // Wait for the image to load before replacing
          await new Promise((resolve, reject) => {
            replacementImg.onload = resolve;
            replacementImg.onerror = reject;
            setTimeout(() => reject(new Error('Image load timeout')), 10000);
          });

          videoElement.parentNode?.replaceChild(replacementImg, videoElement);

          // Wait for DOM updates after video replacement
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          // Video exists but no poster - pause it for screenshot
          setIsPlaying(false);
          if (videoElement.pause) {
            videoElement.pause();
          }
          // Shorter wait for simple pause
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      // No video present - ensure DOM is stable before taking screenshot
      else {
        // Small delay to ensure any pending DOM updates are complete
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Get the actual rendered dimensions of the canvas container
      const canvasRect = divRef.current.getBoundingClientRect();
      const actualWidth = Math.ceil(canvasRect.width);
      const actualHeight = Math.ceil(canvasRect.height);

      // Validate dimensions
      if (actualWidth <= 0 || actualHeight <= 0) {
        throw new Error(
          'Invalid canvas dimensions - element may be hidden or have zero size'
        );
      }

      // Create unique cache-busting key using current timestamp and apiData
      const cacheBustKey = `${Date.now()}-${Math.random()}`;

      const options = {
        quality: screenShotQuality === '1' ? 0.9 : 1,
        pixelRatio: 2,
        filter: (node: any) => {
          if (node.classList?.contains('no-screenshot')) return false;
          return true;
        },
        backgroundColor: backgroundColor || 'transparent',
        skipAutoScale: false,
        // Use the actual rendered dimensions
        width: actualWidth,
        height: actualHeight,
        canvasWidth: actualWidth * 2,
        canvasHeight: actualHeight * 2,
        style: {
          margin: '0',
          padding: '0',
          transform: 'translateX(0) translateY(0)',
        },
        // Enhanced cache busting - this is crucial for preventing stale screenshots
        cacheBust: true,
        // Add unique identifier to force re-render
        includeQueryParams: true,
        // Force DOM re-evaluation
        // Add custom data attribute for cache busting
        onCloneDocument: (
          document: any,
          element: { setAttribute: (arg0: string, arg1: string) => void }
        ) => {
          element.setAttribute('data-screenshot-id', cacheBustKey);
          return document;
        },
      };

      // Force multiple reflows to ensure layout is completely stable
      divRef.current.offsetHeight;
      await new Promise(resolve => setTimeout(resolve, 50));
      divRef.current.offsetWidth;
      await new Promise(resolve => setTimeout(resolve, 50));

      // Clear any existing image caches in the browser
      const images = divRef.current.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        if (img.src && !img.src.startsWith('data:')) {
          // Force reload images by appending timestamp
          const separator = img.src.includes('?') ? '&' : '?';
          img.src = `${img.src}${separator}t=${cacheBustKey}`;
        }
      });

      // Wait for images to reload
      await Promise.all(
        Array.from(images).map((img: HTMLImageElement) => {
          return new Promise(resolve => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true); // Continue even if image fails
              setTimeout(() => resolve(true), 1000); // Timeout after 1s
            }
          });
        })
      );

      const dataUrl = await toPng(divRef.current, options);
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      // Validate data URL
      if (!dataUrl || !dataUrl.startsWith('data:image/')) {
        throw new Error('Invalid image data generated');
      }

      // Show success toast
      toast.success('copied to clipboard!');

      if (originalVideo && replacementImg && replacementImg.parentNode) {
        replacementImg.parentNode.replaceChild(originalVideo, replacementImg);
        setIsPlaying(true);
      } else if (videoElement && !replacementImg) {
        // Resume video that was paused but not replaced
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Export failed:', err);
      if (err instanceof Error) {
        if (err.message.includes('Image load timeout')) {
          alert(
            `Failed to load video poster image. Please try again or check if the video has a valid poster.`
          );
        } else if (err.message.includes('Invalid canvas dimensions')) {
          alert(
            `Cannot capture screenshot - the element appears to be hidden or has invalid dimensions.`
          );
        } else {
          alert(`Failed to capture screenshot as ${err.message}`);
        }
      } else {
        alert(`Failed to capture screenshot. Please try again.`);
      }
    } finally {
      setIsCopying(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setBgImage(file);

      //we need to convert the file to a base64 string for screenshot
      const reader = new FileReader();
      reader.onload = event => {
        const base64String = event.target?.result as string;
        setBgImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveImage() {
    if (bgImageUrl) {
      URL.revokeObjectURL(bgImageUrl);
    }
    setBgImage(null);
    setBgImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
  async function addPreset() {
    const options = {
      canvasBg: backgroundColor,
      gradientColor,
      fontStyle: font,
      logoStyle,
      fontSize,
      canvasHeight: canvasHeight.toString(),
      canvasWidth: canvasWidth.toString(),
      tweetWidth,
      scale,
      tweetPosition,
      tilt,
      canvasAspectRatio,
      showRetweet,
      showLike,
      showComments,
      showMedia,
      showWatermark: showWaterMark,
      watermarkText,
      watermarkPosition,
      watermarkColor: watermarkColor || '', // fallback in case it's undefined
      showDate,
      showTime,
      showViewCount,
      showVerifiedBadge: showVerifiedBadge,
      paddingX,
      paddingY,
      shadow,
      roundedness: rounded,
      gradientDirection,
      tweetBackgroundColor: tweetBg,
      secondaryColor,
      primaryColor,
      linkColor,
      screenShotQuality,
    };

    try {
      const response = await fetch('/api/x-screenshot/presets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options,
          presetName,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error.message || 'Failed to add preset');
      }
      if (response.status === 200) {
        mutate('/api/x-screenshot/presets');
        toast.success(data.message || 'Preset Added Successfully!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePreset(presetId: number) {
    try {
      const response = await fetch(
        `/api/x-screenshot/presets/?presetId=${presetId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        mutate('/api/x-screenshot/presets');
        toast.success(data.message || 'Preset deleted successfully!');
      } else {
        console.error('Failed to delete preset:', response.statusText);
      }
    } catch (err) {
      console.error('Error deleting preset:', err);
    }
  }

  function usingPreset(options: TweetPreset['options']) {
    const newBackgroundColor = options.canvasBg || backgroundColor;

    setBackgroundColor(newBackgroundColor);

    const newGradientColor = options.gradientColor || 'transparent';

    setGradientColor(newGradientColor);

    const newScreenShotQuality = options.screenShotQuality;
    setScreenShotQuality(newScreenShotQuality);

    const newFont = options.fontStyle || font;
    setFont(newFont);

    const newLogoStyle = options.logoStyle || logoStyle;
    setLogoStyle(newLogoStyle);

    const newLinkColor = options.linkColor;
    setLinkColor(newLinkColor);

    const newFontSize = options.fontSize || fontSize;
    setFontSize(newFontSize);

    const newCanvasHeight = options.canvasHeight || canvasHeight;

    setCanvasHeight(String(newCanvasHeight));

    const newCanvasWidth = options.canvasWidth || canvasWidth;
    setCanvasWidth(String(newCanvasWidth));

    const newTweetWidth = options.tweetWidth || tweetWidth;
    setTweetWidth(newTweetWidth);

    const newScale = options.scale || scale;
    setScale(newScale);

    const newTweetPosition = options.tweetPosition || tweetPosition;

    setTweetPosition(newTweetPosition);

    const newTilt = options.tilt || tilt;

    setTilt(newTilt);

    const newCanvasAspectRatio = options.canvasAspectRatio || canvasAspectRatio;

    setCanvasAspectRatio(newCanvasAspectRatio);

    const newShowRetweet =
      options.showRetweet !== undefined ? options.showRetweet : showRetweet;
    setShowRetweet(newShowRetweet);

    const newShowLike =
      options.showLike !== undefined ? options.showLike : showLike;
    setShowLike(newShowLike);

    const newShowComments =
      options.showComments !== undefined ? options.showComments : showComments;

    setShowComments(newShowComments);

    const newShowMedia =
      options.showMedia !== undefined ? options.showMedia : showMedia;
    setShowMedia(newShowMedia);

    const newShowWaterMark =
      options.showWatermark !== undefined
        ? !!options.showWatermark
        : showWaterMark;

    setShowWaterMark(newShowWaterMark);

    const newWatermarkText = options.watermarkText || watermarkText || '';

    setWatermarkText(newWatermarkText);

    const newWatermarkPosition =
      options.watermarkPosition || watermarkPosition || 'bottom-right';

    setWatermarkPosition(newWatermarkPosition);

    const newWatermarkColor = options.watermarkColor || watermarkColor || '';

    setWatermarkColor(newWatermarkColor);

    const newShowDate =
      options.showDate !== undefined ? !!options.showDate : showDate;
    setShowDate(newShowDate);

    const newShowTime =
      options.showTime !== undefined ? !!options.showTime : showTime;
    setShowTime(newShowTime);

    const newShowViewCount =
      options.showViewCount !== undefined
        ? !!options.showViewCount
        : showViewCount;

    setShowViewCount(newShowViewCount);

    const newShowVerifiedBadge =
      options.showVerifiedBadge !== undefined
        ? !!options.showVerifiedBadge
        : showVerifiedBadge;

    setShowVerifiedBadge(newShowVerifiedBadge);

    const newPaddingX = options.paddingX || paddingX || 32;
    setPaddingX(newPaddingX);

    const newPaddingY = options.paddingY || paddingY || 32;
    setPaddingY(newPaddingY);

    const newShadow = options.shadow || shadow || 1;
    setShadow(newShadow);

    const newRounded = options.roundedness;
    setRounded(newRounded);

    const newGradientDirection =
      options.gradientDirection || gradientDirection || '135deg';

    setGradientDirection(newGradientDirection);

    const newTweetBg =
      options.tweetBackgroundColor || tweetBg || defaultColors[theme].tweetBg;
    setTweetBg(newTweetBg);

    const newSecondaryColor =
      options.secondaryColor ||
      secondaryColor ||
      defaultColors[theme].secondaryColor;

    setSecondaryColor(newSecondaryColor);

    const newPrimaryColor =
      options.primaryColor || primaryColor || defaultColors[theme].primaryColor;

    setPrimaryColor(newPrimaryColor);

    toast.success('Preset applied!');
  }

  function resetStylings() {
    setPaddingX(32);
    setPaddingY(32);
    setShadow(1);
    setRounded(6);
    setGradientDirection('135deg');
    setTweetBg(defaultColors[theme].tweetBg);
    setPrimaryColor(defaultColors[theme].primaryColor);
    setSecondaryColor(defaultColors[theme].secondaryColor);
    setBackgroundColor(defaultColors[theme].backgroundColor);
    setGradientColor('');
    setFont('Inter');
    setLogoStyle('X');
    setType('canvas');
    setCanvasHeight('auto');
    setCanvasWidth('auto');
    setTweetWidth(82);
    setScale(100);
    setTweetPosition('middle-center');
    setTilt({ x: 0, y: 0 });
    setCanvasAspectRatio('auto');
    setShowRetweet(false);
    setShowLike(false);
    setShowComments(false);
    setShowMedia(true);
    setShowWaterMark(false);
    setWatermarkText('X Post Screenshot');
    setWatermarkPosition('bottom-right');
    setWatermarkColor('');
    setShowDate(true);
    setShowTime(true);
    setShowViewCount(true);
    setShowVerifiedBadge(true);
    setLinkColor('blue');
    setScreenShotQuality('1');
    setPresetName('');
    setBgImage(null);
    setBgImageUrl(null);
    setEditorType('editor');
  }

  return (
    <div className='w-full mx-auto'>
      <div className='bg-white/10 max-w-5xl mx-auto dark:bg-white/5 p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 lg:mt-10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-lg'>
        <div className='flex flex-col gap-4 sm:gap-6 items-center justify-center'>
          <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-2 text-center justify-center w-full'>
            <input
              type='text'
              value={url}
              className='border border-gray-300 dark:border-gray-600 rounded p-2 sm:p-3 w-full sm:w-4/5 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800'
              placeholder='Enter tweet URL'
              onChange={e => setUrl(e.target.value)}
            />
            <button
              className='bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded w-full sm:w-1/5 text-white p-2 sm:p-3 text-sm sm:text-base font-medium min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'View'}
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-start lg:flex-row flex-col gap-6 relative'>
        <>
          {/* Main content area - centered */}
          <TweetCanvas
            stylings={{
              size: {
                width: canvasWidth,
                height: canvasHeight,
                aspectRatio: canvasAspectRatio as unknown as string,
                paddingX: paddingX,
                paddingY: paddingY,
              },
              backgroundColor: backgroundColor,
              gradientColor: gradientColor,
              bgImage: bgImageUrl,
              gradientDirection: gradientDirection,
            }}
            tweetBg={tweetBg}
            rounded={rounded}
            showWaterMark={showWaterMark}
            watermarkText={watermarkText}
            shadow={shadow}
            tilt={tilt}
            isDragging={isDragging}
            tweetWidth={tweetWidth}
            scale={scale} // Pass scale to TweetCanvas
            divRef={divRef}
            position={tweetPosition} // Pass tweetPosition to TweetCanvas
            watermarkPosition={watermarkPosition}
            watermarkColor={watermarkColor}
            fontStyle={font}
          >
            <TweetBlock
              avatar={apiData?.userImage || '/img/tweet-avatar.png'}
              name={apiData?.userName}
              isPlaying={isPlaying}
              logoStyle={logoStyle}
              setIsPlaying={setIsPlaying}
              handle={apiData?.handle}
              time={new Date(apiData?.date as unknown as Date)}
              content={description}
              bookmark={apiData?.bookmarkCount}
              replyCount={apiData?.replyCount}
              retweetCount={apiData?.retweetCount}
              favouriteCount={apiData?.favouriteCount}
              link={link}
              viewCount={apiData?.viewCount}
              image={apiData?.image}
              backgroundColor={
                colorMode === 'gradient'
                  ? `linear-gradient(135deg, ${backgroundColor}, ${gradientColor})`
                  : backgroundColor
              }
              font={font}
              vidRef={videoRef}
              showRetweet={showRetweet}
              showLike={showLike}
              showComments={showComments}
              showDate={showDate}
              showTime={showTime}
              showViewCount={showViewCount}
              showVerifiedBadge={showVerifiedBadge}
              fontSize={fontSize}
              secondaryColor={secondaryColor}
              primaryColor={primaryColor}
              showVerfiedBadge={showVerifiedBadge}
              showMedia={showMedia}
              linkColor={linkColor}
              theme={theme}
            />
          </TweetCanvas>

          {/* Interactive Sidebar */}
          <PostEditor
            exportFormat={exportFormat}
            usingPreset={usingPreset}
            editorType={editorType}
            setEditorType={setEditorType}
            setExportFormat={setExportFormat}
            colorMode={colorMode}
            setColorMode={setColorMode}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            gradientColor={gradientColor}
            setGradientColor={setGradientColor}
            font={font}
            setFont={setFont}
            handleExport={handleExport}
            showWatermark={showWaterMark}
            type={type}
            setCanvasHeight={setCanvasHeight}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            setCanvasWidth={setCanvasWidth}
            setType={setType}
            setShowWatermark={setShowWaterMark}
            scale={scale} // Pass scale to PostEditor
            setScale={setScale} // Pass setScale to PostEditor
            downloadImage={downloadImage}
            tweetWidth={tweetWidth}
            setTweetWidth={setTweetWidth}
            logoStyle={logoStyle}
            setLogoStyle={setLogoStyle}
            setHandlePos={setHandlePos}
            setTilt={setTilt}
            isDragging={isDragging}
            handlePos={handlePos} // Pass handlePos to PostEditor
            setPosition={setTweetPosition}
            position={tweetPosition} // Pass tweetPosition to PostEditor
            showRetweet={showRetweet}
            setShowRetweet={setShowRetweet}
            showLike={showLike}
            setShowLike={setShowLike}
            showComments={showComments}
            setShowComments={setShowComments}
            showTime={showTime}
            setShowTime={setShowTime}
            showViewCount={showViewCount}
            setShowViewCount={setShowViewCount}
            showDate={showDate}
            setShowDate={setShowDate}
            showVerifiedBadge={showVerifiedBadge}
            setShowVerifiedBadge={setShowVerifiedBadge}
            setCanvasAspectRatio={setCanvasAspectRatio}
            paddingX={paddingX}
            paddingY={paddingY}
            setPaddingX={setPaddingX}
            setPaddingY={setPaddingY}
            shadow={shadow}
            setShadow={setShadow}
            rounded={rounded}
            setRounded={setRounded}
            gradientDirection={gradientDirection}
            setGradientDirection={setGradientDirection}
            tweetBg={tweetBg}
            setTweetBg={setTweetBg}
            fontSize={fontSize}
            setFontSize={setFontSize}
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            secondaryColor={secondaryColor}
            setSecondaryColor={setSecondaryColor}
            copyImage={copyImage}
            bgImage={bgImage}
            handleRemoveImage={handleRemoveImage}
            handleImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            watermarkText={watermarkText}
            setWatermarkText={setWatermarkText}
            watermarkPosition={watermarkPosition}
            setWatermarkPosition={setWatermarkPosition}
            watermarkColor={watermarkColor}
            setWatermarkColor={setWatermarkColor}
            showMedia={showMedia}
            setShowMedia={setShowMedia}
            addPreset={addPreset}
            setPresetName={setPresetName}
            presetName={presetName}
            linkColor={linkColor}
            setLinkColor={setLinkColor}
            presets={
              Array.isArray(presets)
                ? presets
                : presets && Array.isArray((presets as any).presets)
                ? (presets as any).presets
                : []
            }
            deletePreset={deletePreset}
            screenShotQuality={screenShotQuality}
            setScreenShotQuality={setScreenShotQuality}
            resetStylings={resetStylings}
            theme={theme}
            setTheme={setTheme}
          />
        </>
      </div>
    </div>
  );
}

export default UrlForm;
