import React from 'react';

import clsxm from '@/lib/clsxm';

interface SearchBannerProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export default function SearchBanner({
  searchTerm,
  setSearchTerm,
}: SearchBannerProps) {
  return (
    <div className='flex w-full cursor-pointer  items-center justify-evenly shadow'>
      <div
        className={clsxm(
          'flex flex-auto justify-center border-l-2 border-t-2 border-b-2 p-5 text-gray-400',
          'text-black',
          'text-gray-400'
        )}
      >
        All
      </div>
      <div className='flex flex-auto justify-center border-t-2 border-b-2 p-5 text-gray-400'>
        New
      </div>
      <div className='flex  flex-auto justify-center border-t-2 border-b-2 p-5 text-gray-400'>
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
      <div className='flex flex-auto justify-center border-b-2 bg-pixsy p-5 text-white'>
        IMPORT
      </div>
    </div>
  );
}
