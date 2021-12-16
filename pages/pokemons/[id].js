import Image from 'next/image'
import Link from 'next/link'
import Type from '../components/types'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const Pokemon = ({data , ablt, move}) => {

    const [show, setShow] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [ability, setAbility] = useState(ablt);
    const [mov, setMovs] = useState(move);
    const [movText , setMovText] = useState(move.flavor_text_entries);

    // useEffect(() => {
    //     // Actualiza el titulo del documento usando la API del navegador
    //     // habilidades = data.abilities.map(x => x.ability);
    //     // abilityApi(habilidades[0].url)
    //     //console.log(abl)
    //   });

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true)
    }

    const handleCloseMove = () => setShowMove(false);
    const handleShowMove = async () => {
        setShowMove(true)
    }

    const abilityApi = async (url) => {
        const response = await fetch(url)
        const abl = await response.json()
        setAbility(abl)
    }

    const movesApi = async (url) => {
        const response = await fetch(url)
        const mv = await response.json()
        setMovs(mv)
        //console.log(mv)
        var auxMv = mv.flavor_text_entries.filter((task) => task.language.name == 'en' );
        //console.log(auxMv[0])
        setMovText(auxMv)
    }

    const HabilidadExp = () =>{
        const btns = document.querySelectorAll('a[id^="ability-"]');
        btns.forEach((btn) => {
            btn.addEventListener('click', e => {
                const url = e.target.id.slice(8)
                abilityApi(url)
            });
        });
    }

    const MovesExp = () =>{
        const btns = document.querySelectorAll('a[id^="move-"]');
        btns.forEach((btn) => {
            btn.addEventListener('click', e => {
                const url = e.target.id.slice(5)
                console.log(url)
                movesApi(url)                
            });
        });
    }

    //Tipos Del Pokemon
    let types = [data.types[0]['type']['name']]
    if(data.types['length'] > 1){
        let typeExtra = data.types[1]['type']['name']
        types.push(typeExtra);
    }

    //Habilidades del Pokemon
    let habilidades = data.abilities.map(x => x.ability);


    //Stats Pokemon
    let stats = data.stats.map(x => x);
    stats = stats.map(x => x.base_stat);

    const chartData = {
        labels: ['HP', 'ATACCK', 'DEFENSE', 'SP ATACCK', 'SP DEFENSE', 'SPEED'],
        datasets: [
          {
            label: data.name.toUpperCase(),
            borderWidth: 1,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
            data: [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]],
          }
        ]
      };

    //Movimientos que puede aprender o aprende el pokemon
    let moves = data.moves.map(x => x.move);

    //Imagen de Pokemon
    let image =  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png`
    if(data.id < 100){
        if(data.id < 10){
            image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${data.id}.png`;
        }else{
            image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${data.id}.png`;
        }
    }else{
         image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${data.id}.png`;
    }

    return(

        <div>
            <h1><a className="h1-title" href="/">POKEDEX</a></h1>
            <div className="container-xl-personal">
                <div className="pkm-card-xl" key={data.id}>

                    <div className="pkm-card-xl-header">
                        <div>
                            <h2 className='title-content'>{data.name}</h2>
                            <h4 className='title-id'>#{data.id}</h4>
                        </div>
                        <img
                                    src={image}
                                    alt={data.name}
                                    className="pkm-images-xl"
                                />
                        <div id="types" className="types">
                            {types.map(x =>
                                <Type key={x} type={x} />
                            )}
                        </div>
                    </div>
                    <div className="pkm-card-xl-abilities">
                        <h3 className='title-content'>Abilities:</h3>

                        <div id="abilities" className="abilities">
                            {habilidades.map(x =>
                               <a className="abilities-text" id={'ability-'+x.url} onClick={handleShow} onMouseOver={HabilidadExp} key={x.name}>{x.name}</a>

                            )}


                        </div>
                        <div>
                            <Modal show={show} onHide={handleClose} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{ability.name.toUpperCase()}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <p>{ability.effect_entries[1].effect}</p>
                                        <p>{ability.effect_entries[1].short_effect}</p>
                                    </Modal.Body>
                            </Modal>
                        </div>

                    </div>

                    <div className="pkm-card-xl-stats">
                        <h3 className='title-content'>Stats:</h3>
                        <div>
                            {/* <p>HP: {stats[0]}</p>
                            <p>ATACK: {stats[1]}</p>
                            <p>DEFENSE: {stats[2]}</p>
                            <p>SPECIAL ATACK: {stats[3]}</p>
                            <p>SPECIAL DEFENSE: {stats[4]}</p>
                            <p>SPEED: {stats[5]}</p> */}

                            {/* // type: radar, bar polar */}
                            <Chart type='radar' data={chartData} height={400} width={400}/>
                        </div>
                    </div>

                    <div className="pkm-card-xl-moves">

                        <h3 className='title-content'>Moves:</h3>

                        <div>
                            {moves.map(x =>
                                <a className='moves-text' id={'move-'+x.url} onClick={handleShowMove} onMouseOver={MovesExp} key={x.name}>{x.name}</a>
                                )}


                        </div>

                        <Modal show={showMove} onHide={handleCloseMove} centered>
                            <Modal.Header closeButton>
                                <Modal.Title className="moveTitle">
                                    <h4>{mov.name.toUpperCase()} </h4>
                                    <Type className="typeMove" key={mov.type.name} type={mov.type.name} px="small" />
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='moveDesc'>
                                 <p>{movText[0].flavor_text}</p>
                                 <p>Effect: {mov.effect_entries[0].effect}</p>
                                 <div className='ppower'>
                                    <p className='pp'>PP: {mov.pp}</p>
                                    <p className='accuracy'>Accuracy: {mov.accuracy != null ? mov.accuracy : "-"}</p>
                                    <p className='power'>Power: {mov.power != null ? mov.power : "-"}</p>               
                                 </div>                                 
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokemon

export const getServerSideProps = async ({params}) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()
    var dataAuxAblt = data.abilities.map(x => x.ability)
    var urlAblt = ""
    if (Array.isArray(dataAuxAblt)){
        urlAblt = "https://pokeapi.co/api/v2/ability/38/"
    }else{
        urlAblt = dataAuxAblt[0].url 
    }
    // console.log(urlAblt)
    const responseAbl = await fetch(urlAblt)
    const ablt = await responseAbl.json()
    var dataAuxMoves = data.moves.map(mv => mv.move)
    var urlMove = ""
    // console.log(dataAuxMoves)
    if (Array.isArray(dataAuxMoves) ){
        urlMove = "https://pokeapi.co/api/v2/move/33/"
    }else{
        urlMove = dataAuxMoves[0].url
    }    
    // console.log(urlMove)
    const responseMove = await fetch(urlMove)
    const move = await responseMove.json()
    return{props:  {data, ablt, move}}
}