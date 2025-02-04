import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// Styled Components
const NavbarContainer = styled.nav`
  background:rgb(149, 80, 238);
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  max-width: 1500px;
  width: 100%;
  padding: 0 50px;
  margin: 0 auto;
  z-index: 1;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

const MenuIcon = styled.div`
  display: none;
  color:rgb(252, 14, 14);
  cursor: pointer;
  font-size: 1.8rem;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NavText = styled.div`
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    height: 35vh;
    position: absolute;
    top: 70px;
    left: ${({ click }) => (click ? "0" : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: #924feb;
  }
`;

const NavItem = styled.li`
  height: 80px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 960px) {
    height: 60px;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid #fff;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 2rem;
    text-align: center;
    display: table;

    &:hover {
      background-color: #fff;
      color: #333;
      border-bottom: none;
    }
  }
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <Logo to="/" onClick={closeMobileMenu}>
          <LogoImage src="/logo.png" alt="App Tech Stars" />
        </Logo>

        <NavText>AppTech Stars Movie Hub</NavText>

        <MenuIcon onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faTimes : faBars} />
        </MenuIcon>

        <NavMenu click={click}>
          <NavItem>
            <NavLink to="/" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </NavItem>
        </NavMenu>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
