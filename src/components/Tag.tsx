import React from 'react'
import styled from 'styled-components'
import { palette } from '../utils/colors'

const closeSource = require('../images/icons/close.svg')

const Styles = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  padding: 0.5rem 1.5rem;
  border: 2px solid ${palette.grey._200};
  margin-bottom: 0.5rem;
  &:hover {
    border-color: ${palette.grey._300};
  }
  &:not(:last-child) {
    margin-right: 1rem;
  }
  button {
    margin-left: 1rem;
    height: 100;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
`

interface Props {
  text: string
  handleRemove?: () => void
}

const Tag: React.FC<Props> = ({ text, handleRemove }) => (
  <Styles>
    <span>{text}</span>
    {handleRemove != null && (
      <button onClick={() => handleRemove()}>
        <img src={closeSource} alt="fermer" />
      </button>
    )}
  </Styles>
)

export default Tag
