import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

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
