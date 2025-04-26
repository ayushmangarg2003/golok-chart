export const metadata = {
  title: 'Golok Chart - Hindu Cosmology Explorer',
  description: 'Explore the sacred realms of Hindu cosmology and understand their divine significance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}