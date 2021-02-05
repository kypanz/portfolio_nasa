import logo from './logo.svg';
import './App.css';

// pages
import Home from './components/pages/Home'

const apikey = "krVQycQXx03rmSSNdsOutc9DvAzdrX7IL6SnOy4B";

function App() {
  return (
    <div className="App">
      <Home apiKey={apikey}/>
    </div>
  );
}

export default App;
