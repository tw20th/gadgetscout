const SEARCH_API_URL =
  'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601'
const RANKING_API_URL =
  'https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601'
const APPLICATION_ID = process.env.RAKUTEN_APPLICATION_ID || ''

// ✅ ガジェット関連の楽天ジャンルID（PC・周辺機器）
const GADGET_GENRE_ID = '100026'

export type Product = {
  itemCode: string
  itemName: string
  itemPrice: number
  mediumImageUrls: { imageUrl: string }[]
  affiliateUrl: string
}

export type RakutenItem = {
  Item: {
    itemCode: string
    itemName: string
    itemPrice: number
    mediumImageUrls: { imageUrl: string }[]
    affiliateUrl?: string
  }
}

/**
 * 楽天APIでキーワード検索し、商品一覧を取得
 */
export async function fetchRakutenProducts(
  keyword: string,
): Promise<Product[]> {
  try {
    if (!APPLICATION_ID) throw new Error('楽天APIキーが設定されていません')

    console.log('📌 fetchRakutenProducts 実行: keyword =', keyword) // ✅ デバッグ用

    const response = await fetch(
      `${SEARCH_API_URL}?format=json&keyword=${encodeURIComponent(
        keyword,
      )}&applicationId=${APPLICATION_ID}&hits=10`,
    )
    const data = await response.json()

    console.log('📌 楽天APIレスポンス:', data) // ✅ APIのレスポンスを確認

    if (!data.Items) throw new Error('データが取得できませんでした')

    return data.Items.map((item: RakutenItem) => {
      // ✅ `affiliateUrl` が `null` または `"#"` の場合、楽天の商品検索ページURLを生成
      const rakutenProductUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
        item.Item.itemName,
      )}/`

      return {
        itemCode: item.Item.itemCode,
        itemName: item.Item.itemName,
        itemPrice: item.Item.itemPrice,
        mediumImageUrls: item.Item.mediumImageUrls,
        affiliateUrl:
          item.Item.affiliateUrl && item.Item.affiliateUrl !== '#'
            ? item.Item.affiliateUrl
            : rakutenProductUrl, // ✅ 修正
      }
    })
  } catch (error) {
    console.error('楽天APIエラー:', error)
    return []
  }
}

/**
 * 楽天APIで商品コードを指定して個別商品を取得
 */
export async function fetchRakutenProductById(
  id: string,
): Promise<Product | null> {
  try {
    if (!APPLICATION_ID) throw new Error('楽天APIキーが設定されていません')

    // ✅ `:` が `%3A` にエンコードされるのを防ぐ
    const formattedId = id.replace(/%3A/g, ':')

    console.log('📌 fetchRakutenProductById 実行: ID =', formattedId) // ✅ デバッグ用

    const response = await fetch(
      `${SEARCH_API_URL}?format=json&itemCode=${formattedId}&applicationId=${APPLICATION_ID}`,
    )
    const data = await response.json()

    console.log('📌 楽天APIレスポンス:', data) // ✅ APIのレスポンスを確認

    if (!data.Items || data.Items.length === 0) return null

    const item = data.Items[0].Item

    // ✅ `affiliateUrl` が `""`（空）または `"#"` の場合、楽天の商品検索ページURLを設定
    let affiliateUrl = item.affiliateUrl
    if (!affiliateUrl || affiliateUrl === '' || affiliateUrl === '#') {
      affiliateUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
        item.itemName,
      )}/`
    }

    console.log('📌 修正後の楽天購入リンク:', affiliateUrl) // ✅ 確認用

    return {
      itemCode: item.itemCode,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      mediumImageUrls: item.mediumImageUrls,
      affiliateUrl: affiliateUrl, // ✅ 修正
    }
  } catch (error) {
    console.error('楽天APIエラー:', error)
    return null
  }
}

/**
 * 楽天APIでガジェットカテゴリの売れ筋ランキングを取得
 */
export async function fetchRakutenRanking(): Promise<Product[]> {
  try {
    if (!APPLICATION_ID) throw new Error('楽天APIキーが設定されていません')

    console.log('📌 fetchRakutenRanking 実行: genreId =', GADGET_GENRE_ID) // ✅ デバッグ用

    const response = await fetch(
      `${RANKING_API_URL}?format=json&applicationId=${APPLICATION_ID}&genreId=${GADGET_GENRE_ID}&hits=10`,
    )
    const data = await response.json()

    console.log('📌 楽天APIランキングレスポンス:', data) // ✅ APIのレスポンスを確認

    if (!data.Items) throw new Error('ランキングデータが取得できませんでした')

    return data.Items.map((item: RakutenItem) => {
      // ✅ `affiliateUrl` が `"#"` の場合、楽天の商品検索ページURLを生成
      const rakutenProductUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
        item.Item.itemName,
      )}/`

      return {
        itemCode: item.Item.itemCode,
        itemName: item.Item.itemName,
        itemPrice: item.Item.itemPrice,
        mediumImageUrls: item.Item.mediumImageUrls,
        affiliateUrl:
          item.Item.affiliateUrl && item.Item.affiliateUrl !== '#'
            ? item.Item.affiliateUrl
            : rakutenProductUrl, // ✅ 修正
      }
    })
  } catch (error) {
    console.error('楽天APIランキング取得エラー:', error)
    return []
  }
}
