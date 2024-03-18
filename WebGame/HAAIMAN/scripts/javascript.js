
const HaaimanImage = document.querySelector(".haaiman-box img");
const wordDisplay = document.querySelector(".word-display")
const geussesText = document.querySelector(".geusses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".gameModal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord = [], correctLetters = [], WrongGeussCount;
const maxGeusses = 6;

const resetGame = () => {
	// haalt alle game datails weg
	correctLetters = [];
	WrongGeussCount = 0;
	HaaimanImage.src = `images/haaiman-${WrongGeussCount}.png`;
	geussesText.innerText = `${WrongGeussCount} / ${maxGeusses}`;
	keyboardDiv.querySelectorAll("Button").forEach(btn => btn.disabled = false);
	wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
	gameModal.classList.remove("show");
}

const getRandomWord = () => {
	// selecteerd een random word and hint van wordList.js
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
	currentWord = word;
	// console.log(word);
	document.querySelector(".hint-text b").innerText = hint;
	resetGame();



}

const gameEnd = (isVictory) => {
	// na 600ms nadat de game is afgelopen laat de details zien (wat het word was, of je hebt gewonnen of niet, en welke gif)
	setTimeout(() => {
		const modalText = isVictory ? `You found the word:` : `The correct word was:`;
		gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`;
		gameModal.querySelector("h4").innerText = `${isVictory ? `Congrats!` : `Game Over!`}`;
		gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
		gameModal.classList.add("show");
	}, 300);

}

const initGame = (button, clickedLetter) => {
	// checked of clickedLetter bestaat op het word!
	if (currentWord.includes(clickedLetter)) {
		//laat alle correcte letters zien op het scherm!
		[...currentWord].forEach((letter, index) => {
			if (letter === clickedLetter) {
				correctLetters.push(letter);
				wordDisplay.querySelectorAll("li")[index].innerText = letter;
				wordDisplay.querySelectorAll("li")[index].classList.add("geussed")
			}
		});
	} else {
		// waarneer geklicked update niet  de wrong geiuss count en foto
		WrongGeussCount++;
		HaaimanImage.src = `images/haaiman-${WrongGeussCount}.png`;
	}

	button.disabled = true;
	geussesText.innerText = `${WrongGeussCount} / ${maxGeusses}`;

	//calling game over functie als deze condities er zijn
	if (WrongGeussCount === maxGeusses) return gameEnd(false);
	if (correctLetters.length === currentWord.length) return gameEnd(true);
}

// creating keyboard knoppen
for (let i = 97; i <= 122; i++) {
	const button = document.createElement("button");
	button.innerText = String.fromCharCode(i);
	keyboardDiv.appendChild(button);
	button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));


}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord)

