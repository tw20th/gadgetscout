import type { Metadata } from 'next'
import '@/styles/globals.css' // 正しいパス
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GadgetScout - ガジェット価格比較',
  description: '最新のガジェットを価格比較し、お得に購入！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">
        <Header />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
