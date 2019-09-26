import { connect } from 'react-redux'
import ErrorBoundary from './component'
import IState from '../../models/State'

function mapStateToProps(state: IState) {
  return {
    isLoggedIn: state.session.isLoggedIn,
    user: state.session.user,
    creator: state.session.creator,
  }
}

const SmartErrorBoundary = connect(mapStateToProps)(ErrorBoundary)

export default SmartErrorBoundary
