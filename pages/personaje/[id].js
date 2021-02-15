import React from 'react';
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });

const Personaje = (props) => {
    const { gender, id, image, name, species, status } =props.data.character
    const router = useRouter()
  return (
    <div>
      {name}
      <hr />
      {status}
    </div>
  );
}

export default Personaje;

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
        {
            characters{
              results{
                id
              }
            }
          }
        `
      });
      const paths = data.characters.results.map(character=>{
          return {
              params:{
                  id:character.id
              }
          }
      })
    return {
        paths: paths,
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const { data } = await client.query({
        query: gql`
        {
            character(id:${params.id}){
              id
              name
              species
              status
              gender
              image
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