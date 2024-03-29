Number.prototype.mod = function (a) {
    return ((this % a) + a) % a;
}

let p = generatePrimeNumber();
let g = generateGNumber();
let d = generateDNumber();
let e = BigInt(g) ** BigInt(d) % BigInt(p);
let message = "4849";
let messageDecimal = hexToDecimal();
let mH = hashMessage();
let k = generateKNumber();
let y1 = Number(BigInt(g) ** BigInt(k) % BigInt(p));
let kMinusOne = generateKMinusOneNumber()
let y2 = generateY2Number();
let v1 = generateV1Number();
let v2 = generateV2Number();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "g = " + g + "<br>" +
    "d = " + d + "<br>" +
    "e = " + e + "<br>" +
    "message = " + message + "<br>" +
    "messageDecimal = " + messageDecimal + "<br>" +
    "mH = " + mH + "<br>" +
    "k = " + k + "<br>" +
    "y1 = " + y1 + "<br>" +
    "kMinusOne = " + kMinusOne + "<br>" +
    "y2 = " + y2 + "<br>" +
    "v1 = " + v1 + "<br>" +
    "v2 = " + v2 + "<br>";

function findPrimitiveRoots() {
    let fP = p - 1;
    let fPUpdate = fP;
    let primeFactors = [];
    let n = [];
    let a = [];
    let saveNumbers = [];
    for (let i = 2; fPUpdate > 1; i++) {
        if (fPUpdate % i === 0) {
            primeFactors.push(i);
            fPUpdate = fPUpdate / i;
            i = 1;
        }
    }
    for (let i = 0; i < primeFactors.length; i++) {
        n.push(fP / primeFactors[i]);
    }
    n = removeDuplicates(n);
    for (let i = 1; i < fP; i++) {
        for (let j = 0; j < n.length; j++) {
            if (BigInt(i) ** BigInt(n[j]) % BigInt(p) === 1n) {
                break;
            }
            saveNumbers.push(i);
        }
        if (saveNumbers.length === n.length) {
            a.push(saveNumbers[0]);
        }
        saveNumbers = [];
    }
    return a;
}

function generateGNumber() {
    let num;
    let primitiveRoots = findPrimitiveRoots();
    for (let i = 0; i < primitiveRoots.length; i++) {
        num = primitiveRoots[i];
        if (getGreatestCommonDivisor(num, p - 1) === 1) {
            break;
        }
    }
    return num;
}

function generateDNumber() {
    let num;
    do {
        num = generateRandomInt(p - 1);
        if (num >= 2 && num <= p - 2) {
            return num;
        }
    } while (1);
}

function generateKNumber() {
    let num;
    do {
        num = generateRandomInt(p);
        if (getGreatestCommonDivisor(num, p - 1) === 1) {
            return num;
        }
    } while (1);
}

function generateKMinusOneNumber() {
    let num, i = 1;
    do {
        num = (k * i) % (p - 1);
        i++;
    } while (num !== 1);
    return i - 1;
}

function hexToDecimal() {
    let num = [], saveNum = "";
    for (let i = 0; i < message.length; i++) {
        saveNum += message[i];
        if ((i + 1) % 2 === 0) {
            num.push(parseInt(saveNum, 16));
            saveNum = "";
        }
    }
    return num;
}

function hashMessage() {
    let hashMessages = [];
    for (let i = 0; i < messageDecimal.length; i++) {
        hashMessages.push(Number(BigInt(messageDecimal[i]) ** 3n * 9n % (BigInt(p) - 1n)));
    }
    return hashMessages;
}

function generateY2Number() {
    let array = [];
    for (let i = 0; i < mH.length; i++) {
        array.push(Number((kMinusOne * (mH[i] - d * Number(y1))).mod(p - 1)));
    }
    return array;
}

function generateV1Number() {
    let array = [];
    for (let i = 0; i < mH.length; i++) {
        array.push(Number(BigInt(g) ** BigInt(mH[i]) % BigInt(p)));
    }
    return array;
}

function generateV2Number() {
    let array = [];
    for (let i = 0; i < y2.length; i++) {
        array.push(Number(e ** BigInt(y1) * BigInt(y1) ** BigInt(y2[i]) % BigInt(p)));
    }
    return array;
}

function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
}

function generatePrimeNumber() {
    let checkNum, num;
    do {
        num = generateRandomInt(256);
        checkNum = num > 127 ? verifyMultiple(num) : false;
    } while (!checkNum)
    return num;
}

function verifyMultiple(num) { // виправити
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