import React from 'react';

const type = ({type, px}) => {

    let width = 78
    let height = 38

    switch(px){
        case "small": {
            width = 48
            height = 28
            break;
        }
            
        case "tall": {
            width = 98
            height = 58
            break;
        }
            
        default: {
            width = 78
            height = 38
        }
    }


    // console.log(px)
    let typeSrc = 'Grass';
    switch(type){
        case "grass": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20170114100444/Tipo_planta.gif';
            break;
        case "poison": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/1/10/latest/20191118232220/Tipo_veneno.gif';
            break;
        case "electric": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/1/1b/latest/20170114100155/Tipo_el%C3%A9ctrico.gif';
            break;
        case "fairy": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/b/bc/latest/20170114100332/Tipo_hada.gif';
            break;
        case "fire": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/c/ce/latest/20170114100331/Tipo_fuego.gif';
            break;
        case "water": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/9/94/latest/20191118232235/Tipo_agua.gif';
            break;
        case "steel": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d9/latest/20191118232245/Tipo_acero.gif';
            break;
        case "dragon": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/0/01/latest/20170114100154/Tipo_drag%C3%B3n.gif';
            break;
        case "ghost": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/4/47/latest/20170114100329/Tipo_fantasma.gif';
            break;
        case "rock": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20170114100446/Tipo_roca.gif';
            break;
        case "ground": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/1/1d/latest/20191118232216/Tipo_tierra.gif';
            break;
        case "ice": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/4/40/latest/20170114100333/Tipo_hielo.gif';
            break;
        case "flying": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e1/latest/20191118232224/Tipo_volador.gif';
            break;
        case "dark": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20191118232327/Tipo_siniestro.gif';
            break;
        case "bug": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20191118232226/Tipo_bicho.gif';
            break;
        case "psychic": typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20170114100445/Tipo_ps%C3%ADquico.gif';
            break;
        case "fighting": typeSrc = 'https://static.wikia.nocookie.net/espokemon/images/b/b7/Tipo_lucha.gif';
            break;
        default: typeSrc = 'https://images.wikidexcdn.net/mwuploads/wikidex/3/32/latest/20170114100442/Tipo_normal.gif';
    }

    return(
        <div key={type}>
            <img alt={type} src={typeSrc} decoding="async" loading="lazy" width={width} height={height}></img>
        </div>
    )  
}

export default type