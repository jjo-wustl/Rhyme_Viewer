// script.js

document.getElementById('generate-button').addEventListener('click', function() {
    var inputText = document.getElementById('input-text').value;
    var coloredOutput = colorizeText(inputText);
    var outputWithLineBreaks = addLineBreaks(coloredOutput);
    document.getElementById('output-text').innerHTML = outputWithLineBreaks;
});

document.getElementById('save-text-button').addEventListener('click', function() {
    var outputText = document.getElementById('output-text').innerText; // Use innerText to get text without HTML
    var filename = window.prompt("텍스트 문서의 파일 이름을 입력하세요:", "output.txt");
    if (filename) { // If a filename was entered, proceed with the download
        saveTextAsFile(outputText, filename);
    }
});

function colorizeText(input) {
    // Map of vowels to colors
    var colorMap = {
        'ㅏ': 'green', 'ㅑ': 'green', 'ㅘ': 'green',
        'ㅔ': '#FF0000', 'ㅖ': '#FF0000', 'ㅐ': '#FF0000', 'ㅒ': '#FF0000', 'ㅙ': '#FF0000', 'ㅞ': '#FF0000',
        'ㅣ': '#FFFF00', 'ㅟ': '#FFFF00',
        'ㅗ': '#0000FF', 'ㅛ': '#0000FF', 'ㅓ': '#0000FF', 'ㅕ': '#0000FF', 'ㅝ': '#0000FF',
        'ㅜ': '#800080', 'ㅠ': '#800080', 'ㅡ': '#800080'
    };

    // Additional complex vowel colors
    const complexVowelColors = {
        'ㅗㅣ': '#FF0000', // Red for 'ㅚ'
        'ㅡㅣ': '#ff9100'  // Orange for 'ㅢ'
    };

    var coloredText = '';
    for (var i = 0; i < input.length; i++) {
        var currentChar = input[i];
        if (Hangul.isComplete(currentChar)) { // Check if the character is a complete Hangul syllable
            var decomposed = Hangul.disassemble(currentChar);
            var color = 'transparent'; // Default color
            var textColor = ''; // Default text color

            // First, check for specific complex vowel combinations
            var combination = decomposed.slice(1, 3).join('');
            if (complexVowelColors[combination]) {
                color = complexVowelColors[combination];
            } else {
                // Then check other components if no complex vowel match
                decomposed.forEach(function(charComponent) {
                    if (colorMap[charComponent]) {
                        color = colorMap[charComponent];
                        // Set text color to black if the vowel is 'ㅣ' or 'ㅟ'
                        if (charComponent === 'ㅣ' || charComponent === 'ㅟ') {
                            textColor = 'color: black;';
                        }
                    }
                });
            }

            coloredText += `<span style="background-color:${color};${textColor}">${currentChar}</span>`;
        } else {
            // Non-Hangul characters are not colored
            coloredText += currentChar;
        }
    }
    return coloredText;
}

function addLineBreaks(htmlString) {
    // Replace newline characters with HTML line break
    return htmlString.replace(/\n/g, '<br>');
}

function saveTextAsFile(text, filename) {
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    if(window.navigator.msSaveOrOpenBlob) {
        // For IE10+
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // For other browsers
        var a = document.createElement("a"),
            url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}