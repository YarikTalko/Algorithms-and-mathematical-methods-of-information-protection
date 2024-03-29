let s = exchangeKeyByDiffieHellman();

let fullNamePlusByFather = "Talko Yaroslav Serhiyovych";

let encodeMessage = gammaEncoding(fullNamePlusByFather, s)

let asciiEncodeMessage = binaryToAscii(encodeMessage);

let decodeMessage = gammaEncoding(asciiEncodeMessage, s);

let asciiDecodeMessage = binaryToAscii(decodeMessage);

document.getElementById("outputResult").innerHTML =
    "message = " + fullNamePlusByFather + "<br>" +
    "binaryMessage = " + textToBinary(fullNamePlusByFather) + "<br>" +
    "key = " + textToBinary(s.toString()) + "<br>" +
    "eMessage = " + encodeMessage + "<br>" +
    "asciiEncodeMessage = " + asciiEncodeMessage + "<br>" +
    "decodeMessage = " + decodeMessage + "<br>" +
    "asciiDecodeMessage = " + asciiDecodeMessage + "<br>";

function exchangeKeyByDiffieHellman() {
    const g = 8;
    const p = 29;

    let xA = getRandomInt(p);
    let yA = getRandomInt(p);

    let a = (g ** xA) % p;
    let b = (g ** yA) % p;

    let sA = (BigInt(b) ** BigInt(xA)) % BigInt(p);
    let sB = (BigInt(a) ** BigInt(yA)) % BigInt(p);

    document.getElementById("outputKey").innerHTML = "key = " + sA;

    return sA === sB ? Number(sA) : "Помилка";
}

function getRandomInt(max) {
    let random = Math.floor(Math.random() * max)
    if (random === 0) {
        return random + 1;
    } else {
        return random;
    }
}

function gammaEncoding(message, key) {
    let binaryMessage = textToBinary(message);
    let binaryKey = textToBinary(key.toString());
    return exclusiveOr(binaryMessage, binaryKey);
}

function textToBinary(message) {
    let binaryMessage = "";
    let binarySymbol = "";

    for (let i = 0; i < message.length; i++) {
        binarySymbol = transformToEightBitBinary(message[i].charCodeAt(0).toString(2));
        binaryMessage += binarySymbol;
    }

    return binaryMessage;
}

function transformToEightBitBinary(binarySymbol) {
    const symbolBitLength = 8;
    let realBinarySymbolLength = binarySymbol.length;
    for (let j = 0; j < symbolBitLength - realBinarySymbolLength; j++) {
        binarySymbol = "0" + binarySymbol;
    }
    return binarySymbol;
}

function exclusiveOr(message, key) {
    const symbolBitLength = 8;
    let keyElementsCounter = 0;
    let resultMessage = "";
    for (let i = 0; i < message.length / 8; i++) {
        for (let j = i * 8, k = 0; k < symbolBitLength; j++, k++, keyElementsCounter++) {
            if (message[j] === key[keyElementsCounter]) {
                resultMessage += "0";
            } else {
                resultMessage += "1";
            }
            if (keyElementsCounter === key.length - 1) {
                keyElementsCounter = -1;
            }
        }
    }
    return resultMessage;
}

function binaryToAscii(binary) {
    let result = "";
    let saveBinary = "";
    for (let i = 0; i < binary.length; i++) {
        saveBinary += binary[i];
        if ((i + 1) % 8 === 0) {
            result += String.fromCharCode(parseInt(saveBinary, 2));
            saveBinary = "";
        }
    }
    return result;
}