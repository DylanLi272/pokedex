import './App.css';
import Dex from './components/Dex';

function App() {
	return (
		<div className='app'>
			<div className='header'>PokeDex</div>
			{/* Team */}
			<Dex />
		</div>
  );
}

export default App;
