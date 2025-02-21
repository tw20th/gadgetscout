export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 p-4 text-center">
      <p className="text-sm text-gray-600">
        © 2025 GadgetScout. All rights reserved.
      </p>
      <div className="mt-2 space-x-4">
        <a href="/terms" className="text-gray-700 hover:text-blue-500">
          利用規約
        </a>
        <a href="/privacy" className="text-gray-700 hover:text-blue-500">
          プライバシーポリシー
        </a>
      </div>
    </footer>
  )
}
