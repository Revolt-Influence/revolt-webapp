import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  font-size: 10px;
  .device-iphone-8 {
    position: relative;
    height: 87.1em;
    width: 41.9em;
    margin: 0 auto;
    transform-origin: top center;
    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
      transform: scale(0.66);
    }
  }

  .device-iphone-8 .device-frame {
    background: #fff;
    border-radius: 6.8em;
    box-shadow: inset 0 0 0 0.2em #c8cacb, inset 0 0 0 0.7em #e2e3e4;
    height: 87.1em;
    padding: 10.2em 2.2em;
    width: 41.9em;
  }

  .device-iphone-8 .device-content {
    border: 0.2em solid #222;
    border-radius: 0.4em;
    height: 66.7em;
    width: 37.5em;
    overflow: scroll;
  }

  .device-iphone-8 .device-stripe::after,
  .device-iphone-8 .device-stripe::before {
    border: solid rgba(51, 51, 51, 0.15);
    border-width: 0 0.7em;
    content: '';
    height: 0.6em;
    left: 0;
    position: absolute;
    width: 96.7%;
    /* width: 100%; */
    z-index: 9;
  }

  .device-iphone-8 .device-stripe::after {
    top: 6.8em;
  }

  .device-iphone-8 .device-stripe::before {
    bottom: 6.8em;
  }

  .device-iphone-8 .device-header {
    border: 0.2em solid #c8cacb;
    border-radius: 50%;
    bottom: 2.5em;
    height: 5.8em;
    left: 50%;
    margin-left: -2.9em;
    position: absolute;
    width: 5.8em;
  }

  .device-iphone-8 .device-sensors {
    background: #666;
    border-radius: 0.3em;
    height: 0.6em;
    left: 50%;
    margin-left: -3.8em;
    position: absolute;
    top: 5.2em;
    width: 7.6em;
  }

  .device-iphone-8 .device-btns {
    background: #c8cacb;
    height: 3em;
    left: -0.3em;
    position: absolute;
    top: 10.2em;
    width: 0.3em;
  }

  .device-iphone-8 .device-btns::after,
  .device-iphone-8 .device-btns::before {
    background: #c8cacb;
    content: '';
    height: 5.6em;
    left: 0;
    position: absolute;
    width: 0.3em;
  }

  .device-iphone-8 .device-btns::after {
    top: 6.2em;
  }

  .device-iphone-8 .device-btns::before {
    top: 13em;
  }

  .device-iphone-8 .device-power {
    background: #c8cacb;
    height: 8em;
    position: absolute;
    right: -0.2em;
    top: 16em;
    width: 0.3em;
  }

  .device-iphone-8.device-gold .device-frame {
    box-shadow: inset 0 0 0 0.2em #e4b08a, inset 0 0 0 0.7em #f7e8dd;
  }

  .device-iphone-8.device-gold .device-header {
    border-color: #e4b08a;
  }

  .device-iphone-8.device-gold .device-btns,
  .device-iphone-8.device-gold .device-btns::after,
  .device-iphone-8.device-gold .device-btns::before {
    background: #e4b08a;
  }

  .device-iphone-8.device-gold .device-power {
    background: #e4b08a;
  }

  .device-iphone-8.device-spacegray .device-frame {
    background: #222;
    box-shadow: inset 0 0 0 0.2em #74747a, inset 0 0 0 0.7em #9b9ba0;
  }

  .device-iphone-8.device-spacegray .device-stripe::after,
  .device-iphone-8.device-spacegray .device-stripe::before {
    border-color: rgba(204, 204, 204, 0.35);
  }

  .device-iphone-8.device-spacegray .device-btns,
  .device-iphone-8.device-spacegray .device-btns::after,
  .device-iphone-8.device-spacegray .device-btns::before {
    background: #74747a;
  }
`

interface IPhoneMockupProps {
  children: React.ReactChild
}

const PhoneMockup: React.FunctionComponent<IPhoneMockupProps> = ({ children }) => (
  <Styles>
    {/* <div className="wrapper">{children}</div> */}
    <div className="device device-iphone-8 device-gold">
      <div className="device-frame">
        <div className="device-content">{children}</div>
      </div>
      <div className="device-stripe" />
      <div className="device-header" />
      <div className="device-sensors" />
      <div className="device-btns" />
      <div className="device-power" />
    </div>
  </Styles>
)

export default PhoneMockup
