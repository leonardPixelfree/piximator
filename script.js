start();

//variables
var canvas2d1;
var canvas2d2;
var canvas2d3;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var button8;
var button9;
var text1;
var text2;
var text3;
var text4;
var text5;
var text6;
var text7;
var textArea1;
var fileUpload1;

var intervall;
var image;

function start() {
    initialize();
}

function initialize() {
    let canvas1 = document.getElementById("canvas1");
    canvas2d1 = canvas1.getContext("2d");
    let canvas2 = document.getElementById("canvas2");
    canvas2d2 = canvas2.getContext("2d");
    let canvas3 = document.getElementById("canvas3");
    canvas2d3 = canvas3.getContext("2d");
    button1 = document.getElementById("BUTTON1_region");
    button2 = document.getElementById("BUTTON2_region");
    button3 = document.getElementById("BUTTON3_region");
    button4 = document.getElementById("BUTTON4_region");
    button5 = document.getElementById("BUTTON5_region");
    button6 = document.getElementById("BUTTON6_region");
    button7 = document.getElementById("BUTTON7_region");
    button8 = document.getElementById("BUTTON8_region");
    button9 = document.getElementById("BUTTON9_region");
    text1 = document.getElementById("text1");
    text2 = document.getElementById("text2");
    text3 = document.getElementById("text3");
    text4 = document.getElementById("text4");
    text5 = document.getElementById("text5");
    text6 = document.getElementById("text6");
    text7 = document.getElementById("text7");
    textArea1 = document.getElementById("TEXT_AREA1_region");
    fileUpload1 = document.getElementById("input1");


    button1.onclick = function () { drawCos() };
    button2.onclick = function () { copyImage() };
    button3.onclick = function () { verzerr() };
    button4.onclick = function () { drawLine() };
    button5.onclick = function () { clearAll()};
    button6.onclick = function () { webWorkerTest() };
    button7.onclick = function () { event7() };
    button8.onclick = function () { event8()};
    button9.onclick = function () { event9()};
    text1.addEventListener('change', zerrPositionChange);
    text2.addEventListener('change', zerrPositionChange);
    text5.addEventListener('change', updateInaccuracy);
    fileUpload1.addEventListener('change', uploadImage);

    document.addEventListener('keypress', (event) => {
        if (event.key == "w") {
            text2.value = text2.value * 1 -1;
            zerrPositionChange();
        } else if (event.key == "s"){
            text2.value = text2.value * 1 +1;
            zerrPositionChange();
        } else if (event.key == "a"){
            text1.value = text1.value * 1 -1;
            zerrPositionChange();
        } else if (event.key == "d"){
            text1.value = text1.value * 1 +1;
            zerrPositionChange();
        }
      }, false);
}

function clearAll(){
    canvas2d1.fillStyle = "#ffffffff";
    canvas2d1.fillRect(0, 0, 1000, 1000);
    canvas2d2.fillStyle = "#ffffffff";
    canvas2d2.fillRect(0, 0, 1000, 1000);
    canvas2d3.fillStyle = "#ffffffff";
    canvas2d3.fillRect(0, 0, 1000, 1000);

}

function updateInaccuracy(event){
    let inac = text5.value * 1;
    copyInaccuracy = inac;
}

function zerrPositionChange(){
    canvas2d2.fillStyle = "#ffffffff";
    canvas2d2.fillRect(0, 0, 1000, 1000);
    canvas2d2.drawImage(canvas1, 0, 0);

    let x = text1.value * 1;
    let y = text2.value * 1;

    canvas2d2.fillStyle = "#ff0000";
    canvas2d2.fillRect(x, y, 10, 10);
}

function uploadImage(event){
     // Get the uploaded file
     const file = event.target.files[0];

     // Create a new FileReader
     const reader = new FileReader();

     image = new Image();

     // When the FileReader has finished reading the file
     reader.onload = function(event) {

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

             // Draw the image on the canvas with the resized dimensions
             canvas2d1.drawImage(image, 0, 0, drawWidth, drawHeight);
             canvas2d2.drawImage(image, 0, 0, drawWidth, drawHeight);
             zerrPositionChange(null);
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
    
    //verzerr eine box an der angegebenen pos mit der größe 100/100 by moving it 40 up
    let offsetX = text1.value * 1;
    let offsetY = text2.value * 1;
    let width = 100;
    let height = 100;
    let verzerrX = text3.value * 1;
    let verzerrY = text4.value * 1;

    let maxVerzerrDistance = distance(0, 0, width/2, height/2);

    for(let x = 0; x < width/copyInaccuracy; x++){
        for(let y = 0; y < height/copyInaccuracy; y++){
            let realX = x*copyInaccuracy+offsetX;
            let realY = y*copyInaccuracy+offsetY;

            let pixelColor = getOrigColorAt(realX, realY);

            let dist = distance(realX, realY, offsetX+width/2, offsetY+height/2);
            let verzerfactor = 1 -  (dist/ maxVerzerrDistance);

            let realNewX = Math.floor((realX + verzerrX * verzerfactor) / copyInaccuracy);
            let realNewY = Math.floor((realY + verzerrY * verzerfactor) / copyInaccuracy);

            matrix[realNewX] [realNewY] = pixelColor;

            zerrPixelsInBetweeen(verzerrY * verzerfactor, realY, matrix, realNewX, pixelColor, verzerrX * verzerfactor, realX, realNewY);
        }
    }


    //drawing the matrix using webWorkers (for multiThreading)
    let pixelDataPatch  = [];
    let counter = 0;
    let startTime = Date.now();

    let copyStartHeight = text6.value * 1;
    let copyEndHeight = text7.value * 1;
    
    canvas2d3.fillStyle = "#ffffff";
    canvas2d3.fillRect(0, 0, 1000, 1000);

    for(let x = 0; x < canvasCopyWidth/copyInaccuracy; x++){
        for(let y = copyStartHeight/copyInaccuracy; y < copyEndHeight/copyInaccuracy; y++){
            let usedX = x * copyInaccuracy;
            let usedY = y * copyInaccuracy;

            let pixelColor;

            if(matrix[x][y] == 0){
                pixelColor = getOrigColorAt(usedX, usedY);
            }
            else{
                pixelColor = matrix[x][y];
            }

            if(usePixelPatch){
                let pixelData = new PixelData(usedX, usedY, copyInaccuracy, copyInaccuracy, pixelColor);
                pixelDataPatch.push(pixelData);
    
                counter++;
    
                if(counter == pixelDataPatchSize){
                    console.log("drawPatch");
                    drawPixels(pixelDataPatch);
                    pixelDataPatch = [];
                    counter = 0;
                }
            }
            else{
                canvas2d3.fillStyle = pixelColor;
                canvas2d3.fillRect(usedX, usedY, copyInaccuracy, copyInaccuracy);
            }

        }
    }
    drawPixels(pixelDataPatch);
    console.log("drawing took " + (Date.now() - startTime));
    console.log("image verzerrt");
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

