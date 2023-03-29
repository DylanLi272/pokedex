import { get, ref, remove } from "@firebase/database";
import { useEffect, useState } from "react";
import { database } from "../database";
import './TeamCard.css';

function TeamCard(props) {
	const [content, setContent] = useState(null);

	const handleFetch = (response) => {
		return response.json();
	};

	const handleResponse = (responseJSON) => {
		const data = {
			image: responseJSON.sprites.front_default,
			name: props.name,
		}

		setContent(data);
	};

	const handleError = (error) => {
		console.log(error);
		setContent('Network Error');
	};

	useEffect(() => {
		const url = `https://pokeapi.co/api/v2/pokemon/${props.name}`;
		fetch(url)
			.then(handleFetch)
			.then(handleResponse)
			.catch(handleError);
		// eslint-disable-next-line
	}, []);

	const handleSnapshot = (snap, path) => {
		for (var key in snap.val()) {
			if (snap.val()[key] === props.name) {
				const dataRef = ref(database, path + '/' + key)
				remove(dataRef)
					.then(() => { console.log(props.name + " has been removed from team") })
					.catch((error) => { console.log(error) })
				break;
			}
		}
	}

	const removeTeam = () => {
		const path = '/team';
		const dataRef = ref(database, path);
		get(dataRef)
			.then((snap) => { handleSnapshot(snap, path) })
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
			<div className="team-card">
				<div className="attributes">
					<div className="poke-attr poke-image"><img src={content.image} alt={`${content.name}`} /></div>
					<div className="poke-attr poke-name">{content.name}</div>
				</div>
				<div className="button remove-button" onClick={removeTeam}>remove</div>
			</div>
		);

}

export default TeamCard