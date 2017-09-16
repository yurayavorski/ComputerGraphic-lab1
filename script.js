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
    ctx.moveTo(sq + w/2, sq);
    ctx.lineTo(sq + w/2, h);

// Draw Y arrow.
    ctx.moveTo(sq + w/2, sq);
    ctx.lineTo(sq * 5 / 6 + w/2, sq * 2);
    ctx.moveTo(sq + w/2, sq);
    ctx.lineTo(sq * 7 / 6 + w/2, sq * 2);

// Draw X axis.
    ctx.moveTo(0, h - sq - h/2);
    ctx.lineTo(w - sq, h - sq - h/2);

// Draw X arrow.
    ctx.moveTo(w - sq, h - sq - h/2);
    ctx.lineTo(w - 2 * sq, h - sq * 5 / 6 - h/2);
    ctx.moveTo(w - sq, h - sq - h/2);
    ctx.lineTo(w - 2 * sq, h - sq * 7 / 6 - h/2);

    ctx.closePath();

    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawAxesTexts() {
    let axisElements = w/sq - 3;
    ctx.fillStyle = "rgb(0, 0, 0)";

// Draw the X AND Y axis texts.
    let pos = 1;
    for (let i = Math.round(axisElements/(-2) - 1) ; i <= axisElements/2; i++) {
        if ( axisElements > 40) {
            i++;
            pos++;
        }
        ctx.fillText(i, sq * (pos + 1), h - sq / 3 - h/2);
        ctx.fillText(i, sq / 3 + w/2, h - sq * (pos++ + 1));
    }

// Draw axes signs.
    ctx.fillText("0", sq / 3, h - sq / 3);
    ctx.fillText("X", w - sq / 3, h - sq / 3 - h/2);
    ctx.fillText("Y", sq / 3 + w/2, sq / 3);
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

    ctx.moveTo(sq + top.x * sq + w/2, h/2 - (sq + top.y * sq));
    ctx.lineTo(sq + left.x * sq + w/2, h/2 - (sq + left.y * sq));

    ctx.lineTo(sq + bot.x * sq + w/2, h/2 - (sq + bot.y * sq));
    ctx.lineTo(sq + right.x * sq + w/2, h/2 - (sq + right.y * sq));
    ctx.lineTo(sq + top.x * sq + w/2, h/2 - (sq + top.y * sq));
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

        ctx.moveTo(sq + top.x * sq+ w/2, Y - h/2);
        ctx.lineTo(sq + left.x * sq+ w/2, Y - h/2);
    }

    for (let X = ((sq + right.x * sq) + sq*0.5) ; X < (sq + left.x * sq); X += sq*0.5) {

        ctx.moveTo(X+ w/2, h/2 - (sq + right.y * sq));
        ctx.lineTo(X + w/2, h/2 - (sq + top.y * sq));
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
    ctx.arc(sq + cx * sq + w/2, h/2 - (sq + cy * sq), radius * sq, 0, Math.PI * 2);
    ctx.closePath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.fillStyle = "transparent";
    ctx.fill();
}
function changeScale() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sq = w / 20 / document.getElementById("scale").value * 100;
    drawBoard();
    drawAxes();
    drawAxesTexts();
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

    let axisElements = w/sq - 3;
    if (Math.abs(rbX) > axisElements/2) {
        document.getElementById("scale").value = Math.abs(Math.round( document.getElementById("scale").value*rbX/axisElements*2 * 1.1 ));
        document.getElementById("scale").value = Math.round(document.getElementById("scale").value/10)*10;
        changeScale();
    }
    else {
        if (Math.abs(ltX) > axisElements/2) {
            document.getElementById("scale").value = Math.abs(Math.round( document.getElementById("scale").value*ltX/axisElements*2 * 1.1 ));
            document.getElementById("scale").value = Math.round(document.getElementById("scale").value/10)*10;
            changeScale();
        }
        else
            if ( axisElements/(rbX - ltX) > 5 ) {
                document.getElementById("scale").value = Math.abs(Math.round( document.getElementById("scale").value/axisElements/(rbX - ltX) * 10 ));
                document.getElementById("scale").value = Math.round(document.getElementById("scale").value/10)*10;
                changeScale();
            }
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
    document.getElementById("scale").value = Math.round(document.getElementById("scale").value/10)*10;
    changeScale();
}
