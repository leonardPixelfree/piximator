

function copyImage(){
    for(let x = 0; x < canvasCopyWidth/copyInaccuracy; x++){
        for(let y = 0; y < canvasCopyHeight/copyInaccuracy; y++){
            let usedX = x * copyInaccuracy;
            let usedY = y * copyInaccuracy;

            let pixelColor = getOrigColorAt(usedX, usedY);
            canvas2d2.fillStyle = pixelColor;
            canvas2d2.fillRect(usedX, usedY, copyInaccuracy, copyInaccuracy);
        }
    }
}

function getOrigColorAt(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);

    let pixeldata = canvas2d1.getImageData(x, y, 1, 1).data;
    let pixelColor = getColor(pixeldata[0], pixeldata[1], pixeldata[2]);
    return pixelColor;
}

function drawSin(){
    for(let i = 0; i < 300; i++){
        for(let y = 0; y < 300; y++){
            let colorXNumber = (Math.sin(i * sinDensityX) * 0.5 +1) * 255;
            let colorYNumber = (Math.sin(y * sinDensityY) * 0.5 +1) * 255;
            let colorNumber = (colorXNumber + colorYNumber) / 2;
            canvas2d1.fillStyle = getColor(colorNumber, colorNumber, colorNumber);
            canvas2d1.fillRect(i*3, y*3, 3, 3);
        }
    }
}

function drawCos(){
    for(let i = 0; i < 300; i++){
        for(let y = 0; y < 300; y++){
            let colorXNumber = (Math.cos(i * sinDensityX) * 0.5 +1) * 255;
            let colorYNumber = (Math.cos(y * sinDensityY) * 0.5 +1) * 255;
            let colorNumber = (colorXNumber + colorYNumber) / 2;
            canvas2d1.fillStyle = getColor(colorNumber, colorNumber, colorNumber);
            canvas2d1.fillRect(i*3, y*3, 3, 3);
        }
    }
}