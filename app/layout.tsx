import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/provider';

const inter = Inter({ 
  subsets: ['latin'],
  // display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Issue Tracker',
    default: 'Issue Tracker',
  },
  description: 'Issue and Project Trackers',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* <body className={inter.className}> */}
      <body >
        <AuthProvider>
          <Theme appearance="light" grayColor="mauve">
            <NavBar/>
            <main className='p-5'>
              {children}
            </main>
            {/* <ThemePanel/> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
