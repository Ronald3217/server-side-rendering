import React from 'react';

const Usuarios = (props) => {
    console.log(props.usuarios);
    return ( 
        <>
            <h1>Listado de Usuarios</h1>

            <pre>
                {JSON.stringify(props.usuarios)}
            </pre>
            <ul>
                {props.usuarios.map(usuario=>(
                    <li key={usuario.id} ><span>{usuario.name}</span> - {usuario.email} </li>
                ))}    
            </ul>
        </>
     );
}
 
export default Usuarios;

export async function getStaticProps(context) {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users')
    const usuarios = await respuesta.json()
    return {
      props: {
          usuarios
      }, // will be passed to the page component as props
    }
  }