import lupa from '../src/imgs/lupa.svg';
import fundo from '../src/imgs/fundo-busca.png';
import logo from '../src/imgs/logo-teste.svg';
//  import {Container} from  '../style/'
import './App.css';
import { useEffect, useState } from 'react';

function App() {




  const [allPokemons, setAllPokemons] = useState([])
  // const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(res => res.json())
    const data = response.results
    console.log(data)

    let pokemons = await Promise.all(

      data.map(async (p) => {
        const newPokemon = await getStatusPokemon(p.url).then(res => res)
        return newPokemon
      }))

    return pokemons

  }

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



  useEffect(() => {

    getAllPokemons().then(res => setAllPokemons(() => res))

  }, [])


  return (

    <div className="App">

      <div className='header-logo'>
        <img src={logo} alt='' />
      </div>
      <div className='buscador'>
        <img src={fundo} alt=''/>
        <input placeholder='Digite aqui sua busca...' 
        />
        <img src={lupa} alt='' />     
      </div>



      {allPokemons.map(pokemon => <li key={pokemon.id}>{pokemon.nome} <img src={pokemon.image}></img></li>)}



    </div>
  );
}

export default App;

