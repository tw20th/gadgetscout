import { fetchRakutenProductById, Product } from '@/lib/rakutenApi'
import { fetchAmazonProductById } from '@/lib/amazonApi'
import Image from 'next/image'

type Props = {
  params: { id: string }
}

export default async function ComparePage({ params }: Props) {
  const rakutenProduct: Product | null = await fetchRakutenProductById(
    params.id,
  )
  const amazonProduct: Product | null = await fetchAmazonProductById(params.id)

  if (!rakutenProduct && !amazonProduct) {
    return (
      <p className="text-center text-gray-600 mt-10">
        商品が見つかりませんでした。
      </p>
    )
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        💰 価格比較
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 楽天の商品 */}
        {rakutenProduct && (
          <div className="border rounded-lg overflow-hidden shadow-sm p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              楽天市場
            </h2>
            <Image
              src={
                rakutenProduct.mediumImageUrls[0]?.imageUrl || '/no-image.png'
              }
              alt={rakutenProduct.itemName}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <p className="font-bold text-blue-600 text-lg mt-2">
              ¥{rakutenProduct.itemPrice.toLocaleString()}
            </p>
            <a
              href={rakutenProduct.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-red-500 text-white mt-4 py-2 rounded hover:bg-red-600 transition"
            >
              楽天で購入
            </a>
          </div>
        )}

        {/* Amazon の商品 */}
        {amazonProduct && (
          <div className="border rounded-lg overflow-hidden shadow-sm p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Amazon</h2>
            <Image
              src={
                amazonProduct.mediumImageUrls[0]?.imageUrl || '/no-image.png'
              }
              alt={amazonProduct.itemName}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <p className="font-bold text-green-600 text-lg mt-2">
              ¥{amazonProduct.itemPrice.toLocaleString()}
            </p>
            <a
              href={amazonProduct.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-yellow-500 text-black mt-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Amazonで購入
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
