// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;  
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global vars
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }

}

// Triangles for angy kitty
let t1 = [0.0, 0.3, -0.1, 0.15, 0.1, 0.15,
  0.0, 0.3, -0.1, 0.15, -0.2, 0.2,
  0.0, 0.3, 0.1, 0.15, 0.2, 0.2,
  0.0, 0.3, -0.2, 0.2, -0.3, 0.3,
  0.0, 0.3, -0.3, 0.3, -0.3, 0.45,
  -0.2, 0.4, -0.3, 0.45, -0.2, 0.5,
  0.0, 0.3, -0.2, 0.4, -0.1, 0.4,
  0.0, 0.3, 0.2, 0.2, 0.3, 0.3,
  0.0, 0.3, 0.3, 0.3, 0.3, 0.45,
  0.2, 0.4, 0.3, 0.45, 0.2, 0.5,
  0.0, 0.3, 0.2, 0.4, 0.1, 0.4,
  -0.3, 0.45, -0.3, 0.6, -0.1, 0.6,
  0.3, 0.45, 0.3, 0.6, 0.1, 0.6,
  -0.3, 0.6, -0.3, 0.7, -0.2, 0.6,
  0.3, 0.6, 0.3, 0.7, 0.2, 0.6, // 15 triangles
  0.0, 0.35, -0.1, 0.6, 0.1, 0.6,
  0.0, 0.35, -0.2, 0.5, -0.1, 0.6,
  0.0, 0.35, 0.2, 0.5, 0.1, 0.6,
  0.0, 0.35, -0.1, 0.4, -0.2, 0.5,
  0.0, 0.35, 0.1, 0.4, 0.2, 0.5, // 20 triangles
  0.0, 0.35, -0.05, 0.35, -0.1, 0.4,
  0.0, 0.35, 0.05, 0.35, 0.1, 0.4, // 22
  -0.2, 0.2, 0.0, -0.3, 0.2, 0.2,
  -0.2, 0.2, -0.2, -0.3, 0.0, -0.3,
  0.2, 0.2, 0.2, -0.3, 0.0, -0.3, // 25
  -0.2, -0.3, -0.2, -0.4, 0.0, -0.3,
  0.2, -0.3, 0.2, -0.4, 0.0, -0.3,
  -0.2, -0.4, -0.15, -0.6, 0.0, -0.3,
  0.2, -0.4, 0.15, -0.6, 0.0, -0.3, // 29
  -0.2, -0.1, -0.4, -0.3, -0.2, -0.3,
  0.2, -0.1, 0.4, -0.3, 0.2, -0.3,
  -0.4, -0.3, -0.2, -0.3, -0.15, -0.5,
  0.4, -0.3, 0.2, -0.3, 0.15, -0.5,
  -0.4, -0.3, -0.4, -0.5, -0.15, -0.5,
  0.4, -0.3, 0.4, -0.5, 0.15, -0.5, //35
  -0.35, -0.5, -0.25, -0.5, -0.25, -0.55,
  0.35, -0.5, 0.25, -0.5, 0.25, -0.55, // 37
  -0.35, -0.5, -0.35, -0.55, -0.25, -0.55,
  0.35, -0.5, 0.35, -0.55, 0.25, -0.55,
  0.2, -0.1, 0.25, -0.15, 0.7, 0.3,
  0.2, -0.1, 0.6, 0.3, 0.7, 0.3, //41
  0.6, 0.3, 0.6, 0.5, 0.7, 0.3,
  0.7, 0.3, 0.7, 0.5, 0.6, 0.5,
  0.6, 0.5, 0.7, 0.5, 0.6, 0.6,
  0.6, 0.5, 0.6, 0.6, 0.5, 0.55,
  0.5, 0.55, 0.4, 0.6, 0.6, 0.6, //46
  0.4, 0.5, 0.4, 0.6, 0.5, 0.55,
  0.4, 0.5, 0.4, 0.6, 0.35, 0.5,
  0.35, 0.4, 0.35, 0.5, 0.4, 0.5,
  0.35, 0.4, 0.4, 0.5, 0.4, 0.35,
  0.4, 0.35, 0.4, 0.5, 0.5, 0.35,
  0.5, 0.45, 0.4, 0.5, 0.5, 0.35 //52 total triangles
];

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const PIC = 3;

// Globals for UI
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
//let g_opacity = g_selectedColor
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_segment = 3;


function addActionForHtmlUI() {
  // Button Events (Shape Type)
  document.getElementById('clearButton').onclick = function () { g_shapesList = []; gl.clear(gl.COLOR_BUFFER_BIT); };
  document.getElementById('point').onclick = function () { g_selectedType = POINT };
  document.getElementById('triangle').onclick = function () { g_selectedType = TRIANGLE };
  document.getElementById('circle').onclick = function () { g_selectedType = CIRCLE };
  document.getElementById('pic').onclick = function () { drawPic(t1) };

  // Slider Events
  document.getElementById('redSlide').addEventListener('mouseup', function () { g_selectedColor[0] = this.value / 100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function () { g_selectedColor[1] = this.value / 100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function () { g_selectedColor[2] = this.value / 100; });
  document.getElementById('opacity').addEventListener('mouseup', function () { g_selectedColor[3] = this.value / 100;});


  // Size Slider Events
  document.getElementById('sizeSlide').addEventListener('mouseup', function () { g_selectedSize = this.value; });
  document.getElementById('segments').addEventListener('mouseup', function () { g_segment = this.value; });

}


function main() {
  setupWebGL();

  connectVariablesToGLSL();

  addActionForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function (ev) { if (ev.buttons == 1) { click(ev) } };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = [];

function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  let [x, y] = convertCoordinatesEventToGL(ev);

  // Create and store the new point
  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
    point.segments = g_segment;
  }
  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();

}

// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return ([x, y]);
}

// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;
  for (var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }
}

function drawPic(vertices) {

  var n = 156; // The number of vertices
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }


  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}


