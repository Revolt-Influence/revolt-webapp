import { useQuery } from '@apollo/react-hooks'
import React, { Suspense } from 'react'
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

const CampaignDashboard = React.lazy(() => import('../pages/CampaignDashboard'))
const UserSignup = React.lazy(() => import('../pages/UserSignup'))
const CreatorSignup = React.lazy(() => import('../pages/CreatorSignup'))
const Login = React.lazy(() => import('../pages/Login'))
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'))
const BrandAccount = React.lazy(() => import('../pages/BrandAccount'))
const CreatorAccount = React.lazy(() => import('../pages/CreatorAccount'))
const NotFound = React.lazy(() => import('../pages/NotFound'))
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'))
const CampaignsList = React.lazy(() => import('../pages/CampaignsList'))
const ExperiencesList = React.lazy(() => import('../pages/ExperiencesList'))
const CollabsList = React.lazy(() => import('../pages/CollabsList'))
const Experience = React.lazy(() => import('../pages/Experience'))
const CampaignForm = React.lazy(() => import('../pages/CampaignForm'))
const ConnectSocialAccount = React.lazy(() => import('../pages/ConnectSocialAccount'))
const AmbassadorProgram = React.lazy(() => import('../pages/AmbassadorProgram'))
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'))
const TermsAndConditions = React.lazy(() => import('../pages/TermsAndConditions'))
const Conversation = React.lazy(() => import('../pages/Conversation'))
const ConversationsList = React.lazy(() => import('../pages/ConversationsList'))
const Community = React.lazy(() => import('../pages/Community'))

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

  const renderBrandAccount = () => {
    // Only allow access if the user is logged in
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <BrandAccount />
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

  const renderExperiencesList = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <ExperiencesList />
  }

  const renderCollabsList = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <CollabsList />
  }

  const renderExperience = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <Experience />
  }

  const renderCampaignDashboard = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    return (
      <ErrorBoundary message="La campagne n'a pas pu être affichée">
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
        <Route path="/brand/myAccount" render={renderBrandAccount} />
        <Route path="/brand/messages/:conversationId" component={Conversation} />
        <Route exact path="/brand/messages" component={ConversationsList} />
        <Route path="/brand/community" render={renderCommunity} />
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
        <Route exact path="/creator" render={() => <Redirect to="/creator/experiences" />} />
        <Route exact path="/creator/experiences" render={renderExperiencesList} />
        <Route exact path="/creator/collabs" render={renderCollabsList} />
        <Route exact path="/creator/experiences/:campaignId" render={renderExperience} />
        <Route exact path="/creator/ambassador" component={AmbassadorProgram} />
        <Route path="/creator/myAccount" render={renderCreatorAccount} />
        <Route path="/creator/messages/:conversationId" component={Conversation} />
        <Route exact path="/creator/messages" component={ConversationsList} />
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
