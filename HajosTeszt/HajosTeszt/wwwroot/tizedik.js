var k�rd�sek;
var hotList = [];           //Az �ppen gyakoroltatott k�rd�sek list�ja 
var questionsInHotList = 3; //Ez majd 7 lesz, tesztel�shez jobb a 3. 
var displayedQuestion;      //A hotList-b�l �ppen ez a k�rd�s van kint
var numberOfQuestions;      //K�rd�sek sz�ma a teljes adatb�zisban
var nextQuestion = 1;

window.onload = function let�lt�s() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => let�lt�sBefejez�d�tt(data));
}

function k�rd�sBet�lt�s(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hib�s let�lt�s: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. k�rd�s let�ltve a hot list ${destination}. hely�re`)
            }
        );
}

function let�lt�sBefejez�d�tt(d) {
    console.log("Sikeres let�lt�s")
    console.log(d)
    k�rd�sek = d;
}

function k�rd�sMegjelen�t�s(k) {
    let k�rd�s = hotList[displayedQuestion].question;
    console.log(k�rd�s);
    document.getElementById("k�rd�s_sz�veg").innerText = k�rd�s.questionText
    document.getElementById("v�lasz1").innerText = k�rd�s.answer1
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. k�rd�s let�ltve a hot list ${destination}. hely�re`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    k�rd�sMegjelen�t�s();

                }
            }
}


function el�rekattint�s() {
    k�rd�ssorsz�m++;
    if (k�rd�sszorsz�m == k�rd�sek.lenght) {
        k�rd�ssorsz�m = 0;
    }
    k�rd�sMegjelen�t�s(k�rd�sszorsz�m);
}

function visszakattint�s() {
    if (k�rd�ssorsz�m == 0) {
        k�rd�sszorsz�m = k�rd�sek.lenght - 1;
    }
    k�rd�sMegjelen�t�s(k�rd�ssorsz�m)
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Els� k�rd�sek let�lt�se
    for (var i = 0; i < questionsInHotList; i++) {
        k�rd�sBet�lt�s(nextQuestion, i);
        nextQuestion++;
    }
}

function el�re() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    k�rd�sMegjelen�t�s()
}

