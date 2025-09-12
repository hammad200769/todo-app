'use client';
import { VideoUrls } from '@/types/types';
import { useState } from 'react';
import CircularLoader from '../common/CircularLoader';

interface VideoComponentProps {
  videoUrls: VideoUrls[];
  link: string;
  name: string;
  handle: string;
  description: string;
  date: string;
  loading: boolean;
  error: string | null;
}

function VideoComponent({
  videoUrls,
  link,
  error,
  loading,
  name,
  handle,
  description,
  date,
}: VideoComponentProps) {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const handleDownload = async (videoUrl: string, index: number) => {
    setDownloadingIndex(index);
    setDownloadProgress(0);

    try {
      const response = await fetch(videoUrl);

      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength || '0', 10);

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to read response body');
      }

      const chunks = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        // Update progress
        if (total > 0) {
          const progress = (receivedLength / total) * 100;
          setDownloadProgress(Math.round(progress));
        }
      }

      // Combine all chunks into a single Uint8Array
      const allChunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }

      // Create blob from the combined chunks
      const blob = new Blob([allChunks], {
        type: response.headers.get('content-type') || 'video/mp4',
      });

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Generate a timestamped filename
      const timestamp = Date.now();
      link.download = `TweetStorm_video_${timestamp}.mp4`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download video. Please try again.');
    } finally {
      setDownloadingIndex(null);
      setDownloadProgress(0);
    }
  };
  if (error) {
    return (
      <div className='bg-white/10 p-4 sm:p-8 lg:p-12 mt-6 sm:mt-8 lg:mt-10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl'>
        <div className='text-red-500 text-center'>
          <h3 className='text-xl sm:text-2xl font-bold'>Error</h3>
          <p className='text-sm sm:text-base mt-2'>
            Please check the URL provided. The video URL may be broken or
            belongs to a private post.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-white/10 p-4 sm:p-8 lg:p-12 mt-6 sm:mt-8 lg:mt-10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl'>
      {!loading ? (
        <>
          {/* User Info */}
          <div className='mb-6 text-left max-w-3xl mx-auto space-y-2'>
            <h3 className='text-xl sm:text-2xl font-bold dark:text-white'>
              {name}
            </h3>
            <p className='text-sm sm:text-base dark:text-gray-300'>@{handle}</p>
            <p className='text-sm sm:text-base mt-1 dark:text-white break-words'>
              {description}
            </p>
            <p className='text-xs sm:text-sm dark:text-gray-400'>{date}</p>
          </div>

          {/* Video Player */}
          <div className='flex justify-center mb-8'>
            <div className='w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-md'>
              <video
                id='video'
                className='w-full h-full object-contain'
                src={link}
                controls
              />
            </div>
          </div>

          {/* Table */}
          <div className='w-full overflow-x-auto rounded-lg shadow-lg max-w-5xl mx-auto'>
            <table className='min-w-[600px] w-full text-sm text-left text-gray-400 bg-white/5 backdrop-blur-md rounded-xl overflow-hidden'>
              <thead className='text-xs uppercase bg-white/10 dark:text-gray-300'>
                <tr>
                  <th scope='col' className='px-4 py-3 whitespace-nowrap'>
                    #
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Format
                  </th>
                  <th scope='col' className='px-4 py-3'>
                    Resolution
                  </th>
                  <th scope='col' className='px-4 py-3 text-center'>
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {videoUrls
                  ?.slice()
                  .reverse()
                  .map((video, index) => (
                    <tr
                      key={index}
                      className='border-b border-white/10 hover:bg-white/10 transition-colors'
                    >
                      <td className='px-4 py-3 font-medium dark:text-white'>
                        {index + 1}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {video.content_type.split('/')[1]}
                      </td>
                      <td className='px-4 py-3 text-sm'>{video.resolution}</td>
                      <td className='px-4 py-3 text-center'>
                        <button
                          onClick={() => handleDownload(video.url, index)}
                          disabled={downloadingIndex === index}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                            downloadingIndex === index
                              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {downloadingIndex === index ? (
                            <div className='flex flex-col items-center space-y-2'>
                              <div className='flex items-center space-x-2'>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                <span>Downloading...</span>
                              </div>
                              <div className='w-full bg-gray-600 rounded-full h-2'>
                                <div
                                  className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                                  style={{ width: `${downloadProgress}%` }}
                                ></div>
                              </div>
                              <span className='text-xs'>
                                {downloadProgress}%
                              </span>
                            </div>
                          ) : (
                            'Download'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center min-h-[200px]'>
          <CircularLoader />
        </div>
      )}
    </div>
  );
}

export default VideoComponent;
