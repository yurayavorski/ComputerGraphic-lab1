const canvas = document.getElementById("canvas");
const w = canvas.width;
const h = canvas.height;
sq = w / 20 / document.getElementById("scale").value * 100;


const ctx = canvas.getContext("2d");
ctx.font = 'bold 10pt serif';
ctx.textBaseline = "middle";
ctx.textAlign = "center";

function drawBoard() {
    ctx.beginPath();

    for (let x = 0; x <= w; x += sq) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (let x = 0; x <= h; x += sq) {
        ctx.moveTo(0, x);
        ctx.lineTo(w, x);
    }

    ctx.closePath();

    ctx.strokeStyle = "rgb(200,200,200)";
    ctx.stroke();
}

function drawAxes() {
    ctx.beginPath();

// Draw Y axis.
    ctx.moveTo(sq, sq);
    ctx.lineTo(sq, h);

// Draw Y arrow.
    ctx.moveTo(sq, sq);
    ctx.lineTo(sq * 5 / 6, sq * 2);
    ctx.moveTo(sq, sq);
    ctx.lineTo(sq * 7 / 6, sq * 2);

// Draw X axis.
    ctx.moveTo(0, h - sq);
    ctx.lineTo(w - sq, h - sq);

// Draw X arrow.
    ctx.moveTo(w - sq, h - sq);
    ctx.lineTo(w - 2 * sq, h - sq * 5 / 6);
    ctx.moveTo(w - sq, h - sq);
    ctx.lineTo(w - 2 * sq, h - sq * 7 / 6);

    ctx.closePath();

    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawAxesTexts() {
    let axisElements = 17;

    ctx.fillStyle = "rgb(0, 0, 0)";

// Draw the X axis texts.
    for (let i = 1; i <= axisElements; i++) {
        ctx.fillText(i, sq * (i + 1), h - sq / 3);
    }

// Draw the Y axis texts.
    for (let i = 1; i <= axisElements; i++) {
        ctx.fillText(i, sq / 3, h - sq * (i + 1));
    }

// Draw axes signs.
    ctx.fillText("0", sq / 3, h - sq / 3);
    ctx.fillText("X", w - sq / 3, h - sq / 3);
    ctx.fillText("Y", sq / 3, sq / 3);
}
function makeSquare(rbX, rbY, ltX, ltY, color) {
    let width = rbX - ltX;
    let top = {
        x: ltX,
        y: ltY
    };
    let bot = {
        x: rbX,
        y: rbY
    };
    let left = {
        x: rbX,
        y: rbY - width
    };
    let right = {
        x: ltX,
        y: rbY
    };

    ctx.beginPath();

    ctx.moveTo(sq + top.x * sq, h - (sq + top.y * sq));
    ctx.lineTo(sq + left.x * sq, h - (sq + left.y * sq));

    ctx.lineTo(sq + bot.x * sq, h - (sq + bot.y * sq));
    ctx.lineTo(sq + right.x * sq, h - (sq + right.y * sq));
    ctx.lineTo(sq + top.x * sq, h - (sq + top.y * sq));
    //ctx.closePath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function makeCroses(rbX, rbY, ltX, ltY, color) {
    let width = rbX - ltX;
    let top = {
        x: ltX,
        y: ltY
    };
    let bot = {
        x: rbX,
        y: rbY
    };
    let left = {
        x: rbX,
        y: rbY - width
    };
    let right = {
        x: ltX,
        y: rbY
    };

    ctx.beginPath();
    /*alert (ltY);
    alert (h - (sq + top.y * sq) - sq*0.5);
    alert(sq);*/
    for (let Y = (h - (sq + top.y * sq) - sq*0.5) ; Y > (h - (sq + right.y * sq)); Y -= sq*0.5) {

        ctx.moveTo(sq + top.x * sq, Y);
        ctx.lineTo(sq + left.x * sq, Y);
    }

    for (let X = ((sq + right.x * sq) + sq*0.5) ; X < (sq + left.x * sq); X += sq*0.5) {

        ctx.moveTo(X, h - (sq + right.y * sq));
        ctx.lineTo(X, h - (sq + top.y * sq));
    }


    //ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function makeCircle(rbX, rbY, ltX, ltY, color) {
    let cx = ltX + ((rbX - ltX) / 2);
    let cy = ltY - ( (ltY - rbY) / 2);
    let radius = (rbX - ltX) / 2;

    ctx.beginPath();
    ctx.arc(sq + cx * sq, h - (sq + cy * sq), radius * sq, 0, Math.PI * 2);
    ctx.closePath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.fillStyle = "transparent";
    ctx.fill();
}

document.getElementById("drawBtn").onclick = function () {

    let ltX = +document.getElementById("x").value;
    let ltY = +document.getElementById("y").value;
    let rbX = +document.getElementById("vertDiagonalLength").value;
    let rbY = +document.getElementById("horizDiagonalLength").value;
    let rhombusColor = document.getElementById("rhombusColor").value;
    let diagonalColor = document.getElementById("diagonalColor").value;
    let circleColor = document.getElementById("circleColor").value;

    if ( (rbX - ltX) != (rbY - ltY) ) {
        alert("Заданий прямокутник не є квадратом!");
        return ;
    }

    makeSquare(rbX, rbY, ltX, ltY, rhombusColor);
    makeCroses(rbX, rbY, ltX, ltY, diagonalColor);
    makeCircle(rbX, rbY, ltX, ltY, circleColor);
}

document.getElementById("clearBtn").onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard();
    drawAxes();
    drawAxesTexts();
}

drawBoard();
drawAxes();
drawAxesTexts();

document.getElementById("scale").onchange = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sq = w / 20 / document.getElementById("scale").value * 100;
    drawBoard();
    drawAxes();
    drawAxesTexts();
}
