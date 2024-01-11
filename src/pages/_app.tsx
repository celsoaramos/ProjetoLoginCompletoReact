import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <AuthProvider>
      <Toaster />
      <div className="w-full h-screen flex justify-center items-center overflow-hidden bg-white relative">
        <div className="flex flex-col justify-center items-center w-full h-full text-white text-base md:text-l">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  )
}
