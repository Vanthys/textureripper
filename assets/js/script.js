class Vector2{
    constructor(x, y) {
        this.x = x;
        this.y = y;
      }


function run(){
    document.addEventListener("click", createDiv);
}

function createDiv(event){
    console.log("test run");
    var img = document.createElement("img");
    var element = document.createElement("div");
    var canvas = document.getElementById("canvas");
    img.src = "assets/circle.png"
    element.style.position = "absolute";
    element.style.left =  event.clientX+'px';
    element.style.top =  event.clientY+'px';

    //TODO addd on Drag functionality
    element.appendChild(img);
    canvas.appendChild(element);
    return element;
}


function submit(){
    var p1, p2, p3, p4;
    //TODO: create two triangles (1,2,3; 2,3,4)get pixels inside of triangles and render to new texture via canvas
} 