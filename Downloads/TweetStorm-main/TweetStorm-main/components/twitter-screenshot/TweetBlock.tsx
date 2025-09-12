import clsx from 'clsx';
import Image from 'next/image';
import {
  BookMarkIcon,
  LikeIcon,
  MessageCircleIcon,
  MoreIcon,
  RetweetIcon,
  ShareIcon,
  TwitterIcon,
  TwitterIconOutlined,
  VerifiedBadgeIcon,
} from '../icons';

// Mock icons to match Twitter's style
const TwitterIcons = {
  Reply: <MessageCircleIcon />,
  Retweet: <RetweetIcon />,
  Like: <LikeIcon />,
  Share: <ShareIcon />,
  More: <MoreIcon />,
  Bookmark: <BookMarkIcon />,
  BlueIcon: <TwitterIcon />,
  XIcon: <TwitterIconOutlined />,
};

function TweetBlock({
  avatar,
  name,
  handle,
  time,
  link,
  image,
  content,
  viewCount,
  replyCount,
  retweetCount,
  favouriteCount,
  vidRef,
  showMedia,
  isPlaying,
  setIsPlaying,
  scale = 1,
  logoStyle,
  canvasSize, // New prop to get canvas dimensions
  showRetweet,
  showLike,
  showComments,
  showTime,
  showViewCount,
  showDate,
  showVerifiedBadge,
  fontSize = 16, // Base font size in pixels
  primaryColor,
  secondaryColor,
  linkColor,
  theme,
}: any) {
  function formatWithK(num: number) {
    if (!num) return '1000';
    if (num < 1000) return num.toString();

    const thousands = Math.floor(num / 1000);
    return `${thousands}k`;
  }

  function togglePlayPause() {
    if (vidRef.current) {
      if (isPlaying) {
        vidRef.current.pause();
      } else {
        vidRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function formatTime(time: any) {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return '1:59 AM · Aug 22, 2024';
    }
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `${timeString} · ${dateString}`;
  }

  function getImageGridClasses(imageCount: number) {
    switch (imageCount) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 grid-rows-2';
      case 4:
        return 'grid-cols-2 grid-rows-2';
      default:
        return 'grid-cols-2';
    }
  }

  function getImageClasses(index: number, total: number) {
    if (total === 1) {
      return 'w-full h-auto max-h-[1080px] rounded-2xl';
    }
    if (total === 2) {
      return 'w-full h-64 object-cover';
    }
    if (total === 3) {
      if (index === 0) {
        return 'w-full h-full object-cover row-span-2';
      }
      return 'w-full h-48 object-cover';
    }
    if (total === 4) {
      return 'w-full h-32 object-cover';
    }
    return 'w-full h-32 object-cover';
  }

  // Calculate responsive sizes based on scale and canvas size
  function getResponsiveSize(baseSize: number) {
    // Base scale from the scale prop
    let adjustedSize = baseSize * scale;

    // Additional scaling based on canvas size
    if (canvasSize) {
      const canvasWidth =
        typeof canvasSize.width === 'number' ? canvasSize.width : 800;
      const canvasHeight =
        typeof canvasSize.height === 'number' ? canvasSize.height : 600;

      // Calculate additional scale factor based on canvas size
      const canvasScale = Math.min(canvasWidth / 800, canvasHeight / 600);
      const clampedCanvasScale = Math.max(0.8, Math.min(1.5, canvasScale));

      adjustedSize = adjustedSize * clampedCanvasScale;
    }

    return Math.round(adjustedSize);
  }

  // Calculate font sizes based on fontSize prop, maintaining proportional differences
  function getFontSize(size: 'sm' | 'base' | 'lg') {
    // Base font size ratios - maintaining the same proportions as before
    const fontRatios = {
      sm: 0.875, // 87.5% of base (14px when base is 16px)
      base: 1, // 100% of base (16px when base is 16px)
      lg: 1.125, // 112.5% of base (18px when base is 16px)
    };

    // Calculate the font size based on the passed fontSize prop
    const calculatedSize = (fontSize * fontRatios[size]) / 16; // Convert to rem (16px base)

    // Apply scale factor
    let adjustedSize = calculatedSize * scale;

    // Additional scaling based on canvas size
    if (canvasSize) {
      const canvasWidth =
        typeof canvasSize.width === 'number' ? canvasSize.width : 800;
      const canvasScale = Math.min(canvasWidth / 800, 1.2);
      const clampedCanvasScale = Math.max(0.9, canvasScale);

      adjustedSize = adjustedSize * clampedCanvasScale;
    }

    return `${adjustedSize}rem`;
  }

  // Calculate media heights based on canvas size
  function getMediaHeight() {
    if (canvasSize) {
      const canvasWidth =
        typeof canvasSize.width === 'number' ? canvasSize.width : 800;
      const canvasHeight =
        typeof canvasSize.height === 'number' ? canvasSize.height : 600;

      // Base height is 400px, but scale it based on canvas size
      const baseHeight = 400;
      const widthScale = canvasWidth / 800;
      const heightScale = canvasHeight / 600;

      // Use the smaller scale to maintain aspect ratio
      const mediaScale = Math.min(widthScale, heightScale);
      const clampedScale = Math.max(0.7, Math.min(1.8, mediaScale));

      const scaledHeight = baseHeight * clampedScale * scale;

      // Ensure minimum and maximum heights
      return Math.max(300, Math.min(700, scaledHeight));
    }

    return 525 * scale; // Fallback to original scaled height
  }

  function getTwitterLogo(twitterLogo: string) {
    switch (twitterLogo) {
      case 'X':
        return (
          <span
            className={clsx(theme === 'dark' ? 'text-white' : 'text-black')}
          >
            {TwitterIcons.XIcon}
          </span>
        );
      case 'blue':
        return (
          <span className='text-primary-twitter'>{TwitterIcons.BlueIcon}</span>
        );
      case 'none':
        return null;
      case 'menu':
        return TwitterIcons.More;
    }
  }

  // Responsive sizing values
  const avatarSize = getResponsiveSize(48);
  const iconSize = getResponsiveSize(20);
  const basePadding = getResponsiveSize(16);
  const baseGap = getResponsiveSize(12);
  const mediaHeight = getMediaHeight();
  return (
    <div
      className='w-full transition-colors'
      style={{
        padding: `${basePadding}px`,
        fontSize: getFontSize('base'),
      }}
    >
      <div className='flex flex-col' style={{ gap: `${baseGap}px` }}>
        <div className='flex justify-between items-center'>
          <div className='flex items-start' style={{ gap: `${baseGap}px` }}>
            <Image
              src={avatar || ''}
              alt={`${name}'s avatar`}
              className='rounded-full object-cover'
              height={avatarSize}
              width={avatarSize}
              style={{
                width: `${avatarSize}px`,
                height: `${avatarSize}px`,
              }}
            />
            <div className='flex flex-col'>
              <span
                className={`font-bold flex items-center hover:underline cursor-pointer`}
                style={{ fontSize: getFontSize('base'), color: primaryColor }}
              >
                {name ?? 'TweetStorm'}
                {showVerifiedBadge && (
                  <span className='text-primary-twitter'>
                    {<VerifiedBadgeIcon />}
                  </span>
                )}
              </span>
              <span
                style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
              >
                @{handle ?? 'tweetstorm.ai'}
              </span>
            </div>
          </div>
          <div className='flex items-start justify-between'>
            <button
              className='hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
              style={{
                padding: `${getResponsiveSize(8)}px`,
              }}
            >
              <div
                className='text-gray-500 dark:text-gray-400'
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                }}
              >
                {getTwitterLogo(logoStyle)}
              </div>
            </button>
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <div style={{ marginTop: `${getResponsiveSize(8)}px` }}>
            <p
              className='mb-10 whitespace-pre-line break-words'
              style={{
                fontSize: getFontSize('base'),
                lineHeight: scale > 0.8 ? '1.5' : '1.4',
                color: primaryColor,
              }}
              dangerouslySetInnerHTML={{
                __html:
                  content.length > 0
                    ? content.replace(/<a/g, `<a style="color: ${linkColor}"`)
                    : 'Generate engaging tweets in seconds with our AI-powered tool. Create, edit, and share your thoughts effortlessly.',
              }}
            />
          </div>

          {showMedia && link && (
            <div
              className='mt-3 rounded-xl overflow-hidden shadow flex items-center justify-center relative'
              style={{
                marginTop: `${getResponsiveSize(12)}px`,
                height: `${mediaHeight}px`,
              }}
            >
              <video
                ref={vidRef}
                src={link}
                autoPlay={true}
                loop
                className='w-full h-full object-cover cursor-pointer'
                poster={image}
                onClick={togglePlayPause}
                controls={false}
              />
              <div
                className={clsx(
                  'absolute inset-0 flex items-center justify-center bg-opacity-30 hover:opacity-100 transition-opacity cursor-pointer',
                  isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                )}
                onClick={togglePlayPause}
              >
                <div
                  className='bg-primary bg-opacity-50 rounded-full'
                  style={{
                    padding: `${getResponsiveSize(12)}px`,
                  }}
                >
                  {isPlaying ? (
                    <svg
                      className='text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      style={{
                        width: `${getResponsiveSize(32)}px`,
                        height: `${getResponsiveSize(32)}px`,
                      }}
                    >
                      <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
                    </svg>
                  ) : (
                    <svg
                      className='text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      style={{
                        width: `${getResponsiveSize(32)}px`,
                        height: `${getResponsiveSize(32)}px`,
                      }}
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}

          {showMedia && !link && image && image.length > 0 && (
            <div
              className='rounded-2xl overflow-hidden'
              style={{
                marginTop: `${getResponsiveSize(12)}px`,
                height: 'auto',
              }}
            >
              <div
                className={`grid gap-1 ${getImageGridClasses(image.length)}`}
              >
                {image.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Tweet image ${index + 1}`}
                    className={getImageClasses(index, image.length)}
                    height={image.length === 1 ? 0 : getResponsiveSize(150)}
                    width={
                      image.length === 1
                        ? Math.round(mediaHeight * 1.5) // Maintain aspect ratio
                        : getResponsiveSize(200)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div
            className='flex items-center ml-2'
            style={{
              marginTop: `${getResponsiveSize(8)}px`,
              gap: `${getResponsiveSize(4)}px`,
              fontSize: getFontSize('sm'),
              color: secondaryColor,
            }}
          >
            {' '}
            {showTime && <span>{formatTime(time).split('·')[0]}</span>}
            {showTime && showDate && <span>·</span>}
            {showDate && <span>{formatTime(time).split('·')[1]}</span>}
            {(showTime || showDate) &&
              showViewCount &&
              (viewCount === undefined || viewCount >= 0) && <span>·</span>}
            <span>
              {showViewCount
                ? viewCount !== undefined
                  ? viewCount > 0
                    ? `${formatWithK(viewCount)} Views`
                    : '0 Views'
                  : '1000 Views'
                : ''}
            </span>
          </div>

          <div
            className='flex items-center gap-16 flex-wrap'
            style={{
              marginTop: `${getResponsiveSize(12)}px`,
            }}
          >
            <button
              className='flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full group transition-colors'
              style={{
                padding: `${getResponsiveSize(8)}px`,
                gap: `${getResponsiveSize(8)}px`,
              }}
            >
              {!showComments && (
                <div
                  className='flex items-center justify-center group-hover:text-blue-500'
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: secondaryColor,
                  }}
                >
                  {TwitterIcons.Reply}
                </div>
              )}
              <span
                className=' group-hover:text-blue-500'
                style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
              >
                {replyCount !== undefined
                  ? replyCount > 0
                    ? formatWithK(replyCount)
                    : ''
                  : '1000'}
              </span>
              {showComments && (
                <div
                  className='flex items-center justify-center group-hover:text-blue-500'
                  style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
                >
                  Comments
                </div>
              )}
            </button>

            <button
              className='flex items-center justify-center hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full group transition-colors'
              style={{
                padding: `${getResponsiveSize(8)}px`,
                gap: `${getResponsiveSize(8)}px`,
              }}
            >
              {!showRetweet && (
                <div
                  className='flex items-center justify-center group-hover:text-green-500'
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: secondaryColor,
                  }}
                >
                  {TwitterIcons.Retweet}
                </div>
              )}
              <span
                className='group-hover:text-green-500'
                style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
              >
                {retweetCount !== undefined
                  ? retweetCount > 0
                    ? formatWithK(retweetCount)
                    : ''
                  : '1000'}
              </span>
              {showRetweet && (
                <div
                  className='flex items-center justify-center group-hover:text-green-500'
                  style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
                >
                  Retweets
                </div>
              )}
            </button>

            <button
              className='flex items-center justify-center hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-full group transition-colors'
              style={{
                padding: `${getResponsiveSize(8)}px`,
                gap: `${getResponsiveSize(8)}px`,
              }}
            >
              {!showLike && (
                <div
                  className='flex items-center justify-center group-hover:text-pink-500'
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    color: secondaryColor,
                  }}
                >
                  {TwitterIcons.Like}
                </div>
              )}
              <span
                className='group-hover:text-pink-500 '
                style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
              >
                {favouriteCount !== undefined
                  ? favouriteCount > 0
                    ? formatWithK(favouriteCount)
                    : ''
                  : '1000'}
              </span>
              {showLike && (
                <div
                  className='flex items-center justify-center group-hover:text-pink-500'
                  style={{ fontSize: getFontSize('sm'), color: secondaryColor }}
                >
                  Likes
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetBlock;
