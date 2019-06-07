const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
 
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect( { fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true } )
  createRedirect( { fromPath: '/blog/1', toPath: '/blog', redirectInBrowser: true, isPermanent: true } )

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
 
    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
                title
                content
                template
                date
                featured_media {
                  source_url
                }
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js")
        const booksUnderContent = path.resolve("./src/templates/booksUnderContent.js")
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
 
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash( edge.node.template === 'books_under_content.php' ? booksUnderContent : pageTemplate ),
            context: edge.node,
          })
        })
      })
      // ==== END PAGES ====
 
      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressPost( sort: {
                fields: [date],
                order: DESC
              }) {
                edges{
                  node{
                    id 
                    title
                    slug
                    excerpt
                    content
                    date
                    featured_media {
                      source_url
                    }
                    author {
                      name
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const posts = result.data.allWordpressPost.edges;
          const postsPerPage = 2;
          const numberOfPages = Math.ceil( posts.length / postsPerPage );
          const blogPostListTemplate = path.resolve( './src/templates/blogPostList.js' );

          Array.from( { length: numberOfPages } ).forEach( ( page, index ) => {
            createPage({
                component: slash( blogPostListTemplate ),
                path: index === 0 ? '/blog' : `/blog/${ index + 1 }`,
                context: {
                    posts: posts.slice( index * postsPerPage, ( index * postsPerPage ) + postsPerPage ),
                    numberOfPages,
                    currentPage: index + 1
                }
            })
          });

          const postTemplate = path.resolve("./src/templates/post.js")
          _.each(result.data.allWordpressPost.edges, edge => {
            createPage({
              path: `/post/${edge.node.slug}/`,
              component: slash(postTemplate),
              context: edge.node,
            })
          })

          
        })
      })
    // ==== END POSTS ====
    // ==== BOOKS ====
      .then( ( result ) => {
        graphql(`
          {
            allWordpressWpBooks {
              edges {
                node {
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
        `).then( result => {
          if ( result.errors ) {
            console.log( result.errors );
            reject( result.errors );
          }

          const bookTemplate = path.resolve( './src/templates/book.js' );

          _.each( result.data.allWordpressWpBooks.edges, edge => {
            createPage({
              path: `/book/${ edge.node.slug }/`,
              component: slash( bookTemplate ),
              context: edge.node
            })
          });

          resolve();
        })
      })
    // ==== END BOOKS ====
  })
}
