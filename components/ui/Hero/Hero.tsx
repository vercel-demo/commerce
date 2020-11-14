import React, { FC } from 'react'
import Image from 'next/image'

interface Props {
  variant?: 'slim' | string
  data?: any
}

const Hero: FC<Props> = ({ data, variant }) => {
  console.log(data)

  if (variant === 'slim') {
    return (
      <div className="bg-red text-center mb-4 p-6 text-white bg-gradient-to-r from-red-dark to-red-light">
        <h2 className="mb-2 text-lg font-medium tracking-wide">{data.title}</h2>
        <p
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <a className="uppercase font-semibold tracking-wide underline text-sm">
          {data.link.title}
        </a>
      </div>
    )
  }
  console.log(data.background_image.url)
  return (
    <div
      className="relative flex items-center justify-center text-center mb-4 bg-red"
      style={{ height: '467px' }}
    >
      {data.background_image ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            className="object-cover"
            alt="img"
            src={data.background_image.url}
            width={1120}
            height={467}
            layout="responsive"
            priority
          />
        </div>
      ) : null}
      <div className="bg-white p-6 w-96 z-10">
        <h2 className="text-lg uppercase px-12 mb-2">{data.title}</h2>
        <p
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <a className="uppercase font-semibold tracking-wide underline text-sm">
          {data.link.title}
        </a>
      </div>
    </div>
  )
}

export default Hero
