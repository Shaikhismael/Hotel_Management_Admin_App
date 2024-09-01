import React from 'react'
import styled from 'styled-components'
import MainNav from './MainNav'
import Logo from './Logo'
import Uploader from '../data/Uploader'

const StyledSidebar = styled.aside`
    padding: 3.2rem 2.4rem ;
    border-right: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    grid-row: 1 / -1;
`

function SideBar() {
  return (
    <StyledSidebar>
      <Logo></Logo>
      <MainNav></MainNav>
      <Uploader />
    </StyledSidebar>
  )
}

export default SideBar