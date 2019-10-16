import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/global.scss"

const slugify = string => {
  const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;"
  const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with ‘and’
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple — with single -
    .replace(/^-+/, "") // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    <p>
      Hola, bienvenid(a), soy nerd, frontend developer, me encanta colaborar con
      las comunidades de desarrolladores y compartir conocimientos.
      Co-organizador de <a href="https://noders.com">Noders</a> y{" "}
      <a href="https://nodeschool.io/santiago">Nodeschool Santiago</a>. Humano
      de <a href="https://instagram.com/kyratail">@kyratail</a> a tiempo
      completo.
    </p>
    <section>
      <h2 className="section-title">- Blog -</h2>
      <ul className="posts">
        {data.allStrapiArticle.edges.map(document => (
          <li key={document.node.id}>
            <Link
              to={`/article/${document.node.id}/${slugify(
                document.node.title
              )}`}
            >
              <article className="post">
                <h2>{document.node.title}</h2>
                <div className="post-description">
                  <div className="post-image">
                    <img src={document.node.image.publicURL} alt=" " />
                  </div>
                  <p className="description">{document.node.description}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            publicURL
          }
          title
          description
        }
      }
    }
  }
`
