import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Plan } from '../../models/Session'
import GuestLimitPopup from '../GuestLimitPopup'
import FreeLimitPopup from '../FreeLimitPopup'
import CreatorProfilePanel from '../CreatorProfilePanel'
import { IProfilePanel } from '../../models/Display'

const portalRoot = document.querySelector('#portal')

interface IPortalProps extends RouteComponentProps {
  hasReachedPlanLimit: boolean
  isLoggedIn: boolean
  plan: Plan
  profilePanel: IProfilePanel
}

interface IPortalState {
  route: string
}

class Portal extends React.Component<IPortalProps, IPortalState> {
  private el: HTMLElement

  constructor(props: IPortalProps) {
    super(props)
    this.el = document.createElement('div')
    // Listen to route changes
    this.state = {
      route: this.props.location.pathname,
    }
    this.props.history.listen(location => {
      this.setState({ route: location.pathname })
    })
  }

  componentDidMount() {
    portalRoot.appendChild(this.el)
  }

  render() {
    const { hasReachedPlanLimit, isLoggedIn, plan, profilePanel } = this.props
    const { route } = this.state
    const LimitPopup = () =>
      plan === 'free' && isLoggedIn ? <FreeLimitPopup /> : <GuestLimitPopup />
    const noPopupRoutes = ['/login', '/signup', '/upgrade', '/myAccount', '/forgotPassword']
    const popupCannotBeShown = noPopupRoutes.some(noPopupRoute => route.includes(noPopupRoute))
    // Final computed value
    const popupIsShown = plan !== 'premium' && hasReachedPlanLimit && !popupCannotBeShown
    return (
      <>
        {profilePanel && <CreatorProfilePanel {...profilePanel} />}
        {popupIsShown ? <LimitPopup /> : null}
      </>
    )
  }
}

export default withRouter(Portal)
