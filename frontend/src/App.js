import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import "./App.css";
import Header from "./components/header";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Layout />
      </div>
    </Router>
  );
};

export default App;
