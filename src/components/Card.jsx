import { get, push, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { database } from "../database";
import './Card.css';

function Card(props) {
	const [content, setContent] = useState(null);

	const handleFetch = (response) => {
		return response.json();
	};

	const handleResponse = (responseJSON) => {
		const data = {
			image: responseJSON.sprites.front_default,
			name: props.name,
			height: responseJSON.height,
			weight: responseJSON.weight,
			base_xp: responseJSON.base_experience,
			types: responseJSON.types.map((item) => item.type.name)
		}

		setContent(data);
	};

	const handleError = (error) => {
		console.log(error);
		setContent('Network Error');
	};

	useEffect(() => {
		const url = props.url;
		fetch(url)
			.then(handleFetch)
			.then(handleResponse)
			.catch(handleError);
		// eslint-disable-next-line
	}, []);

	const handleSnapshot = (snap, dataRef) => {
		const pokeList = [];
		for (var key in snap.val()) {
			pokeList.push(snap.val()[key]);
		}
		// console.log(pokeList);

		if (pokeList.includes(props.name)) {
			console.log('Pokemon already on team');
		}
		else if (pokeList.length >= 6) {
			console.log('Team is full');
		}
		else {
			push(dataRef, props.name);
			console.log(`${props.name} added successfully`)

			// pokeList.push(props.name);
			// set(dataRef, pokeList)
			// .then(() => {
			// 	console.log(`${props.name} added successfully`)
			// })
			// .catch((error) => {
			// 	console.log("Set failed");
			// 	console.log(error);
			// })
		}
	}

	const addTeam = () => {
		const dataRef = ref(database, '/team');
		get(dataRef)
			.then((snap) => { handleSnapshot(snap, dataRef) })
			.catch((error) => { console.log(error) });
	};

	if (content === null)
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	else if (content === 'Network Error')
		return (
			<div>
				<p>{content}</p>
			</div>
		);
	else
		return (
			<div className="card">
				<div className="attributes">
					<div className="poke-attr poke-image"><img src={content.image} alt={`${content.name}`} /></div>
					<div className="poke-attr poke-name">{content.name}</div>
					<div className="poke-attr poke-stat">Height: {content.height}</div>
					<div className="poke-attr poke-stat">Weight: {content.weight}</div>
					<div className="poke-attr poke-stat">Base XP: {content.base_xp}</div>
					<div>
						{content.types.map((type) =>
							<div key={content.name + '-type-' + type} className={'poke-type ' + type}>Type: {type}</div>)}
					</div>
				</div>
				<div className="button add-button" onClick={addTeam}>+ to team</div>
			</div>
		);

}

export default Card