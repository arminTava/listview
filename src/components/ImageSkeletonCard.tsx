import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export default function ImageSkeletonCard() {
  return (
    <>
      <div className='xs:flex-row xs:items-stretch relative mb-3 flex h-full flex-col items-center justify-start bg-white text-dark shadow  duration-500 hover:-translate-y-2'>
        <div
          style={{ minHeight: '200px' }}
          className='xs:max-w-xs relative w-full shrink-0 grow-0	basis-52'
        >
          <div className='h-full cursor-pointer self-stretch py-3'>
            <Skeleton className='!z-0 h-full' />
          </div>
        </div>
        <div className='xs:grow pt-3'>
          <div className='flex flex-row px-4 py-3'>
            <span className='mr-1 block h-6 w-6 text-center text-base font-medium text-white'>
              <Skeleton className='!z-0' />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
