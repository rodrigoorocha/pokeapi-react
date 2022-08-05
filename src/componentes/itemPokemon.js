import '../style/home.css';
import {  useState } from 'react';
//modal
import Modal from 'react-modal';

// inicio modal
const customStyles = {
    content: {
        top: '33%',
        left: '86%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

//  fim modal

function ItemPokemon({ pokemon }) {
    const id = pokemon.url;
    const URL = id.split("/");
    const UrlID = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${URL[6]}.png`;

    // inicio modal

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    // fim do modal

    return (
        <>
            <li className='pokemon' key={pokemon.id}>


                <div className='info-pokemon'>
                    <div className='foto-pokemon'>
                        <img src={UrlID} alt="" />
                    </div>
                    <hr />
                    <h3 className='nome-pokemon'>{pokemon.name}</h3>
                </div>
                <div className='actions'>
                    <button className='btn-excluir' type="button">Excluir</button>
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
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <button onClick={closeModal}>X</button>
                    <div>
                        <img src={UrlID} alt="" />
                        <h3> Criar card</h3>
                    </div>

                    <div>
                        <div>
                            <p>Digite um nome para o card</p>
                            
                            <input type="text" placeholder={pokemon.name} />
                        </div>

                        <div>
                            <p>Inclua uma imagem para aparecer no card</p>
                            <p> Nenhum arquivo selecionado <button className='btn-aquivo' type="button">Escolher arquivo</button> </p>
                            
                        </div>

                        <button className='btn-pagina' type="button">Novo Card</button>


                    </div>


                    

                </Modal>
            </div>
        </>
        //fim html modal
    );
}

export default ItemPokemon;

