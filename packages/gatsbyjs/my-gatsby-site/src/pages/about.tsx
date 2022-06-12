import React from 'react';
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Heading = styled.h1`
  font-size: 5rem;
  margin-bottom: 0;
`;

const italic = css`
  font-style: italic;
  margin-top: 0;
`;

const AboutPage = ({ data }) => {
  return (
    <>
      <Heading>About</Heading>
      <p css={italic}>{data.site.siteMetadata.title}</p>
    </>
  );
};

export default AboutPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
