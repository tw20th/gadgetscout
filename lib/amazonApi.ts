const AMAZON_API_URL = 'https://api.example.com/amazon' // 実際のAPIエンドポイントに変更
const AMAZON_API_KEY = process.env.AMAZON_API_KEY || ''

/**
 * 商品名を使ってAmazonの検索結果ページのURLを作成
 */
export function getAmazonSearchUrl(productName: string): string {
  const encodedName = encodeURIComponent(productName)
  return `https://www.amazon.co.jp/s?k=${encodedName}`
}

export type Product = {
  itemCode: string
  itemName: string
  itemPrice: number
  mediumImageUrls: { imageUrl: string }[]
  affiliateUrl: string
}

/**
 * Amazon APIで商品情報を取得
 */
export async function fetchAmazonProductById(
  id: string,
): Promise<Product | null> {
  try {
    if (!AMAZON_API_KEY) {
      console.warn(
        'Amazon APIキーが設定されていないため、検索URLを使用します。',
      )
      return null // APIが使えない場合は検索URLを使う
    }

    const response = await fetch(
      `${AMAZON_API_URL}?itemCode=${encodeURIComponent(
        id,
      )}&apiKey=${AMAZON_API_KEY}`,
    )
    const data = await response.json()

    if (!data || !data.Item) return null

    return {
      itemCode: data.Item.ASIN,
      itemName: data.Item.Title,
      itemPrice: data.Item.Price,
      mediumImageUrls: [{ imageUrl: data.Item.ImageUrl }],
      affiliateUrl: data.Item.AffiliateUrl || '#',
    }
  } catch (error) {
    console.error('Amazon APIエラー:', error)
    return null
  }
}
