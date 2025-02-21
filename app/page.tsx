import { fetchRakutenProducts, Product } from "@/lib/rakutenApi";
import Card from "@/components/Card";

export default async function Home() {
  const products: Product[] = await fetchRakutenProducts("ガジェット");

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* ヒーローセクション */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-gray-800">
          最新ガジェットを最安値でゲット！
        </h1>
        <p className="text-gray-600 mt-2">
          人気のガジェットを比較してお得に購入
        </p>
      </section>

      {/* 人気ランキング（ダミー） */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 人気ランキング</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product) => (
            <Card
              key={product.itemCode}
              id={product.itemCode}
              name={product.itemName}
              price={product.itemPrice}
              imageUrl={product.mediumImageUrls[0]?.imageUrl || "/no-image.png"}
              affiliateUrl={product.affiliateUrl}
            />
          ))}
        </div>
      </section>

      {/* 商品一覧 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🎉 最新ガジェット一覧</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.itemCode}
              id={product.itemCode}
              name={product.itemName}
              price={product.itemPrice}
              imageUrl={product.mediumImageUrls[0]?.imageUrl || "/no-image.png"}
              affiliateUrl={product.affiliateUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
