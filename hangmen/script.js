
///მასივში სიტყვები 
let possibleWords = [ "სამსახური", "რვეული" , "ნოუთბუქი" , "კონდიციონერი" , "უნივერსიტეტი" ,  "აკადემია" ,  "ასობგერა" ,  "დეკლარაცია" , "ჰიდროელექტროსადგური"];


//"დეველოპერი", "სამსახური", "კომპიუტერი", "სკოლა", "სახლი"
let chosenWord = getRandomWord();

let guessedWord = Array(chosenWord.length).fill("_");
const attempts = 10;
console.log(guessedWord)


let startGame = prompt("მზად ხარ თამაშისთვის? თუ კი, შეიყვანე - დიახ");


///ტერნარი
startGame && startGame === 'დიახ' ? playGame() : alert("ნახვამდის, გთხოვთ დააჭიროთ F5-ს");



/// მასუვუდან რენდომად სიტყვის ამოღების ფუნცქია
function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * possibleWords.length);
    return possibleWords[randomIndex];
}


/// დარჩენილი მცდელობები თუ ნულის ტოლია სრულდება თამაში loss,  &&  თუ გამოცნობილი ასოების შეერთებით მიღებული სიტყვა ტოლია რენდომ სიტვის , თამაში მთავრდება won
function playGame() {
    while (attempts > 0  && guessedWord.join("") != chosenWord) {
        displayGameState();
        let guessedLetter = prompt("გამოიცანი ასო:");
        checkGuessedLetter(guessedLetter);
    }


    ///  სიტყვას (ჩაწერილი  როგორც  "ს","ი","ტ","ყ","ვ","ა" )  ვართებ და ვადარებ თავიდან არჩეულ რენდომ სიტყვას
    if (guessedWord.join("") === chosenWord) {
        alert("გილოცავ !!! შენ გამოიცანი სიტყვა: " + chosenWord );
        console.log("გილოცავ !!! შენ გამოიცანი სიტყვა: " + chosenWord);

    } else {
        alert("სამწუხაროდ, შენ ამოწურე ყველა მცდელობა და დამარცხდი. სწორი სიტყვა: " + chosenWord);
        console.log("სამწუხაროდ, შენ ამოწურე ყველა მცდელობა და დამარცხდი. სწორი სიტყვა: " + chosenWord);

    }
}



/// დარჩენილი მცდელობები,   და თ სიტყვაში ასობგერა გამოიცნო, 
function displayGameState() {

    alert("სიტყვა"+ "      " + guessedWord.join(" ") + "      " + "დარჩენილი მცდელობები:" + attempts);
    console.log("სიტყვა"+ "      " + guessedWord.join(" ") + "      " + "დარჩენილი მცდელობები:" + attempts);

}



//// ამოწმებს ასოსს,  ეს ასო თ ურევია  სიტყვაში
function checkGuessedLetter(letter) {
    if (chosenWord.includes(letter)) {
        updateGuessedWord(letter);
    } else {
        handleIncorrectGuess();
    }
}

/// აკეთებს აფდეითს,   გამოცნობილ ასობგერას აჩენშ შესაბამის ადგილზე
function updateGuessedWord(letter) {
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            guessedWord[i] = letter;
        }
    }
}


/// არასწორის ასობგერის შემთვევაში, მცდელობებს ვაკლებ ,  და ალერტიც გამომაქვს
function handleIncorrectGuess() {
    attempts--;
    alert("არასწორი ასო! დარჩენილი მცდელობების რაოდენობა: " + attempts);
    console.log("არასწორი ასო! დარჩენილი მცდელობების რაოდენობა: " + attempts);
}
