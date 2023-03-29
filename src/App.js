import './App.css';
import Dex from './components/Dex';
import Team from './components/Team';

function App() {
	return (
		<div className='app'>
			<div className='header'>PokeDex</div>
			<div className='hline'></div>
			<Team />
			<div className='hline'></div>
			<Dex />
		</div>
	);
}

export default App;
