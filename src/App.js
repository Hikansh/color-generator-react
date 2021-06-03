import { useEffect, useRef } from 'react';

function App() {
  // Two canvas for showing colors
  const canvasOne = useRef(null);
  const canvasTwo = useRef(null);
  // Storing all the colors
  let colors = [];

  // Method to plot the image by picking random colors from the array and plotting them
  const drawRandom = colors => {
    let colorsNew = [...colors];
    var ctx = canvasOne.current.getContext('2d');
    for (let i = 0; i < 256; i++) {
      for (let j = 0; j < 128; j++) {
        ctx.beginPath();
        let color = colorsNew.splice(
          Math.floor(Math.random() * colorsNew.length),
          1
        );
        ctx.fillStyle = color;
        ctx.arc(i, j, 1, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  };

  // Method to plot the image by picking colors in a sequence (0 to length of colors array)
  const drawSequential = () => {
    var ctx = canvasTwo.current.getContext('2d');
    let k = 0;
    for (let i = 0; i < 256; i++) {
      for (let j = 0; j < 128; j++) {
        ctx.beginPath();
        ctx.fillStyle = colors[k];
        ctx.arc(i, j, 1, 0, Math.PI * 2, true);
        ctx.fill();
        k++;
      }
    }
  };

  useEffect(() => {
    // Get all the possible colors and store them in an array as the page loads
    let red, green, blue;
    let startTime = new Date().getTime();
    for (red = 0; red <= 255; red += 8) {
      for (green = 0; green <= 255; green += 8) {
        for (blue = 0; blue <= 255; blue += 8) {
          colors.push(`rgb(${red},${green},${blue})`);
        }
      }
    }
    let endTime = new Date().getTime();
    // Showing the time (approx only 20 milli-seconds to run the algo and 10 ms to plot both the canvas)
    console.log('Time taken: ' + (endTime - startTime) + ' ms');
    drawSequential();
    drawRandom(colors);
  });
  return (
    <div className="App">
      <h1>Color Generator</h1>
      <div>
        <p>Colors generated in a random order:</p>
        <br />
        <canvas ref={canvasOne}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <p>Colors generated Sequentially:</p>
        <br />
        <canvas ref={canvasTwo}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
    </div>
  );
}

export default App;
