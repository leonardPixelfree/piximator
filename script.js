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
    drawSin();
    
    copyImage();
}

function drawSin(){
    for(let i = 0; i < 300; i++){
        let colorNumber = (Math.sin(i * 0.1) * 0.5 +1) * 255;
        canvas2d1.fillStyle = getColor(colorNumber, colorNumber, colorNumber);
        canvas2d1.fillRect(i*3, 0, 3, 1000);
    }
}

function copyImage(){
    for(let x = 0; x < canvasCopyWidth/copyInaccuracy; x++){
        for(let y = 0; y < canvasCopyHeight/copyInaccuracy; y++){
            let usedX = x * copyInaccuracy;
            let usedY = y * copyInaccuracy;

            let pixeldata = canvas2d1.getImageData(usedX, usedY, 1, 1).data;
            let pixelColor = getColor(pixeldata[0], pixeldata[1], pixeldata[2]);
            canvas2d2.fillStyle = pixelColor;
            canvas2d2.fillRect(usedX, usedY, copyInaccuracy, copyInaccuracy);
        }
    }
}