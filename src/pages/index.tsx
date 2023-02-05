import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import ImageSkeletonCard from '@/components/ImageSkeletonCard';
import { getMainLayout } from '@/components/layout/MainLayout';
import SearchBanner from '@/components/SearchBanner';
import Seo from '@/components/Seo';
import TopicCard from '@/components/TopicCard';

import useDebounce from '@/customHooks/useDebounce';
import { Topic } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: topics, isLoading } = useQuery<Topic>(
    ['topics', debouncedSearchTerm],
    async () => await getData(`/api/pixsyTopics?search=${searchTerm}`),
    {}
  );
  return (
    <div className=' h-screen'>
      <div className='flex w-full flex-col gap-5'>
        <SearchBanner
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tab='groups'
        />
        <div className='grid grid-cols-3 gap-12'>
          {topics &&
            Object.keys(topics).map((topic, i) => (
              <div key={i} className='relative '>
                <TopicCard topic={topic} topics={topics}></TopicCard>
              </div>
            ))}
          {isLoading &&
            [...Array(5)].map((item, index) => (
              <ImageSkeletonCard key={index}></ImageSkeletonCard>
            ))}
        </div>
      </div>
      <Seo />
    </div>
  );
}
HomePage.getLayout = getMainLayout('/');

//TODO: Skeleton loading, getData in backend muss noch effizient gemacht werden, responsive, aussehen, image collection, all and groups
