import '../style/home.css';

function ItemPokemon({ pokemon }) {
    return (

        <li className='pokemon' key={pokemon.id}>

            <img src={pokemon.image} />
            <div>
                {pokemon.nome}
            </div>

            <div>
                <div>
                    <button>Editar</button>
                    <image />
                </div>

                <div>
                    <button>Excluir</button>
                    <image />
                </div>

            </div>
        </li>


    );
}

export default ItemPokemon;