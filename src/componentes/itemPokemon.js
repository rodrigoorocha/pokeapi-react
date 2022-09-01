import '../style/home.css';
import { useEffect, useState } from 'react';
//modal
import Modal from 'react-modal';
import api from '../Service/api';


Modal.setAppElement('#root');


function ItemPokemon({ pokemon }) {
    const url = pokemon.url;
    const urlSplit = url.split("/");
    const id = urlSplit[6]
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

    // inicio modal

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenExcluir, setIsOpenExcluir] = useState(false);
    
    const [pokemonInfo, setPokemonInfo] = useState({});



    const getPokemonDetalhes = async () => {

        const res = await api.get(`/pokemon/${id}`)

        const tipo = res.data.types[0].type.name
        const peso = res.data.weight
        const altura = res.data.height


        setPokemonInfo(
            {
                tipo,
                peso,
                altura
            }
        );

    }

    useEffect(() => {
        getPokemonDetalhes()

    }, [])


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'visible';

    }
    ///////////////////////////////////////////////////////////////




    const customStyles = {
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



    ///////////////////////////////////////////////////////////








    ////////////////////////////////////////////////////////////////

    function openModalExcluir() {
        setIsOpenExcluir(true);
    }


    function afterOpenModalExcluir() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModalExcluir() {
        setIsOpenExcluir(false);
    }
    // fim do modal




    const customStylesexcluir = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '434px',
            width: '438px'
        },


    };




    return (
        <>
            <li className='pokemon' key={pokemon.id}>


                <div className='info-pokemon'>
                    <div className='foto-pokemon'>
                        <img src={imgUrl} alt="" />
                    </div>
                    <hr />
                    <h3 className='nome-pokemon'>{pokemon.name}</h3>
                </div>

                <div className='actions'>
                    <button className='btn-excluir' onClick={openModalExcluir} type="button">Excluir</button>
                    <button className='btn-editar' onClick={openModal} type="button">Editar</button>
                </div>
            </li>

            {/* //inico html modal */}
            <div>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='container-modal'>

                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                        {/* <button onClick={closeModal}>X</button> */}
                        <div className='header-modal'>
                            <img className='foto-pokemon-modal' src={imgUrl} alt="" />
                            <h3 className='titulo-pagina'> Criar card</h3>
                        </div>

                        <hr />

                        <div>
                            <div className='custom-search'>
                                <p className='nome-pokemon'>Digite um nome para o card</p>
                                <input className='input-pokemon' type="text" value={pokemon.name} />
                            </div>

                            <div className='custom-search'>
                                <p className='nome-pokemon'>Tipo</p>
                                <input className='input-pokemon' type="text" value={pokemonInfo.tipo} />
                            </div>

                            <div className='custom-search'>
                                <p className='nome-pokemon'>altura</p>
                                <input className='input-pokemon' type="text" value={pokemonInfo.altura} />
                            </div>

                            <div className='custom-search'>
                                <p className='nome-pokemon'>peso</p>
                                <input className='input-pokemon' type="text" value={pokemonInfo.peso} />
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

                <Modal
                    isOpen={modalIsOpenExcluir}
                    onAfterOpen={afterOpenModalExcluir}
                    onRequestClose={closeModalExcluir}
                    style={customStylesexcluir}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>

                    <div className='container-modal-excluir'>


                        <div className='quadrado-modal'>
                            <h2 className='icone-modal-excluir'></h2>
                        </div>


                        <div className='info-modal-excluir'>
                            <div>
                                <h2 className='titulo-modal-excluir'>Excluir</h2>
                                <p className='nome-pokemon'>CERTEZA QUE DESEJA EXCLUIR?</p>
                            </div>

                            <hr className='divisoria-modal-excluir' />

                            <div className='div-btn-excluir'>
                                <button className='btn-excluir-confirmar' type="button">Excluir</button>
                                <button className='btn-excluir-cancelar' type="button">Cancelar</button>
                            </div>

                        </div>

                    </div>

                </Modal>
            </div>
        </>
        //fim html modal
    );
}

export default ItemPokemon;

