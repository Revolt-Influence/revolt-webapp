import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Row } from '../utils/grid'
import { setFont } from '../utils/styles'
import { palette } from '../utils/colors'

const arrowLeft = require('../images/icons/arrowLeft.svg')
const arrowRight = require('../images/icons/arrowRight.svg')
const arrowLeftDouble = require('../images/icons/arrowLeftDouble.svg')
const arrowRightDouble = require('../images/icons/arrowRightDouble.svg')

interface IPageIndexButtonProps {
  isSelected: boolean
}

const PageIndexButton = styled.button`
  background: ${(props: IPageIndexButtonProps) =>
    props.isSelected ? palette.blue._500 : palette.grey._50};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  border: 0;
  ${setFont(600, 'small')}
  color: ${(props: IPageIndexButtonProps) =>
    props.isSelected ? palette.grey._50 : palette.blue._500};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  text-align: center;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.20);
  }
`

const ArrowButton = styled.button`
  background: ${palette.grey._50};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  border: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;
  margin: 0 10px;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const ArrowButtonIcon = styled.img`
  width: 20px;
  height: 20px;
`

const PageIndexButtonText = styled.p`
  color: ${palette.grey._50} !important;
  -webkit-text-fill-color: rgba(255, 255, 255, 1);
  opacity: 1;
  color: ${palette.grey._50};
`

interface IPaginationProps extends RouteComponentProps {
  optionsBreadth: number
  totalPages: number
  currentPage: number
  handlePageChange: (newPage: number) => any
  hasSkipButtons?: boolean
}

const Pagination: React.FC<IPaginationProps> = ({
  optionsBreadth,
  currentPage,
  totalPages,
  handlePageChange,
  hasSkipButtons,
}) => {
  const fakeArray = new Array(totalPages)
  const rawRange: number[] = [...fakeArray.keys()]
  const startLimit = currentPage - optionsBreadth - 1 < 0 ? 0 : currentPage - optionsBreadth - 1
  const endLimit =
    currentPage + optionsBreadth > totalPages ? totalPages : currentPage + optionsBreadth
  const pagesList = rawRange.slice(startLimit, endLimit).map(_index => _index + 1)

  return (
    <Row justify="center" padding="vertical">
      {/* 10 pages back button */}
      {hasSkipButtons && (
        <ArrowButton
          disabled={currentPage <= 10}
          onClick={() => handlePageChange(currentPage - 10)}
        >
          <ArrowButtonIcon src={arrowLeftDouble} alt="10 pages back" />
        </ArrowButton>
      )}
      {/* Previous page button */}
      <ArrowButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        <ArrowButtonIcon src={arrowLeft} alt="previous" />
      </ArrowButton>
      {/* Specific page buttons */}
      {pagesList.map(_pageIndex => (
        <PageIndexButton
          isSelected={_pageIndex === currentPage}
          onClick={() => handlePageChange(_pageIndex)}
          key={_pageIndex}
        >
          {/* Wrapper because of annoying Safari bug */}
          {_pageIndex === currentPage ? (
            <PageIndexButtonText>{_pageIndex}</PageIndexButtonText>
          ) : (
            _pageIndex
          )}
        </PageIndexButton>
      ))}
      {/* Next page button */}
      <ArrowButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowButtonIcon src={arrowRight} alt="next" />
      </ArrowButton>
      {/* 10 pages forward button */}
      {hasSkipButtons && (
        <ArrowButton
          disabled={currentPage > totalPages - 10}
          onClick={() => handlePageChange(currentPage + 10)}
        >
          <ArrowButtonIcon src={arrowRightDouble} alt="10 pages forward" />
        </ArrowButton>
      )}
    </Row>
  )
}

Pagination.defaultProps = {
  optionsBreadth: 2,
  hasSkipButtons: false,
}

export default withRouter(Pagination)
