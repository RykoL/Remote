import { useState, useEffect } from 'react'
import React from 'react'
import SettingsService from '../api/SettingsService'
import styled from "styled-components";

const QRCodeImage = styled.img`
    max-width: 30rem;
    padding: 2rem;
    display: block;
    margin: 0 auto;
    border-radius: 3rem;
    border: .2em solid var(--primary-red);
    box-shadow: 0 4rem 5rem 1rem rgba(0, 0, 0, 0.5);

    animation: border-colors 5s infinite;

    @keyframes border-colors {
    50% {
    border-color: #717EC3;
    }
    }
`

const QRCodeContainer = styled.section`
    grid-column: 2;
    grid-row: 2;
`

const InstructionContainer = styled.aside`
    grid-column: 3;
    grid-row: 2;
    border: .2em solid white;
    border-radius: 3rem;
    padding: 2rem;
    box-shadow: 0 4rem 5rem 1rem rgba(0, 0, 0, 0.5);
`

const WelcomeTextContainer = styled.aside`
    grid-column: 1;
    grid-row: 2;
    border: .2em solid white;
    border-radius: 3rem;
    padding: 2rem;
    box-shadow: 0 4rem 5rem 1rem rgba(0, 0, 0, 0.5);
`


const WelcomeContainer = styled.main`
    padding 0 10rem;
    display: grid;
    grid-row-gap: 5rem;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 20rem 1fr;
`

const WelcomeHeading = styled.h1`
    grid-column: 2;
    grid-row: 1;
    animation: move-in 1s ease-in;
    transition: transform 1s;

    @keyframes move-in {

    0% {
    opacity: 0;
    }

    75% {
    transform: translate3d(-2rem, 0, 0);
    opacity: 0.75;
    }

    100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    }
    }
`

const WelcomeText = styled.p`
    line-height: 2.5rem;
`;

interface Props {
    qrCodeUrl: string
}

export const WelcomePage: React.FC<Props> = ({ qrCodeUrl }) => {

    const [appLink, setAppLink] = useState<string>();

    useEffect(() => {
        SettingsService.whoami().then(setAppLink)
    }, []);

    return (
        <WelcomeContainer>
            <WelcomeHeading>Welcome to Yo-Remote</WelcomeHeading>
            <WelcomeTextContainer>
                <h3>Open the remote</h3>
                <WelcomeText>
                    To open the mouse controller simply, scan the QR-Code with your smartphone
                    or open the following link in your browser.
                </WelcomeText>
            </WelcomeTextContainer>
            <QRCodeContainer>
                <QRCodeImage src={qrCodeUrl} />
            </QRCodeContainer>
            <InstructionContainer>
                <h3>How to use</h3>
                <p>&#128070; Use 1 finger to move</p>
                <p>✌️ Use 2 fingers to scroll</p>
                <p>&#128070; Tap to click</p>
            </InstructionContainer>
        </WelcomeContainer>
    )
}
