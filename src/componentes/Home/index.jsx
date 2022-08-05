
// import fundo from '../../imgs/fundo-busca.png';
import logo from '../../imgs/logo-teste.png';
import '../../style/home.css';
import ItemPokemon from '../itemPokemon'
import '../../App.css';
import { useCallback, useEffect, useState } from 'react';
import api from '../../Service/api';


export function Home(){


const [todosPokemons, setTodosPokemons] = useState([]);
    
useEffect (()=>{
    api
    .get("/pokemon?limit=50")
    .then((res) =>{ 
        setTodosPokemons(res.data.results);
    })
    .catch((error) =>{
        console.log(error);
    } )


},[])

const vejaMais = useCallback(async () => {
    try{
      const offset = todosPokemons.length;
      const res = await api.get('pokemon', {
        params: {
          offset,
        },
      });
       setTodosPokemons([...todosPokemons, ...res.data.results])
    } catch (error) {
      console.log(error);
    }
}, [todosPokemons])

// filtrar

const [buscaPokemons, setBuscaPokemons] = useState("");

const filtroPokemon = todosPokemons.filter((itemP) =>
itemP.name.toLocaleLowerCase().includes(buscaPokemons.toLocaleLowerCase())

);


return(
    <div className="App">

    <header>
      <h1>
        <img src={logo} alt="Logomarca da Ímpar" />
      </h1>
      <div className="container display-flex align-center">
        <div className='container-buscador'>
          <input className='campo-buscador'   onChange={(evento) => setBuscaPokemons(evento.target.value)} value={buscaPokemons} type="search" placeholder='Digite aqui a sua busca...' />
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
              {filtroPokemon.map(p => <ItemPokemon pokemon={p} />)}
          </ul>
        </div>
      </section>

      <button onClick={vejaMais}>Veja mais</button>
    </main>
  </div >


);    
}

export default Home;
