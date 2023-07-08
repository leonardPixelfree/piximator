

function getColor(r, g, b){
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    let rString = r.toString(16);
    if(r < 16){
        rString = "0" + rString;
    }

    let bString = b.toString(16);
    if(b < 16){
        bString = "0" + bString;
    }

    let gString = g.toString(16);
    if(g < 16){
        gString = "0" + gString;
    }

    return "#" + rString + bString + gString;
}

function distance(x1, y1, x2, y2){
    let xDiff = Math.abs(x1-x2);
    let yDiff = Math.abs(y1-y2);
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}