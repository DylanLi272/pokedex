import './App.css';
import Dex from './components/Dex';

function App() {
	return (
		<div className='app'>
			<div className='header'>PokeDex</div>
			<div className='hline'></div>
			{/* Team */}
			<Dex />
		</div>
  );
}

export default App;
