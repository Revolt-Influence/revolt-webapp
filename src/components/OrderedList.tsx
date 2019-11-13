import React from 'react'
import styled from 'styled-components'

const Style = styled.ul`
  .item {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    .number {
      flex-shrink: 0;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      border-radius: 50%;
      background: ${props => props.theme.accent._100};
      color: ${props => props.theme.accent._700};
      margin-right: 1rem;
    }
  }
`

interface IOrderedListProps {
  items: string[]
}

const OrderedList: React.FC<IOrderedListProps> = ({ items }) => (
  <Style>
    {items.map((_item, index) => (
      <li className="item" key={index}>
        <span className="number">{index + 1}</span>
        {_item}
      </li>
    ))}
  </Style>
)

export default OrderedList
