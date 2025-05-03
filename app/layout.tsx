import { Montserrat, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
});

export const metadata = {
  title: 'Jatin Goyal - Software Engineer',
  description: 'Personal portfolio and blog of Jatin Goyal, a software engineer specializing in web development and distributed systems.',
  metadataBase: new URL('https://jatingoyal.com'),
  openGraph: {
    title: 'Jatin Goyal',
    description: 'Portfolio website of Jatin Goyal, a Software Engineer specializing in Ruby, Java, Python, and cloud technologies.',
    url: 'https://jatingoyal.com',
    siteName: 'Jatin Goyal',
    images: [
      {
        url: '/images/profile.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jatin Goyal',
    description: 'Portfolio website of Jatin Goyal, a Software Engineer specializing in Ruby, Java, Python, and cloud technologies.',
    site: '@jatgoy',
    images: ['/images/profile.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${sourceSans.variable} scroll-smooth`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Source+Sans+3:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L58B15TGV4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L58B15TGV4');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="antialiased bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 