import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Global, ThemeProvider, css } from '@emotion/react';
import { global } from '@/styles/globals';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <main>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </ThemeProvider>
    </>
  );
}
