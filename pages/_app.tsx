import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

/**
 *
 * @param {AppProps} AppProps Props of next app library
 * @param {AppProps.Component} AppProps.Component Component object from AppProps
 * @param {AppProps.pageProps} AppProps.PageProps dfdfdfd
 * @returns {ReactElement} React Elements will be return JSX elements
 */
export default function App({ Component, pageProps }: AppProps): ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />
}
