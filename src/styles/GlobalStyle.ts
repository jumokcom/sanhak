import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden; /* 가로 스크롤 방지 */
    width: 100%;
  }
`;

export default GlobalStyle;
