import './globals.css'

export const metadata = {
  title: 'Twelve Car Garage',
  description: 'Rate and review cars like never before',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}