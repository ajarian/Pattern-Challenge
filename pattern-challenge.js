/* Ensure we only have positive integers as input */
function checkValidInput(value) {
	if (value.length === 0) {
		return false;
	} else {
		const charArray = value.split('');
		let validInput = true;

		charArray.forEach((character) => {
			asciiValue = character.charCodeAt(0);

			if (asciiValue < 48 || asciiValue > 56) {
				validInput = false;
			}
		});

		return validInput;
	}
}

function determinePatternStrings(stoppingPoint) {
	let currentStep = 0,
		patternString = '',
		patternStringArray = [];

	while (currentStep <= stoppingPoint) {
		// 0th step is always 1
		if (currentStep === 0) {
			patternString = '1';
		} else {
			// Break down the output string into individual digits to describe
			patternStringArray = patternString.split('');

			const arrayLength = patternStringArray.length;
			let newString = '',
				count = 0,
				currentNumber = '';

			patternStringArray.forEach((digit, index) => {
				if (index === 0) {
					currentNumber = digit;
					count++;
				} else {
					// After first digit in array, compare new digit to stored number
					// Increment count if same
					// If different, add stored count and number to string, and reset count
					if (currentNumber === digit) {
						count++;
					} else {
						newString += `${count}${currentNumber}`;
						count = 1;
						currentNumber = digit;
					}
				}

				// On the last digit in array, always need to add
				// the count and current number to new string after the above checks
				if (index === arrayLength - 1) {
					newString += `${count}${currentNumber}`;
				}
			});

			// Set new value of string after traversing the array
			patternString = newString;
		}

		printPattern(currentStep, patternString);
		currentStep++;
	}
}

/* Clear text area and pass input to main function */
function onClick() {
	document.getElementById('text-area').value = '';
	const stoppingPoint = document.getElementById('pattern-input').value;
	this.patternProducer(stoppingPoint);
}

/* Main function */
function patternProducer(stoppingPoint) {
	if (!checkValidInput(stoppingPoint)) {
		printInputError();
	} else {
		this.determinePatternStrings(stoppingPoint);
	}
}

function printInputError() {
	document.getElementById('text-area').value =
		'Please enter an integer. 0 or greater is valid.';
}

function printPattern(step, patternString) {
	const result = `step: ${step} || pattern: ${patternString} \n`;
	const textArea = document.getElementById('text-area');

	if (textArea.value.length >= 1) {
		textArea.value += result;
	} else {
		textArea.value = result;
	}
}

/* Ensure fields are cleared on load or refresh */
window.onload = () => {
	document.getElementById('pattern-input').value = '';
	document.getElementById('text-area').value = '';
};
