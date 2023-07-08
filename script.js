start();

//variables
var canvas2d1;
var canvas2d2;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var button8;
var button9;
var textArea1;

var intervall;

let frame = 0;

let speedsim = false;
let speedSteps = 0;

let totalEnergies = [];
let avgEpsilon = [];
let epsilonInflation = 0.0;

let maxGraphWidth = 900;

function start() {
    initialize();
}

function initialize() {
    let canvas1 = document.getElementById("canvas1");
    canvas2d1 = canvas1.getContext("2d");
    let canvas2 = document.getElementById("canvas2");
    canvas2d2 = canvas2.getContext("2d");
    button1 = document.getElementById("BUTTON1_region");
    button2 = document.getElementById("BUTTON2_region");
    button3 = document.getElementById("BUTTON3_region");
    button4 = document.getElementById("BUTTON4_region");
    button5 = document.getElementById("BUTTON5_region");
    button6 = document.getElementById("BUTTON6_region");
    button7 = document.getElementById("BUTTON7_region");
    button8 = document.getElementById("BUTTON8_region");
    button9 = document.getElementById("BUTTON9_region");
    textArea1 = document.getElementById("TEXT_AREA1_region");


    button1.onclick = function () { verzerr() };
    button2.onclick = function () { event2() };
    button3.onclick = function () { event3() };
    button4.onclick = function () { event4() };
    button5.onclick = function () { event5()};
    button6.onclick = function () { event6() };
    button7.onclick = function () { event7() };
    button8.onclick = function () { event8()};
    button9.onclick = function () { event9()};

    console.log("energy is green \nepsilon (weights) is blue \nphi (structure) is red");
}

function verzerr(){
    drawCos();
    
    verzerrImage();
}

function verzerrImage(){
    let matrix = [];

    for(let x = 0; x < canvasCopyWidth/copyInaccuracy; x++){
        matrix.push([]);
        for(let y = 0; y < canvasCopyHeight/copyInaccuracy; y++){
            matrix[x].push(0);
        }
    }
    
    //verzerr eine box an pos 200/200 mit der größe 100/100 by moving it 40 up
    let offsetX = 200;
    let offsetY = 200;
    let width = 100;
    let height = 100;
    let verzerrX = 0;
    let verzerrY = 100;
    for(let x = 0; x < width/copyInaccuracy; x++){
        for(let y = 0; y < height/copyInaccuracy; y++){
            let realX = x*copyInaccuracy+offsetX;
            let realY = y*copyInaccuracy+offsetY;

            let pixelColor = getOrigColorAt(realX, realY);
            console.log(realX + " " + realY + " " + pixelColor);

            let realNewX = Math.floor((realX + verzerrX) / copyInaccuracy);
            let realNewY = Math.floor((realY + verzerrY) / copyInaccuracy);

            matrix[realNewX] [realNewY] = pixelColor;

            zerrPixelsInBetweeen(verzerrY, realY, matrix, realNewX, pixelColor, verzerrX, realX, realNewY);
        }
    }


    //drawing the matrix
    for(let x = 0; x < canvasCopyWidth/copyInaccuracy; x++){
        for(let y = 0; y < canvasCopyHeight/copyInaccuracy; y++){
            let usedX = x * copyInaccuracy;
            let usedY = y * copyInaccuracy;

            let pixelColor;

            if(matrix[x][y] == 0){
                pixelColor = getOrigColorAt(usedX, usedY);
            }
            else{
                pixelColor = matrix[x][y];
            }
            canvas2d2.fillStyle = pixelColor;
            canvas2d2.fillRect(usedX, usedY, copyInaccuracy, copyInaccuracy);
        }
    }

}
function zerrPixelsInBetweeen(verzerrY, realY, matrix, realNewX, pixelColor, verzerrX, realX, realNewY) {
    for (let i = 0; i < verzerrY; i++) {
        let zerr = Math.floor((realY + i) / copyInaccuracy);

        if (matrix[realNewX][zerr] != 0) {
            continue;
        }
        matrix[realNewX][zerr] = pixelColor;
    }

    for (let i = 0; i < verzerrX; i++) {
        let zerr = Math.floor((realX + i) / copyInaccuracy);

        if (matrix[zerr][realNewY] != 0) {
            continue;
        }
        matrix[zerr][realNewY] = pixelColor;
    }
}

