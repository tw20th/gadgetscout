import Link from 'next/link'
import Image from 'next/image'

type CardProps = {
  id: string
  name: string
  price: number
  imageUrl: string
  affiliateUrl: string
}

export default function Card({ id, name, price, imageUrl }: CardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-800">
          {name.length > 30 ? name.slice(0, 30) + '...' : name}
        </p>
        <p className="text-blue-600 font-bold mt-1">
          ¥{price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}
