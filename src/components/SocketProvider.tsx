import React, { createContext, ReactNode } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_URL)
const SocketContext = createContext(socket)

const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
)

export { SocketContext }
export default SocketProvider
