import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });

const Personajes = ({data}) => {
    console.log(data.characters.results);
    return (
        <>
            <h1>Personajes Rick And Morty API - GraphQL</h1>
            <pre>{JSON.stringify(data.characters.results)} </pre>
            <ul>
                {
                    data.characters.results.map(personaje=>(
                        <li key={personaje.id} ><span>{personaje.name}</span> - {personaje.status} </li>
                    ))
                }
            </ul>
        </>
    );
}

export default Personajes;

export async function getStaticProps(context) {
    const { data } = await client.query({
        query: gql`
        {
            characters{
              results{
                id
                name
                species
                gender
                status
                image
              }
            }
          }
        `
      });
    return {
        props: {
            data
        }
    }
}