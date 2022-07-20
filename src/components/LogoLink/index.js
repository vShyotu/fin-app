import { Link } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon } from "../LogoIcon";

const StyledLink = styled(Link)`
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-size: 24px;
  font-weight: bolder;
  text-decoration: none;
  color: #000000;

  :hover {
    color: #00b58a;
  }
`;

const Logo = styled(LogoIcon)`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  color: #00b58a;
  margin-left: 0.5rem;
`;

const LogoLinkText = styled.span`
  vertical-align: middle;
`;

export const LogoLink = () => (
  <>
    <StyledLink to="/">
      <Logo /> <LogoLinkText>Path</LogoLinkText>
    </StyledLink>
  </>
);
