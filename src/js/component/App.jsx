/* --------------- IMPORTACIONES--------------------------------------------------------------------------------------- */

import React, {useEffect, useState} from "react";
import '../../styles/App.css';
import { TiDeleteOutline } from "react-icons/ti";

/* --------------- COMPONENTE PRINCIPAL DE LA APLICACION--------------------------------------------------------------- */

const App = () => {
  
  /* --------------- VARIABLES DE HOOKS-------------------------------------------- */
  
  const [registro, setRegistro] = useState([]);
  const [value, setValue] = useState('');

  // const [currentUser, setCurrentUser] = useState('');
  // const [inputUser, setInputUser] = useState('');

  /* --------------- FUNCIONES Y METODOS DE FETCH API------------------------------- */

  // useEffects----------------------------------------------
  useEffect(()=>{
    get;
    console.log(registro);
  }, []);

  useEffect(()=>{
    put;
    console.log(registro);
  }, [registro]);

  // metodo get -------------------------------------------
  const get = () =>{ // este get se usara despues de cada put
    fetch('https://assets.breatheco.de/apis/fake/todos/user/joseingunza')
      .then((response)=> {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((responseAsJson)=> {
        console.log(responseAsJson);
        setRegistro(responseAsJson);
      })
      .catch((error)=> {
          console.log('Looks like there was a problem: \n', error);
      });
  };
      
  // put para actualizar informacion en la API ---------------------
  const put = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/joseingunza', {
      method: "PUT",
      body: JSON.stringify(registro),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok)  {
          console.log(response.ok);
        }
      })
    .catch(error => {
        console.log(error);
    });
  };

      // funcion insertar nueva tarea y accesorios -------------------
  let currentTime = new Date();
  let hora = currentTime.getHours().toString();
  let minuto = currentTime.getMinutes().toString();
  let segundo = currentTime.getSeconds().toString();
  const insertarTarea = (e) =>{ //esto se ejecuta en el onKeyDown
    if(e.target.value.trim().length!==0 && e.key==='Enter'){
      setRegistro([...registro, {label: e.target.value, done: false}]); //esto SOLO funciona con DECONSTRUCCION, NO USAR PUSH
      setValue('');
      // put();
      };
  };

      // funcion eliminar tarea y accesorios -------------------
  const eliminarTarea = (item) => {
    setRegistro(registro.filter((elem)=>elem!==item)); //referencio al id del elemento del array que voya a eliminar dentro del map
    // put();
  };

  const eliminarLista = () =>{
    setRegistro([]);
    // put();
  } 

  /* --------------------------RENDERIZACION------------------------------------------ */

	return (
		<div className="body-hijo row justify-content-center">
			<div className="cuaderno col-10 col-sm-8 col-md-6 col-lg-5 pt-5 pb-2 px-0 mt-5">
				<h1 className="titulo-lista text-center mt-0 mb-4">todos</h1>
        <div className="zona-rayada">
          
          <div className="contenedor-form"> 
            <input
            onKeyDown={insertarTarea}
            value ={value} //input controlado de tarea
            onChange={(e)=>{setValue(e.target.value)}} //input controlado de tarea

            className="entrada-tarea px-3 px-lg-5" 
            type="text"
            placeholder="What needs to be done?"
            />
          </div>

          <div className="elements-from-array">
            {(registro.length==0)? 
              <div className="lista-elemento d-flex align-items-center justify-content-between">
                <div className="lista-texto px-3 px-lg-5">
                  No hay tareas, añadir tareas
                </div>
              </div>
              : registro.map((item)=>
              <div key={item.label+hora+minuto+segundo} className="lista-elemento d-flex align-items-center justify-content-between">
                <div className="lista-texto px-3 px-lg-5" id={item.label+hora+minuto+segundo}>
                  {item.label}
                </div>
                <div
                  onClick = {()=> eliminarTarea(item)} // aqui notese que lleva funcion lambda porque la func eliminar necesita argumentos
                  className="contenedor-icono-eliminar px-3 px-lg-4"
                >
                  <TiDeleteOutline className="icono-eliminar" />
                </div>
              </div>)}
          </div>  

					<div className="pie-pagina d-flex justify-content-between pt-2 pb-1 px-3">
              <div className="col-6">{registro.length} items left</div>
              <div className="contenedor-delete col-6 text-end">
                <button className="btn btn-danger" onClick={eliminarLista}>Eliminar Lista</button>
              </div>
          </div>

        </div>
      </div>
		</div>	
	);
};

export default App;