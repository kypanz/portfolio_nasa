import './App.css';

// pages
import Home from './components/pages/Home'

require('dotenv').config();

console.log('Api Key NASA => ', process.env.REACT_APP_NASA_KEY);

function App() {
  return (
    <div className="App">
      <Home apiKey={process.env.REACT_APP_NASA_KEY}/>
    </div>
  );
}

export default App;
