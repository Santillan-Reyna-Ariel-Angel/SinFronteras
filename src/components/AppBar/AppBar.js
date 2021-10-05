import styled from "styled-components";
import Logo from "../../sources/img/LogoSF.png";
export const LogoAppBar = styled.div`
  width: 70px;
  height: 70px;
  margin: 5px 0px;
  /* padding: 5px 0px; */
  background: url(${Logo});
  background-position: center;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
`;
