
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Purchases from './pages/Purchases'
import { useSelector } from 'react-redux'

function App() { 

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <Loading />}
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Product />}/>
        <Route path='/purchases' element={<Purchases />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
    </HashRouter>
  )
}

export default App
