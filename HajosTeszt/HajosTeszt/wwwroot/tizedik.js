var kérdések;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-bõl éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;


function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
    //kezdõ kérdéslista letöltése
    for (let i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }

    //Kérdések száma
    fetch("questions/count")
        .then(result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Elõre-hátra gombok
    document.getElementById("elõre_gomb").addEventListener("click", elõre);
    ocument.getElementById("vissza_gomb").addEventListener("click", hátra);

}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hibás letöltés: ${result.status}`);
                        return null;
                    }
                    else {
                        return result.json()
                    }
                })
            .then(q => {
                    hotList[destination].question = q;
                    hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
                }
            );
    }

function kérdésMegjelenítés(k) {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
            document.getElementById("kép").style.display = "none";
    }

    window.onload = init();

        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();

                }
            }
}

function elõre() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hátra() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswers) {
        document.getElementById("válasz" + n).classList.add("jó")
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswers).classList.add("jó")
    }
}





