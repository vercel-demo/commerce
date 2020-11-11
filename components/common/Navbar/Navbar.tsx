import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
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
        <div className="bg-gray-200 py-2 px-6 font-medium uppercase tracking-wide">
          Sale | Up To 50% Off Select Full-priced Styles
        </div>
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
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
          </div>
          <div>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            <UserNav />
          </div>
        </div>

        <nav className="hidden lg:flex flex-row space-x-6 justify-center py-4 font-medium tracking-wide uppercase">
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
        </nav>
      </Container>
    </div>
  )
}

export default Navbar
