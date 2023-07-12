let zerrPoints = [];
let selected;

function drawZerrPoints(){
    if(image != null){
        let { drawWidth, drawHeight } = getAspectRatio();
        canvas2d2.drawImage(image, 0, 0, drawWidth, drawHeight);
    } else {
        canvas2d2.fillStyle = "#ffffff"
        canvas2d2.fillRect(0, 0, 700, 1000);
    }

    canvas2d1.lineWidth = 1;

    for(let z = 0; z < zerrPoints.length; z++){
        if(zerrPoints[z] === selected){
            canvas2d2.fillStyle = "#0000ffff"
        } else {
            canvas2d2.fillStyle = "#dd0000ff"
        }
        canvas2d2.fillRect(zerrPoints[z].x, zerrPoints[z].y, 7, 7);

        canvas2d2.fillStyle = "#aaaa0055"
        canvas2d2.beginPath();
        canvas2d2.arc(zerrPoints[z].x, zerrPoints[z].y, zerrPoints[z].coreRadius, 0, 2 * Math.PI);
        canvas2d2.fill();

        canvas2d2.fillStyle = "#aaaa0033"
        canvas2d2.beginPath();
        canvas2d2.arc(zerrPoints[z].x, zerrPoints[z].y, zerrPoints[z].falloffRadius, 0, 2 * Math.PI);
        canvas2d2.fill();

        for(let c = 0; c < zerrPoints[z].connectedZerrPoints.length; c++){
            let connected = zerrPoints[z].connectedZerrPoints[c];

            canvas2d2.beginPath();
            canvas2d2.moveTo(connected.x, connected.y);
            canvas2d2.lineTo(zerrPoints[z].x, zerrPoints[z].y);
            canvas2d2.stroke();
        }
    }
}

function toggleConnectionToSelected(x, y){
    let other;

    for(let z = 0; z < zerrPoints.length; z++){
        if(distance(zerrPoints[z].x, zerrPoints[z].y, x, y) <= 10){
            other = zerrPoints[z];
            break;
        }
    }

    if(other == null){
        return false;
    }

    for(let c = 0; c < selected.connectedZerrPoints.length; c++){
        if(selected.connectedZerrPoints[c] == other){
            selected.connectedZerrPoints.splice(c, 1);
        }
    }
    selected.connectedZerrPoints.push(other);
    return true;
}

function changeSelectedRadius(delta){
    if(selected == null){
        return;
    }
    selected.resizeRadius(selected.coreRadius + delta);
}

function addZerrPoint(x, y){
    let newZP = new Zerrpoint(x, y, 50, 100);
    zerrPoints.push(newZP);
}

function selectZerrPointAt(x, y){
    for(let z = 0; z < zerrPoints.length; z++){
        if(distance(zerrPoints[z].x, zerrPoints[z].y, x, y) <= 10){
            selected = zerrPoints[z];
            console.log(selected);
            return selected;
        }
    }
}

function removeZerrPointsAt(x, y){
    for(let z = 0; z < zerrPoints.length; z++){
        if(distance(zerrPoints[z].x, zerrPoints[z].y, x, y) <= 10){
            zerrPoints.splice(z, 1);
        }
    }
}

function deleteSelectedZerrpoint(){
    for(let z = 0; z < zerrPoints.length; z++){
        if(zerrPoints[z] == selected){
            zerrPoints.splice(z, 1);
            drawZerrPoints();
            return selected;
        }
    }
}