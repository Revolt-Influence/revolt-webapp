import styled from 'styled-components'

const colPadding = '10px'
const colMargin = '10px'
const rowPadding = '25px'
const containerSize = '1250px'

interface IColProps {
  size?: number
  align?: 'left' | 'center' | 'right'
  padding?: 'horizontal' | 'vertical' | 'all' | 'left' | 'right'
  margin?: 'horizontal' | 'vertical' | 'all' | 'left' | 'right'
}

interface IRowProps {
  direction?: 'row' | 'column'
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between'
  verticalAlign?: 'center' | 'flex-start' | 'flex-end' | 'baseline'
  padding?: 'horizontal' | 'vertical' | 'all'
  canWrap?: boolean
  larger?: boolean
}

interface IContainerProps {
  padding?: 'horizontal' | 'vertical' | 'all'
  fullWidth?: boolean
}

const Container = styled.div`
  display: block;
  margin: 0 auto;
  width: ${(props: IContainerProps) => (props.fullWidth ? '100%' : containerSize)};
  max-width: ${(props: IContainerProps) => (props.fullWidth ? '100%' : '97%')};
  padding: ${(props: IContainerProps) => {
    if (props.padding === 'horizontal') return `0 ${rowPadding}`
    if (props.padding === 'vertical') return `${rowPadding} 0`
    if (props.padding === 'all') return `${rowPadding} ${rowPadding}`
    return '0'
  }};
`

const Row = styled.div`
  display: flex;
  margin: ${(props: IRowProps) => (props.larger ? '0 -10px' : '0')};
  flex-direction: ${(props: IRowProps) => props.direction || 'row'};
  justify-content: ${(props: IRowProps) => props.justify || 'flex-start'};
  align-items: ${(props: IRowProps) => props.verticalAlign || 'center'};
  padding: ${(props: IColProps) => {
    if (props.padding === 'horizontal') return `0 ${rowPadding}`
    if (props.padding === 'vertical') return `${rowPadding} 0`
    if (props.padding === 'all') return `${rowPadding} ${rowPadding}`
    return '0'
  }};
  flex-wrap: ${(props: IRowProps) => (props.canWrap ? 'wrap' : 'no-wrap') || 'no-wrap'};
`

const Col = styled.div`
  padding: 0;
  text-align: ${(props: IColProps) => props.align || 'left'};
  ${(props: IColProps) => (props.size ? `width: ${props.size * 100}%;` : 'flex: auto;')}
  padding: ${(props: IColProps) => {
    if (props.padding === 'horizontal') return `0 ${colPadding}`
    if (props.padding === 'vertical') return `${colPadding} 0`
    if (props.padding === 'left') return `0 0 0 ${colPadding}`
    if (props.padding === 'right') return `0 ${colPadding} 0 0`
    if (props.padding === 'all') return `${colPadding} ${colPadding}`
    return '0'
  }};
  margin: ${(props: IColProps) => {
    if (props.margin === 'horizontal') return `0 ${colMargin}`
    if (props.margin === 'vertical') return `${colMargin} 0`
    if (props.margin === 'left') return `0 0 0 ${colMargin}`
    if (props.margin === 'right') return `0 ${colMargin} 0 0`
    if (props.margin === 'all') return `${colMargin} ${colMargin}`
    return '0'
  }};
`

export { Container, Row, Col }
