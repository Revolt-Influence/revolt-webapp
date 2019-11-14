import React from 'react'
import { usePageTitle } from '../utils/hooks'
import CreatorPaymentsOverview from '../components/CreatorPaymentsOverview'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import OrderedList from '../components/OrderedList'

const steps = [
  'Send quotes to brands for paid collabs',
  'Submit your reviews on Revolt',
  'Enter you bank details on Stripe',
  'We send you the agreed amount on your bank account via Stripe',
]

const RequestStripeConnectCreator: React.FC<{}> = () => {
  usePageTitle('Add bank details')
  return (
    <ContainerBox>
      <PageHeader title="Start getting paid for your collabs" />
      <OrderedList items={steps} />
      <CreatorPaymentsOverview />
    </ContainerBox>
  )
}

export default RequestStripeConnectCreator
