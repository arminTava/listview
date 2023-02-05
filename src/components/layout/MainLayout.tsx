import { AppProps } from 'next/app';
import Link from 'next/link';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { sideNavigations } from '@/constant/navigations';

export function getMainLayout(
  currentNavigationHref: keyof typeof sideNavigations
) {
  return ({ Component, pageProps }: AppProps) => {
    return (
      <>
        <main className=' flex'>
          <div className='bg-grey9 fixed top-0 left-0 flex h-screen w-24 flex-col  border-r border-r-[#E4E7EC] '>
            <main className=' '>
              <ul className='font-inter flex flex-col space-y-2'>
                <div className=' flex justify-center bg-pixsy p-2 text-white '>
                  PiXSY
                </div>
                {Object.entries(sideNavigations).map(([href, navigation]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      passHref
                      className={clsxm(
                        'font-inter hover:border-l-primary4 h-12 ',
                        !navigation.isAvailable && 'cursor-not-allowed'
                      )}
                    >
                      <div className='flex flex-col items-center justify-center'>
                        <navigation.icon
                          fill={href === currentNavigationHref ? '#0396A6' : ''}
                          className={clsxm(
                            'block self-center',
                            href === currentNavigationHref && 'text-primary3'
                          )}
                          size={32}
                        />

                        <p className='text-[8px] text-gray-400'>
                          {navigation.text}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </main>
          </div>
          <main className=' relative left-20 w-[calc(100%-6rem)] pl-32 pt-12 pr-20'>
            <Component {...pageProps} />
          </main>
        </main>
      </>
    );
  };
}
