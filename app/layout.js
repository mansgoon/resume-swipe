import { Poppins } from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-poppins',
})

export const metadata = {
  title: "ResumeSwipe",
  description: "ResumeSwipe - A Collaborative Resume Review Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}
