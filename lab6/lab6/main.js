let p, q, n, fN, e, d;
let message = "Talko Yaroslav Serhiyovych"; // message < n
let encodeMessageDecimal = [], decodeMessageDecimal = [];
let encodeMessage = [], decodeMessage = "";

generateNNumber();
fN = (q - 1) * (p - 1);
e = generateENumber();
d = generateDNumber();
transformToDecimal();
encodeRsa();
decodeRsa();
transformToSymbol();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "q = " + q + "<br>" +
    "n = " + n + "<br>" +
    "fN = " + fN + "<br>" +
    "e = " + e + "<br>" +
    "d = " + d + "<br>" +
    "message = " + message + "<br>" +
    "encodeMessageDecimal = " + encodeMessageDecimal + "<br>" +
    "encodeMessage = " + encodeMessage + "<br>" +
    "decodeMessageDecimal = " + decodeMessageDecimal + "<br>" +
    "decodeMessage = " + decodeMessage + "<br>";

function generatePrimeNumber() {
    let checkNum, num;
    do {
        num = generateRandomInt(100);
        checkNum = num > 1 ? verifyMultiple(num) : false;
    } while (!checkNum)
    return num;
}

function generateNNumber() {
    do {
        p = generatePrimeNumber();
        q = generatePrimeNumber();
        n = q * p;
    } while (n < 128)
}

function generateENumber() {
    let checkNum, num;
    do {
        num = generatePrimeNumber();
        checkNum = getGreatestCommonDivisor(num, fN) === 1 && num < fN && num > 1;
    } while (!checkNum)
    return num;
}

function generateDNumber() {
    let num, i = 0;
    do {
        num = ((i + 1) * fN + 1) / e;
        i++;
    } while (!Number.isInteger(num));
    return num;
}

function encodeRsa() {
    for (let i = 0; i < encodeMessageDecimal.length; i++) {
        encodeMessage.push(BigInt(encodeMessageDecimal[i]) ** BigInt(e) % BigInt(n));
    }
}

function decodeRsa() {
    for (let i = 0; i < encodeMessage.length; i++) {
        decodeMessageDecimal.push(BigInt(encodeMessage[i]) ** BigInt(d) % BigInt(n));
    }
}

function transformToDecimal() {
    for (let i = 0; i < message.length; i++) {
        encodeMessageDecimal.push(message[i].charCodeAt(0));
    }
}

function transformToSymbol() {
    for (let i = 0; i < decodeMessageDecimal.length; i++) {
        decodeMessage += String.fromCharCode(Number(decodeMessageDecimal[i]));
    }
}

function verifyMultiple(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function getGreatestCommonDivisor(num1, num2) {
    if (num2 === 0) {
        return num1;
    }
    return getGreatestCommonDivisor(num2, num1 % num2);
}

function generateRandomInt(max) {
    return Math.floor(Math.random() * max);
}