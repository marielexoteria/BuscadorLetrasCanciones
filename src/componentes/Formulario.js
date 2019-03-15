import React, { useState } from 'react';

function Formulario({consultarAPILetras}) { //haciendo destructuring para extraer el nombre del método del state desde App.js
    const [busqueda, agregarBusqueda] = useState({
        artista: '',
        cancion: ''
    })

    //función para actualizar el state de los inputs
    //*** */state local del formulario***
    const actualizarState = e => {
        agregarBusqueda({
            ...busqueda, //copia del state actual para que no desaparezca la info en por ej. "artista" si se pasa al campo "canción"
            [e.target.name]: e.target.value //leyendo lo que el usuario escribe en los inputs text
        });
    }

    //cuando el usuario hace submit al form
    const enviarInformacion = e => {
        e.preventDefault();
        //pasando el state local del formulario (con su info) al componente padre (App.js)
        consultarAPILetras(busqueda);
    }


    return (
        <div className="bg-info">
          <div className="container">
              <div className="row">
                  <form onSubmit= {enviarInformacion} className="col card text-white bg-transparent  mb-5 pt-5 pb-2">
                      <fieldset>
                          <legend className="text-center">Buscador de Letras de Canciones</legend>
                          <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                    <label>Artista</label>
                                    <input type="text" className="form-control" name="artista"  placeholder="Nombre del artista" onChange = {actualizarState} required />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                    <label>Canción</label>
                                    <input type="text" className="form-control" name="cancion"  placeholder="Nombre de la canción" onChange = {actualizarState} required />
                                </div>
                              </div>
                          </div>
                          <button type="submit" className="btn btn-primary float-right">Buscar</button>
                      </fieldset>
                  </form>
              </div>
          </div>
      </div>
    )
}

export default Formulario;