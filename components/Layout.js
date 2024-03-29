import { React } from "react";
import Header from "./Header";
import Head from "next/head";
import { Container } from "semantic-ui-react";
export default (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
        <script src="like_button.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/web3@1.3.0/dist/web3.min.js"></script>
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
