import React from 'react';
import Hero from '../hero/Hero';
import MovieGrid from '../moviegrid/MovieGrid';

const Home = ({movies}) =>{
    return(
        <div>
        <Hero movies ={movies}/>
        <div >
        <MovieGrid/>
        </div>
        </div>
           
    )
}

export default Home