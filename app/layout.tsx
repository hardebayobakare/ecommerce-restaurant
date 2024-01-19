import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/nav-bar'
import ModalProvider from '@/provider/modal-provider';

import './globals.css'



const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurant',
  description: 'Restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
