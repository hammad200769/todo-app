import { useSubscription } from '@/hooks/swr';
import { TweetPosition, TweetPreset, WatermarkPosition } from '@/types/types';
import {
  canvasSizes,
  defaultColors,
  FontOptionsPostEditor,
  gradientDirections,
  gradientPresets,
} from '@/utils/constants';
import clsx from 'clsx';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  CopyIcon,
  ExportIcon,
  MoreIcon,
  ResetIcon,
  TwitterIcon,
  TwitterIconOutlined,
} from '../icons';
import ColorPicker from './ColorPicker';
import ImageUpload from './ImageUpload';
import TweetPositionSetter from './PositionSetter';
import PostTilter from './PostTilter';
import Presets from './Presets';
import ThemeSkeletons from './ThemeSkeletons';
import ToolTipComponent from './ToolTipComponent';

const TweetLogos = [
  {
    icon: (
      <span className='text-primary-twitter'>
        <TwitterIcon height='1.7rem' width='1.7rem' />
      </span>
    ),
    value: 'blue',
  },
  {
    icon: (
      <span>
        <TwitterIconOutlined />
      </span>
    ),
    value: 'X',
  },
  {
    icon: (
      <span className='text-black dark:text-white'>
        <MoreIcon />
      </span>
    ),
    value: 'menu',
  },
  {
    icon: <span className='text-red'>None </span>,
    value: 'none',
  },
];

interface PostEditorProps {
  exportFormat: string;
  setExportFormat: (format: string) => void;
  colorMode: string;
  setColorMode: (mode: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  gradientColor: string;
  setGradientColor: (color: string) => void;

  font: string;
  setFont: (font: string) => void;
  handleExport: () => void;
  showWatermark: boolean;
  setShowWatermark: (value: boolean) => void;
  type: string;
  setType: (type: string) => void;
  setCanvasHeight: (height: string) => void;
  setCanvasWidth: (width: string) => void;
  canvasWidth: string;
  canvasHeight: string;
  scale: number;
  setScale: (scale: number) => void;
  downloadImage: (img: string) => void;
  tweetWidth: number;
  setTweetWidth: (width: number) => void;
  logoStyle: string;
  setLogoStyle: (logo: string) => void;
  setHandlePos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isDragging: React.MutableRefObject<boolean>;
  handlePos: { x: number; y: number };
  position: TweetPosition;
  setPosition: (position: TweetPosition) => void;
  setCanvasAspectRatio: (aspectRatio: string) => void;
  showRetweet: boolean;
  setShowRetweet: (value: boolean) => void;
  showLike: boolean;
  setShowLike: (value: boolean) => void;
  showComments: boolean;
  setShowComments: (value: boolean) => void;
  showTime: boolean;
  setShowTime: (value: boolean) => void;
  showViewCount: boolean;
  setShowViewCount: (value: boolean) => void;
  showDate: boolean;
  setShowDate: (value: boolean) => void;
  showVerifiedBadge: boolean;
  setShowVerifiedBadge: (value: boolean) => void;
  paddingX: number;
  paddingY: number;
  setPaddingX: (value: number) => void;
  setPaddingY: (value: number) => void;
  shadow: number;
  setShadow: (value: number) => void;
  rounded: number;
  setRounded: (value: number) => void;
  gradientDirection: string;
  setGradientDirection: (value: string) => void;
  tweetBg: string;
  setTweetBg: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  copyImage: () => void;
  bgImage: File | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleRemoveImage: () => void;
  watermarkText: string;
  setWatermarkText: (text: string) => void;
  watermarkPosition: WatermarkPosition;
  setWatermarkPosition: (position: WatermarkPosition) => void;
  watermarkColor: string | undefined;
  setWatermarkColor: (value: string) => void;
  showMedia: boolean;
  setShowMedia: Dispatch<SetStateAction<boolean>>;
  setEditorType: Dispatch<SetStateAction<string>>;
  linkColor: string;
  setLinkColor: Dispatch<SetStateAction<string>>;
  editorType: string;
  addPreset: () => void;
  setPresetName: Dispatch<SetStateAction<string>>;
  presetName: string;
  presets: TweetPreset[];
  deletePreset: (presetId: number) => void;
  usingPreset: (options: TweetPreset['options']) => void;
  screenShotQuality: string;
  setScreenShotQuality: Dispatch<SetStateAction<string>>;
  resetStylings: () => void;
  theme: 'dark' | 'light' | string;
  setTheme: Dispatch<SetStateAction<'dark' | 'light' | string>>;
}
function PostEditor({
  type,
  setType,
  exportFormat,
  setExportFormat,
  colorMode,
  setColorMode,
  backgroundColor,
  setBackgroundColor,
  gradientColor,
  setGradientColor,
  font,
  setFont,
  downloadImage,
  showWatermark,
  setShowWatermark,
  canvasHeight,
  setCanvasHeight,
  canvasWidth,
  setCanvasWidth,
  scale,
  bgImage,
  setScale,
  tweetWidth,
  setTweetWidth,
  logoStyle,
  setLogoStyle,
  setHandlePos,
  setTilt,
  isDragging,
  handlePos,
  position,
  setPosition,
  setCanvasAspectRatio,
  showRetweet,
  setShowRetweet,
  showLike,
  setShowLike,
  showComments,
  setShowComments,
  showTime,
  setShowTime,
  showViewCount,
  setShowViewCount,
  showDate,
  setShowDate,
  showVerifiedBadge,
  setShowVerifiedBadge,
  paddingX,
  paddingY,
  setPaddingX,
  setPaddingY,
  shadow,
  setShadow,
  rounded,
  setRounded,
  gradientDirection,
  setGradientDirection,
  tweetBg,
  setTweetBg,
  fontSize,
  setFontSize,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  copyImage,
  handleRemoveImage,
  fileInputRef,
  handleImageUpload,
  watermarkText,
  setWatermarkText,
  watermarkPosition,
  setWatermarkPosition,
  watermarkColor,
  setWatermarkColor,
  showMedia,
  setShowMedia,
  editorType,
  setEditorType,
  addPreset,
  presetName,
  setPresetName,
  presets,
  linkColor,
  setLinkColor,
  deletePreset,
  usingPreset,
  screenShotQuality,
  setScreenShotQuality,
  resetStylings,
  setTheme,
  theme,
}: PostEditorProps) {
  const [showSizeMenu, setShowSizeMenu] = useState<boolean>(false);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  function handleThemeChange(theme: 'light' | 'dark' | string) {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (theme === 'light') {
      setBackgroundColor(defaultColors['light'].backgroundColor);
      setTweetBg(defaultColors['light'].tweetBg);
      setPrimaryColor(defaultColors['light'].primaryColor);
      setSecondaryColor(defaultColors['light'].secondaryColor);
    } else if (theme === 'dark') {
      setBackgroundColor(defaultColors['dark'].backgroundColor);
      setTweetBg(defaultColors['dark'].tweetBg);
      setPrimaryColor(defaultColors['dark'].primaryColor);
      setSecondaryColor(defaultColors['dark'].secondaryColor);
    }
  }

  const { data: subscriptionData } = useSubscription();
  useEffect(() => {
    if (
      subscriptionData !== null &&
      subscriptionData &&
      subscriptionData.subscription
    ) {
      setIsSubscribed(true);
    }
  }, [subscriptionData]);
  const applyGradientPreset = (preset: any) => {
    setBackgroundColor(preset.startColor);
    setGradientColor(preset.endColor);
    setGradientDirection(preset.direction);
    handleRemoveImage();
  };

  function setBgColor(color: string) {
    setBackgroundColor(color);
    handleRemoveImage();
  }

  const isCanvas = type === 'canvas';
  return (
    <div className='sticky mt-5 top-20 w-full min-w-[280px] lg:max-w-[340px]'>
      <div className='mb-4'>
        <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
          <button
            onClick={() => setEditorType('editor')}
            className={`flex-1 py-2 px-3 text-sm cursor-pointer font-medium rounded-md transition-colors ${
              editorType === 'editor'
                ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setEditorType('presets')}
            disabled={!isSubscribed}
            className={clsx(
              'flex-1 py-2 px-3 text-sm cursor-pointer gap-2 font-medium rounded-md transition-colors',
              !isSubscribed && 'group',
              editorType === 'presets'
                ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
              !isSubscribed && 'flex items-center'
            )}
          >
            {!isSubscribed && (
              <span>
                <ToolTipComponent
                  presets={true}
                  message='Save your settings as presets to reuse later with multiple posts. Subscribe to unlock.'
                  showOnParentHover={true}
                />
              </span>
            )}
            Presets
          </button>
        </div>
      </div>

      <div className='max-h-[70vh] overflow-y-auto self-start w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700'>
        {editorType === 'editor' ? (
          <>
            {/* Export Format */}
            <div className='mb-4'>
              <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
                Export Format
              </span>
              <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
                <select
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value)}
                  className={
                    'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors text-gray-500 dark:text-gray-400 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                  }
                >
                  <option value='webp'>.webp</option>
                  <option value='png'>.png</option>
                  <option value='jpeg'>.jpeg</option>
                </select>
              </div>
            </div>
            <div className='mb-4'>
              <span className='text-sm flex gap-2 items-center text-gray-500 dark:text-gray-400 mb-2'>
                <span>ScreenShot Quality</span>
                {!isSubscribed && (
                  <span>
                    {' '}
                    <ToolTipComponent message='Subscribe to control screenshot quality' />
                  </span>
                )}
              </span>
              {isSubscribed && (
                <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
                  <select
                    value={screenShotQuality}
                    onChange={e => setScreenShotQuality(e.target.value)}
                    className={
                      'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors text-gray-500 dark:text-gray-400 dark:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                    }
                  >
                    <option value='1'>1x (Normal Quality)</option>
                    <option value='2'>2x (High Quality)</option>
                  </select>
                </div>
              )}
            </div>
            <div className='mb-4'>
              <span className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                Theme
              </span>
              <div className='grid grid-cols-2 gap-4'>
                {/* Light theme skeleton */}
                <div>
                  <ThemeSkeletons
                    theme='light'
                    setTheme={setTheme}
                    scTheme={theme}
                    handleThemeChange={handleThemeChange}
                  />
                </div>

                {/* Dark theme skeleton */}
                <div>
                  <ThemeSkeletons
                    theme='dark'
                    setTheme={setTheme}
                    scTheme={theme}
                    handleThemeChange={handleThemeChange}
                  />
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block'>
                Editor
              </span>
              <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
                <button
                  onClick={() => setType('canvas')}
                  className={`flex-1 py-2 px-3 text-sm cursor-pointer font-medium rounded-md transition-colors ${
                    type === 'canvas'
                      ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Canvas
                </button>
                <button
                  onClick={() => setType('tweet')}
                  className={`flex-1 py-2 px-3 text-sm cursor-pointer font-medium rounded-md transition-colors ${
                    type === 'tweet'
                      ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Tweet
                </button>
              </div>
            </div>

            {/* Scale Slider */}
            {!isCanvas ? (
              <>
                <div className='mb-4'>
                  <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
                    Tweet Logo
                  </span>
                  <div className='space-x-2 flex flex-wrap'>
                    {TweetLogos.map(logo => (
                      <label
                        key={logo.value}
                        className='flex items-center space-x-2 cursor-pointer'
                      >
                        <input
                          type='radio'
                          name='logoStyle'
                          value={logo.value}
                          checked={logoStyle === logo.value}
                          onChange={e => setLogoStyle(e.target.value)}
                          className='w-4 h-4 text-blue-600 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <span className='text-sm text-gray-900 dark:text-white flex items-center space-x-2'>
                          {logo.icon}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tilt and Position Controls */}
                <div className='mb-4 flex justify-between items-start gap-4'>
                  <div className='w-full'>
                    <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
                      Tilt
                    </span>
                    <PostTilter
                      setHandlePos={setHandlePos}
                      setTilt={setTilt}
                      isDragging={isDragging}
                      handlePos={handlePos}
                    />
                  </div>
                  <div className='w-full'>
                    <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
                      Tweet Position
                    </span>
                    <TweetPositionSetter
                      position={position}
                      setPosition={setPosition}
                    />
                  </div>
                </div>

                {/* Font Selection */}
                <div className='mb-4'>
                  <span className='text-sm text-gray-500 dark:text-gray-400 mb-2 block'>
                    Font
                  </span>
                  <select
                    value={font}
                    onChange={e => setFont(e.target.value)}
                    className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    {FontOptionsPostEditor.map(fontOption => (
                      <option key={fontOption} value={fontOption}>
                        {fontOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Tweet Size
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-300 font-medium'>
                      {scale}%
                    </span>
                  </div>
                  <div className='relative'>
                    <input
                      type='range'
                      min='50'
                      max='150'
                      value={scale}
                      onChange={e => setScale(Number(e.target.value))}
                      className='w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider'
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                          ((scale - 50) / (150 - 50)) * 100
                        }%, #e5e7eb ${
                          ((scale - 50) / (150 - 50)) * 100
                        }%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className='flex justify-between text-xs text-gray-400 mt-1'>
                      <span>50%</span>
                      <span>100%</span>
                      <span>150%</span>
                    </div>
                  </div>
                </div>
                {isSubscribed ? (
                  <div className='mb-4'>
                    <div className='relative'>
                      <div className='flex justify-between text-xs text-gray-400 mt-1'>
                        <ColorPicker
                          value={linkColor}
                          onChange={setLinkColor}
                          label={'Link Color'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='mb-4'>
                    <div className='relative'>
                      <span className='text-sm flex items-center text-gray-500 dark:text-gray-400'>
                        Link Color
                        <ToolTipComponent message='Subscribe to change color of link' />
                      </span>
                    </div>
                  </div>
                )}
                <div className='mb-4'>
                  <div className='relative'>
                    <div className='flex justify-between text-xs text-gray-400 mt-1'>
                      <ColorPicker
                        value={tweetBg}
                        onChange={setTweetBg}
                        label={'Tweet Background Color'}
                      />
                    </div>
                  </div>
                </div>

                {isSubscribed ? (
                  <div className='mb-4'>
                    <div className='relative'>
                      <div className='flex justify-between text-xs text-gray-400 mt-1'>
                        <ColorPicker
                          value={primaryColor}
                          onChange={setPrimaryColor}
                          label={'Primary Color'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='mb-4'>
                    <div className='relative'>
                      <span className='text-sm flex items-center text-gray-500 dark:text-gray-400'>
                        Primary Color
                        <ToolTipComponent message='Subscribe to change color of Primary text' />
                      </span>
                    </div>
                  </div>
                )}

                {isSubscribed ? (
                  <div className='mb-4'>
                    <div className='relative'>
                      <div className='flex justify-between text-xs text-gray-400 mt-1'>
                        <ColorPicker
                          value={secondaryColor}
                          onChange={setSecondaryColor}
                          label={'Seconday Color'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='mb-4'>
                    <div className='relative'>
                      <span className='text-sm flex items-center text-gray-500 dark:text-gray-400'>
                        Secondary Color
                        <ToolTipComponent message='Subscribe to change color of Secondary text' />
                      </span>
                    </div>
                  </div>
                )}

                {/* tweet width */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Tweet Width
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-300 font-medium'>
                      {tweetWidth}%
                    </span>
                  </div>
                  <div className='relative'>
                    <input
                      type='range'
                      min='60'
                      max='100'
                      value={tweetWidth}
                      onChange={e => setTweetWidth(Number(e.target.value))}
                      className='w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider'
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                          ((tweetWidth - 60) / (100 - 60)) * 100
                        }%, #e5e7eb ${
                          ((tweetWidth - 60) / (100 - 60)) * 100
                        }%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className='flex justify-between text-xs text-gray-400 mt-1'>
                      <span>60%</span>
                      <span>80%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                {/* font size */}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 justify-between text-gray-500 dark:text-gray-400 mb-2'>
                    <span>Font Size {fontSize}</span>
                    <button
                      className='text-sm text-primary-twitter rounded'
                      onClick={() => setFontSize(16)}
                    >
                      Reset
                    </button>
                  </span>

                  <input
                    type='range'
                    min={8}
                    max={28}
                    value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className='w-full accent-twitter-blue'
                  />

                  <div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
                    <span>8</span>
                    <span>28</span>
                  </div>
                </div>

                {/* shadow */}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 justify-between text-gray-500 dark:text-gray-400 mb-2'>
                    <span>Shadow {shadow}</span>
                    <button
                      className='text-sm text-primary-twitter rounded'
                      onClick={() => setShadow(1)}
                    >
                      Reset
                    </button>
                  </span>

                  <input
                    type='range'
                    min={0}
                    max={10}
                    value={shadow}
                    onChange={e => setShadow(Number(e.target.value))}
                    className='w-full accent-twitter-blue'
                  />

                  <div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Roundedness */}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 justify-between text-gray-500 dark:text-gray-400 mb-2'>
                    <span>Roundedness {rounded}</span>{' '}
                    <button
                      className='text-sm text-primary-twitter'
                      onClick={() => setRounded(6)}
                    >
                      Reset
                    </button>
                  </span>

                  <input
                    type='range'
                    min={0}
                    max={10}
                    value={rounded}
                    onChange={e => setRounded(Number(e.target.value))}
                    className='w-full accent-twitter-blue'
                  />

                  <div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>

                {/* retweet toggle */}
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    Show {showRetweet ? 'Retweet Icon' : 'Retweet'}
                  </span>
                  <div
                    className='inline-flex items-center cursor-pointer'
                    onClick={() => setShowRetweet(!showRetweet)}
                  >
                    <div
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        showRetweet
                          ? 'bg-blue-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <div
                        className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                          showRetweet ? 'translate-x-full' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* like toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show {showLike ? 'Like Icon' : 'Like'}
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowLike(!showLike)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showLike
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showLike ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* comments toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show {showComments ? 'Comments Icon' : 'Comments'}
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowComments(!showComments)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showComments
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showComments ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Time toggle*/}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show Time
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowTime(!showTime)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showTime
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showTime ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show Date
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowDate(!showDate)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showDate
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showDate ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* view count toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show View Count
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowViewCount(!showViewCount)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showViewCount
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showViewCount ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* verified badge toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Show Verified Badge
                    </span>
                    <div
                      className='inline-flex items-center cursor-pointer'
                      onClick={() => setShowVerifiedBadge(!showVerifiedBadge)}
                    >
                      <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          showVerifiedBadge
                            ? 'bg-blue-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                            showVerifiedBadge ? 'translate-x-full' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* media toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                      Hide Media
                      {!isSubscribed && (
                        <ToolTipComponent message='Subscribe to control media' />
                      )}
                    </span>
                    {isSubscribed && (
                      <div
                        className='inline-flex items-center cursor-pointer'
                        onClick={() => setShowMedia(!showMedia)}
                      >
                        <div
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            !showMedia
                              ? 'bg-blue-600'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <div
                            className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${
                              !showMedia ? 'translate-x-full' : ''
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Canvas Size */}
                <div className='mb-4 relative'>
                  <button
                    onClick={() => setShowSizeMenu(!showSizeMenu)}
                    className='w-full flex cursor-pointer items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'
                  >
                    <span>Canvas Size</span>
                    <span
                      className={`transform transition-transform ${
                        showSizeMenu ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {/* Current size display */}
                  <button
                    onClick={() => setShowSizeMenu(!showSizeMenu)}
                    className='text-sm text-left cursor-pointer text-gray-500 dark:text-gray-400 w-full bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md'
                  >
                    Current: {canvasWidth} x {canvasHeight}
                  </button>
                  {showSizeMenu && (
                    <div className='absolute top-full left-0 right-0 z-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 max-h-48 overflow-y-auto'>
                      <div className='grid grid-cols-2 gap-2'>
                        {canvasSizes.map(size => (
                          <button
                            key={`${size.label}`}
                            onClick={() => {
                              setCanvasHeight(size.height as string);
                              setCanvasWidth(size.width as string);
                              setCanvasAspectRatio(
                                size.aspectRatio as unknown as string
                              );
                              setShowSizeMenu(false);
                            }}
                            className={`px-3 py-2 text-sm rounded transition-colors text-left ${
                              canvasWidth === size.width &&
                              canvasHeight === size.height
                                ? 'text-gray-900 dark:text-white bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                          >
                            <div className='font-medium'>{size.label}</div>
                            <div className='text-xs text-gray-500 dark:text-gray-400'>
                              {size.width} × {size.height}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/*Image Upload*/}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-2'>
                    <span>Background Image </span>
                    {!isSubscribed && (
                      <span>
                        {' '}
                        <ToolTipComponent message='Subscribe to add a custom background image' />
                      </span>
                    )}
                  </span>
                  {isSubscribed && (
                    <ImageUpload
                      handleImageUpload={handleImageUpload}
                      handleRemoveImage={handleRemoveImage}
                      selectedFile={bgImage}
                      fileInputRef={fileInputRef}
                    />
                  )}
                </div>
                {/* PaddingX */}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-2'>
                    PaddingX{' '}
                    <input
                      type='number'
                      maxLength={128}
                      minLength={0}
                      value={paddingX}
                      className='w-20 h-8 bg-gray-200 border border-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-white rounded'
                      onChange={e => setPaddingX(Number(e.target.value))}
                    />
                    px
                  </span>

                  <input
                    type='range'
                    min={0}
                    max={128}
                    step={4}
                    value={paddingX}
                    onChange={e => setPaddingX(Number(e.target.value))}
                    className='w-full accent-twitter-blue'
                  />

                  <div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
                    <span>0</span>
                    <span>128</span>
                  </div>

                  <button
                    className='mt-3 text-sm bg-primary-twitter text-white px-3 py-1 rounded'
                    onClick={() => setPaddingX(32)}
                  >
                    Reset
                  </button>
                </div>
                {/* Padding Y */}
                <div className='mb-4'>
                  <span className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-2'>
                    PaddingY{' '}
                    <input
                      type='number'
                      maxLength={128}
                      minLength={0}
                      value={paddingY}
                      className='w-20 h-8 bg-gray-200 border border-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-white rounded'
                      onChange={e => setPaddingY(Number(e.target.value))}
                    />
                    px
                  </span>

                  <input
                    type='range'
                    min={0}
                    max={128}
                    step={4}
                    value={paddingY}
                    onChange={e => setPaddingY(Number(e.target.value))}
                    className='w-full accent-twitter-blue'
                  />

                  <div className='flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400'>
                    <span>0</span>
                    <span>128</span>
                  </div>

                  <button
                    className='mt-3 text-sm bg-primary-twitter text-white px-3 py-1 rounded'
                    onClick={() => setPaddingY(32)}
                  >
                    Reset
                  </button>
                </div>
                {/* Color/Gradient Toggle */}{' '}
                <div className='mb-6'>
                  <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1'>
                    <button
                      onClick={() => setColorMode('color')}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        colorMode === 'color'
                          ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => setColorMode('gradient')}
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        colorMode === 'gradient'
                          ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-600 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      Gradient
                    </button>
                  </div>
                </div>
                {/* Gradient Presets (only show in gradient mode) */}
                {colorMode === 'gradient' && (
                  <div className='mb-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Gradient Presets
                      </label>
                      <button
                        onClick={() => setShowPresets(!showPresets)}
                        className='text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center'
                      >
                        Browse Presets
                      </button>
                    </div>
                    {showPresets && (
                      <div className='grid grid-cols-2 gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg max-h-64 overflow-y-auto'>
                        {gradientPresets.map(preset => {
                          // Function to convert direction string to CSS gradient direction
                          const getGradientDirection = (direction: string) => {
                            if (direction === 'radial') return 'radial';

                            // Handle linear gradient directions
                            const directionMap: Record<string, string> = {
                              'to-b': '180deg',
                              'to-t': '0deg',
                              'to-r': '90deg',
                              'to-l': '270deg',
                              'to-br': '135deg',
                              'to-bl': '225deg',
                              'to-tr': '45deg',
                              'to-tl': '315deg',
                            };

                            return directionMap[direction] || '0deg';
                          };

                          const gradientDirection = getGradientDirection(
                            preset.direction
                          );
                          return (
                            <button
                              key={preset.name}
                              onClick={() => applyGradientPreset(preset)}
                              className='relative group'
                            >
                              <div
                                className='w-full h-16 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-colors'
                                style={{
                                  background:
                                    preset.direction === 'radial'
                                      ? `radial-gradient(circle, ${preset.startColor}, ${preset.endColor})`
                                      : `linear-gradient(${gradientDirection}, ${preset.startColor}, ${preset.endColor})`,
                                }}
                              />
                              <div className='absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center'>
                                <span className='text-white text-xs font-medium opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-2 py-1 rounded'>
                                  {preset.name}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                {/* Background Color Picker */}
                <ColorPicker
                  value={backgroundColor}
                  onChange={setBgColor}
                  label={
                    colorMode === 'gradient'
                      ? 'Gradient Start Color'
                      : 'Background Color'
                  }
                />
                {/* Gradient End Color (only show if gradient mode) */}
                {colorMode === 'gradient' && (
                  <ColorPicker
                    value={gradientColor}
                    onChange={setGradientColor}
                    label='Gradient End Color'
                  />
                )}
                {/* Gradient Direction (only show if gradient mode) */}
                {colorMode === 'gradient' && (
                  <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                      Gradient Direction
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      {gradientDirections.map(direction => (
                        <button
                          key={direction.value}
                          onClick={() => setGradientDirection(direction.value)}
                          className={`p-3 text-sm rounded-lg border transition-colors ${
                            gradientDirection === direction.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                          }`}
                          title={direction.label}
                        >
                          <div className='text-lg mb-1'>{direction.icon}</div>
                          <div className='text-xs'>
                            {direction.label.split(' ')[0]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Watermark Toggle */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400'>
                      Custom Watermark
                      {!isSubscribed && (
                        <span>
                          {' '}
                          <ToolTipComponent message='Subscribe to add a custom watermark' />
                        </span>
                      )}
                    </span>
                    {isSubscribed && (
                      <button
                        onClick={() => setShowWatermark(!showWatermark)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          showWatermark
                            ? 'bg-blue-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            showWatermark ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
                {isSubscribed && showWatermark && (
                  <>
                    <div className='mb-4'>
                      <div className='flex flex-col justify-between'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Watermark Text
                        </span>
                        <input
                          type='text'
                          value={watermarkText}
                          onChange={e => setWatermarkText(e.target.value)}
                          className='w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </div>
                    </div>

                    <div className='mb-4'>
                      <div className='flex flex-col justify-between'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Watermark Position
                        </span>
                        <TweetPositionSetter
                          position={watermarkPosition}
                          setPosition={setWatermarkPosition}
                        />
                      </div>
                    </div>

                    <div className='mb-4'>
                      <div className='relative'>
                        <div className='flex justify-between text-xs text-gray-400 mt-1'>
                          <ColorPicker
                            value={watermarkColor}
                            onChange={setWatermarkColor}
                            label={'Watermark Text Color'}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Presets
            presetName={presetName}
            setPresetName={setPresetName}
            addPreset={addPreset}
            presets={presets}
            deletePreset={deletePreset}
            usingPreset={usingPreset}
          />
        )}
      </div>

      <div className='my-4 justify-center flex gap-2'>
        <button
          className='flex-1 p-2 flex items-center gap-1 bg-red-400 border cursor-pointer border-red-500 rounded-lg text-gray-100 hover:bg-red-500 transition-colors text-sm font-medium'
          onClick={resetStylings}
        >
          <span>
            <ResetIcon />
          </span>{' '}
          Reset Stylings
        </button>
        <button
          onClick={() => copyImage()}
          className='flex items-center justify-center gap-2 px-4 py-3 text-sm text-white bg-gray-500 cursor-pointer dark:bg-gray-600 hover:bg-gray-800 rounded-lg transition-colors font-medium'
        >
          <CopyIcon />
          Copy to Clipboard
        </button>
      </div>

      {/* Export Button */}
      <div className='flex flex-col gap-4'>
        <button
          onClick={() => downloadImage(exportFormat)}
          className='w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-white bg-primary cursor-pointer hover:bg-primary-hover rounded-lg transition-colors font-medium'
        >
          <span>
            <ExportIcon />
          </span>{' '}
          Export {exportFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default PostEditor;
