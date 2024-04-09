
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Docente } from './Docente';
import { Home } from './Home';
import { NotFound } from './NotFound';
import Role from './Usuario/Role/Role';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/reservacion" element={<Docente />} />
        <Route element={<NotFound />} />
        <Route path='/roles' element={<Role/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
