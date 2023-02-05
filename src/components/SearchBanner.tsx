import { useRouter } from 'next/router';
import React from 'react';

import clsxm from '@/lib/clsxm';

interface SearchBannerProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  tab: string;
}

export default function SearchBanner({
  searchTerm,
  setSearchTerm,
  tab,
}: SearchBannerProps) {
  const router = useRouter();

  return (
    <div className='flex w-full  items-center justify-evenly shadow'>
      <div
        onClick={() => router.push('/')}
        className={clsxm(
          'flex flex-auto cursor-pointer justify-center  border-l-2 border-t-2 border-b-2 p-5 text-gray-400',
          tab === 'groups'
            ? 'border-b-pixsy font-bold text-black'
            : 'text-gray-400'
        )}
      >
        Topics
      </div>
      <div
        onClick={() => router.push('/images/all')}
        className={clsxm(
          'flex flex-auto cursor-pointer justify-center  border-t-2 border-b-2 p-5 text-gray-400',
          tab === 'all'
            ? 'border-b-pixsy font-bold text-black'
            : 'text-gray-400'
        )}
      >
        All
      </div>
      <div className='flex  flex-auto cursor-not-allowed justify-center border-t-2 border-b-2 p-5 text-gray-400'>
        Ignored
      </div>
      {/* <div className='flex flex-auto justify-center border-t-2 border-b-2  p-5 text-gray-400'> */}
      <input
        className='focus:shadow-outline flex  w-20 flex-auto justify-center border-0 border-t-2 border-b-2 border-gray-200 p-5 text-center  text-gray-400 focus:border-pixsy focus:outline-none'
        id='tokens'
        type='text'
        placeholder='Search'
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
      ></input>
      {/* </div> */}
      <div className='flex flex-auto cursor-not-allowed justify-center border-b-2 bg-pixsy p-5 text-white'>
        IMPORT
      </div>
    </div>
  );
}
