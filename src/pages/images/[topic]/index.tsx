import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import ImageCard from '@/components/ImageCard';
import { getMainLayout } from '@/components/layout/MainLayout';
import SearchBanner from '@/components/SearchBanner';

import useDebounce from '@/customHooks/useDebounce';
import { PixsyData } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default function ImagesPage() {
  const router = useRouter();
  console.log(router.query);
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['images', router.query.topic, debouncedSearchTerm],
    async ({ pageParam = '' }) => {
      console.log('pageParam', pageParam);
      const url = `http://localhost:3000/api/images?topic=${router.query.topic}&cursor=${pageParam}&search=${searchTerm}`;

      return await getData(url);
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  useEffect(() => {
    console.log('inView', inView);
    console.log('hasNextPage', hasNextPage);

    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(data);
  return (
    <div className='flex w-full flex-col gap-5 '>
      <SearchBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Link href='/'>
        <AiOutlineArrowLeft className='cursor-pointer' />
      </Link>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        {data &&
          data.pages.map((page, index) => (
            <React.Fragment key={page.nextId ?? 'lastPage'}>
              {page.imageData.map((pisxyData: PixsyData) => (
                <div key={pisxyData.id}>
                  <ImageCard pisxyData={pisxyData}></ImageCard>
                </div>
              ))}
            </React.Fragment>
          ))}
        <span ref={ref} style={{ visibility: 'hidden' }}>
          Intersection observer marker
        </span>
      </div>
    </div>
  );
}

ImagesPage.getLayout = getMainLayout('/');
