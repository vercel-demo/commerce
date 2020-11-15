import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Container } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import { Sidebar, Modal, LoadingDots } from '@components/ui'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { CartSidebarView } from '@components/cart'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const LoginView = dynamic(
  () => import('@components/auth/LoginView'),
  dynamicProps
)
const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)
const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

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

interface Props {
  pageProps: {
    header: HeaderEntity
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()

  const { locale = 'en-US' } = useRouter()
  const { header } = pageProps

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <Navbar data={header} />

        <main className="fit">
          <Container>{children}</Container>
        </main>

        <Footer pages={pageProps.pages} />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>
      </div>
    </CommerceProvider>
  )
}

export default Layout
