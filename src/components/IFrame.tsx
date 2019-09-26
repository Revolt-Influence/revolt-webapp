import React from 'react'
import { createPortal } from 'react-dom'

const IFrame = ({ children, ...props }) => {
  const [contentRef, setContentRef] = React.useState(null)
  const mountNode = contentRef && contentRef.contentWindow.document.body

  return (
    <iframe {...props} ref={setContentRef} title="Frame">
      {mountNode && createPortal(React.Children.only(children), mountNode)}
    </iframe>
  )
}

export default IFrame
