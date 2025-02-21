'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      {/* ロゴ */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        GadgetScout
      </Link>

      {/* ナビゲーション */}
      <nav className="flex space-x-6">
        <Link
          href="/ranking"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          ランキング
        </Link>
        <Link
          href="/category/イヤホン"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          イヤホン
        </Link>
        <Link
          href="/category/スマートウォッチ"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          スマートウォッチ
        </Link>
      </nav>
    </header>
  )
}
