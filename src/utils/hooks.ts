import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useQuery } from '@apollo/react-hooks'
import { DeviceType } from '../types'
import { GET_SESSION } from '../components/Session'
import { GetSession } from '../__generated__/GetSession'
import { SessionType } from '../__generated__/globalTypes'
import { MessageFragment } from '../__generated__/MessageFragment'
import { breakpoints } from '../components/CustomThemeProvider'

export function useWindowSize(): { width: number; height: number } {
  const isClient = typeof window === 'object'
  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient]) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export function useClientSize(): { width: number; height: number } {
  const isClient = typeof window === 'object'
  const getSize = useCallback(
    () => ({
      width: isClient ? document.documentElement.clientWidth : undefined,
      height: isClient ? document.documentElement.clientHeight : undefined,
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient]) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export function usePrevious(value: any) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useRenderCount(): number {
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
  }) // Run on all renders
  return renderCount.current
}

// From usehooks.com
export function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  handler: (e: React.MouseEvent<any>) => void
) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      event.stopPropagation()
      event.preventDefault()
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - Revolt`
  }, [title])
}

export function getRect(element): ClientRect {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }
  return element.getBoundingClientRect()
}

export function useRect(ref: React.MutableRefObject<HTMLElement>) {
  const [rect, setRect] = useState<ClientRect>(getRect(ref ? ref.current : null))

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return
    }
    // Update client rect
    const newRect = getRect(ref.current)
    setRect(newRect)
  }, [ref])

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }
    handleResize()
    // Browser support, remove freely
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, ref])

  return rect
}

// Got from usehooks.com
export function useScrollLock(enableLock: boolean = true) {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    if (enableLock) {
      document.body.style.overflow = 'hidden'
    }
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [enableLock]) // Empty array ensures effect is only run on mount and unmount
}

export function useToggle(initialValue: boolean) {
  const [value, setValue] = useState<boolean>(initialValue)
  const toggleValue = () => setValue(!value)
  return [value, toggleValue] as [boolean, () => void]
}

const stripeApiKey = process.env.REACT_APP_STRIPE_API_KEY

export function useStripe() {
  // Load Stripe
  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    if ((window as any).Stripe) {
      // Stripe instance already exists
      setStripe((window as any).Stripe(stripeApiKey))
    } else {
      const stripeScript = document.querySelector('#stripe-js')
      const handleStripeLoad = () => {
        setStripe((window as any).Stripe(stripeApiKey))
      }
      // Create Stripe instance once Stripe.js loads
      stripeScript.addEventListener('load', handleStripeLoad)
      return () => {
        stripeScript.removeEventListener('load', handleStripeLoad)
      }
    }
  }, []) // Only on mount
  return stripe
}

const pixelBreakpoints = breakpoints.map(_breakpoint => parseFloat(_breakpoint) * 16)
export function useDeviceType(): DeviceType {
  const { width } = useWindowSize()
  if (width < pixelBreakpoints[0]) {
    return 'mobile'
  }
  if (width < pixelBreakpoints[1]) {
    return 'tablet'
  }
  // All bigger sizes are desktop
  return 'desktop'
}

const socketEvents = {
  JOIN_ROOM: 'JOIN_ROOM',
  NEW_MESSAGE: 'NEW_MESSAGE',
}

export function useConversationsSocket() {
  // Make sure socket connection gets created only once
  const socketRef = useRef<SocketIOClient.Socket>(null)
  if (socketRef.current == null) {
    socketRef.current = io(process.env.REACT_APP_BACKEND_URL)
  }

  // Get connected user ID
  const {
    data: {
      session: { user, isLoggedIn, creator },
    },
  } = useQuery<GetSession>(GET_SESSION)
  const creatorId = creator && creator._id
  const userId = user && user._id
  // Join room on startup
  useEffect(() => {
    if (isLoggedIn) {
      const socket = socketRef.current
      socket.emit(socketEvents.JOIN_ROOM, creatorId || userId)
    }
  }, [creatorId, isLoggedIn, userId])

  // Listen to messages
  useEffect(() => {
    const socket = socketRef.current
    const handleNewMessage = (newMessage: MessageFragment) => {
      // TODO: Attach message to the Redux store
      // dispatch(receiveMessage(newMessage))
    }
    socket.on(socketEvents.NEW_MESSAGE, handleNewMessage)
    return () => socket.removeListener(socketEvents.NEW_MESSAGE, handleNewMessage)
  }, [])
}

export function useIsAdmin() {
  const { data: { session } = { session: null }, loading, error } = useQuery<GetSession>(
    GET_SESSION
  )
  if (loading || error) {
    return false
  }
  if (session.sessionType === SessionType.BRAND) {
    return session.user.isAdmin
  }
  return false
}
