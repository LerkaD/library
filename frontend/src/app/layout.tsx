import type { Metadata } from 'next';
import LibraryNavBar from '../baseComponents/libraryNavBar/libraryNavBar';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/globals.scss';
import { ReduxProvider, ClientOnly, ThemeInitializer } from '../provider/ReduxThemeProvider';
import { AuthProvider } from '@/provider/AuthChekerProvidef';

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
          <ClientOnly>
            <ThemeInitializer />
            <AuthProvider>
              <LibraryNavBar />
              {children}
            </AuthProvider>
          </ClientOnly>
        </ReduxProvider>
      </body>
    </html>
  );
}
