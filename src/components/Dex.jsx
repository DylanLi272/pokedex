import { useEffect, useState } from 'react';
import Card from './Card';
import './Dex.css';

function Dex() {
	const [pokemonCards, setPokemonCards] = useState([]);
	const [offset, setOffset] = useState(0);

	const handleFetch = (response) => {
		return response.json();
	};

	const handleResponse = (responseJSON) => {
		const cards = responseJSON.results.map((item) => <Card key={item.name} name={item.name} url={item.url}/>);
		setPokemonCards(pokemonCards.concat(cards));
	};
	
	const handleError = (error) => {
		console.log(error);
		setPokemonCards('Network Error');
	};

	useEffect(() => {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
		fetch(url)
		.then(handleFetch)
		.then(handleResponse)
		.catch(handleError);
		// eslint-disable-next-line
	}, []);

	const handleLoadMore = async () => {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + (offset+10);
		fetch(url)
		.then(handleFetch)
		.then(handleResponse)
		.catch(handleError);
		
		setOffset(offset + 10);
	}

	// can add a search bar to look for specific cards
	// TODO: could add feature to not display pokemon that are on the team
	return (
		<div className='dex'>
			{/* TODO: check for null or network error and display smth different */}
			
			<div className='cards'>{pokemonCards}</div>
			<div className='button load-button' onClick={handleLoadMore}>Load More...</div>
		</div>
	);

}

export default Dex;