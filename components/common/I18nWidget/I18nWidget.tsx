import { FC } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { DoubleChevron } from '@components/icons'
import s from './I18nWidget.module.css'

interface LOCALE_DATA {
  name: string
  img: {
    filename: string
    alt: string
  }
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  es: {
    name: 'Español',
    img: {
      filename: 'flag-es-co.svg',
      alt: 'Bandera Colombiana',
    },
  },
  'en-US': {
    name: 'English',
    img: {
      filename: 'flag-en-us.svg',
      alt: 'US Flag',
    },
  },
}

const I18nWidget: FC = () => {
  const {
    locale,
    locales,
    defaultLocale = 'en-US',
    asPath: currentPath,
  } = useRouter()
  const options = locales?.filter((val) => val !== locale)

  const currentLocale = locale || defaultLocale

  return (
    <nav className={s.root}>
      <Menu>
        <Menu.Button className={s.button} aria-label="Language selector">
          <img
            className="block mr-2 w-5"
            src={`/${LOCALES_MAP[currentLocale].img.filename}`}
            alt={LOCALES_MAP[currentLocale].img.alt}
          />
          {/* <span className="mr-2">{LOCALES_MAP[currentLocale].name}</span> */}
          {options && (
            <span>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                shape-rendering="geometricPrecision"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          )}
        </Menu.Button>

        {options?.length ? (
          <Menu.Items className={s.dropdownMenu}>
            {options.map((locale) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <Link href={currentPath} locale={locale}>
                    <a className={cn(s.item, { [s.active]: active })}>
                      {LOCALES_MAP[locale].name}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        ) : null}
      </Menu>
    </nav>
  )
}

export default I18nWidget
