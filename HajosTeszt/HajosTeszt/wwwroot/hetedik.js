var kérdések;

window.onload = function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejezõdött(data));
}

function letöltésBefejezõdött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
}

function kérdésMegjelenítés(k) {
    let kérdés_ide = document.getElementById("kérdés_szöveg")
    kérdés_ide.innerHTML = kérdések[k].questionText;
    console.log('$ {kérdések.lenght} kérdés jött)')

    ducomunt.getElementById("válasz1").innerHTML = kérdések[k].answer1

    for (var i = 1; i <= 3; i++) {
        let kérdés_elem = document.getElementById("válasz" + 1)
        kérdés_elem.innerHTML = kérdések[k]("answer" + 1)
    }

    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image
}

function elõrekattintás() {
    kérdéssorszám++;
    if (kérdésszorszám == kérdések.lenght) {
        kérdéssorszám = 0;
    }
    kérdésMegjelenítés(kérdésszorszám);
}

function visszakattintás() {
    if (kérdéssorszám == 0) {
        kérdésszorszám = kérdések.lenght - 1;
    }
    kérdésMegjelenítés(kérdéssorszám)
}