import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import SiteInfo from './SiteInfo';

const MainMenuWrapper = styled.div`
    display: flex;
    background-color: #1ab784;
    border-bottom: .2rem solid #1fa076;
`;

const MainMenuInner = styled.div`
    max-width: 960px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    width: 960px;
    height: 100%;
`;

const MenuItem = styled( Link )`
    color: white;
    display: block;
    padding: 16px 16px;
    text-decoration: none;
`;

const query = graphql`
    {
        allWordpressWpApiMenusMenusItems( filter: { 
            name: {
            eq: "Main menu"
        }
        }){
        edges {
            node {
            name,
            items {
                title,
                object_slug
            }
            }
        }
        }
    }
`;

const MainMenu = () => (
    <StaticQuery query={ query } render={ ( props ) => (
        <MainMenuWrapper>
            <MainMenuInner>
                <SiteInfo />
                { props.allWordpressWpApiMenusMenusItems.edges[0].node.items.map( ( item ) => (
                    <MenuItem to={ `/${ item.object_slug }` } key={ item.title }>
                        { item.title }
                    </MenuItem>
                ))}
            </MainMenuInner>
        </MainMenuWrapper>
    )} />
);

export default MainMenu;