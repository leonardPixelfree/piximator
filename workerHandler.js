const workerCode = `
  self.onmessage = function(event) {
    const { pixelDatas} = event.data;
    self.postMessage({ pixelDatas});
  };
`;

//draws the given pixels using a webWorker
function drawPixels(pds){
    const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
    const workerURL = URL.createObjectURL(workerBlob);

    const worker = new Worker(workerURL);

    // Listen for messages from the web worker
    worker.onmessage = function(event) {
    const {pixelDatas} = event.data;

    for(let i = 0; i < pixelDatas.length; i++){
        let pixelData = pixelDatas[i];
        
        // Draw the rectangle on the canvas
        canvas2d3.fillStyle = pixelData.color;
        canvas2d3.fillRect(pixelData.x, pixelData.y, pixelData.width, pixelData.height);
        };
    }

    // Start the web worker to draw the rectangle
    worker.postMessage({ pixelDatas:pds});
}

function webWorkerTest(){
    canvas2d1.fillStyle = "#ffffff"
    canvas2d1.fillRect(0, 0, 1000, 1000);

    const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
    const workerURL = URL.createObjectURL(workerBlob);

    const worker = new Worker(workerURL);

    // Listen for messages from the web worker
    worker.onmessage = function(event) {
    const {pixelDatas} = event.data;

    for(let i = 0; i < pixelDatas.length; i++){
        let pixelData = pixelDatas[i];
        
        // Draw the rectangle on the canvas
        canvas2d1.fillStyle = pixelData.color;
        canvas2d1.fillRect(pixelData.x, pixelData.y, pixelData.width, pixelData.height);
        };
    }

    let pds = [];
    for(let i = 0; i < 100; i++){
        let pd = new PixelData(i*5, 50, 5, 5, getColor(0, (i*5)%255, (i*3)%255));
        pds.push(pd);
    }

    // Start the web worker to draw the rectangle
    worker.postMessage({ pixelDatas:pds});
}