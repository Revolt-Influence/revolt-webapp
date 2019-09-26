import styled, { css } from 'styled-components'
import { palette } from '../utils/colors'
import { setFont, setOutline } from '../utils/styles'

const arrowSource = require('../images/icons/arrowDown.svg')

interface IFormInputProps {
  hasLabel?: boolean
  hasError?: boolean
}

const FormInput = styled.input`
  color: ${palette.grey._900};
  background: ${palette.grey._100};
  border: 2px solid ${palette.grey._200};
  border-radius: 8px;
  width: 100%;
  padding: 15px 20px;
  margin-top: ${(props: IFormInputProps) => (props.hasLabel ? '4px' : '15px')};
  @media screen and (max-width: 1000px) {
    height: 45px;
    padding: 0 15px;
  }
  ${(props: IFormInputProps) => {
    if ('hasError' in props) {
      return css`
        &:focus {
          ${setOutline(props.hasError ? 'red' : 'blue')}
        }
      `
    }
    return css`
      &:focus {
        ${setOutline('blue')}
      }
    `
  }}
  &:not(:placeholder-shown):not(:focus) {
    /* transform: rotate(45deg); */
    &:invalid {
      ${setOutline('red', { isLight: true })}
    }
  }
  /* Placeholders need to be duplicated to work, dunno why */
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${palette.grey._500};
  }
  :-ms-input-placeholder {
    color: ${palette.grey._500};
  }
  &:required:after {
    &:after {
      content: 'eemememem';
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${setFont(500, 'normal')}
`

const FormTextarea = styled.textarea`
  all: unset;
  box-sizing: border-box;
  color: ${palette.grey._900};
  background: ${palette.grey._100};
  border: 2px solid ${palette.grey._200};
  border-radius: 8px;
  resize: vertical;
  width: 100%;
  padding: 15px 20px;
  margin-top: ${(props: IFormInputProps) => (props.hasLabel ? '4px' : '16px')};
  ${(props: IFormInputProps) => {
    if ('hasError' in props) {
      return css`
        &:focus {
          ${setOutline(props.hasError ? 'red' : 'blue')}
        }
      `
    }
    return css`
      &:focus {
        &:valid { ${setOutline('blue')} }
        &:invalid { ${setOutline('red')}
      }
    `
  }}
`

interface IFormSelectProps {
  fullWidth?: boolean
  noMargin?: boolean
}

const FormSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  border-radius: 8px;
  background: ${palette.grey._100};
  border: 2px solid ${palette.grey._200};
  padding: 1.5rem 2rem;
  color: ${palette.grey._900};
  /* Arrow */
  background-image: url(${arrowSource});
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 2rem 2rem;
  padding-right: 3rem;
  ${(props: IFormSelectProps) => {
    if (!props.noMargin) {
      return css`
        margin-bottom: 10px;
        margin-top: 4px;
      `
    }
  }}
  ${(props: IFormSelectProps) => {
    if (props.fullWidth) {
      return css`
        display: block;
        width: 100%;
      `
    }
  }}
  ${setFont(500, 'normal')}
`

interface IFormInputLabelProps {
  noMargin?: boolean
  withMargin?: boolean
}
const FormInputLabel = styled.label<IFormInputLabelProps>`
  ${setFont(500, 'normal')}
  display: block;
  width: 100%;
  &:not(:first-child) {
    margin-top: ${props => (props.noMargin ? '0' : '15px')};
  }
  ${props =>
    props.withMargin
      ? css`
          margin-top: 15px;
        `
      : null};
`

export { FormSelect, FormInput, FormInputLabel, FormTextarea }
