import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex } from '@rebass/grid'
import { palette } from '../utils/colors'
import { setFont, setOutline } from '../utils/styles'
import { ContainerBox } from '../styles/grid'
import { useToggle, useScrollLock, useDeviceType } from '../utils/hooks'
import { useQuery } from '@apollo/react-hooks'
import { GET_SESSION } from './Session'
import { GetSession } from '../__generated__/GetSession'
import Loader from './Loader'
import ErrorCard from './ErrorCard'
import { SessionType } from '../__generated__/globalTypes'

const logoSource = require('../images/logos/logo_light.svg')
const userSource = require('../images/icons/user_black.svg')
const campaignSource = require('../images/icons/campaign_black.svg')
const collabsSource = require('../images/icons/star_black.svg')
const experiencesSource = require('../images/icons/shop_black.svg')
const hamburgerSource = require('../images/icons/menu_black.svg')
const closeSource = require('../images/icons/close.svg')
const messageSource = require('../images/icons/message_black.svg')
const communitySource = require('../images/icons/community_black.svg')

const Style = styled.div`
  position: relative;
  border-top: 5px solid ${props => props.theme.primary._500};
  background: ${palette.grey._50};
  padding: 8px 0;
  border-bottom: 3px solid ${palette.grey._200};

  @media screen and (max-width: 1000px) {
    padding-bottom: 8px;
  }
  .hamburger {
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 3rem;
      width: auto;
    }
  }

  .mobileMenu {
    padding: 6rem 2rem;
    height: 100vh;
    width: 100%;
    background: ${palette.grey._50};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .linkHeader {
      img {
        height: 3rem;
        width: auto;
        margin-right: 2rem;
      }
      p.name {
        ${setFont(600, 'normal')}
        margin-top: 0.2rem;
      }
    }
  }
`

interface ILinkStyleProps {
  hasBorder?: boolean
  to: string
}

const HomeLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  /* margin-top: -1.5rem; */
  /* margin-left: -1.5rem; */
  transform: translate(-1rem);
`

// TODO: find style for active link
const CustomLink = styled(Link)<ILinkStyleProps>`
  position: relative;
  margin-left: 30px;
  padding: 8px 10px;
  /* margin-top: -12px; */
  /* transform: translateY(8px); */
  ${props => (props.hasBorder ? `border: 1px solid ${props.theme.primary._500};` : null)}
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 8px;
  transition: 0.1s all ease-in-out;
  ${setFont(600, 'small')}
  color: ${palette.grey._900};
  &:hover, &:focus-visible {
    background: ${props => props.theme.primary._100};
  }
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  img {
    height: 24px;
    width: auto;
    margin-right: 8px;
  }
`

const MobileLink = styled(Link)`
  text-align: left;
  padding: 1rem 1rem;
  margin: 1rem 1rem;
  .description {
    color: ${palette.grey._500};
  }
`

const Logo = styled.img`
  height: 2rem;
  width: auto;
  &:focus-visible {
    ${setOutline('orange')}
  }
`

interface ILink {
  logo: any
  path: string
  name: string
  description: string
}

const Navbar: React.FC<{}> = () => {
  const { data: { session } = { session: null }, loading, error } = useQuery<GetSession>(
    GET_SESSION
  )
  const { isLoggedIn, sessionType, user } = session || {}

  const getLinks = (): ILink[] => {
    if (!isLoggedIn) {
      return [
        {
          logo: userSource,
          path: '/login',
          name: 'Connexion',
          description: 'Accédez à votre compte',
        },
      ]
    }
    if (sessionType === SessionType.BRAND) {
      return [
        {
          logo: campaignSource,
          path: '/brand/campaigns',
          name: 'Mes campagnes',
          description: 'Voir toutes vos campagnes',
        },
        {
          logo: messageSource,
          path: '/brand/messages',
          name: 'Messages',
          description: 'Échangez avec les influenceurs',
        },
        // Only show community to admin users
        ...(user && user.isAdmin
          ? [
              {
                logo: communitySource,
                path: '/brand/community',
                name: 'Communauté',
                description: 'Tous nos influenceurs (admin)',
              },
            ]
          : []),
        {
          logo: userSource,
          path: '/brand/myAccount',
          name: 'Mon compte',
          description: 'Modifiez votre compte',
        },
      ]
    }
    if (sessionType === SessionType.CREATOR) {
      return [
        {
          logo: experiencesSource,
          path: '/creator/experiences',
          name: 'Expériences',
          description: 'Découvrez de nouvelles expériences',
        },
        {
          logo: collabsSource,
          path: '/creator/collabs',
          name: 'Collabs',
          description: 'Tous vos partenariats',
        },
        {
          logo: messageSource,
          path: '/creator/messages',
          name: 'Messages',
          description: 'Échangez avec les marques',
        },
        {
          logo: userSource,
          path: '/creator/myAccount',
          name: 'Mon compte',
          description: 'Modifiez votre compte',
        },
      ]
    }
    // Should not happen, here just in case
    return []
  }

  const navLinks = getLinks()

  const deviceType = useDeviceType()
  const isDesktop = deviceType === 'desktop'

  const [mobileMenuIsShown, toggleMenuIsShown] = useToggle(false)

  // Auto close mobile menu when window becomes desktop
  useEffect(() => {
    if (isDesktop && mobileMenuIsShown) {
      toggleMenuIsShown()
    }
  }, [isDesktop, mobileMenuIsShown, toggleMenuIsShown])

  // Lock scroll on mobile when menu is opened
  useScrollLock(mobileMenuIsShown)

  const showMobileMenu = () => (
    <div className="mobileMenu">
      {navLinks.map(_link => (
        <MobileLink to={_link.path} key={_link.path} onClick={toggleMenuIsShown}>
          <Flex flexDirection="row" alignItems="flex-start" className="linkHeader">
            <img src={_link.logo} alt={_link.name} />
            <div>
              <p className="name">{_link.name}</p>
              <p className="description">{_link.description}</p>
            </div>
          </Flex>
        </MobileLink>
      ))}
    </div>
  )

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <ErrorCard />
  }

  return (
    <Style>
      <ContainerBox>
        <nav>
          <Flex justifyContent="space-between" alignItems="center">
            {/* Left of navbar */}
            <Flex alignItems="center" justifyContent="flex-start">
              <HomeLink
                to="/"
                onClick={() => {
                  if (mobileMenuIsShown) {
                    toggleMenuIsShown()
                  }
                }}
              >
                <Logo src={logoSource} alt="Revolt" />
              </HomeLink>
            </Flex>
            {/* Right of navbar */}
            {isDesktop ? (
              <div>
                {navLinks.map(_link => (
                  <CustomLink to={_link.path} key={_link.path}>
                    <>
                      <img src={_link.logo} alt={_link.name} />
                      {_link.name}
                    </>
                  </CustomLink>
                ))}
              </div>
            ) : (
              <button type="button" className="hamburger" onClick={toggleMenuIsShown}>
                <img src={mobileMenuIsShown ? closeSource : hamburgerSource} alt="menu" />
              </button>
            )}
          </Flex>
        </nav>
      </ContainerBox>
      {mobileMenuIsShown && showMobileMenu()}
    </Style>
  )
}

export default Navbar
