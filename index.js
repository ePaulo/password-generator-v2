/* ****************************************
Course: Scrimba Frontend Developer Bootcamp 
Module: 3 
Project: Password Generator
Version: 2
Note: resubmitted after review feedback
Programmer: Paul O
Location: Vancouver, Canada
Date: August 7, 2022
***************************************** */

// prettier-ignore
const alphaChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

// prettier-ignore
const specialChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]

const numericChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// DOM elements: options for length and type of characters used for passwords.
const passwordLength = document.getElementById('select-password-length')
const addSpecialChars = document.getElementById('add-special-chars')
const addDigits = document.getElementById('add-digits')

// DOM elements: clickable generate-password button and two generated-passwords.
// The generated-passwords are buttons that can be clicked to copy to clipboard.
const passwordGeneratorBtn = document.getElementById('generate-password-btn')
const passwordChoiceBtn1 = document.getElementById('password-choice-1')
const passwordChoiceBtn2 = document.getElementById('password-choice-2')

// Function: display two passwords based on array of potential password characters.
function generatePasswords() {
  const potentialPasswordChars = generatePotentialPasswordChars()
  passwordChoiceBtn1.textContent = generatePassword(potentialPasswordChars)
  passwordChoiceBtn2.textContent = generatePassword(potentialPasswordChars)
}

// Function: create array of potential characters based on chosen options.
// The basic character selection includes only upper/lowercase characters.
function generatePotentialPasswordChars() {
  let potentialChars = [...alphaChars]
  if (addSpecialChars.checked) {
    potentialChars = [...potentialChars, ...specialChars]
  }
  if (addDigits.checked) {
    potentialChars = [...potentialChars, ...numericChars]
  }
  return potentialChars
}

// Function: generate a password string, where each character
// is randomly selected from an array of potential characters.
function generatePassword(potentialChars) {
  let password = []
  for (let i = 0; i < passwordLength.value; i++) {
    let randomIndex = Math.floor(Math.random() * potentialChars.length)
    password.push(potentialChars[randomIndex])
  }
  return password.join('')
}

// Function: copy password to clipboard and display success message.
// WARNING: tested correctly in browsers but blocked by scrim security.
function copyPasswordToClipboard(password) {
  navigator.clipboard.writeText(password).then(
    function () {
      alert('Success, password copied to clipboard')
    },
    function () {
      alert('Failed, password not copied to clipboard')
    }
  )
}

// Function: limit option for password length to between 8-20 characters.
// Added to adjust keyboard input for numbers outside the expected range.
function limiter(input) {
  if (input.value < 8) input.value = 8
  if (input.value > 20) input.value = 20
}

// Initialize HTML display with passwords based on default settings
generatePasswords()

// Responsive code: a "click" event listener for each button
passwordGeneratorBtn.addEventListener('click', generatePasswords)
passwordChoiceBtn1.addEventListener('click', function () {
  copyPasswordToClipboard(passwordChoiceBtn1.textContent)
})
passwordChoiceBtn2.addEventListener('click', function () {
  copyPasswordToClipboard(passwordChoiceBtn2.textContent)
})
