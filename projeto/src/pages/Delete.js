import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Delete.module.css';

export default function Delete() {

    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!id || isNaN(id)) {
            alert("Digite um ID válido!");
            return;
        }
        try {
            const response = await axios.get(`https://671bed1e2c842d92c381c381.mockapi.io/Filmes/${id}`);
            setMovieData(response.data);
            setID(response.data.id);
            setName(response.data.nome);
            setGenre(response.data.genero);
            setYear(response.data.ano);
            setErrorMessage('');
        } catch (error) {
            console.error("ID não encontrado.");
            setErrorMessage("Filme não encontrado.");
            setMovieData(null);
        }
    }

    const handleDelete = async (e) => {
        try {
            await axios.delete(`https://671bed1e2c842d92c381c381.mockapi.io/Filmes/${id}`);
            navigate('/');
        } catch (error) {
            console.error("Não foi possível excluir o filme");
            setErrorMessage("Não foi possível excluir o filme. Tente novamente mais tarde")
        }
    }

    return (
        <div className={styles.delete}>
            <h1>Deletar filme</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Digite o ID do filme' onChange={(e) => setID(e.target.value)} />
                <button type='submit'>Procurar</button>
                <button onClick={() => navigate('/')}>Cancelar</button>
            </form>

            {movieData && (
                <div>
                    <h2>Dados do filme</h2>
                    <p>Nome: {name}</p>
                    <p>Gênero: {genre}</p>
                    <p>Ano: {year}</p>

                    <button onClick={handleDelete}>Apagar</button>
                    <button onClick={() => navigate('/')}>Cancelar</button>
                </div>
            )}
        </div>
        
    )
}
