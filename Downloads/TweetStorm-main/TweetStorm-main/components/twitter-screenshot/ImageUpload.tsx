import { CrossIcon, ImageIcon, UploadIcon } from '../icons';

interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  selectedFile: File | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function ImageUpload({
  handleImageUpload,
  handleRemoveImage,
  selectedFile,
  fileInputRef,
}: ImageUploadProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='w-full max-w-md mx-auto dark:bg-gray-800 rounded-lg'>
      {/* Hidden file input */}
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        ref={fileInputRef}
        className='hidden'
      />

      {/* File info display */}
      {selectedFile && (
        <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'>
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0'>
              <ImageIcon />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                {selectedFile.name}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
            <button
              onClick={handleRemoveImage}
              className='flex-shrink-0 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors'
              title='Remove file'
            >
              <CrossIcon />
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className='mt-4 flex space-x-3'>
        <button
          onClick={handleButtonClick}
          className='flex-1 inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
        >
          <UploadIcon />
          {selectedFile ? 'Choose Different File' : 'Choose File'}
        </button>

        {selectedFile && (
          <button
            onClick={handleRemoveImage}
            className='px-4 py-1 text-sm font-medium cursor-pointer text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors'
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
