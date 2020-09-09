import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ShopingList from './components/ShopingList';
import { loadUser } from './Redux/actions/AuthAction'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </BrowserRouter>
      <ShopingList />
    </div>
  );
}

export default App;
