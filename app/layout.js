
import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'Incubia Dashboard',
  description: 'Admin dashboard for managing submissions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 bg-[#f8f9fc] p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
