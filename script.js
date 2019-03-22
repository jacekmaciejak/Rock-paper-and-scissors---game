let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

init();

function getComputerChoice() {
    const choices = ['r', 'p', 's']; // tablica z wartosciami ID ikon
    const randomNumber = Math.floor(Math.random() * 3); //funkcja losujaca liczby od 0 do 2, math.floor zaokragla wartosci do pelnej liczby. Jesli chcemy losowac wartosci np od 0 do 10 to: math.random() * 10
    return choices[randomNumber]; //zwraca wylosowana liczbe przypisana do ID z ikon
}

function convertToWord(letter) { //funkcja konwertujaca wylosowana liczbe czyli litere p,r lub s na paper, rock lub scissors
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

function win(userChoice, ComputerChoice) { //po wygranej usera, funkcja dodaje mu jeden punkt
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    userScore++; //zwiekszenie wygranej o 1
    userScore_span.innerHTML = userScore; //dodanie wygranej do licznika strony
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(ComputerChoice)}${smallCompWord}. You WIN!`; //wyswietla informacje o wyborze i o tym kto wygral, zapis zgodny z ES6
    userChoice_div.classList.add('green-glow'); //dodaje nowa klase zadeklarowana w CSS gdy user wygrywa
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 400); //funkcja po 1s usuwa klase green-glow, obrmowanie przestanie sie podswietlac
}

function lose(userChoice, ComputerChoice) { //to samo dla computer
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `${convertToWord(ComputerChoice)}${smallCompWord} beats ${convertToWord(userChoice)}${smallUserWord}. Computer WIN!`;
    userChoice_div.classList.add('red-glow'); //dodaje nowa klase zadeklarowana w CSS gdy user wygrywa
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 400); //funkcja po 1s usuwa klase green-glow, obrmowanie przestanie sie podswietlac
}

function draw(userChoice, ComputerChoice) { //to samo gdy nikt nie wygra
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(ComputerChoice)}${smallCompWord} equals ${convertToWord(userChoice)}${smallUserWord}. It's a draw!`;
    userChoice_div.classList.add('gray-glow'); //dodaje nowa klase zadeklarowana w CSS gdy user wygrywa
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 400); //funkcja po 1s usuwa klase green-glow, obrmowanie przestanie sie podswietlac
}

function game(userChoice) {
    const ComputerChoice = getComputerChoice(); // zmienna przechowujaca wylosowana wartosc z funkcji getComputerChoice()
    switch (userChoice + ComputerChoice) { // petla switch sprawdzajaca wszystkie warunki 
        case "rs": //user wybiera rock a computer scissors, wygrywa USER
        case "pr": //user wybiera paper a computer rock, wygrywa USER
        case "sp": //user wybiera scissors a computer paper, wygrywa USER
            win(userChoice, ComputerChoice);
            break;
        case "sr": //user wybiera scissors a computer rock, wygrywa COMPUTER
        case "rp": //user wybiera rock a computer paper, wygrywa COMPUTER
        case "ps": //user wybiera paper a computer scissors, wygrywa COMPUTER
            lose(userChoice, ComputerChoice);
            break;
        case "ss": //user wybiera scissors a computer scissors
        case "rr": //user wybiera rock a computer rock
        case "pp": //user wybiera paper a computer paper
            draw(userChoice, ComputerChoice);
            break;
    }
}

function main() {
    //Dodajemy uchwyt do ikon, po kliknieciu w ikone wywolujemy funkcje game
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));
}

main();

// Button NEW GAME

document.querySelector('.btn').addEventListener('click', init);

function init() {
    userScore = 0; //Wyzerowanie zmiennej przechowujacej sume wygranej
    computerScore = 0; //jw dla zmiennej computer
    document.getElementById('user-score').textContent = '0'; //Wyzerowanie zmiennej wyswietlajacej wynik wygranej na tablicy
    document.getElementById('computer-score').textContent = '0'; //jw dla zmiennej computer
    result_p.innerHTML = `New game! Please make your move.`; //Nowy tekst
};
