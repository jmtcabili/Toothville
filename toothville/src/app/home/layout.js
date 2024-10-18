import Navbar from './navbar.js'


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