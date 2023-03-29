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
		const cards = responseJSON.results.map((item) => <Card key={item.name} name={item.name} url={item.url} />);
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
		setOffset(10);
		// eslint-disable-next-line
	}, []);

	const handleLoadMore = async () => {
		var url;
		if (offset > 1271) {
			url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + (offset);
			fetch(url)
				.then(handleFetch)
				.then(handleResponse)
				.catch(handleError);

			url = `https://pokeapi.co/api/v2/pokemon?limit=${1281 - offset}&offset=${0}`;
			fetch(url)
				.then(handleFetch)
				.then(handleResponse)
				.catch(handleError);

			setOffset(1281 - offset);
		}
		else {
			url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + (offset);
			fetch(url)
				.then(handleFetch)
				.then(handleResponse)
				.catch(handleError);

			setOffset(offset + 10);
		}

	}

	const handleRandomize = (responseJSON) => {
		const cards = responseJSON.results.map((item) => <Card key={item.name} name={item.name} url={item.url} />);
		setPokemonCards(cards);
	};

	const randomizeDex = () => {
		const off = Math.floor(Math.random() * 1272);
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + off;
		fetch(url)
			.then(handleFetch)
			.then(handleRandomize)
			.catch(handleError);

		setOffset(off + 10);
	};

	// can add a search bar to look for specific cards
	// TODO: could add feature to not display pokemon that are on the team
	return (
		<div className='dex'>
			{/* TODO: check for null or network error and display smth different */}
			<div className='cards'>{pokemonCards}</div>
			<div className='bottom-buttons'>
				<div className='button load-button' onClick={handleLoadMore}>Load More...</div>
				<div className='button load-button randomize-button' onClick={randomizeDex}>?Randomize Dex?</div>
			</div>
			<div>Tooltips:</div>
			<div>Refresh the page to go back to the beginning of the dex</div>
			<div>You can have a max of 6 Pokemon on your team</div>
		</div>
	);

}

export default Dex;