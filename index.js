
const fs = require('fs');
const inquirer = require('inquirer');

async function generateLogo(answers = null) {
    let finalAnswers = answers;

  if (!answers) {
    // If answers parameter is not provided, then prompt the user for input
    finalAnswers = await inquirer.prompt(questions);
  }
    const { text, textColor, shape, shapeColor } = answers;
    let textX, textY;
  
    // Determine the position of the text based on the shape
    if (shape === "circle") {
      textX = 200; // x-coordinate for circle center
      textY = 100; // y-coordinate for circle center
    } else if (shape === "triangle") {
      textX = 200; // x-coordinate for triangle center
      textY = 120; // y-coordinate for triangle center
    } else if (shape === "square") {
      textX = 200; // x-coordinate for square center
      textY = 100; // y-coordinate for square center
    }
  
    // Generating the SVG markup
    let svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
    ${generateShapeMarkup(shape, shapeColor)}
    <text x="${textX}" y="${textY}" fill="${textColor}" font-size="30" text-anchor="middle" alignment-baseline="middle">${text}</text>
  </svg>
  `;
  
    // Save the SVG to a file
    fs.writeFileSync('logo.svg', svgMarkup);
  
    console.log("Generated logo.svg");
  }

function generateShapeMarkup(shape, shapeColor) {
    if (shape === "circle") {
      return `<circle cx="200" cy="100" r="40" fill="${shapeColor}" />`;
    } else if (shape === "triangle") {
      return `<polygon points="160,160 240,160 200,50" fill="${shapeColor}" />`;
    } else if (shape === "square") {
      return `<rect x="160" y="60" width="80" height="80" fill="${shapeColor}" />`;
    }
  }

  const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => {
        return input.length > 0 && input.length <= 3 ? true : 'Please enter up to three characters.';
      }
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (color keyword or hexadecimal number):',
      default: 'black'
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (color keyword or hexadecimal number):',
      default: 'blue'
    }
  ];

  module.exports = {generateLogo};
  
  inquirer.prompt(questions)
    .then(generateLogo)
    .catch(error => console.error(error));