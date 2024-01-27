import React from 'react'
import styled from 'styled-components'


const StyledCard = styled.div`
    border-radius: 20px;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 100px;
    padding: 40px 50px;
    background-color: rgba(233, 232, 232, 1);
    background: var(--gradient);
    background: var(--bg);
    border: 2px solid var(--textColor); 

    @media (max-width: 800px) {
        padding: 20px 20px;
    }

`




const Card = ({children, classes}) => {
  return (
        <StyledCard className={classes}>
            {children}
        </StyledCard>

  )
}

export default Card