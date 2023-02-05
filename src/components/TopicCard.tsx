import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { checkPermission } from '@/lib/helper';

import { dummyUrl } from '@/constant/urls';
import { Topic } from '@/interfaces/PixsyData';

interface TopicsCardProps {
  topics: Topic;
  topic: string;
}

export default function TopicCard({ topics, topic }: TopicsCardProps) {
  return (
    <div className='relative cursor-pointer rounded-lg shadow duration-500 hover:-translate-y-2'>
      <Link href={`/images/${topic}`}>
        <div
          className={clsxm(
            'relative grid h-60 ',
            topics[topic]?.links.length == 1 ? 'grid-cols-1' : 'grid-cols-2 '
          )}
        >
          {topics[topic]?.links &&
            topics[topic]?.links.map((link, i) => (
              <div key={i} className='relative '>
                <Image
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw'
                  className=' self-stretch rounded-lg'
                  src={link && checkPermission(link) ? link : dummyUrl}
                  alt={topic}
                ></Image>
              </div>
            ))}
        </div>
      </Link>
      <div className='flex flex-col items-center justify-center p-2'>
        <span>{topic}</span>
        <span className='text-xs text-gray-400'>
          {topics[topic]?.count} Matches
        </span>
      </div>
    </div>
  );
}
