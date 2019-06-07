import React from 'react';
import Layout from '../components/Layout';

export default ( { pageContext } ) => (
    <Layout>
        <h1 dangerouslySetInnerHTML={ { __html: pageContext.title } }></h1>
        <div dangerouslySetInnerHTML={ { __html: pageContext.content } }></div>
    </Layout>
);