// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Read from './pages/Read';
import Create from './pages/Create';
import Navbar from './pages/Navbar';
import Change from './pages/Change';
import Delete from './pages/Delete';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/read/:id' element={<Read />} />
        <Route path='/create' element={<Create />} /> 
        <Route path='/change' element={<Change />} /> 
        <Route path='/delete' element={<Delete />}/>
        {/* O : antes do id indica que este é um parâmetro de rota. Isso significa que o valor que vem após '/read/' 
        será tratado como uma variável. No exemplo acima, o 1 seria o valor do parâmetro id. */}
      </Routes>
    </Router>
  );
}

export default App;
