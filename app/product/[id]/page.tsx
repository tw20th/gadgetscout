import { fetchRakutenProductById, Product } from '@/lib/rakutenApi'
import { getAmazonSearchUrl } from '@/lib/amazonApi'
import Image from 'next/image'

type Props = {
  params: { id: string }
}

export default async function ProductPage({ params }: Props) {
  const product: Product | null = await fetchRakutenProductById(params.id)

  console.log('📌 取得した商品データ:', product) // ✅ デバッグ用

  if (!product) {
    return (
      <p className="text-center text-gray-600 mt-10">
        商品が見つかりませんでした。
      </p>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {product.itemName}
      </h1>

      <Image
        src={product.mediumImageUrls[0]?.imageUrl || '/no-image.png'}
        alt={product.itemName}
        width={400}
        height={400}
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      <p className="text-blue-600 font-bold text-xl mt-4">
        ¥{product.itemPrice.toLocaleString()}
      </p>

      <div className="mt-6 flex gap-4">
        {/* ✅ 修正: `target="_blank" rel="noopener noreferrer"` を追加 */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
        >
          楽天で購入
        </a>

        <a
          href={getAmazonSearchUrl(product.itemName)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 transition"
        >
          Amazonで検索
        </a>
      </div>
    </main>
  )
}
