import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Container } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { defatultPageProps } from '@lib/defaults'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      ...defatultPageProps,
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="min-h-64 flex items-center justify-center bg-red text-center p-16">
        <div className="inset-0 bg-white p-6 w-96">
          <h2 className="text-lg uppercase px-12 mb-2">
            The Jacket you need now
          </h2>
          <p className="mb-2">
            Our best-selling quilted jacket chases away the chill in new colors
            and prints, with contrasting details.
          </p>
          <a
            className="uppercase font-semibold tracking-wide underline text-sm"
            href="/"
          >
            Shop Now
          </a>
        </div>
      </div>
      <div className="bg-red text-center my-4 p-6 text-white bg-gradient-to-r from-red-dark to-red-light">
        <h2 className="mb-2 text-lg font-medium tracking-wide">
          <strong>25% OFF</strong> FULL-PRICED STYLES
        </h2>
        <p className="mb-2">Use Code 84778 | Exclusions Apply</p>
        <a
          className="uppercase font-semibold tracking-wide underline text-sm"
          href="/"
        >
          SHOP NOW | DETAILS
        </a>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red h-64 flex items-center justify-center">
          <a
            className="uppercase font-semibold tracking-wide underline text-sm"
            href="/"
          >
            TOPS
          </a>
        </div>
      </div>
      <HomeAllProductsGrid
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
      />
    </Container>
  )
}

Home.Layout = Layout
