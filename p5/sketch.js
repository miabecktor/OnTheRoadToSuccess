
// function setup() {
//   var canvas = createCanvas(100, 100);
//   canvas.position(0,0);
//   canvas.style("z-index", "100");
//   canvas.style("border-radius", "10px");
//   canvas.style("box-shadow", "5px 5px 5px gray");
//   canvas.mouseOver(changeStyle);
//   canvas.mouseOut(revertStyle);
//   background(0);
//   canvas.parent("draggable146");
//   canvas.drop(gotFile);
// }
//
// function changeStyle(){
//   canvas.style("background-color", "purple");
//   canvas.style("height", "300px");
// }
//
//   function revertStyle(){
//     canvas.style("width", "100px");
//     canvas.style("height", "100px");
//   }
//
// function gotFile(file) {
//   // If it's an image file
//   if (file.type === 'image') {
//     // Create an image DOM element but don't show it
//     var img = createImg(file.data).hide();
//     // Draw the image onto the canvas
//     image(img, 0, 0, width, height);
//   } else {
//     println('Not an image file!');
//   }
// }
