import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import firebase from 'firebase';
import CategoryPage from './pages/category';
import InboxPage from './pages/inbox';
import IndexPage from './pages';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
import NewProductPage from './pages/new-product';
import ProductPage from './pages/product';
import RegisterPage from './pages/register';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('userUID', user);
      } else {
        localStorage.removeItem('userUID');
      }
    }); 
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <IndexPage />
          </Route>
          <Route path='/category/:name'>
            <CategoryPage />
          </Route>
          <PrivateRoute path='/inbox'>
            <InboxPage />
          </PrivateRoute>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/logout'>
            <LogoutPage />
          </Route>
          <PrivateRoute path='/product/new'>
            <NewProductPage />
          </PrivateRoute>
          <Route path='/product/:id'>
            <ProductPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='*'>
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

function PrivateRoute({children, ...rest}) {
  return (<Route
    {...rest}
    render={({location}) => localStorage.getItem('userUID')? (children):
     (<Redirect to={{
       pathname: '/login',
       state:{from: location}
     }} />)}
  />);
}

export default App;
