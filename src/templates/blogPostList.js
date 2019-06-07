import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'gatsby';
import styled from 'styled-components';
import moment from 'moment';

const Post = styled.div`
    border-bottom: .1rem dashed #ececec;
    padding-bottom: 6rem;

    &:not( :first-child ) {
        padding-top: 6rem;
        border: none;
    }
`;

const PostTitleLink = styled( Link )`
    color: #333;
    text-decoration: none;
`;

const PostMeta = styled.ul`
    margin: 0 0 4rem 0;
    padding: 0;
    
    li {
        list-style: none;
        display: inline-block;
        margin-right: 2rem;

        &:not( :last-child )::after {
            content: '|';
            margin-left: 2rem;
        }
    }
`;

const PostImage = styled.img`
    max-width: 100%;
`;

const ReadMoreLink = styled( Link )`
    display: inline-block;
    background: #1ab784;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    padding: .7rem 1rem;
    font-size: 1rem;
    font-weight: 300;
    margin-top: 2rem;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: flex-end; 
    margin-top: 4rem;
`;

const PageNumber = styled( Link )`
    display: block;
    padding: .5rem 1.6rem;
    text-decoration: none;
    color: #333;
`;

const PageNumberWrapper = styled.div`
   background: ${ props => props.isCurrentPage ? '#1ab784' : '#eee' };
   margin-left: 1.5rem;
   min-width: 0;
`;

export default ( { pageContext } ) => (
    <Layout>
        <div>
            {
                pageContext.posts.map( ( post ) => (
                    <Post key={ post.node.id }>
                        {
                            post.node.featured_media && (
                                <PostImage src={ post.node.featured_media.source_url } alt="Featured image" />
                            )
                        }
                        <PostTitleLink to={ `/post/${ post.node.slug }` }>
                            <h2 dangerouslySetInnerHTML={ { __html: post.node.title } } />
                        </PostTitleLink>
                        <PostMeta>
                            <li>
                                <time dateTime={ post.node.date }>
                                    &#x1F4C5; { moment( post.node.date ).format( 'Do MMM YYYY HH:mm' )  } 
                                </time> 
                            </li>
                            <li>
                                &#x1F464; { post.node.author.name }
                            </li>
                        </PostMeta>   
                        <div dangerouslySetInnerHTML={ { __html: post.node.excerpt } } />
                        <div>
                            <ReadMoreLink to={ `/post/${ post.node.slug }` }>
                                Read more &#x2192;
                            </ReadMoreLink>
                        </div>
                    </Post>
                ))
            }
        </div>
        <Pagination>
            {
                Array.from( { length: pageContext.numberOfPages } ).map( ( page, index ) => (
                    <PageNumberWrapper key={ index } isCurrentPage={ index + 1 === pageContext.currentPage}>
                        {
                            console.log( index + 1 === pageContext.currentPage )
                        }
                        <PageNumber to={ index === 0 ? '/blog' : `/blog/${ index + 1 }` } activeStyle={ { color: 'white' }}>
                            { index + 1 }
                        </PageNumber>
                    </PageNumberWrapper>  
                ))
            }
        </Pagination>
    </Layout>
);