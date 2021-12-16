import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ScrollToTop from './components/scrollToTop';

export default function Home({ pokemon }) {

    console.log(pokemon)

    const [pkm, setPkm] = useState();

    useCallback(() => {
        setPkm(pokemon)
      });

    const buscarPokemon = () => {
        const text = document.getElementById("text").value;
        console.log(text)
        if(text != null || text != undefined){
            pokemon = pokemon.filter(pok => pok.name.includes(text.toLowerCase()))
            setPkm(pokemon)
        }  
    }

    if(pkm != null){
        return (
            <div>
                <h1>
                    <Link href="/">
                        <a className="h1-title">POKEDEX</a>
                    </Link>
                </h1>
                <div className="container">
                  <div className="row">
                          <div className="col-10">
                              <input id="text" className="form-control form-control-lg" type="text" placeholder="Pikachu" onSubmit={buscarPokemon}></input>
                          </div>
                          <div className="col-2">
                              <button type="submit"  onClick={buscarPokemon} className="btn-lg btn-outline-primary mb-1">Buscar</button>
                          </div>
                  </div>                  
                </div>
                <ScrollToTop />
                <div className="container-personal">
      
                    {pkm.map((pokeman, index) => (
                        <div className="pkm-card" key={index}>  
                            {pokeman.name}     
                            <Link href={`/pokemons/${pokeman.url.slice(34)}`}>
                                    <img
                                        src={pokeman.image}
                                        alt={pokeman.name}
                                        className="pkm-images"
                                    />
                            </Link>
                        </div>
                    ))}
                </div>
                
              </div>
        );
    }else {
        return (
            <div>
                <h1>POKEDEX</h1>
                <div className="container">
                  <div className="row">
                          <div className="col-10">
                              <input id="text" className="form-control form-control-lg" type="text" placeholder="Pikachu"></input>
                          </div>
                          <div className="col-2">
                              <button type="submit"  onClick={buscarPokemon} className="btn-lg btn-outline-primary mb-1">Buscar</button>
                          </div>
                  </div>
                </div>
                <ScrollToTop />
                <div className="container-personal">
      
                    {pokemon.map((pokeman, index) => (
                        <div className="pkm-card" key={index}>  
                            {pokeman.name}     
                            <Link href={`/pokemons/${index + 1}`}>
                                    <img
                                        src={pokeman.image}
                                        alt={pokeman.name}
                                        className="pkm-images"
                                    />
                            </Link>
                        </div>
                    ))}
                    
                </div>                
              </div>
              
        );
    }
}

export async function getStaticProps(context) {
  try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
      const { results } = await res.json();
      const pokemon = results.map((pokeman, index) => {
          const paddedId = ('00' + (index + 1)).slice(-3);

          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
          return { ...pokeman, image };
      });
      return {
          props: { pokemon },
      };
  } catch (err) {
      console.error(err);
  }
}
