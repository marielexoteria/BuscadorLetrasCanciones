import React, { useState, useEffect, Fragment } from 'react';

//importando dependencias
import axios from 'axios';

//importando componentes
import Formulario from './componentes/Formulario';
import Cancion from './componentes/Cancion';
import Informacion from './componentes/Informacion';


function App() {
    //utilizar useState con 3 states
    const [artista, agregarArtista] = useState(''); //artista = this.state, agregarArtista = this.setState
    const [letra, agregarLetra] = useState([]); //se inicia como arreglo vacío porque la API retorna las letras como un arreglo
    const [info, agregarInfo] = useState({}); //se inicia como un objeto vacío porque la API retorna la info del artista como un objeto con varias propiedades

    //método para consultar la API de letras de canciones
    const consultarAPILetras = async busqueda => { //busqueda es el state local del componente hijo Formulario.js
        //haciendo destructuring y extrayendo lo que se quiere mandar a la API para la consulta de las letras
        const {artista, cancion} = busqueda;
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`; 

        //consultando la API
        const resultado = await axios (url);

        //almacenando el artista que se buscó
        agregarArtista(artista);

        //almacenando la letra en el state
        agregarLetra(resultado.data.lyrics);
    }

    //método para consultar la API de info del artista
    const consultarAPIInfo = async () => {
        if (artista) {
            const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

            //consultando la API
            const resultado = await axios(url);

            //almacenando la info del artista en el state
            agregarInfo(resultado.data.artists[0]);

            console.log(info);
        }
    }

    //usando useEffect para ejectuar los 2 métodos anteriores
    //useEffect es similar a componentDidMount
    useEffect(
        () => {
            consultarAPIInfo()
        }, [artista]
    )

    return (
        <Fragment>
            <Formulario 
                consultarAPILetras = {consultarAPILetras}
            />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Informacion 
                            info = {info}
                        />
                    </div>
                    <div className="col-md-6">
                        <Cancion 
                            letra = {letra}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default App;
