class Zerrpoint {
    x;
    y;
    coreRadius; 
    falloffRadius;
    connectedZerrPoints;
    
    constructor(x, y, cr, fr){
        this.x = x;
        this.y = y;
        this.coreRadius = cr;
        this.falloffRadius = fr;
        this.connectedZerrPoints = [];
    }

    connect(other){
        this.connectedZerrPoints.push(other);
    }
    

    resizeRadius(r){
        this.coreRadius = r;
        this.falloffRadius = 2*r;
    }
}