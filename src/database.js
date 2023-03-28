// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBE70nSWW1qnaeuNPd4pmpHwrpH9rxxRIw",
	authDomain: "pokedex-d52a9.firebaseapp.com",
	databaseURL: "https://pokedex-d52a9-default-rtdb.firebaseio.com",
	projectId: "pokedex-d52a9",
	storageBucket: "pokedex-d52a9.appspot.com",
	messagingSenderId: "535368060410",
	appId: "1:535368060410:web:6dfe2eed919c3babc5a843"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };