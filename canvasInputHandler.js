
function canvasClicked(event){
    let rect = canvas2.getBoundingClientRect();
    let posX = event.x - rect.left;
    let posY = event.y - rect.top;

    ///////////why do we need this???
    posX *= 1.47;
    posY *= 1.47;

    if(event.button === 0){
        if(!toggleConnectionToSelected(posX, posY)){
            addZerrPoint(posX, posY);
        }
    } else if (event.button === 2){
        selectZerrPointAt(posX, posY);
    }

    drawZerrPoints();
}

function canvasScrolled(event){
    changeSelectedRadius(event.wheelDelta / 70);
    drawZerrPoints();
}