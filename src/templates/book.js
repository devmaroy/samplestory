import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const BookImage = styled.img`
    max-width: 300px;
    margin: 16px 0;
`;

export default ( { pageContext } ) => (
    <Layout>
        <h1 dangerouslySetInnerHTML={ { __html: pageContext.title } }></h1>
        <BookImage src={ pageContext.featured_media.source_url } />
        <div dangerouslySetInnerHTML={ { __html: pageContext.content } }></div>
    </Layout>
);