import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {

    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true); //Estado de carregamento

    useEffect( () => {
        //buscar os filmes
        const fetchMovies = async () => {
            try{
                const response = await axios.get('https://671bed1e2c842d92c381c381.mockapi.io/Filmes');
                setMovies(response.data);
                //response é o objeto completo de resposta da requisição.
                //response.data é onde você tem os dados que se deseja usar, como a lista de filmes.
                //basicamente, o ".data" filtra os dados que são desejados
            } catch(error){
                console.error("Erro ao buscar filmes: ", error);
                setErrorMessage('Não foi possível carregar os filmes. Tente novamente mais tarde.') //atualizando estado de erro
            } finally{
                setLoading(false);
            }
        };

        fetchMovies(); // Chamamdo a função para buscar os filmes...
    }, []); // coloca um array vazio para indicar que o useEffect rode apenas uma vez
    //Efeito Executado uma Vez: Quando você passa um array vazio ([]), o useEffect só será executado uma vez, após a primeira renderização do componente
    //ideal para chamadas API!
  
  
    return (
        <div className={styles.home}>
            <h1>Catálogo de filmes</h1>
            {loading && <p>Carregando conteúdo...</p>}
            { errorMessage && <p>{errorMessage}</p> }
            <ul>
                {movies.map(movie=> (
                    <li key={movie.id}>
                        <Link to={`/read/${movie.id}`}> {movie.id} - {movie.nome} </Link> {/* Link para a página Ler */}
                    </li>
                ))}
            </ul>
        </div>
    )    
}
