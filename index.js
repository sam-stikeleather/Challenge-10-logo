
const fs = require('fs');
const inquirer = require('inquirer');

function generateLogo(answers) {
    const {text, textColor, shape, shapeColor} = answers;
    const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
      <!-- Inserting the text for the logo with specified text color -->
      <text x="100" y="100" fill="${textColor}" font-size="30">${text}</text>
      <!-- Generating the shape markup based on the selected shape and shape color -->
      ${generateShapeMarkup(shape, shapeColor)}
    </svg>
    `;
    
    fs.writeFileSync('logo.svg', svgMarkup);

    console.log("Generated logo.svg");
}

