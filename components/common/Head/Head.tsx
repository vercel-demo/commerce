import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import defaultSeoConfig from '@config/seo.json'

interface Props {
  seo: any
}

const Head: FC<Props> = ({ seo }) => {
  const seoNewConfig = seo
    ? {
        ...defaultSeoConfig,
        title: seo.title,
        description: seo.description,
        titleTemplate: seo.titleTemplate,
        twitter: {
          handle: seo.twitter_handle,
        },
      }
    : defaultSeoConfig

  return (
    <>
      <DefaultSeo {...seoNewConfig} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
        />
      </NextHead>
    </>
  )
}

export default Head
