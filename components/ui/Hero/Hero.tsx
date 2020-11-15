import React, { FC } from 'react'
import Image from 'next/image'
import s from './Hero.module.css'
import cn from 'classnames'

interface Props {
  variant?: 'slim'| 'to-r' | string
  data?: any
}

const Hero: FC<Props> = ({ data, variant }) => {

  if (variant === 'to-r') {
    return (
      <div
        className="relative flex flex-col md:flex-row mb-4"
        style={{ height: '467px' }}
      >
        {data.background_image ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
          className="object-fill"
          alt="img"
          src={data.background_image.url}
          width={1120}
          height={467}
          layout="responsive"
          priority
          />
        </div>
        ) : null}
        <div className="flex-1" />
        <div className="flex flex-1 flex-col items-center justify-center z-10">
          {data.title && <h2 className="mb-2 text-lg font-medium tracking-wide text-center">{data.title}</h2>}
          {data.description && <div
            className="w-1/2 mb-4 text-center"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />}
          {data.link && <a className="uppercase font-semibold tracking-wide underline text-sm">
            {data.link.title}
          </a>}
        </div>
      </div>
    )
  }

  if (variant === 'slim') {
    const styleProps = data.background_image ? {
      minHeight: '220px'
    } : {}

    return (
      <div className="py-4 relative bg-red text-center mb-4 text-white bg-gradient-to-r from-red-dark to-red-light" style={styleProps}>
      {data.background_image ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
          className="object-fill"
          alt="img"
          src={data.background_image.url}
          width={1120}
          height={220}
          layout="responsive"
          priority
          />
        </div>
        ) : null}
        <div className="relative z-10 text-center">
        <h2 className="mb-2 text-lg font-medium tracking-wide">{data.title}</h2>
        <div
          className={cn(s.description, 'mb-2 text-center')}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <a className="uppercase font-semibold tracking-wide underline text-sm">
          {data.link.title}
        </a>
        </div>
      </div>
    )
  }


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
