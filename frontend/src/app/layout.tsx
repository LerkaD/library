import type { Metadata } from 'next';
// import { ThemeProvider } from './context/ThemeContext';
import { Geist, Geist_Mono } from 'next/font/google';
import LibraryNavBar from "../baseComponents/libraryNavBar/libraryNavBar";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { cookies } from 'next/headers';
import { ReduxProvider, ThemeInitializer } from '../provider/ReduxThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Library Manager',
  description: 'Library management application',
};

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // // get async cookies, cookies - server component
//   // const cookieStore = await cookies();
//   // // get cookie, as 'light' | 'dark' - typing (if return undefind  => light)
//   // const theme = cookieStore.get('theme')?.value as 'light' | 'dark' || 'light';

//   // return (
//   //   // data-bs-theme={theme} - bootstap attr, that swich value
//   //   <html lang="en" data-bs-theme={theme} suppressHydrationWarning>
//   //     {/* font settings*/}
//   //     <body className={`${geistSans.variable} ${geistMono.variable}`}>
//   //       {/* passes the server theme to the client component. */}
//   //       <ThemeProvider serverTheme={theme}>
//   //         <LibraryNavBar />
//   //         {children}
//   //       </ThemeProvider>
//   //     </body>
//   //   </html>
//   // );

//   return (
//     <Providers>
//       <LibraryNavBar />
//       {children}
//     </Providers>
//   );
// }



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies();
  const serverTheme = cookieStore.get('theme')?.value;

  return (
    <html
      lang="ru"
      data-bs-theme={serverTheme}
      suppressHydrationWarning
    >
      <body>
        <ReduxProvider>
          <ThemeInitializer>
            <LibraryNavBar />
            {children}
          </ThemeInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}