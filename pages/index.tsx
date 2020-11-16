import React from 'react'
import * as Contentstack from 'contentstack'
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Layout } from '@components/common'
import { Container, UIComponent } from '@components/ui'
import { UIComponentEntity } from '@components/ui/UIComponent'
import { defatultPageProps } from '@lib/defaults'
interface PageProps {
  locale: string
  seo: string
  blocks: UIComponentEntity[]
  header: HeaderEntity[]
}

interface HeaderEntity {
  links: Link[]
}

interface Link {
  title: string
  url: string
}

export async function getStaticProps({}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<PageProps> | undefined
> {
  try {
    const Stack = Contentstack.Stack(
      process.env.CONTENTSTACK_API_KEY as string,
      process.env.CONTENTSTACK_ACCESS_TOKEN as string,
      process.env.NODE_ENV
    )

    const query = Stack.ContentType('home_page').Entry('blt5c760b6ce70ae18b')
    const result = await query.fetch()
    const { modular_blocks: blocks, seo, locale, header } = result.toJSON()

    return {
      props: {
        ...defatultPageProps,
        seo,
        locale,
        blocks,
        header,
      },
      revalidate: 1,
    }
  } catch (err) {
    console.error(err)
  }
}

export default function Home({ seo, locale, blocks }: PageProps) {
  return (
    <Container>
      {blocks.map(({ component }, i) => {
        const { component_type, component_variant, ...rest } = component
        return (
          <UIComponent
            key={`${component_type}_${i}`}
            componentType={component_type}
            componentVariant={component_variant}
            data={rest}
          />
        )
      })}
    </Container>
  )
}

Home.Layout = Layout
