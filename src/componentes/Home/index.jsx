
// import fundo from '../../imgs/fundo-busca.png';
import logo from '../../imgs/logo-test.png';
import '../../style/home.css';
import ItemPokemon from '../itemPokemon'
import '../../App.css';
import { useCallback, useEffect, useState } from 'react';
import api from '../../Service/api';
import Modal from 'react-modal';



export function Home() {

  let subtitle;
  const [todosPokemons, setTodosPokemons] = useState([]);
  const [buscaPokemons, setBuscaPokemons] = useState("");
  const [modalIsOpenAdicionar, setIsOpenAdicionar] = useState(false);

  useEffect(() => {

    api.get('/pokemon?limit=52')
      .then((res) => {
        setTodosPokemons(res.data.results);

      })
      .catch((error) => {
        console.log(error);
      })

  }, []);

  const vejaMais = useCallback(async () => {
    try {
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
  }, [todosPokemons]);


  const filtroPokemon = todosPokemons.filter((itemP) =>
    itemP.name.toLocaleLowerCase().includes(buscaPokemons.toLocaleLowerCase())


    // const nomepokemon = itemP.name  
    // const nomepokemonMinusculo = nomepokemon.toLocaleLowerCase()
    // const buscaMinuscula = buscaPokemons.toLocaleLowerCase()

    // return nomepokemonMinusculo.includes(buscaMinuscula)

  );


  function openModalAdicionar() {
    setIsOpenAdicionar(true);
}

function afterOpenModalAdicionar() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
    document.body.style.overflow = 'hidden';
}

function closeModalAdicionar() {
    setIsOpenAdicionar(false);
    document.body.style.overflow = 'visible';

}
///////////////////////////////////////////////////////////////




const customStylesadcionar = {
    content: {
        // top: '19%',
        // left: '86%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        position: 'relative',
        float: 'right',
        height: "100%",
        width: "642px",
        top: "0",
        padding: "30px 34px",
        inset: "0"



    },
    overlay: {
        position: 'absolute',
        marginTop: window.scrollY + 'px',
        height: '1000vh'



    }
};


  return (
    <div className="App">

      <>

        <Modal
          isOpen={modalIsOpenAdicionar}
          onAfterOpen={afterOpenModalAdicionar}
          onRequestClose={closeModalAdicionar}
          style={customStylesadcionar}
          contentLabel="Example Modal"
        >
          <div className='container-modal'>

            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
            {/* <button onClick={closeModal}>X</button> */}
            <div className='header-modal'>
              {/* <img className='foto-pokemon-modal'  src={imgUrl} alt="" /> */}
              <h3 className='titulo-pagina'> Criar card</h3>
            </div>

            <hr />

            <div>
              <div className='custom-search'>
                <p className='nome-pokemon'>Digite um nome para o card</p>
                <input className='input-pokemon' type="text" placeholder='digite o nome' />
              </div>

           
              <div>

                <div class="custom-search">
                  <p className='nome-pokemon'>Inclua uma imagem para aparecer no card</p>
                  <input type="text" class=" input-pokemon" placeholder="Nenhum arquivo selecionado" />
                  <button class="custom-search-botton" type="submit">Escolher arquivo</button>
                </div>

              </div>
              <hr />
              <button className='btn-pagina' type="button">Criar Card</button>
            </div>



          </div>

        </Modal>

      </>

      <header>
        {/* <h1>
          <img src={logo} alt="Logomarca da Ímpar" />
        </h1> */}
        <div className="container display-flex align-center">
          <div className='container-buscador'>
            <input className='campo-buscador' onChange={(evento) => setBuscaPokemons(evento.target.value)} value={buscaPokemons} type="search" placeholder='Digite aqui a sua busca...' />
            <button className='btn-buscador' type="submit" />
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="container display-flex align-center space-between">
            <h2 className='titulo-pagina'>Resultado de busca</h2>
            <button className='btn-pagina' onClick={openModalAdicionar} type="button">Novo Card</button>
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
