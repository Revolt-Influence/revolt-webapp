import React, { Suspense, lazy } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Landing from '../pages/Landing'
import { useClientSize } from '../utils/hooks'
import { GetSession } from '../__generated__/GetSession'
import { SessionType } from '../__generated__/globalTypes'
import ErrorBoundary from './ErrorBoundary'
import ErrorCard from './ErrorCard'
import Footer from './Footer'
import Loader from './Loader'
import Navbar from './Navbar'
import { GET_SESSION } from './Session'
import { ContainerBox } from '../styles/grid'

const CampaignDashboard = lazy(() => import('../pages/CampaignDashboard'))
const UserSignup = lazy(() => import('../pages/UserSignup'))
const CreatorSignup = lazy(() => import('../pages/CreatorSignup'))
const Login = lazy(() => import('../pages/Login'))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'))
const UserAccount = lazy(() => import('../pages/UserAccount'))
const CreatorAccount = lazy(() => import('../pages/CreatorAccount'))
const NotFound = lazy(() => import('../pages/NotFound'))
const ResetPassword = lazy(() => import('../pages/ResetPassword'))
const CampaignsList = lazy(() => import('../pages/CampaignsList'))
const CollabsList = lazy(() => import('../pages/CollabsList'))
const ProductsList = lazy(() => import('../pages/ProductsList'))
const Product = lazy(() => import('../pages/Product'))
const CampaignForm = lazy(() => import('../pages/CampaignForm'))
const ConnectSocialAccount = lazy(() => import('../pages/ConnectSocialAccount'))
const AmbassadorProgram = lazy(() => import('../pages/AmbassadorProgram'))
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'))
const Conversation = lazy(() => import('../pages/Conversation'))
const ConversationsList = lazy(() => import('../pages/ConversationsList'))
const Community = lazy(() => import('../pages/Community'))
const PreCampaignForm = lazy(() => import('../pages/PreCampaignForm'))
const StripeConnectCreatorCallback = lazy(() => import('../pages/StripeConnectCreatorCallback'))
const RequestUserPaymentMethod = lazy(() => import('../pages/RequestUserPaymentMethod'))
const UserAddedPaymentMethodCallback = lazy(() => import('../pages/UserAddedPaymentMethodCallback'))

const Layout = styled.div<{ minHeight: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${props => `${props.minHeight}px` || '100vh'};

  main.main {
    flex: 1;
  }
`

const RouterSwitch: React.FC<RouteComponentProps> = () => {
  const { data: { session } = { session: null }, loading, error } = useQuery<GetSession>(
    GET_SESSION
  )

  const clientHeight = useClientSize().height

  if (loading) {
    return <Loader fullScreen />
  }

  if (error) {
    return (
      <ContainerBox>
        <ErrorCard message="Something went wrong" />
      </ContainerBox>
    )
  }

  const { isLoggedIn, sessionType, user, creator } = session

  const renderRoot = () => {
    if (!isLoggedIn) {
      return <Landing />
    }
    if (sessionType === SessionType.BRAND) {
      return <Redirect to="/brand" />
    }
    if (sessionType === SessionType.CREATOR) {
      return <Redirect to="/creator" />
    }
    // Should not happen, here just in case
    return <Landing />
  }

  const renderUserSignup = () => {
    // Only allow access if the user is not logged in
    if (isLoggedIn) {
      return <Redirect to="/" />
    }
    return <UserSignup />
  }

  const renderCreatorSignup = () => {
    // Only allow access if the user is not logged in
    if (isLoggedIn) {
      return <Redirect to="/" />
    }
    return <CreatorSignup />
  }

  const renderLogin = () => {
    // Only allow access if the user is not logged in
    if (isLoggedIn) {
      return <Redirect to="/" />
    }
    return <Login />
  }

  const renderUserAccount = () => {
    // Only allow access if the user is logged in
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <UserAccount />
  }

  const renderCreatorAccount = () => {
    // Only allow access if the user is logged in
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <CreatorAccount />
  }

  const renderCampaignsList = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <CampaignsList />
  }

  const renderProductsList = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <ProductsList />
  }

  const renderCollabsList = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <CollabsList />
  }

  const renderProduct = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <Product />
  }

  const renderCampaignDashboard = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return (
      <ErrorBoundary message="Could not show campaign">
        <CampaignDashboard />
      </ErrorBoundary>
    )
  }

  const renderConnectSocialAccount = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    if (sessionType !== SessionType.CREATOR) {
      return <NotFound />
    }
    if (creator.youtube != null) {
      window.scrollTo(0, 0)
      return <Redirect to="/creator" />
    }
    return <ConnectSocialAccount />
  }

  const renderCampaignForm = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <CampaignForm />
  }

  const renderCommunity = () => {
    if (!user.isAdmin) {
      return <Redirect to="/" />
    }
    return <Community />
  }

  const brandRouterSwitch = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    if (sessionType !== SessionType.BRAND) {
      return <NotFound />
    }
    return (
      <Switch>
        <Route exact path="/brand" render={() => <Redirect to="/brand/campaigns" />} />
        <Route exact path="/brand/createCampaign" component={PreCampaignForm} />
        <Route exact path="/brand/campaigns" render={renderCampaignsList} />
        <Route
          exact
          path="/brand/campaigns/:campaignId"
          render={({ match }) => (
            <Redirect to={`/brand/campaigns/${match.params.campaignId}/dashboard`} />
          )}
        />
        <Route path="/brand/campaigns/:campaignId/dashboard" render={renderCampaignDashboard} />
        <Route path="/brand/campaigns/:campaignId/brief" render={renderCampaignForm} />
        <Route path="/brand/myAccount" render={renderUserAccount} />
        <Route path="/brand/messages/:conversationId" component={Conversation} />
        <Route exact path="/brand/messages" component={ConversationsList} />
        <Route path="/brand/community" render={renderCommunity} />
        <Route path="/brand/requestPaymentMethod" component={RequestUserPaymentMethod} />
        <Route
          path="/brand/addedPaymentMethodCallback"
          component={UserAddedPaymentMethodCallback}
        />
        {/* Handle 404 */}
        <Route component={NotFound} />
      </Switch>
    )
  }

  const creatorRouterSwitch = (routeProps: RouteComponentProps) => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    if (sessionType !== SessionType.CREATOR) {
      return <NotFound />
    }
    const hasNoNetwork = creator.youtube == null
    if (hasNoNetwork && routeProps.location.pathname !== '/creator/myAccount') {
      return <Redirect to="/connectSocialAccount" />
    }
    return (
      <Switch>
        <Route exact path="/creator" render={() => <Redirect to="/creator/games" />} />
        <Route exact path="/creator/games" render={renderProductsList} />
        <Route exact path="/creator/collabs" render={renderCollabsList} />
        <Route exact path="/creator/games/:campaignId" render={renderProduct} />
        <Route exact path="/creator/ambassador" component={AmbassadorProgram} />
        <Route path="/creator/myAccount" render={renderCreatorAccount} />
        <Route path="/creator/messages/:conversationId" component={Conversation} />
        <Route exact path="/creator/messages" component={ConversationsList} />
        <Route path="/creator/stripeCreatorCallback" component={StripeConnectCreatorCallback} />
        {/* Handle 404 */}
        <Route component={NotFound} />
      </Switch>
    )
  }

  return (
    <Layout minHeight={clientHeight}>
      {/* Main content */}
      <Navbar />
      <main className="main">
        <Suspense fallback={<Loader fullScreen />}>
          <Switch>
            <Route exact path="/" render={renderRoot} />
            {/* All brand routes */}
            <Route path="/brand" render={brandRouterSwitch} />
            {/* All creator routes */}
            <Route path="/creator" render={creatorRouterSwitch} />
            {/* All other routes */}
            <Route path="/userSignup" render={renderUserSignup} />
            <Route path="/connectSocialAccount" render={renderConnectSocialAccount} />
            <Route path="/creatorSignup" render={renderCreatorSignup} />
            <Route path="/login" render={renderLogin} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route path="/termsAndConditions" component={TermsAndConditions} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      {/* Sticky footer */}
      <Footer />
    </Layout>
  )
}

export default RouterSwitch
