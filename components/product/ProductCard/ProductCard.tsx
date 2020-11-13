import type { FC, ReactText } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'

interface Props {
  className?: string
  product: ProductNode
  variant?: 'slim' | 'simple'
  imgProps: Omit<ImageProps, 'src'> | any
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  variant,
  imgProps,
}) => {
  const src = p.images.edges?.[0]?.node?.urlOriginal!

  const { price } = usePrice({
    amount: p.prices?.price?.value,
    baseAmount: p.prices?.retailPrice?.value,
    currencyCode: p.prices?.price?.currencyCode!,
  })

  return (
    <Link href={`/product${p.path}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        <div className={s.squareBg} />
        <div className="flex flex-row justify-between box-border w-full z-20 absolute">
          <div className="absolute top-0 left-0 pr-16 max-w-full">
            <h3 className={s.productTitle}>
              <span>{p.name}</span>
            </h3>
            <span className={s.productPrice}>{price}</span>
          </div>
          <WishlistButton
            className={s.wishlistButton}
            productId={p.entityId}
            variant={p.variants.edges?.[0]!}
          />
        </div>
        <div className={s.imageContainer}>
          <Image
            {...imgProps}
            quality="75"
            src={src}
            alt={p.name}
            className={s.image}
          />
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
