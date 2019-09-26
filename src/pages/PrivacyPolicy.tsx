import React from 'react'
import styled from 'styled-components'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'
import { usePageTitle } from '../utils/hooks'

const Styles = styled(ContainerBox)`
  p {
    margin-bottom: 2rem;
  }
  a {
    color: ${palette.blue._600};
  }
  ul,
  ol {
    list-style: unset;
    margin-bottom: 1rem;
  }
  h3 {
    ${setFont(600, 'big')}
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const PrivacyPolicy: React.FC<{}> = () => {
  usePageTitle('Privacy policy')
  return (
    <Styles width={[1, 10 / 12, 6 / 12]} mx="auto">
      <PageHeader title="Privacy policy" />
      <div className="page-body">
        <p>
          Your privacy is important to us. It is Revolt Influence&#x27;s policy to respect your
          privacy regarding any information we may collect from you across our website,{' '}
          <a href="https://revolt.club/">https://revolt.club</a>, and other sites and apps we own
          and operate, such as <a href="https://app.revolt.club">https://app.revolt.club</a>
        </p>
        <p>
          We only ask for personal information when we truly need it to provide a service to you. We
          collect it by fair and lawful means, with your knowledge and consent. We also let you know
          why we’re collecting it and how it will be used.
        </p>
        <p>
          We only retain collected information for as long as necessary to provide you with your
          requested service. What data we store, we’ll protect within commercially acceptable means
          to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </p>
        <p>
          We don’t share any personally identifying information publicly or with third-parties,
          except when required to by law.
        </p>
        <p>
          Our website may link to external sites that are not operated by us. Please be aware that
          we have no control over the content and practices of these sites, and cannot accept
          responsibility or liability for their respective privacy policies.
        </p>
        <p>
          Below is all the information we collect about our users, and all the use we make of this
          information. Our users sign up as either brands or influencers. Both enter different sets
          of data on our platform.
        </p>
        <h3>Data usage of users signed up as brands</h3>
        <ul className="bulleted-list">
          <li>email: used for notifications and the optional newsletter</li>
        </ul>
        <ul className="bulleted-list">
          <li>phone: used to contact the brand in case there is any problem</li>
        </ul>
        <ul className="bulleted-list">
          <li>
            password: stored hashed only, following GDPR requirements. Used for authenticated
            sessions.
          </li>
        </ul>
        <h3>Data usage of users signed up as influencers</h3>
        <ul className="bulleted-list">
          <li>email: used for notifications and the optional newsletter</li>
        </ul>
        <ul className="bulleted-list">
          <li>phone: used to contact the brand in case there is any problem</li>
        </ul>
        <ul className="bulleted-list">
          <li>
            password: stored hashed only, following GDPR requirements. Used for authenticated
            sessions.
          </li>
        </ul>
        <ul className="bulleted-list">
          <li>
            date of birth: used to ensure we don't store any information about children under the
            age of 13, to ensure compliance with the{' '}
            <a href="http://www.coppa.org/coppa.htm">COPPA</a>.
          </li>
        </ul>
        <ul className="bulleted-list">
          <li>
            demographic data (gender, country, spoken language) : used to tailer the user&#x27;s
            experience. Campaigns are only shown to him when they match his demographics data, so
            that irrelevant campaigns don&#x27;t get in the way.
          </li>
        </ul>
        <p>
          We also store data about the social networks that influencers choose to connect to their
          Revolt account. We currently offer 2 optional integrations :
        </p>
        <ul className="bulleted-list">
          <li>
            YouTube: name of the channel, followers count, number of videos, channel thumbnail, and
            an overview of the channel audience&#x27;s demographics. The demographics we store is
            percentages of the most frequent age ranges, genders and countries of the viewers in the
            past year. This information is used when an influencer offers to make a YouTube video
            for a brand, so that the brand gets an overview of the channel, and the audience that it
            would reach.
          </li>
        </ul>
        <p>
          You are free to refuse our request for your personal information, with the understanding
          that we may be unable to provide you with some of your desired services.
        </p>
        <p>
          Your continued use of our website will be regarded as acceptance of our practices around
          privacy and personal information. If you have any questions about how we handle user data
          and personal information, feel free to contact us at hello@revolt.club
        </p>
        <p />
        <p>This policy is effective as of 26 August 2019.</p>
        <p />
      </div>
    </Styles>
  )
}

export default PrivacyPolicy
