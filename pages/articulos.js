import React from 'react';
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
    uri:'https://demoapirest.000webhostapp.com/graphql',
    cache: new InMemoryCache()
})

const Articulos = (props) => {
    console.log(props);
    const { articulos } = props
    return ( 
        <>
            <h1>Listado de Entradas de Articulos</h1>
            <ul>
                {articulos.posts.nodes.map(articulo =>(
                    <li key={articulo.id} >
                        {articulo.title}
                    </li>
                ))}
            </ul>
        </>
     );
}
 
export default Articulos;

export async function getStaticProps(){
    const { data } = await client.query({query:gql`
    {
        posts {
          nodes{
            title
            id
            featuredImage{node{sourceUrl}}
            categories{nodes{name slug}}
            author{node{name}}
          }
        }
      }
    `})
    return {
        props:{
            articulos: data
        }
    }
}