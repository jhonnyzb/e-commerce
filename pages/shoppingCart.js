import Head from "next/head"

import { wrapper } from "../redux/store"
import { connect } from "react-redux"
import { getCategorias } from "../redux/CategoriasDuck"

import { gql, GraphQLClient } from "graphql-request"
import { Row } from "react-bootstrap"

import ContainerMain from "../components/shared/ContainerMain"
import BannerMain from "../components/shoppingCart/BannerMain"
import ItemsPedido from "../components/shoppingCart/ItemsPedido"

const GET_CATEGORIAS = gql`
      {
            obtenerCategorias {
                  id
                  nombre
            }
      }
`

const ShoppingCart = () => {
      return (
            <>
                  <Head>
                        <title>Carrito - Ogani</title>
                        <meta charSet="UTF-8" />
                        <meta name="description" content="Ogani Template" />
                        <meta name="keywords" content="Ogani, unica, creative, html" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                        <link rel="icon" href="/favicon.ico" />
                  </Head>
                  <ContainerMain>
                        <Row style={{ marginTop: 30, marginBottom: 30 }}>
                              <BannerMain title="Carrito de compras" title_="Carrito" />
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                              <ItemsPedido />
                        </Row>
                  </ContainerMain>
            </>
      )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
      const client = new GraphQLClient(process.env.ENV_LOCAL_VARIABLE, { headers: {} })
      const { obtenerCategorias } = await client.request(GET_CATEGORIAS)
      store.dispatch(getCategorias(obtenerCategorias))
      return {
            props: {},
            revalidate: 1,
      }
})

export default connect(null, null)(ShoppingCart)
