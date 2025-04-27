export const metadata = {
  title: '14 Lokas of Hindu Cosmology',
  description: 'Explore the fourteen realms (Lokas) of Hindu cosmology in a visually immersive journey',
  keywords: 'Hindu cosmology, Lokas, spiritual, Satya-loka, Tapa-loka, Jana-loka, Mahar-loka, Svar-loka, Bhuvar-loka, Bhu-loka, Atala, Vitala, Sutala, Talatala, Mahatala, Rasatala, Patala',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#f5f5f5" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}