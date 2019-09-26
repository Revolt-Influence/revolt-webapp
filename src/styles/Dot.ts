import styled from 'styled-components'

interface IDotProps {
  color: string
  small?: boolean
}

const Dot = styled.div<IDotProps>`
  display: inline-block;
  margin-right: ${props => (props.small ? '1rem' : '1.5rem')};
  width: ${props => (props.small ? '2rem' : '3rem')};
  height: ${props => (props.small ? '2rem' : '3rem')};
  border-radius: 50%;
  background: ${props => props.color};
  flex-shrink: 0;
`

export { Dot }
