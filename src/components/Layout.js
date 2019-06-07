import React from 'react';
import MainMenu from './MainMenu';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url( 'https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=latin-ext' );  

    *, *:before, *:after {
        box-sizing: inherit;
    }

    ::selection {
        background: #aaf3db;
    }

    html {
        font-size: 62.5%; 
        box-sizing: border-box;
    }

    body {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        line-height: 1.6;
    }


    /* Wordpress Core Styles */
    .alignnone {
        margin: 5px 20px 20px 0;
    }
  
    .aligncenter,
    div.aligncenter {
        display: block;
        margin: 5px auto 5px auto;
    }
  
    .alignright {
        float:right;
        margin: 5px 0 20px 20px;
    }
  
    .alignleft {
        float: left;
        margin: 5px 20px 20px 0;
    }
  
    a img.alignright {
        float: right;
        margin: 5px 0 20px 20px;
    }
  
    a img.alignnone {
        margin: 5px 20px 20px 0;
    }
  
    a img.alignleft {
        float: left;
        margin: 5px 20px 20px 0;
    }
  
    a img.aligncenter {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
  
    .wp-caption {
        background: #fff;
        border: 1px solid #f0f0f0;
        max-width: 96%; /* Image does not overflow the content area */
        padding: 5px 3px 10px;
        text-align: center;
    }
  
    .wp-caption.alignnone {
        margin: 5px 20px 20px 0;
    }
  
    .wp-caption.alignleft {
        margin: 5px 20px 20px 0;
    }
  
    .wp-caption.alignright {
        margin: 5px 0 20px 20px;
    }
  
    .wp-caption img {
        border: 0 none;
        height: auto;
        margin: 0;
        max-width: 98.5%;
        padding: 0;
        width: auto;
    }
  
    .wp-caption p.wp-caption-text {
        font-size: 11px;
        line-height: 17px;
        margin: 0;
        padding: 0 4px 5px;
    }
  
    /* Text meant only for screen readers. */
    .screen-reader-text {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute !important;
        width: 1px;
        word-wrap: normal !important; /* Many screen reader and browser combinations announce broken words as they would appear visually. */
    }
  
    .screen-reader-text:focus {
        background-color: #eee;
        clip: auto !important;
        clip-path: none;
        color: #444;
        display: block;
        font-size: 1em;
        height: auto;
        left: 5px;
        line-height: normal;
        padding: 15px 23px 14px;
        text-decoration: none;
        top: 5px;
        width: auto;
        z-index: 100000;
        /* Above WP toolbar. */
    }
    /* END Wordpress Core Styles */
`;

const LayoutWrapper = styled.div`
    max-width: 960px;
    margin: 6rem auto;
    padding: 0 2rem;
    color: #333;
`;

const Layout = ( { children } ) => {
    return (
        <div>
            <GlobalStyles />
            <MainMenu />
            <LayoutWrapper>
                { children }
            </LayoutWrapper>
        </div>
    );
};

export default Layout;