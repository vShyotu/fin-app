import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogoLink } from "../LogoLink";
import { useState } from "react";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 0 3rem;
    align-items: center;
  }
`;

const LogoLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 768px) {
    box-shadow: none;
    width: auto;
  }
`;

const MainNavList = styled.ul`
  ${({ open }) => (open ? `display: flex;` : `display: none;`)}

  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

const MainNavItem = styled.li`
  border-bottom: 1px solid #d9d9d9;

  @media screen and (min-width: 768px) {
    border-bottom: none;
  }

  a {
    display: inline-block;
    width: 100%;
    padding: 1rem;
    color: black;
    text-decoration: none;

    ${({ current }) =>
      current &&
      `
    font-weight: bold;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-position: below;
  `}

    :hover {
      color: #00614a;
    }
  }
`;

const AdminNavContainer = styled.div`
  ${({ open }) => (open ? `display: flex;` : `display: none;`)}

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const BurgerMenuButton = styled.button`
  display: block;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const AuthedNavbar = () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <LogoLinkContainer>
        <LogoLink />
        <BurgerMenuButton onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </BurgerMenuButton>
      </LogoLinkContainer>
      <MainNavList open={open}>
        <MainNavItem current={pathname === "/"}>
          <Link to="/">Home</Link>
        </MainNavItem>
        <MainNavItem current={!!(pathname === "/plan")}>
          <Link to="/plan">Plan</Link>
        </MainNavItem>
        <MainNavItem current={pathname === "/learn"}>
          <Link to="/learn">Learn</Link>
        </MainNavItem>
        <MainNavItem current={pathname === "/profile"}>
          <Link to="/profile">Profile</Link>
        </MainNavItem>
      </MainNavList>
      <AdminNavContainer open={open}>
        <button onClick={() => logout()}>Log out</button>
      </AdminNavContainer>
    </Nav>
  );
};
