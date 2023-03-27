import { useEffect, useState } from "react";
import './Card.css';

function Card(props) {
	const [content, setContent] = useState(null);

	const handleFetch = (response) => {
		//console.log(response.status)
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

	// const handleAddTeam = () => {
	// 	// TODO: add the stuff to add to team
	// };

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
					<div className="poke-attr poke-image"><img src={content.image} alt={`${content.name}`}/></div>
					<div className="poke-attr poke-name">{content.name}</div>
					<div className="poke-attr poke-stat">Height: {content.height}</div>
					<div className="poke-attr poke-stat">Weight: {content.weight}</div>
					<div className="poke-attr poke-stat">Base XP: {content.base_xp}</div>
					<div>
						{content.types.map((type) => 
							<div key={content.name+'-type-'+type} className={'poke-type '+type}>Type: {type}</div>)}
					</div>
				</div>
				{/* <div className="button add-button" onClick={handleAddTeam}>+ to team</div> */}
			</div>
		);

}

export default Card