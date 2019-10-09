import App from "next/app";
import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {}; // move this to its own file later

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.4;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 2.8rem;
    line-height: 1.4;
    margin-bottom: 2rem;
  }
  input, textarea, button, p, li {
    font-size: 1.6rem;
  }

`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
