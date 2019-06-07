import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

const BooksWrapper = styled.div`
    margin-top: 6rem;   
    
    @media ( min-width: 830px ) {
        display: flex;
        justify-content: space-between;
    }
`;

const Book = styled.div`
    width: 100%;
    border: .1rem dashed #ececec;
    padding: 1.5rem;
    margin-bottom: 4rem;

    @media ( min-width: 830px ) {
        width: calc( 1/2 * 100% - ( 1 - 1/2 ) * 2rem );
        margin-bottom: 0;
    }
`;

const BookImage = styled.img`
    max-width: 100%;
`;

const BookMeta = styled.div`
    text-align: center;
`;

const BookPrice = styled.p`
    font-size: 3rem;
    color: #1ab784;
`;

const BookOrder = styled.a`
    display: block;
    text-decoration: none;
    font-size: 2rem;
    padding: 1rem;
    background: #1ab784;
    color: white;
`;

const ReadMoreLink = styled( Link )`
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 300;  
    color: #1ab784;
`;

const query = graphql`
    {
        allWordpressWpBooks {
            edges {
                node {
                    id
                    title
                    slug
                    excerpt
                    content
                    featured_media {
                        source_url
                    }
                    acf {
                        book_order_url
                        book_price
                    }
                }
            }
        }
    }
`;

const Books = () => {
    return (
        <StaticQuery query={ query } render={ props => <BooksWrapper>{ props.allWordpressWpBooks.edges.map( ( book ) => (
            <Book key={ book.node.id }>
                <h2 dangerouslySetInnerHTML={ { __html: book.node.title } } />
                <BookImage src={ book.node.featured_media.source_url } alt="Featured image" />
                <div dangerouslySetInnerHTML={ { __html: book.node.excerpt } } />
                <ReadMoreLink to={ `/book/${ book.node.slug }` }>
                    Read more
                </ReadMoreLink>
                <BookMeta>
                    <BookPrice>
                        &#36; { book.node.acf.book_price }
                    </BookPrice>
                    <BookOrder href={ `${ book.node.acf.book_order_url }` }>
                        Order now
                    </BookOrder>
                </BookMeta>
            </Book>
        ))} </BooksWrapper> } />

    );
};

export default Books;