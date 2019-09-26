import { connect } from 'react-redux'
import Portal from './component'
import IState from '../../models/State'

function mapStateToProps(state: IState) {
  return {
    isLoggedIn: state.session.isLoggedIn,
    plan: state.session.user == null ? null : state.session.user.plan,
    hasReachedPlanLimit: state.display.planLimitPopupIsShown,
    profilePanel: state.display.profilePanel,
  }
}

const SmartPortal = connect(mapStateToProps)(Portal)

export default SmartPortal
