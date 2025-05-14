import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Header = () => {
  const HeaderContainer = styled.header`
    width: 100%;
    height: 160px;
    background-color: #1a202c;
    display: flex;
    align-items: center;
  `;

  const Title = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: bold;
    margin-left: 100px;
  `;

  const LoginButton = styled.button``;

  return (
    <HeaderContainer>
      <Title>포트폴리오 관리</Title>
      <LoginButton>로그인</LoginButton>
    </HeaderContainer>
  );
};

export default Header;
