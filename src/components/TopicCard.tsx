import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Topic } from '@/interfaces/PixsyData';

interface TopicsCardProps {
  topics: Topic;
  topic: string;
}

export default function TopicCard({ topics, topic }: TopicsCardProps) {
  // const { data: topics } = useQuery<Topic>(
  //   'topics',
  //   async () => await getData('/api/pixsyTopics'),
  //   {}
  // );
  console.log(topics);

  return (
    <div className='relative cursor-pointer rounded-lg shadow duration-500 hover:-translate-y-2'>
      <Link href={`/images/${topic}`}>
        <div className='relative h-60 '>
          <Image
            style={{ objectFit: 'cover' }}
            fill
            sizes='(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw'
            className=' self-stretch rounded-lg'
            src={
              topics[topic]?.links?.length > 0 ? topics[topic]?.links[0] : ''
            }
            alt={topic}
          ></Image>
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
