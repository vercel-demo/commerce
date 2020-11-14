import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import s from './Grid.module.css'
import Image from 'next/image'

export interface GridEntity {
  grid: GridData
}

export interface GridData {
  item: ItemData
}

export interface ItemData {
  title: string
  description: string
  link: LinkData
  img?: any
}

export interface LinkData {
  title: string
  url: string
}

export interface DataProps {
  title: string
  description: string
  grid: GridData[]
}

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'cols4' | ''
  data?: DataProps
}

const Grid: FC<Props> = ({ className, children, variant, data = {} }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.variantCols4]: variant === 'cols4',
    },
    className
  )

  // If it contains data we build the childrens.
  const { grid } = data
  if (grid) {
    const meassureProps =
      variant === 'cols4'
        ? {
            width: 263,
            height: 365,
          }
        : {
            width: 365,
            height: 365,
          }

    return (
      <div>
        <div className="text-center mb-6">
          {data.title && (
            <h2 className="mb-2 text-xl font-medium tracking-wide uppercase">
              {data.title}
            </h2>
          )}
          {data.description && <p className="">{data.description}</p>}
        </div>
        <div className={rootClassName}>
          {grid.map(({ item }) => (
            <div className="flex flex-col items-center text-center mb-4">
              <div className="mb-2">
                <Image
                  alt="img"
                  src={item.img.url}
                  layout="fixed"
                  {...meassureProps}
                />
              </div>
              {item.title && (
                <h2 className="mb-2 text-lg font-medium tracking-wide uppercase">
                  {item.title}
                </h2>
              )}
              {item.description && (
                <p
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              <a className="uppercase font-semibold tracking-wide underline text-sm">
                {item!.link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <div className={rootClassName}>{children}</div>
}

export default Grid
