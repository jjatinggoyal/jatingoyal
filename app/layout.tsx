import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const description =
  'Jatin Goyal — Senior AI Engineer at Javis Technologies, building real-time voice AI agents and the SIP telephony stack behind them.';

export const metadata = {
  title: 'Jatin Goyal — Senior AI Engineer',
  description,
  metadataBase: new URL('https://jatingoyal.com'),
  openGraph: {
    title: 'Jatin Goyal — Senior AI Engineer',
    description,
    url: 'https://jatingoyal.com',
    siteName: 'Jatin Goyal',
    images: [
      {
        url: '/images/profile.jpg',
        width: 640,
        height: 640,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Jatin Goyal — Senior AI Engineer',
    description,
    site: '@jatgoy',
    images: ['/images/profile.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  themeColor: '#05060a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable} scroll-smooth`}>
      <head>
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
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Jatin Goyal" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
