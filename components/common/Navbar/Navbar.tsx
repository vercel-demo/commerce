import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { UserNav, I18nWidget } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import {Menu, MapPin, Search, Bag} from '@components/icons'
interface Props {
  data: HeaderEntity
}

interface HeaderEntity {
  links: LinksEntity[]
}

interface LinksEntity {
  link: Link
}

interface Link {
  title: string
  url: string
}

const Navbar: FC<Props> = ({ data = {} }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScroll = () => {
    const offset = 0
    const { scrollTop } = document.documentElement
    const scrolled = scrollTop > offset
    setHasScrolled(scrolled)
  }

  useEffect(() => {
    document.addEventListener('scroll', throttle(handleScroll, 200))
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="flex items-center bg-accents-3 py-2 px-6">
          <div className="mr-2">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <span className="text-base uppercase tracking-wider font-medium">
            Sale | Up To 50% Off Select Full-priced Styles
          </span>
        </div>
        <div className="flex justify-between items-center flex-row px-2 py-2 md:py-2 relative">
          <div className="flex flex-1 md:flex">
            <a className={s.link}>My Chico Closet</a>
          </div>
          <div>
            <Link href="/">
              <span className="cursor-pointer">
                <Logo />
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <nav className="space-x-4 ml-6 hidden lg:block">
              <Link href="/">
                <a className={s.link}>Sign In</a>
              </Link>
              <Link href="/search?q=clothes">
                <a className={s.link}>Register</a>
              </Link>
              <Link href="/search?q=accessories">
                <a className={s.link}>Find a Store</a>
              </Link>
            </nav>
            <span className="ml-3">
              <I18nWidget />
            </span>
          </div>
        </div>
        <div className="border-t border-b divide-gray-400 divide-x bg-gray-200 grid grid-cols-4 md:hidden text-center uppercase text-sm tracking-widest">
          <div className="flex flex-col items-center py-3">
            <Menu  width="18"/>
            <span className="mt-1">Menu</span>
          </div>
          <div className="flex flex-col items-center py-3">
            <MapPin width="18"/>
            <span className="mt-1">Stores</span>
            </div>
          <div className="flex flex-col items-center py-3">
            <Search  width="18"/>
            <span className="mt-1">Search</span>
          </div>
          <div className="flex flex-col items-center py-3">
            <Bag width="18"/>
            <span className="mt-1">Bag</span>
          </div>
        </div>
      </Container>


      <div className=" border-b border-gray-300 px-4 md:pb-1">
        <Container>
          <nav className="hidden lg:flex flex-row space-x-8 items-center justify-center font-semibold tracking-widest text-sm uppercase">
            {data.links?.map(({ link }) => (
              <a
                className="cursor-pointer hover:text-gray-600 text-center"
                href={link.url}
                key={link.title}
              >
                {link.title}
              </a>
            ))}

            <a className="cursor-pointer hover:text-gray-600" href="/">
              Search
            </a>
            <UserNav />
          </nav>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
