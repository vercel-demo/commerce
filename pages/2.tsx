import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {
      products: [],
    },
    revalidate: 60,
  }
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <>
      <div></div>
    </>
  )
}

Home.Layout = Layout
