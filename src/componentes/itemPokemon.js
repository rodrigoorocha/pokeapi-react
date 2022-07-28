import '../style/home.css';

function ItemPokemon({ pokemon }) {
    return (

        <li className='pokemon' key={pokemon.id}>
            

            <div className='info-pokemon'>
                <div className='foto-pokemon'>
                    <img src={pokemon.image} alt="" />
                </div>
                <hr/>
                    <h3 className='nome-pokemon'>{pokemon.nome}</h3>
            </div>           
            <div className='actions'>
                <button className='btn-excluir' type="button">Excluir</button>
                <button className='btn-editar'type="button">Editar</button>
            </div>
        </li>
    );
}

export default ItemPokemon;