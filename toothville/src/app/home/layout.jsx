import Navbar from './navbar.jsx';
import Footer from '../footer.jsx';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
