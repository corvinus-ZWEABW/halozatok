var k�rd�sek;

window.onload = function let�lt�s() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => let�lt�sBefejez�d�tt(data));
}

function let�lt�sBefejez�d�tt(d) {
    console.log("Sikeres let�lt�s")
    console.log(d)
    k�rd�sek = d;
}

function k�rd�sMegjelen�t�s(k) {
    let k�rd�s_ide = document.getElementById("k�rd�s_sz�veg")
    k�rd�s_ide.innerHTML = k�rd�sek[k].questionText;
    console.log('$ {k�rd�sek.lenght} k�rd�s j�tt)')

    ducomunt.getElementById("v�lasz1").innerHTML = k�rd�sek[k].answer1

    for (var i = 1; i <= 3; i++) {
        let k�rd�s_elem = document.getElementById("v�lasz" + 1)
        k�rd�s_elem.innerHTML = k�rd�sek[k]("answer" + 1)
    }

    document.getElementById("k�p1").src = "https://szoft1.comeback.hu/hajo/" + k�rd�sek[k].image
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