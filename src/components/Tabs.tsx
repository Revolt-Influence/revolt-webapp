import React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from '@rebass/grid'
import { Row, Container } from '../utils/grid'
import { palette } from '../utils/colors'
import { useWindowSize } from '../utils/hooks'
import Dropdown from './Dropdown'

const Style = styled.nav<{ small?: boolean }>`
  width: 100%;
  /* border-bottom: 3px solid ${props => (props.small ? 'transparent' : palette.grey._200)}; */
  margin-bottom: 2rem;
`

interface ITabProps {
  isActive: boolean
  small: boolean
}

const Tab = styled.div<ITabProps>`
  padding: ${props => (props.small ? '0.3rem 1.5rem' : '0.8rem 2.5rem')};
  transform: translateY(3px);
  color: ${props => (props.isActive ? palette.grey._900 : palette.grey._700)};
  border-bottom: 3px solid ${props => (props.isActive ? props.theme.primary._500 : 'transparent')};
`

export interface ITabItem {
  name: string
  isActive: boolean
  link?: string
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface ITabsProps extends RouteComponentProps {
  items: ITabItem[]
  noLinks?: boolean
  small?: boolean
}

const Tabs: React.FC<ITabsProps> = ({ items, noLinks, small, history }) => {
  const { width } = useWindowSize()
  const mobileLayout = items.length > 2 && width < 500
  const selectedTab = items.find(_tab => _tab.isActive)
  if (mobileLayout) {
    return (
      <Box mb="2rem">
        <Dropdown
          options={items.map(_item => _item.name)}
          handleChange={_selectedTab =>
            history.push(items.find(_tab => _tab.name === _selectedTab).link)
          }
          selection={selectedTab ? selectedTab.name : items[0].name}
        />
      </Box>
    )
  }
  return (
    <Style small={small}>
      <Container fullWidth={small}>
        <Row>
          {items.map(_item =>
            noLinks ? (
              <Tab
                as="button"
                isActive={_item.isActive}
                onClick={_item.handleClick}
                small={small}
                key={_item.name}
              >
                {_item.name}
              </Tab>
            ) : (
              <Link to={_item.link} title={_item.name} key={_item.name}>
                <Tab small={small} isActive={_item.isActive}>
                  {_item.name}
                </Tab>
              </Link>
            )
          )}
        </Row>
      </Container>
    </Style>
  )
}

export default withRouter(Tabs)
