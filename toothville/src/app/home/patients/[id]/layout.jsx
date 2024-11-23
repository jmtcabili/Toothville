export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    return (
        <>
            <div className = "px-4 py-6 md:px-24">
                {children}
            </div>
            
        </>
      )
  }