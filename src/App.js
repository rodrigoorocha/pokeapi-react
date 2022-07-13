import lupa from '../src/imgs/lupa.svg';
import fundo from '../src/imgs/fundo-busca.png';
import logo from '../src/imgs/logo-teste.png';
import './style/home.css';
import ItemPokemon from './componentes/itemPokemon'
//  import {Container} from  '../style/'
import './App.css';
import { useEffect, useState } from 'react';

<link rel="stylesheet" type="text/css" href="style/home.css" />

function App() {



  //Aconst [pesquisa, setPesquisa] = useState('')
  const [allPokemons, setAllPokemons] = useState([])
  // const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')


  const pesquisaOnChange = (event) => {
    if (event.target.value === '') {

      getAllPokemons().then(res => setAllPokemons(() => res))

    } else {
      getAllPokemons().then(res => setAllPokemons(() => res.filter((p) => p.nome.toUpperCase().includes((event.target.value.toUpperCase())))))

    }

  }

  const getAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50").then(res => res.json())
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

      <div className='header-todo'>
        <div className='header-logo'>
          <img src={logo} alt='' />
        </div>
        <div className='buscador'>
          {/* <img src={fundo} alt='' /> */}
          <input onChange={pesquisaOnChange} placeholder='Digite aqui sua busca...' />
          <img src={lupa} alt='' />
        </div>
      </div>

      <div className='container-todo'>

        <div className='container'>

          <div className='titulo'>

            <h1>Resultado de busca</h1>
            <button>Novo Card</button>

          </div>

          <div className='listaPokemon'>
            {allPokemons.map(p => <ItemPokemon pokemon={p} />)}

          </div>

        </div>

      </div>

    </div>


  );
}

export default App;

