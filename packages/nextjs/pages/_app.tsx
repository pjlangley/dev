import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContext, theme } from '../lib/theme'
import { wrapper, nextjsSlice } from '../lib/store'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(nextjsSlice.actions.setReady(true))
  }, [dispatch])

  return (
    <ThemeContext.Provider value={theme}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default wrapper.withRedux(MyApp)
