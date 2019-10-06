import React from 'react'
import CreatorProfilePanel from './CreatorProfilePanel'
import { useQuery } from '@apollo/react-hooks'

const PopupsPortal: React.FC<{}> = () => (
    <>
      {/* {ReactDOM.createPortal(<CreatorProfilePanel creatorId="oo" />)} */}
      <CreatorProfilePanel creatorId="oeo" />
    </>
  )

export default PopupsPortal
