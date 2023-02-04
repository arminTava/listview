import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getMainLayout } from '@/components/layout/MainLayout';
import SearchBanner from '@/components/SearchBanner';
import Seo from '@/components/Seo';
import TopicCard from '@/components/TopicCard';

import useDebounce from '@/customHooks/useDebounce';
import { Topic } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default function HomePage() {
  const [isSelected, setIsSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: topics } = useQuery<Topic>(
    ['topics', debouncedSearchTerm],
    async () => await getData(`/api/pixsyTopics?search=${searchTerm}`),
    {}
  );
  console.log('topics', topics);
  return (
    <div className=' h-screen'>
      <div className='flex w-full flex-col gap-5'>
        <SearchBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className='grid grid-cols-3 gap-12'>
          {topics &&
            Object.keys(topics).map((topic, i) => (
              <div key={i} className='relative '>
                <TopicCard topic={topic} topics={topics}></TopicCard>
              </div>
            ))}
        </div>
      </div>
      <Seo />
    </div>
  );
}
HomePage.getLayout = getMainLayout('/');

//TODO: Skeleton loading, getData in backend muss noch effizient gemacht werden, responsive, aussehen
