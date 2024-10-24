import Navbar from './navbar.jsx'


export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
      <>
          <Navbar></Navbar>
          <div>
            {children}
          </div>
      </>
    )
}