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
                <div className=' bg-blue-900'>PiXSY</div>
                {Object.entries(sideNavigations).map(([href, navigation]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      passHref
                      className={clsxm(
                        'font-inter hover:border-l-primary4 flex h-12 flex-col items-center justify-center',
                        href === currentNavigationHref &&
                          ' border-l-primary4 bg-primary9 text-primary2 border-l-4'
                      )}
                    >
                      <navigation.icon
                        className={clsxm(
                          'block self-center',
                          href === currentNavigationHref && 'text-primary3'
                        )}
                        size={32}
                      />

                      <p className='text-[8px] text-gray-400'>
                        {navigation.text}
                      </p>
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
