import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Change.module.css';

export default function Change() {

    const [id, setID] = useState();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieData, setMovieData] = useState(null);
    const navigate = useNavigate(); 


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if (!id || isNaN(id)) {
            alert("Digite um ID válido!");
            return;
        }
        try {
            const response = await axios.get(`https://671bed1e2c842d92c381c381.mockapi.io/Filmes/${id}`);
            setMovieData(response.data);
            setName(response.data.nome);
            setGenre(response.data.genero);
            setYear(response.data.ano);
            setErrorMessage('');

        } catch (error) {
            console.error("ID não encontrado!");
            setErrorMessage("Filme não encontrado!");
            setMovieData(null); //limpa os dados do filme.
        }
        
    }

    const handleChange = async (e) => {
        e.preventDefault();
        if (!name || !genre || !year) {
            alert("Por favor, não deixe os campos vazios!");
            return; 
        }
        if(isNaN(year)){
            alert("O ano deve ser um valor numérico!");
            return;
        }
        try {
            await axios.put(`https://671bed1e2c842d92c381c381.mockapi.io/Filmes/${id}`, {
                nome: name,
                genero: genre,
                ano: year
            });
            navigate('/') //voltar para inicio apos alterar dados do filme
        } catch (error) {
            console.error("Erro ao alterar filme: ", error);
            alert("Erro ao alterar dados do filme...");
        }
    }

    return (
        <div  className={styles.change}>
            <h1>Alterar filme</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Digite o ID do filme' onChange={(e) => setID(e.target.value)}/>
                <button type='submit'>Procurar</button>
                <button onClick={() => navigate('/')}>Cancelar</button>
            </form>
            
            { movieData && (
                <form onSubmit={handleChange}>
                    <input type="text" value={name} placeholder={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" value={genre} placeholder={genre} onChange={(e) => setGenre(e.target.value)} />
                    <input type="text" value={year} placeholder={year} onChange={(e) => setYear(e.target.value)} />
                    <button type='submit'>Alterar</button>
                    <button onClick={() => navigate('/')}>Cancelar</button>
                </form>
            )}
        </div>
    )
}
