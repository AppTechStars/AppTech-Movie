import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get current year dynamically

    return (
        <FooterContainer>
            <FooterContent>
                <FooterLogo>
                    <img src="/logo.png" alt="App Tech Stars" />
                </FooterLogo>

                <FooterLinks>
                    <FooterLink href="https://www.facebook.com" target="_blank">
                        <FontAwesomeIcon icon={faFacebook} />
                    </FooterLink>
                    <FooterLink href="https://www.twitter.com" target="_blank">
                        <FontAwesomeIcon icon={faTwitter} />
                    </FooterLink>
                    <FooterLink href="https://www.instagram.com" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                    </FooterLink>
                    <FooterLink href="https://www.linkedin.com" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </FooterLink>
                </FooterLinks>
            </FooterContent>

            <CopyrightText>
                © {currentYear} App Tech Stars. All rights reserved.
            </CopyrightText>
        </FooterContainer>
    );
};

// Styled Components
const FooterContainer = styled.footer`
    background-color:rgb(144, 194, 252);
    color: black;
    padding: 20px 0;
    text-align: center;
`;

const FooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 10px;

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
        gap: 15px;
    }
`;

const FooterLogo = styled.div`
    img {
        width: 100px;

        @media (max-width: 600px) {
            width: 80px;
        }
    }
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 600px) {
        justify-content: center;
    }
`;

const FooterLink = styled.a`
    color: black;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
        color: #007bff;
    }
`;

const CopyrightText = styled.p`
    font-size: 0.9rem;
    opacity: 0.7;
    margin-top: 10px;
`;

export default Footer;
