import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { database } from "../database";
import TeamCard from "./TeamCard";
import './Team.css'

function Team() {

	const [cards, setCards] = useState([]);

	const readTeam = () => {
		const dataRef = ref(database, '/team');
		onValue(dataRef, (snap) => {
			const data = [];
			for (var key in snap.val()) {
				data.push(snap.val()[key]);
			}
			const team = data.map((item) => <TeamCard key={'team-' + item} name={item} />);
			setCards(team);
		});
	}
	
	useEffect(() => {
		readTeam();
	}, []);

	if (cards.length === 0) {
		return (
			<div className="team">
				<div className="team-title">My team:</div>
				<div className="no-team">No Pokemon on team</div>
			</div>
		);
	}
	else {
		return (
			<div className="team">
				<div className="team-title">My team:</div>
				<div className="team-list">
					{cards}
				</div>
			</div>
		);
	}


}


export default Team;