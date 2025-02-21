import { fetchRakutenRanking, Product } from '@/lib/rakutenApi'
import Card from '@/components/Card'

export default async function RankingPage() {
  const products: Product[] = await fetchRakutenRanking()

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        🏆 人気ランキング
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.itemCode} className="relative">
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow">
                {index + 1} 位
              </span>
              <Card
                id={product.itemCode}
                name={product.itemName}
                price={product.itemPrice}
                imageUrl={
                  product.mediumImageUrls[0]?.imageUrl || '/no-image.png'
                }
                affiliateUrl={product.affiliateUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          ランキングデータが取得できませんでした。
        </p>
      )}
    </main>
  )
}
