import { Navbar } from './components/Navbar'
import Calculator from './components/Calculatorpage';
import { useState } from 'react';
import './App.css'

//const firebaseURL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/'
function App() {
  const pages = ({homepage: '<Homepage/>', vendorpage: '<Vendorpage/>', calculatepage: <Calculator/>, todopage: '<Todopage/>'});
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
    <>
      <Navbar onHome={loadHomePage} onVendor={loadVendorsPage} onCalculate={loadCalculator} onTodo={loadTodoPage}/>
      {pages[actualpage]}
    </>
  )
}

export default App
