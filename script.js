// script.js
// Ensure the Hangul object is defined, you have included the hangul-js library in your HTML

document.getElementById('generate-button').addEventListener('click', function() {
    var inputText = document.getElementById('input-text').value;
    var coloredOutput = colorizeText(inputText);
    document.getElementById('output-text').innerHTML = coloredOutput;
});

function colorizeText(input) {
    // Map of vowels to colors
    var colorMap = {
        'ㅏ': 'green', 'ㅑ': 'green', 'ㅘ': 'green',
        'ㅔ': '#FF0000', 'ㅖ': '#FF0000', 'ㅐ': '#FF0000', 'ㅒ': '#FF0000', 'ㅙ': '#FF0000', 'ㅞ': '#FF0000', 'ㅚ': '#FF0000',
        'ㅢ': '#FF7F00',
        'ㅣ': '#FFFF00', 'ㅟ': '#FFFF00',
        'ㅗ': '#0000FF', 'ㅛ': '#0000FF', 'ㅓ': '#0000FF', 'ㅕ': '#0000FF', 'ㅝ': '#0000FF',
        'ㅜ': '#800080', 'ㅠ': '#800080', 'ㅡ': '#800080'
    };

    var coloredText = '';
    for (var i = 0; i < input.length; i++) {
        var currentChar = input[i];
        if (Hangul.isComplete(currentChar)) { // Check if the character is a complete Hangul syllable
            var decomposed = Hangul.disassemble(currentChar);
            var color = 'transparent'; // Default color

            // Find the vowel component
            decomposed.forEach(function(charComponent) {
                if (colorMap[charComponent]) {
                    color = colorMap[charComponent];
                }
            });

            coloredText += `<span style="background-color:${color};">${currentChar}</span>`;
        } else {
            // Non-Hangul characters are not colored
            coloredText += currentChar;
        }
    }
    return coloredText;
}
