import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Read.module.css';

export default function Read() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carregamento...
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://671bed1e2c842d92c381c381.mockapi.io/Filmes/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.log("Erro ao pegar dados do filme: ", error);
                setErrorMessage('Erro ao carregar dados do filme. Tente novamente mais tarde');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [id]);

    return (
        <div className={styles.read}> {/* Aplicando a classe do CSS Module */}
            <h1 className={styles.title}>Detalhes do filme</h1>
            {loading && <p>Carregando conteúdo...</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            {movie && !loading && (
                <div className={styles.movieDetails}>
                    <p>id do filme: {movie?.id}</p>
                    <p>Nome do filme: {movie?.nome}</p>
                    <p>Gênero do filme: {movie?.genero}</p>
                    <p>Ano de lançamento do filme: {movie?.ano}</p>

                    <button className={styles.button} onClick={() => navigate('/')}>Voltar</button>
                </div>
            )}
        </div>
    );
}
