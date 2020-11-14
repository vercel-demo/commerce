import React from 'react'
import * as Contentstack from 'contentstack'
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Layout } from '@components/common'
import { Container, UIComponent } from '@components/ui'
import { UIComponentEntity } from '@components/ui/UIComponent'

interface PageProps {
  locale: string
  seo: string
  blocks: UIComponentEntity[]
}

export async function getStaticProps({}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<PageProps> | undefined
> {
  // TODO (BC) Move this to env
  const Stack = Contentstack.Stack(
    'blt37e5d9fa4b15e084',
    'cs03fc78eabffd6082acc28070',
    'production'
  )

  try {
    // TODO (BC) Move this to lib
    const query = Stack.ContentType('home_page').Entry('blt5c760b6ce70ae18b')
    const result = await query.fetch()
    const { modular_blocks: blocks, seo, locale } = result.toJSON()

    return {
      props: {
        seo,
        locale,
        blocks,
      },
      revalidate: 2,
    }
  } catch (err) {
    console.error(err)
  }
}

export default function Home({ seo, locale, blocks }: PageProps) {
  console.log(seo, locale, blocks)
  return (
    <Container>
      {blocks.map(({ component }) => {
        const { component_type, component_variant, ...rest } = component
        return (
          <UIComponent
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
