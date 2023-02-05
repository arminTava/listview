import Image from 'next/image';
import React from 'react';

import { checkPermission } from '@/lib/helper';

import { dummyUrl } from '@/constant/urls';
import { PixsyData } from '@/interfaces/PixsyData';

interface ImageCardProps {
  pisxyData: PixsyData;
}

export default function ImageCard({ pisxyData }: ImageCardProps) {
  return (
    <div className='xs:items-stretch relative mb-3  flex h-[420px] flex-col rounded-lg bg-white text-dark shadow '>
      <div className='relative h-60 flex-none'>
        <Image
          style={{ objectFit: 'cover' }}
          fill
          sizes='(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw'
          className='self-stretch rounded-lg'
          src={
            pisxyData.url && checkPermission(pisxyData.url)
              ? pisxyData.url
              : dummyUrl
          }
          alt={pisxyData.user}
        ></Image>
      </div>
      <div className='pt-3'>
        <div className='flex'>
          <h4 className='px-4 py-1 '>{pisxyData.user}</h4>
          <a
            type='button'
            target='_blank'
            rel='noopener noreferrer'
            href={pisxyData.link}
            className=' flex w-32 items-center justify-center rounded-lg bg-pixsy p-2 text-white'
          >
            Visit website
          </a>
        </div>

        <div className='text-grey3 mt-3 px-4 py-1 line-clamp-3'>
          {pisxyData.description}
        </div>
      </div>
    </div>
  );
}
