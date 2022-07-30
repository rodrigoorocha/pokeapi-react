import '../style/home.css';

function ItemPokemon({ pokemon }) {
    const id = pokemon.url;
    const URL = id.split("/");
    const UrlID = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${URL[6]}.png`; 

    return (

        <li className='pokemon' key={pokemon.id}>
            

            <div className='info-pokemon'>
                <div className='foto-pokemon'>
                    <img src={UrlID} alt="" />
                </div>
                <hr/>
                    <h3 className='nome-pokemon'>{pokemon.name}</h3>
            </div>           
            <div className='actions'>
                <button className='btn-excluir' type="button">Excluir</button>
                <button className='btn-editar'type="button">Editar</button>
            </div>
        </li>
    );
}

export default ItemPokemon;