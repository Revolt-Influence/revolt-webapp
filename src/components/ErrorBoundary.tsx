import React from 'react'
import * as Sentry from '@sentry/browser'
import ErrorCard from './ErrorCard'
import { ContainerBox } from '../styles/grid'

interface IErrorBoundaryProps {
  children: React.ReactChild
  message: string
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state = { hasError: false }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // const { isLoggedIn, user, creator } = this.props
    this.setState({ hasError: true })
    // Send to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key])
        })
        Sentry.captureException(error)
      })
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    // Wrap the error card in a container
    return (
      <ContainerBox>
        <ErrorCard message={this.props.message} />
      </ContainerBox>
    )
  }
}

export default ErrorBoundary
