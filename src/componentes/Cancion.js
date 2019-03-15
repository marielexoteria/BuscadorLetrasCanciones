import React, {Fragment} from 'react';

//haciendo destructuring y extrayendo lo que se quiere desplegar
function Cancion({letra}) {
    if (letra.length === 0) return null; //para que no despliegue el H2 si no se ha hecho una búsqueda
    return (
        <Fragment>
            <h2>Letra de la canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
        
    )
}

export default Cancion;