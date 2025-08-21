import { Navbar } from './components/Navbar'
import { Homepage } from './components/Homepage';
import { Footer } from './components/Footer';
import { useState } from 'react';
import './App.css'
import Vendorpage from './components/Vendorpage';
import TodoList from './components/Todo/TodoList';

//const firebaseURL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/'
function App() {

  const pages = {
    homepage: <Homepage/>,
    vendorpage: <Vendorpage />,
    calculatepage: '<Calculator/>',
    todopage: <TodoList/>
  };
  
  const [actualpage, setActualpage] = useState('homepage')
  function loadHomePage(){
    setActualpage('homepage');
  }
  function loadVendorsPage(){
    setActualpage('vendorpage');
  }
  function loadCalculator(){
    setActualpage('calculatepage');
  }
  function loadTodoPage(){
    setActualpage('todopage');
  }

return (
  <div className="app-shell">
    <Navbar
      onHome={loadHomePage}
      onVendor={loadVendorsPage}
      onCalculate={loadCalculator}
      onTodo={loadTodoPage}
    />
    <main className="app-main">{pages[actualpage]}</main>
    <Footer />
  </div>
);
}
export default App;
