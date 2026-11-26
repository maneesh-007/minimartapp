
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary'

// Import Pages
import AddProduct from './components/pages/AddProduct';
import Register from './components/pages/Register';
function App() {
  return (
    <ErrorBoundary fallback={<h1>Sorry Some error Occured Please Try Later </h1>}>
    <Router>
      <Routes >
      <Route path='/' element={<Home/>} ></Route>  
      <Route path='/add-product' element={<AddProduct/>}></Route>
      <Route path='/signin' element={<Register/>}></Route>
      </Routes>


    </Router>
    
    </ErrorBoundary>
  );
}

export default App;
