import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calculator from "./components/Calculatorpage";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Vendorpage from "./components/Vendorpage";
import TodoList from "./components/Todo/TodoList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/vendors" element={<Vendorpage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="*" element={<h2 style={{padding:20}}>Page not found</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;