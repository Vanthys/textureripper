const fs = require('fs')
const { loadImage, createCanvas } = require('canvas')

class ImageProcessor {

    constructor(params) {
      this._params = params;
      this._Init(params);
    }
  
    _Init(params) {
        const canvasorigin = createCanvas(15, 15);
        this.ctxi = canvasorigin.getContext("2d");
        loadImage('./test.png').then(image => {
            this.ctxi.drawImage(image, 0, 0);
            const buffer = canvasorigin.toBuffer('image/png');
            fs.writeFileSync('./outa.png', buffer);
            const canvasout = createCanvas(15, 15);
            this.ctxo = canvasout.getContext("2d");
            
            var points = [[0,0],[5,0],[5,5],[0,5]];
            var pixels = this.getPixelsInside(points, this.getBounds(points));
            pixels.forEach(element =>{
               var color = this.ctxi.getImageData(element[0], element[1], 1, 1).data;
               console.log(color);
               this.ctxo.fillStyle = "rgba(" + color[0]+ "," + color[1]+ "," + color[2] + "," + color[3] + ")";
               
               this.ctxo.fillRect(element[0], element[1], 1, 1);
            })
            
            const buffer1 = canvasout.toBuffer('image/png');
            fs.writeFileSync('./out.png', buffer1);
          });
        
       
    }
    


    
    //alle pixel in simplex finden
    getPixelsInside(points, bounds){
        var pixels = [];
        for(var x = bounds[0]; x <=bounds[2]; x++){
            for(var y = bounds[1]; y <= bounds[3]; y++){
              if(this.isInsideTriangle([x,y], [points[0],points[1], points[2]]) || this.isInsideTriangle([x,y], [points[0],points[2], points[3]])){
                
                pixels.push([x,y]);
              }
            }
        }
    
        return pixels;

    }
    
    

    

    //finds the outher points of the rectangle that needs to be copied
    //kinda shit
    getBounds(points){
        var bounds = [];
        bounds[0] = points[0][0];
        bounds[1] = points[0][1];
        bounds[2] = points[0][0];
        bounds[3] = points[0][1];
        points.forEach(element => {
            if (element[0] < bounds[0]) bounds[0] = element[0];
            if (element[1] < bounds[1]) bounds[1] = element[1];
            if (element[0] > bounds[2]) bounds[2] = element[0];
            if (element[1] > bounds[3]) bounds[3] = element[1];
        });
    
        return bounds

    }

    /*
    calculates if a given point is inside of a given triangle.
    TODO: fix floating point error /DID KINDA FIX IT)
    */
    isInsideTriangle(p,t){
        var a = t[0]
        var b = t[1]
        var c = t[2]
        
        var area2 = (a[0]*b[1] - a[0]*c[1] + b[0]*c[1] - b[0]*a[1] + c[0]*a[1] -c[0]*b[1]);
        //area2 = area2 < 0 ? -1*area2 : area2;
    
        var m1 = ((b[0] - p[0])*(c[1]-p[1])-(c[0]-p[0])*(b[1]-p[1]))/area2;
        var m2 = ((c[0] - p[0])*(a[1]-p[1])-(a[0]-p[0])*(c[1]-p[1]))/area2;
        var m3 = 1-(m1+m2);
        
        return (0 <= m1 && m1 <= 1) && (0 <= m2 && m2 <= 1) && (0 <= m3 && m3 <= 1);
    
    }

    createArray(x, y){
        var arr = new Array(x || 0);
        for(i = 0;i < x; i++){
            arr[i] = new Array(y);
        }
        return arr;
    }


}

im = new ImageProcessor();



