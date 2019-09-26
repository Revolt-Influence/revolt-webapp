import React from 'react'
import * as Sentry from '@sentry/browser'
import ErrorCard from '../ErrorCard'
import { Container } from '../../utils/grid'
import { IUser } from '../../models/User'
import { ICreator } from '../../models/Creator'

interface IErrorBoundaryProps {
  children: React.ReactChild
  message: string
  isLoggedIn: boolean
  user: IUser
  creator: ICreator
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state = { hasError: false }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const { isLoggedIn, user, creator } = this.props
    this.setState({ hasError: true })
    // Send to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key])
        })
        scope.setTag('isLoggedIn', isLoggedIn ? 'true' : 'false')
        if (isLoggedIn) {
          if (user != null) {
            scope.setTag('plan', user.plan)
            scope.setExtra('email', user.email)
          }
          if (creator != null) {
            scope.setExtra('email', creator.email)
          }
        }
        Sentry.captureException(error)
      })
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    // Wrap the error card in a container
    return (
      <Container>
        <ErrorCard message={this.props.message} />
      </Container>
    )
  }
}

export default ErrorBoundary
