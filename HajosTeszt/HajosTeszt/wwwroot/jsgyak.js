window.onload = function () {
    console.log("start")
    let hova = document.getElementById("ide");
    for (var i = 0; i < 10; i++) {
        var sor = document.createElement("div");
        document.getEelementById("pascal").appendChild(sor);
        sor.className = "sor";
        sor.classList.add("sor")
        hova.appendChild(sor);

        for (var j = 0; j < 10; j++) {
            var elem = document.createElement("div");
            sor.appendChild(elem);
            elem.innerText = j;
            elem.className = "elem";
            elem.classList.add("elem");
        }
    }
}