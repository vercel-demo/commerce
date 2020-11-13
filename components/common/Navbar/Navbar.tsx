import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { UserNav, I18nWidget } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'

const Navbar: FC = () => {
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
          <span className="text-base uppercase tracking-wider font-bold">
            Sale | Up To 50% Off Select Full-priced Styles
          </span>
        </div>
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center"></div>

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
      </Container>

      <div className="py-4 border-b border-gray-300">
        <Container>
          <nav className="hidden lg:flex flex-row space-x-6 items-center justify-center font-semibold tracking-widest text-sm uppercase">
            <a className="cursor-pointer hover:text-gray-600">New Arrivals</a>
            <a className="cursor-pointer hover:text-gray-600">Holiday</a>
            <a className="cursor-pointer hover:text-gray-600">Get The Look</a>
            <a className="cursor-pointer hover:text-gray-600">Clothing</a>
            <a className="cursor-pointer hover:text-gray-600">
              Jewlery & Accesories
            </a>
            <a className="cursor-pointer hover:text-gray-600">Collections</a>
            <a className="cursor-pointer hover:text-gray-600">Petites</a>
            <a className="cursor-pointer hover:text-gray-600">Sale</a>
            <a className="cursor-pointer hover:text-gray-600">Search</a>
            <UserNav />
          </nav>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
