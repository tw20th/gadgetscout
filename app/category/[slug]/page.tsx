import { fetchRakutenProducts, Product } from '@/lib/rakutenApi'
import Card from '@/components/Card'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string } // ✅ ここが重要
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params
  const decodedSlug = decodeURIComponent(slug)
  const products: Product[] = await fetchRakutenProducts(decodedSlug)

  if (products.length === 0) {
    return notFound()
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800">
        🛍 カテゴリ: {decodedSlug}
      </h1>

      <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.itemCode}
            id={product.itemCode}
            name={product.itemName}
            price={product.itemPrice}
            imageUrl={product.mediumImageUrls[0]?.imageUrl || '/no-image.png'}
            affiliateUrl={product.affiliateUrl}
          />
        ))}
      </section>
    </main>
  )
}
