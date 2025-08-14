import type { Metadata } from 'next';
import LibraryNavBar from '../baseComponents/libraryNavBar/libraryNavBar';
import 'bootstrap/dist/css/bootstrap.css';;
import './globals.css';
import './globals.scss';
import { ReduxProvider } from '../provider/ReduxThemeProvider';
import ThemeInitializer from '../provider/Theminit';

export const metadata: Metadata = {
  title: 'Library Manager',
  description: 'Library management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeInitializer />
          <LibraryNavBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}