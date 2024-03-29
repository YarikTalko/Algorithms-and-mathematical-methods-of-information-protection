const alphabet = [
    [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', " "
    ],
    [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
];

let g = 8;
let p = 29;

let a, h, r, c1 = [], c2 = [];

let message = "Talko Yaroslav Serhiyovych", decodeMessage = "";
let numbersMessage = [], decodeNumbersMessage = [];

transformMessageToNumbers();
elGamalKeys();
elGamalEncrypt();
elGamalDecrypt();
transformNumbersToMessage();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "g = " + g + "<br>" +
    "a = " + a + "<br>" +
    "h = " + h + "<br>" +
    "message = " + message + "<br>" +
    "numbersMessage = " + numbersMessage + "<br>" +
    "r = " + r + "<br>" +
    "c1 = " + c1 + "<br>" +
    "c2 = " + c2 + "<br>" +
    "decodeMessage = " + decodeMessage + "<br>";

function transformMessageToNumbers() {
    for (let i = 0; i < message.length; i++) {
        let alphabetNumber;
        let wantedElementIndex = (element) => element === message[i];
        if ((message[i] >= "A" && message[i] <= "Z") || message[i] === " ") {
            alphabetNumber = "0";
        } else if (message[i] >= "a" && message[i] <= "z") {
            alphabetNumber = "1";
        }
        numbersMessage.push(alphabetNumber);
        numbersMessage.push(alphabet[alphabetNumber].findIndex(wantedElementIndex));
    }
}

function transformNumbersToMessage() {
    let alphabetNumber = "";
    for (let i = 0; i < decodeNumbersMessage.length; i++) {
        if ((i % 2 === 0)) {
            if (Number(decodeNumbersMessage[i]) === 0) {
                alphabetNumber = 0;
            } else {
                alphabetNumber = 1;
            }
        }
        else {
            decodeMessage += alphabet[alphabetNumber][decodeNumbersMessage[i]]
        }
    }
}

function elGamalKeys() {
    a = getRandomInt(p - 2);
    h = BigInt(g) ** BigInt(a) % BigInt(p);
}

function elGamalEncrypt() {
    for (let i = 0; i < numbersMessage.length; i++) {
        r = getRandomInt(p - 1);
        c1.push(BigInt(g) ** BigInt(r) % BigInt(p));
        c2.push(BigInt(numbersMessage[i]) * BigInt(h) ** BigInt(r) % BigInt(p));
    }
}

function elGamalDecrypt() {
    p = BigInt(p);
    a = BigInt(a);

    for (let i = 0; i < numbersMessage.length; i++) {
        decodeNumbersMessage.push(c2[i] * (c1[i] ** (p - 1n - a) % p) % p);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}