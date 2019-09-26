import React, { Suspense } from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from './Navbar'
import { SessionType } from '../models/Session'
import ErrorBoundary from './ErrorBoundary'
import Loader from './Loader'
import Landing from '../pages/Landing'
import IState from '../models/State'
import { IUser } from '../models/User'
import { ICreator } from '../models/Creator'
import Footer from './Footer'
import { useClientSize } from '../utils/hooks'

const CampaignDashboard = React.lazy(() => import('../pages/CampaignDashboard'))
const BrandSignup = React.lazy(() => import('../pages/BrandSignup'))
const CreatorSignup = React.lazy(() => import('../pages/CreatorSignup'))
const Login = React.lazy(() => import('../pages/Login'))
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'))
const BrandAccount = React.lazy(() => import('../pages/BrandAccount'))
const CreatorAccount = React.lazy(() => import('../pages/CreatorAccount'))
const NotFound = React.lazy(() => import('../pages/NotFound'))
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'))
const Upgrade = React.lazy(() => import('../pages/Upgrade'))
const CampaignsList = React.lazy(() => import('../pages/CampaignsList'))
const ExperiencesList = React.lazy(() => import('../pages/ExperiencesList'))
const CollabsList = React.lazy(() => import('../pages/CollabsList'))
const Experience = React.lazy(() => import('../pages/Experience'))
const CampaignBrief = React.lazy(() => import('../pages/CampaignBrief'))
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

interface IRouterSwitchProps extends RouteComponentProps {
  isRetrievingUser: boolean
  hasVerifiedEmail: boolean
}

const RouterSwitch: React.FC<IRouterSwitchProps> = () => {
  const isLoggedIn = useSelector<IState, boolean>(state => state.session.isLoggedIn)
  const sessionType = useSelector<IState, SessionType>(state => state.session.type)
  const isRetrievingUser = useSelector<IState, boolean>(
    state => state.session.requests.retrieveUser.isLoading
  )
  const user = useSelector<IState, IUser>(state => state.session.user)
  const creator = useSelector<IState, ICreator>(state => state.session.creator)
  const clientHeight = useClientSize().height

  const renderRoot = () => {
    if (!isLoggedIn) {
      return <Landing />
    }
    if (sessionType === 'brand') {
      return <Redirect to="/brand" />
    }
    if (sessionType === 'creator') {
      return <Redirect to="/creator" />
    }
    // Should not happen, here just in case
    return <Landing />
  }

  const renderBrandSignup = () => {
    // Only allow access if the user is not logged in
    if (isLoggedIn) {
      return <Redirect to="/" />
    }
    return <BrandSignup />
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
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <BrandAccount />
  }

  const renderCreatorAccount = () => {
    // Only allow access if the user is logged in
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <CreatorAccount />
  }

  const renderUpgradePlan = () => {
    // Only allow access if the user is logged in and not Premium
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    if (user.plan === 'premium') {
      return <Redirect to="/brand/myAccount" />
    }
    return <Upgrade />
  }

  const renderCampaignsList = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <CampaignsList />
  }

  const renderExperiencesList = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <ExperiencesList />
  }

  const renderCollabsList = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <CollabsList />
  }

  const renderExperience = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <Experience />
  }

  const renderCampaignDashboard = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return (
      <ErrorBoundary message="La campagne n'a pas pu être affichée">
        <CampaignDashboard />
      </ErrorBoundary>
    )
  }

  const renderConnectSocialAccount = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    if (sessionType !== 'creator') {
      return <NotFound />
    }
    if (creator.instagramIsVerified || creator.youtube != null) {
      window.scrollTo(0, 0)
      return <Redirect to="/creator" />
    }
    return <ConnectSocialAccount />
  }

  const renderCampaignBrief = () => {
    if (!isLoggedIn && !isRetrievingUser) {
      return <Redirect to="/login" />
    }
    return <CampaignBrief />
  }

  if (isRetrievingUser) {
    return <Loader fullScreen />
  }

  const brandRouterSwitch = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    if (sessionType === 'creator') {
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
        <Route path="/brand/campaigns/:campaignId/brief" render={renderCampaignBrief} />
        <Route path="/brand/myAccount" render={renderBrandAccount} />
        <Route path="/brand/upgrade" render={renderUpgradePlan} />
        <Route path="/brand/messages/:conversationId" component={Conversation} />
        <Route exact path="/brand/messages" component={ConversationsList} />
        <Route path="/brand/community" component={Community} />
        {/* Handle 404 */}
        <Route component={NotFound} />
      </Switch>
    )
  }

  const creatorRouterSwitch = (routeProps: RouteComponentProps) => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />
    }
    if (sessionType === 'brand') {
      return <NotFound />
    }
    const hasNoNetwork = !creator.instagramIsVerified && creator.youtube == null
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
            <Route path="/brandSignup" render={renderBrandSignup} />
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
