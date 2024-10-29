import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Create.module.css';

export default function Create() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !genre || !year) {
      alert("Por favor, complete todos os campos");
      return;
    }
    if (isNaN(year) || year<=0) {
      alert('O ano deve ser um número maior que 0!');
      return;
    }
    try {
      await axios.post('https://671bed1e2c842d92c381c381.mockapi.io/Filmes',{
        nome: name,
        genero: genre,
        ano: year
      });
      navigate('/'); //voltar para a página inicial após a criação
    } catch (error) {
      console.error("Erro ao criar filme: ", error);
    }
  };

  

  return (
    <div className={styles.create}>
      <h1>Criar filme</h1>
      <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome do filme' onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Gênero do filme' onChange={(e) => setGenre(e.target.value)}/>
            <input type="text" placeholder='Ano de lançamento do filme' onChange={(e) => setYear(e.target.value)}/>
            <button type='submit' >Criar</button>
            <button onClick={() => navigate('/')}>Cancelar</button>
            {/* é necessário o () => pois se nao o js executaria a funcao logo ao encontrá-la, ao inves de atribui-la
            ao clique */}
        </form>
    </div>
    
  )
}
