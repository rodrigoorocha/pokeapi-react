// import lupa from '../src/imgs/lupa.svg';
import fundo from '../src/imgs/fundo-busca.png';
import logo from '../src/imgs/logo-teste.png';
import './style/home.css';
import ItemPokemon from './componentes/itemPokemon'
//  import {Container} from  '../style/'
import './App.css';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

<link rel="stylesheet" type="text/css" href="style/home.css" />

function App() {



  //Aconst [pesquisa, setPesquisa] = useState('')
  const [allPokemons, setAllPokemons] = useState([])
  // const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  //popular 
  const pesquisaOnChange = (event) => {
    if (event.target.value === '') {

      getAllPokemons().then(res => setAllPokemons(() => res))
      //flitrar
    } else {
      getAllPokemons().then(res => setAllPokemons(() => res.filter((p) => p.nome.toUpperCase().includes((event.target.value.toUpperCase())))))

    }

  }

  //pegar pokemons da api
  const getAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50").then(res => res.json())
    const data = response.results
    console.log(data)

    let pokemons = await Promise.all(
      //percorrer cada elemento do obj do pokemon
      data.map(async (p) => {
        const newPokemon = await getStatusPokemon(p.url).then(res => res)
        return newPokemon
      }))

    return pokemons

  }

  // pegar os dados necessarios e trasformar em obj
  const getStatusPokemon = async (urlPokemon) => {

    const response = await fetch(urlPokemon).then(res => res.json())
    const data = response
    const pokemonId = data.id

    const pokemon = {
      id: pokemonId,
      nome: data.forms[0].name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    }
    return pokemon

  }


  // chamar a funçao principal para popular a lista de pokemon
  useEffect(() => {

    getAllPokemons()
      .then(res => setAllPokemons(() => res))

  }, [])


  return (

    <div className="App">

      <header>
        <h1>
          <img src={logo} alt="Logomarca da Ímpar" />
        </h1>
        <div className="container display-flex align-center">
          <div className='container-buscador'>
            <input className='campo-buscador' type="search" placeholder='Digite aqui a sua busca...' />
            <button className='btn-buscador' type="submit" />
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="container display-flex align-center space-between">
            <h2 className='titulo-pagina'>Resultado de busca</h2>
            <button className='btn-pagina' type="button">Novo Card</button>
          </div>
          <div className="container">
            <ul className='listaPokemons'>
                {allPokemons.map(p => <ItemPokemon pokemon={p} />)}
            </ul>
          </div>
        </section>
      </main>

    </div >

  );
}

export default App;

