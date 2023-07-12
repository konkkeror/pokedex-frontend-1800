

var pokemones = [];

// Promesas: Me sirven para saber cuando termina una función asincrona
const cargarPokemones = () => {
  fetch("http://localhost:3004/pokemones/", 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json", //MIME type 
      },
    }
  ).then((respuesta) => respuesta.json())
  .then((pokemones) => {
    console.log('Ya respondio el servidor, ya terminó la funcion asicnroa fetch');
    console.log(pokemones);
    console.log('Primer pokemon', pokemones[0]);
  }).catch((error)=> {
    console.log("Falló el fetcvvh", error);
  }); //
}


// Async/await
const cargarPokemones2 = async () => {
  let respuesta = await fetch("http://localhost:3004/pokemones/", 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json", //MIME type 
      },
    }
  );
  pokemones = await respuesta.json();
  console.log(pokemones);
  renderizarPokemones();
}

cargarPokemones2();


const renderizarPokemones = () => {
  //150
  pokemones.forEach(pokemon => {
    let htmlTipos = "";
    let color = Math.floor(Math.random()*16777215).toString(16);

    pokemon.type.forEach(tipo => {
      htmlTipos += `<div class="tipo" style="background-image: linear-gradient(45deg, black, #${color})">${tipo}</div>`;
    });

    document.getElementById("pokemones").innerHTML += 
          `<div class="card-pokemon" style="background-color: #${color}" onclick="mostrarPokemon('${pokemon._id}', '${color}')">
            <img src="assets/img/background.png" alt="No esta" class="pokebola-pokemon">
            <div class="contenedor-informacion">
              <div>${pokemon.name}</div>
              <div>
                ${htmlTipos}
              </div>
            </div>
            <div class="contenedor-imagen">
              <img src="${pokemon.img}" class="pokemon-imagen">
            </div>
          </div>`;
    // console.log(pokemon.name);
  });

  
}

const obtenerDetallePokemon = async (id) => {
  let respuesta = await fetch(`http://localhost:3004/pokemones/${id}`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json", //MIME type 
      },
    }
  );
  pokemon = await respuesta.json();
  console.log("Detalle del pokemon", pokemon);
  return pokemon;
}

const mostrarPokemon = async (id, color) => {
  console.log("Obtener y visualizar el detalle del pokemon", id);
  let pokemon = await obtenerDetallePokemon(id);
  renderizarDetallePokemon(pokemon, color);
  document.getElementById("pokemones").style.display = "none";
  document.getElementById("detalle-pokemon").style.display = "block";
  document.querySelector('body').classList.add("fondo-pokemon-seleccionado");
}

const renderizarDetallePokemon = (pokemon, color) => {
  document.querySelector('#detalle-pokemon .pokemon-name').innerHTML = pokemon.name;
  document.querySelector('#detalle-pokemon .imagen-pokemon img').setAttribute("src", pokemon.img);
  document.querySelector('body').style.backgroundColor = `#${color}`;

  document.getElementById('pokemon-candy').innerHTML = pokemon.candy;
  document.getElementById('pokemon-height').innerHTML = pokemon.height;
  document.getElementById('pokemon-weight').innerHTML = pokemon.weight;
  document.getElementById('pokemon-weaknesses').innerHTML = pokemon.weaknesses; 
  document.getElementById('pokemon-num').innerHTML = `#${pokemon.num}`; 

  document.getElementById('spawn-chance-bar').style.width = ((pokemon.spawn_chance/4)*100) + '%';
}

mostrarPokemones = () => {
  document.querySelector('body').style.backgroundColor = '#fff';
  document.getElementById("pokemones").style.display = "grid";
  document.getElementById("detalle-pokemon").style.display = "none";
  document.querySelector('body').classList.remove("fondo-pokemon-seleccionado");
}


//sincrona (Una instrucción despues de la otra)
  // a=1 (1min)
  // b=2 (2minn)
  // c=a+b (5min)
  // d=c*5


//asincrona
  // instrucción 1 (asincrona 1min)
  // instrucción 2 (asincrona 2min)
  // instrucción 3 (asincrona 5min)
  // instrucción 4 (sincrona) 



// Id
// Nombre de etiqueta
// Clase
// querySelectorAll


function sumar(a, b) {
  return a+b;
}

const restar = (x,y) => {
  return x-y;
}


const mostrarDetalle = (id, etiquetaOpcionMenuSeleccionado) => {
  document.querySelectorAll("#nav-secundario div").forEach(etiqueta => {
    etiqueta.classList.remove("active");
  });
  etiquetaOpcionMenuSeleccionado.classList.add("active");

  document.querySelectorAll('.contenido-detalle').forEach(etiqueta => {
    etiqueta.style.display = 'none';
  });

  document.getElementById(id).style.display = "block";
}


const guardarPokemon = async () => {

  // Fire
  // Water
  // Electric
  // Poison
  // Grass
  // Ground


  const checkboxes = document.querySelectorAll('.clase-x[type=checkbox]:checked')
  const types = [];
  for (let i = 0; i < checkboxes.length; i++) {
    types.push(checkboxes[i].value)
  }


  const pokemon = {
    "_id": document.getElementById('num').value,
    "id": document.getElementById('num').value,
    "num": document.getElementById('num').value,
    "name": document.getElementById('name').value,
    "gender": document.querySelector('input[name="genero"]:checked').value,
    "img": document.getElementById('imagen').value,
    "type": types,
    "height": document.getElementById('height').value,
    "weight": document.getElementById('weight').value,
    "candy": document.getElementById('candy').value,
    "candy_count": document.getElementById('candy_count').value,
    "egg": document.getElementById('egg').value,
    "spawn_chance": document.getElementById('spawn_chance').value,
    "avg_spawns": document.getElementById('avg_spawns').value,
    "spawn_time": document.getElementById('spawn_time').value,
    "multipliers": [
        2.34
    ],
    "weaknesses": [
        "Ground"
    ],
    "prev_evolution": [],
    "next_evolution": []
  };

  let respuesta = await fetch(`http://localhost:3004/pokemones`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //MIME type 
      },
      body: JSON.stringify(pokemon)
    }
  );
  const pokemonGuardado = await respuesta.json();
  console.log("Pokemon guardado", pokemonGuardado);
}