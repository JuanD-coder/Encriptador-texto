const inputText = document.getElementById('encrypText');
const showText = document.getElementById('showText');
const textDeCode = document.getElementById('textDeCode');
const hiddenDiv = document.querySelector('.show-decode-text');
const btnCopy = document.getElementById('btn-copy');
const btnClean = document.getElementById('btn-clean');

const llaves = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}

async function copyText() {
    try {
        await navigator.clipboard.writeText(textDeCode.innerText);
        showToast("Texto copiado al portapapeles", "#4CAF50");
    } catch (error) {
        showToast("Error al copiar al portapapeles", "#f44336")
        console.error("Error al copiar al portapapeles:", error);
    }
}

function showToast(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 4000,
        gravity: "bottom",
        position: "right",
        style: {
            background: backgroundColor
        }
    }).showToast();
}

function encrypText() {
    let text = inputText.value

    if (hasSpecialCharacters(text)) {
        showToast("El texto contiene caracteres especiales. Por favor, elimínalos antes de continuar.", "#f44336");
        return;  
    }

    let charMinuscula = text.toLowerCase();
    let caracter = charMinuscula.split('');
    let encrypText = []

    caracter.forEach(element => {
        if (llaves[element]) {
            encrypText.push(llaves[element]);
        } else {
            encrypText.push(element.toString());
        }
    });

    showDeCode(encrypText.join(''));
}

function hasSpecialCharacters(text) {
    const specialCharsRegex = /[^\w\s]/;
    const accentedCharsRegex = /[\u00C0-\u00FF]/;
    return specialCharsRegex.test(text) || accentedCharsRegex.test(text);
}

function showDeCode(text) {
    textDeCode.style.display = 'block';
    textDeCode.textContent = text;
    inputText.value = '';
    hiddenDiv.style.display = 'none';
    btnCopy.style.display = 'block';
    btnClean.style.display = 'block';
}

function cleanText() {
    textDeCode.style.display = 'none';
    hiddenDiv.style.display = 'flex';
    btnCopy.style.display = 'none';
    btnClean.style.display = 'none';

}

function decodeText() {
    let textoEncriptado = inputText.value;
    for (let letter in llaves) {
        let deCode = llaves[letter];
        while (textoEncriptado.includes(deCode)) {
            textoEncriptado = textoEncriptado.replace(deCode, letter);
        }
    }

    showDeCode(textoEncriptado);
}