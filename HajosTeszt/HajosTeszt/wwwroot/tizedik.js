var k�rd�sek;
var hotList = [];           //Az �ppen gyakoroltatott k�rd�sek list�ja 
var questionsInHotList = 3; //Ez majd 7 lesz, tesztel�shez jobb a 3. 
var displayedQuestion;      //A hotList-b�l �ppen ez a k�rd�s van kint
var numberOfQuestions;      //K�rd�sek sz�ma a teljes adatb�zisban
var nextQuestion = 1;
var timerHandler;


function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
    

    //K�rd�sek sz�ma
    fetch("questions/count")
        .then(result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //El�re-h�tra gombok
    document.getElementById("el�re_gomb").addEventListener("click", el�re);
    ocument.getElementById("vissza_gomb").addEventListener("click", h�tra);

    //Mentett �llapot olvas�sa
    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"))
    };

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    };

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseint(localStorage.getItem("nextQuestion"))
    };

    //kezd� k�rd�slista let�lt�se
    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            k�rd�sBet�lt�s(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        k�rd�sMegjelen�t�s();
    }

}

function k�rd�sBet�lt�s(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hib�s let�lt�s: ${result.status}`);
                        return null;
                    }
                    else {
                        return result.json()
                    }
                })
            .then(q => {
                    hotList[destination].question = q;
                    hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. k�rd�s let�ltve a hot list ${destination}. hely�re`)
                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    k�rd�sMegjelen�t�s();
                }
                }
            );
    }

function k�rd�sMegjelen�t�s(k) {
    let k�rd�s = hotList[displayedQuestion].question;
    console.log(k�rd�s);
    document.getElementById("k�rd�s_sz�veg").innerText = k�rd�s.questionText;
    document.getElementById("v�lasz1").innerText = k�rd�s.answer1;
    document.getElementById("v�lasz2").innerText = k�rd�s.answer2;
    document.getElementById("v�lasz3").innerText = k�rd�s.answer3;

    if (k�rd�s.image) {
        document.getElementById("k�p").src = k�rd�s.image;
        document.getElementById("k�p").style.display = "block";
    }
    else {
            document.getElementById("k�p").style.display = "none";
    }

    window.onload = init();
    document.getElementById("v�laszok").style.pointerEvents = "auto";
}

function el�re() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    k�rd�sMegjelen�t�s();
}

function h�tra() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    k�rd�sMegjelen�t�s();
}

function v�laszt�s(n) {
    let k�rd�s = hotList[displayedQuestion].question;
    if (n === k�rd�s.correctAnswers) {
        document.getElementById("v�lasz" + n).classList.add("j�")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            k�rd�sBet�lt�s(nextQuestion, displayedQuestion);
            nextQuestion++;
            //ToDo: k�rd�slista v�ge ellen�rz�s
        }
    }
    else {
        document.getElementById("v�lasz" + n).classList.add("rossz")
        document.getElementById("v�lasz" + k�rd�s.correctAnswers).classList.add("j�")
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("v�laszok").style.pointerEvents = "none";
    timerHandler = setTimeout(el�re, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}





