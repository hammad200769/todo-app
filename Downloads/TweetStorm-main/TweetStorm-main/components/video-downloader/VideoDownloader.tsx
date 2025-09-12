'use client';
import { VideoUrls } from '@/types/types';
import {
  findBestTwitterVideoUrl,
  formatTwitterDate,
  validateTwitterVideoUrl,
} from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import VideoComponent from './VideoComponent';

// Define error types for better error handling
interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

interface VideoData {
  videoUrls: VideoUrls[];
  userName: string;
  handle: string;
  description: string;
  date: string;
}

function VideoDownloader() {
  const [link, setLink] = useState<string>();
  const [videoUrls, setVideoUrls] = useState<VideoUrls[]>();
  const [name, setName] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  function resetState() {
    setLink(undefined);
    setVideoUrls(undefined);
    setName('');
    setHandle('');
    setDescription('');
    setDate('');
    setError(null);
  }

  const processVideoData = (data: VideoData): void => {
    try {
      if (!data.videoUrls || !Array.isArray(data.videoUrls)) {
        throw new Error('Invalid video URLs data');
      }

      if (data.videoUrls.length === 0) {
        throw new Error('No video URLs found');
      }

      const mp4Videos = data.videoUrls.filter(
        (video: VideoUrls) => video.content_type === 'video/mp4'
      );

      if (mp4Videos.length === 0) {
        throw new Error('No MP4 videos found');
      }
      const updatedVideos = mp4Videos.map(video => {
        const match = video.url.match(/\/(\d+x\d+)\//);
        const resolution = match ? match[1] : undefined;
        return {
          ...video,
          resolution,
        };
      });
      const bestVideo = findBestTwitterVideoUrl(mp4Videos);
      if (!bestVideo) {
        throw new Error('Could not determine best video quality');
      }

      // Process description safely
      const processedDescription = data.description
        ? data.description.split('https')[0].trim()
        : '';

      // Format date
      const formattedDate = formatTwitterDate(data.date);

      // Update state
      setLink(bestVideo.url);
      setName(data.userName || 'Unknown User');
      setHandle(data.handle || '');
      setDescription(processedDescription);
      setDate(formattedDate);
      setVideoUrls(updatedVideos);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error processing video data';
      console.error('Error processing video data:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  async function handleView(): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);
      resetState();

      const urlParams = new URLSearchParams(window.location.search);
      const videoUrl = urlParams.get('url');

      if (!validateTwitterVideoUrl(videoUrl)) {
        throw new Error('Invalid or missing video URL');
      }

      const res = await fetch(
        `/api/x-video-downloader?url=${encodeURIComponent(videoUrl!)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check response status
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `API request failed: ${res.status} ${res.statusText}. ${errorText}`
        );
      }

      let data: VideoData | ApiError;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Invalid JSON response from server');
      }

      if ('error' in data) {
        const apiError = data as ApiError;
        throw new Error(
          apiError.message || apiError.error || 'API returned an error'
        );
      }

      processVideoData(data as VideoData);
    } catch (error) {
      console.error('Error in handleView:', error);

      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again.';
          toast.error(
            'An error occurred while fetching the video data. Please try again later.'
          );
        } else if (error.message.includes('fetch')) {
          errorMessage =
            'Network error. Please check your connection and try again.';
          toast.error(
            'An error occurred while fetching the video data. Please try again later.'
          );
        } else if (error.message.includes('403')) {
          errorMessage =
            'Access to this content is restricted. It may be sensitive or private.';
          toast.error(
            'Access to this content is restricted. It may be sensitive or private.'
          );
        } else {
          errorMessage = error.message;
          toast.error(
            'An error occurred while fetching the video data. Please try again later.'
          );
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      //if browser is not defined, return early
      return;
    }

    // Prevent multiple calls
    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;
    handleView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <VideoComponent
        name={name}
        error={error}
        loading={isLoading}
        handle={handle}
        description={description}
        date={date}
        link={link as string}
        videoUrls={videoUrls as VideoUrls[]}
      />
    </div>
  );
}

export default VideoDownloader;
