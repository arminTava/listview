import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import ImageCard from '@/components/ImageCard';
import ImageSkeletonCard from '@/components/ImageSkeletonCard';
import { getMainLayout } from '@/components/layout/MainLayout';
import SearchBanner from '@/components/SearchBanner';

import useDebounce from '@/customHooks/useDebounce';
import { PixsyData } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default function ImagesPage() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const currentTopic = router.query.topic as string;
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['images', router.query.topic, debouncedSearchTerm],
      async ({ pageParam = '' }) => {
        const url = `http://localhost:3000/api/images?topic=${router.query.topic}&cursor=${pageParam}&search=${searchTerm}`;
        return await getData(url);
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className='flex w-full flex-col gap-5 '>
      <SearchBanner
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tab={currentTopic === 'all' ? 'all' : 'groups'}
      />
      <Link href='/' className={currentTopic === 'all' ? 'hidden' : ''}>
        <AiOutlineArrowLeft className='cursor-pointer' />
      </Link>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        {data &&
          data.pages.map((page) => (
            <React.Fragment key={page.nextId ?? 'lastPage'}>
              {page.imageData.map((pisxyData: PixsyData) => (
                <div key={pisxyData.id}>
                  <ImageCard pisxyData={pisxyData}></ImageCard>
                </div>
              ))}
            </React.Fragment>
          ))}
        {isLoading &&
          [...Array(5)].map((item, index) => (
            <ImageSkeletonCard key={index}></ImageSkeletonCard>
          ))}
        {isFetchingNextPage &&
          [...Array(3)].map((item, index) => (
            <ImageSkeletonCard key={index}></ImageSkeletonCard>
          ))}
        <span ref={ref} style={{ visibility: 'hidden' }}>
          Intersection observer marker
        </span>
      </div>
    </div>
  );
}

ImagesPage.getLayout = getMainLayout('/');
