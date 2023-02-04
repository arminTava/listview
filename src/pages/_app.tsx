import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
export const queryClient = new QueryClient();

type AppPropsExtended = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (appProps: AppProps) => JSX.Element;
  };
};
function MyApp(props: AppPropsExtended) {
  const getLayout =
    props.Component.getLayout ||
    ((props) => {
      return <props.Component {...props.pageProps} />;
    });

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(props)}
    </QueryClientProvider>
  );
}

export default MyApp;
