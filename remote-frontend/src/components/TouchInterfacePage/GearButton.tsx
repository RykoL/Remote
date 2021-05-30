import React from 'react';
import styled from 'styled-components';

const GearButtonContainer = styled.div`
    &:active {
        transform: scale(1.2) rotateZ(180deg);
    }

    transition: transform 1s;
`;

const GearButtonImage = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 6rem;
    padding: 0.5rem;
    opacity: 0.4;
    box-shadow: 0rem 0.1rem 0.7rem 0rem rgba(0, 0, 0, 1);
`;

export const GearButton: React.FC = () => {
    return (
        <GearButtonContainer>
            <GearButtonImage alt="gear" src="gear.svg" />
        </GearButtonContainer>
    );
}
