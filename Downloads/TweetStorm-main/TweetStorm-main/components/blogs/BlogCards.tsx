import { URLS } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';

interface GhostPostsResponse {
  posts: any[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    };
  };
}

async function getGhostPosts(
  page: number = 1,
  limit: number = 15
): Promise<GhostPostsResponse> {
  const apiUrl = `${process.env.GHOST_API_URL}/ghost/api/content/posts/`;
  const apiKey = process.env.GHOST_CONTENT_API_KEY;
  const url = `${apiUrl}?key=${apiKey}&limit=${limit}&page=${page}&include=authors`;

  try {
    const response = await fetch(url, {
      cache: 'no-cache',
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return {
      posts: [],
      meta: {
        pagination: {
          page: 1,
          limit: 10,
          pages: 1,
          total: 0,
          next: null,
          prev: null,
        },
      },
    };
  }
}

interface BlogPageProps {
  searchParams: { page?: string };
}

async function BlogCards({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const blogsPerPage = 15;

  const { posts: blogs, meta } = await getGhostPosts(currentPage, blogsPerPage);
  const { pagination } = meta;

  return (
    <>
      {blogs.length > 0 ? (
        <>
          <div>
            <ul className='grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {blogs.map((blog: any) => (
                <li key={blog.id} className='h-full'>
                  <article className='h-full flex flex-col rounded-lg border dark:bg-primary-dark-light border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200'>
                    <div className='relative w-full h-48 sm:h-52 lg:h-48 overflow-hidden rounded-t-lg'>
                      <Link href={`${URLS.blog}/${blog.slug}`}>
                        <Image
                          src={blog.feature_image}
                          alt={blog.feature_image_alt || blog.title}
                          fill
                          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          className='object-cover'
                          priority={false}
                        />
                      </Link>
                    </div>

                    <div className='flex-1 flex flex-col p-4 sm:p-5 lg:p-6'>
                      <div className='flex-1 space-y-3 mb-2'>
                        <h2 className='text-lg sm:text-xl lg:text-2xl dark:text-soft-white font-bold tracking-tight leading-tight line-clamp-2'>
                          <Link
                            href={`${URLS.blog}/${blog.slug}`}
                            className='hover:text-primary dark:hover:text-primary-light transition-colors duration-200'
                          >
                            {blog.title}
                          </Link>
                        </h2>
                        <p className='font-light text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3'>
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className='mt-auto pt-2 flex flex-col'>
                        <span className='text-xs text-gray-500 dark:text-gray-400 mb-5'>
                          {new Date(blog.published_at).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </span>
                        <Link
                          href={`${URLS.blog}/${blog.slug}`}
                          className='inline-flex items-center font-medium text-primary dark:text-primary-light hover:underline text-sm sm:text-base transition-colors duration-200'
                        >
                          Read more
                          <svg
                            className='ml-2 w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {pagination.total > 0 && (
            <p className='text-xs sm:text-sm text-center text-gray-600 dark:text-gray-400 mt-8 lg:mt-12 mb-4 px-4'>
              Showing {(currentPage - 1) * blogsPerPage + 1} to{' '}
              {Math.min(currentPage * blogsPerPage, pagination.total)} of{' '}
              {pagination.total} posts
            </p>
          )}

          <div className='px-4'>
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.pages}
              basePath={URLS.blog}
            />
          </div>
        </>
      ) : (
        <div className='text-center py-8 sm:py-12 mx-4 rounded-lg border dark:bg-primary-dark-light border-gray-200 shadow-md'>
          <p className='text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4'>
            No blog posts found.
          </p>
        </div>
      )}
    </>
  );
}

export default BlogCards;
