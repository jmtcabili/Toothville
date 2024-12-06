import Navbar from './navbar.jsx';
import Footer from '../footer.jsx';

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
    </>
  );
}
