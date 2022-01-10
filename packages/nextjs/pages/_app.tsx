import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContext, theme } from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContext.Provider value={theme}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp
