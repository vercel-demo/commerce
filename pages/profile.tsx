import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { defatultPageProps } from '@lib/defaults'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { ...defatultPageProps, pages },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <div className="mt-3 mb-20">
      <Text variant="pageHeading">My Profile</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">Full Name</Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">Email</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Profile.Layout = Layout
