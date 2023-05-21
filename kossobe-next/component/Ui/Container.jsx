import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100vw;
@media (max-width: 800px) {
        padding: 10px 20px;
}

`

const Container = ({children}) => {
  return (
    <StyledContainer>
        {children}
    </StyledContainer>
  )
}

export default Container