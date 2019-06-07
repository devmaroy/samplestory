import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

const SiteInfoWrapper = styled.div`
    flex-grow: 1;
    color: white;
    margin: auto 0;
`;

const SiteTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
`;

const SiteLink = styled( Link )`
    color: white;
    text-decoration: none;
`;

const query = graphql`
    {
        allWordpressSiteMetadata {
            edges {
                node {
                    name,
                    description
                }
            }
        }
    }
`;

const SiteInfo = () => (
    <StaticQuery query={ query } render={ ( props ) => (
        <SiteInfoWrapper>
            <SiteTitle>
                <SiteLink to="/home">
                    { props.allWordpressSiteMetadata.edges[0].node.name }
                </SiteLink>
            </SiteTitle>
            <div>
                { props.allWordpressSiteMetadata.edges[0].description }
            </div>
        </SiteInfoWrapper>
    )} />
)

export default SiteInfo;