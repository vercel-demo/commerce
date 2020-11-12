import { FC } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import s from './DropdownMenu.module.css'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
import { useRouter } from 'next/router'

interface DropdownMenuProps {
  open?: boolean
}

const LINKS = [
  {
    name: 'My Orders',
    href: '/orders',
  },
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'My Cart',
    href: '/cart',
  },
]

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const { theme, setTheme } = useTheme()
  const logout = useLogout()
  const { pathname } = useRouter()

  const { closeSidebarIfPresent } = useUI()

  return open ? (
    <ul className={s.dropdownMenu}>
      {LINKS.map(({ name, href }) => (
        <li key={href}>
          <div>
            <Link href={href}>
              <a
                className={cn(s.link, {
                  [s.active]: pathname === href,
                })}
                onClick={closeSidebarIfPresent}
              >
                {name}
              </a>
            </Link>
          </div>
        </li>
      ))}
      <li>
        <a
          className={cn(s.link, 'justify-between')}
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
        >
          <div>
            Theme: <strong>{theme}</strong>{' '}
          </div>
          <div className="ml-3">
            {theme == 'dark' ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width="20" height={20} />
            )}
          </div>
        </a>
      </li>
      <li>
        <a
          className={cn(s.link, 'border-t border-accents-2 mt-4')}
          onClick={() => logout()}
        >
          Logout
        </a>
      </li>
    </ul>
  ) : null
}

export default DropdownMenu
