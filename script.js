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
var fileUpload1;

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
    fileUpload1 = document.getElementById("input1");


    button1.onclick = function () { drawCos()() };
    button2.onclick = function () { copyImage() };
    button3.onclick = function () { verzerr() };
    button4.onclick = function () { event4() };
    button5.onclick = function () { event5()};
    button6.onclick = function () { event6() };
    button7.onclick = function () { event7() };
    button8.onclick = function () { event8()};
    button9.onclick = function () { event9()};
    fileUpload1.addEventListener('change', uploadImage);
}

function uploadImage(event){
     // Get the uploaded file
     const file = event.target.files[0];

     // Create a new FileReader
     const reader = new FileReader();

     // When the FileReader has finished reading the file
     reader.onload = function(event) {
         // Create a new image element
         const image = new Image();

         // When the image has finished loading
         image.onload = function() {
             // Calculate the aspect ratio of the image and canvas
             const aspectRatio = image.width / image.height;
             const canvasAspectRatio = canvas1.width / canvas1.height;

             let drawWidth, drawHeight;

             // Compare the aspect ratios to determine the dimensions for drawing
             if (aspectRatio > canvasAspectRatio) {
                 drawWidth = canvas1.width;
                 drawHeight = canvas1.width / aspectRatio;
             } else {
                 drawWidth = canvas1.height * aspectRatio;
                 drawHeight = canvas1.height;
             }

             // Calculate the position to center the image on the canvas
             const x = (canvas1.width - drawWidth) / 2;
             const y = (canvas1.height - drawHeight) / 2;

             // Draw the image on the canvas with the resized dimensions
             canvas2d1.drawImage(image, x, y, drawWidth, drawHeight);
         };

         // Set the image source to the data URL
         image.src = event.target.result;
     };

     // Read the file as a data URL
     reader.readAsDataURL(file);
    console.log("image uploaded");
}

function verzerr(){
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
    let verzerrX = 60;
    let verzerrY = 100;

    let maxVerzerrDistance = distance(0, 0, verzerrX, verzerrY);

    for(let x = 0; x < width/copyInaccuracy; x++){
        for(let y = 0; y < height/copyInaccuracy; y++){
            let realX = x*copyInaccuracy+offsetX;
            let realY = y*copyInaccuracy+offsetY;

            let pixelColor = getOrigColorAt(realX, realY);

            let verzerfactor = distance(realX, realY, offsetX+width/2, offsetY+height/2) / maxVerzerrDistance;

            let realNewX = Math.floor((realX + verzerrX * verzerfactor) / copyInaccuracy);
            let realNewY = Math.floor((realY + verzerrY * verzerfactor) / copyInaccuracy);

            matrix[realNewX] [realNewY] = pixelColor;

            zerrPixelsInBetweeen(verzerrY * verzerfactor, realY, matrix, realNewX, pixelColor, verzerrX * verzerfactor, realX, realNewY);
        }
        console.log("image verzerrt");
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

