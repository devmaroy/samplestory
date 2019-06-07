import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const PageImage = styled.img`
    max-width: 100%;
    margin-top: 2rem;
`;

export default ( { pageContext } ) => (
    <Layout>
        <h1 dangerouslySetInnerHTML={ { __html: pageContext.title } }></h1>
        <div dangerouslySetInnerHTML={ { __html: pageContext.content } }></div>
        {
            pageContext.featured_media && (
                <PageImage src={ pageContext.featured_media.source_url } alt="Featured image" />
            )
        }
    </Layout>
);