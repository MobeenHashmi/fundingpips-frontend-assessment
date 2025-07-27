import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'fundingPips - Real-Time Tracking Stocks Web App',
  description: 'Experience real-time tracking with our advanced tracking simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Providers>{children}</Providers>
          <Toaster
              position="top-center"
              richColors
              toastOptions={{
                classNames: {
                  success: 'bg-green-600 text-white',
                  error: 'bg-red-600 text-white',
                },
              }}
            />
        </ThemeProvider>
      </body>
    </html>
  )
}
