let q, p, g, x, y;
generateKeys();
let message = "4849";
let messageDecimal, mHash, k, kMinusOne, r, s;
createSignature();
let w, u1, u2, v;
checkSignature();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "q = " + q + "<br>" +
    "g = " + g + "<br>" +
    "x = " + x + "<br>" +
    "y = " + y + "<br>" +
    "message = " + message + "<br>" +
    "messageDecimal = " + messageDecimal + "<br>" +
    "mH = " + mHash + "<br>" +
    "k = " + k + "<br>" +
    "kMinusOne = " + kMinusOne + "<br>" +
    "r = " + r + "<br>" +
    "s = " + s + "<br>" +
    "w = " + w + "<br>" +
    "u1 = " + u1 + "<br>" +
    "u2 = " + u2 + "<br>" +
    "v = " + v + "<br>";

function generateKeys() {
    let checkG;
    do {
        q = generatePrimeNumber();
        p = q * 2 + 1;
        g = generateGNumber();
        checkG = g !== 0;

    } while (!checkG)
    x = generateRandomInt(q);
    y = g ** x % p;
}

function createSignature() {
    messageDecimal = hexToDecimal();
    mHash = hashMessage();
    do {
        generateModularInverseNumbers();
        r = Number((BigInt(g) ** BigInt(k) % BigInt(p)) % BigInt(q));
        s = generateSNumbers();
    } while (!checkSNumber())
}

function checkSignature() {
    w = generateWNumbers();
    [u1, u2] = generateUNumbers();
    v = generateVNumbers();
}

function generateVNumbers() {
    let saveArray = [];
    for (let i = 0; i < u1.length; i++) {
        saveArray.push(Number(((BigInt(g) ** BigInt(u1[i]) * BigInt(y) ** BigInt(u2[i])) % BigInt(p)) % BigInt(q)));
    }
    return saveArray;
}

function generateUNumbers() {
    let u1SaveArray = [], u2SaveArray = [];
    for (let i = 0; i < w.length; i++) {
        u1SaveArray.push(Number(BigInt(mHash[i]) * BigInt(w[i]) % BigInt(q)));
        u2SaveArray.push(Number(BigInt(r) * BigInt(w[i]) % BigInt(q)))
    }
    return [u1SaveArray, u2SaveArray];
}

function generateGNumber() {
    for (let i = 2; i < p; i++) {
        if (BigInt(i) ** BigInt(q) % BigInt(p) === 1n) {
            return i;
        }
    }
    return 0;
}

function checkSNumber() {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 0) {
            return false;
        }
    }
    return true;
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

function generateModularInverseNumbers() {
    let check;
    do {
        k = generateRandomInt(q);
        kMinusOne = generateKMinusOneNumber();
        check = kMinusOne !== -1;
    } while (!check);
}

function generateKMinusOneNumber() {
    let num, i = 1;
    do {
        num = (k * i) % (q);
        i++;
        if (i > q) {
            return -1;
        }
    } while (num !== 1);
    return i - 1;
}

function generateSNumbers() {
    let sArray = [];
    for (let i = 0; i < mHash.length; i++) {
        sArray.push(kMinusOne * (mHash[i] + x * r) % q);
    }
    return sArray;
}

function generateWNumbers() {
    let saveArray = [];
    for (let i = 0; i < s.length; i++) {
        let num, saveJ;
        for (let j = 1; num !== 1n; j++) {
            num = BigInt(s[i]) * BigInt(j) % BigInt(q);
            saveJ = j;
        }
        saveArray.push(saveJ)
    }
    return saveArray;
}

function generatePrimeNumber() {
    let checkNum, num;
    do {
        num = generateRandomInt(100);
        checkNum = num > 10 ? verifyMultiple(num) : false;
    } while (!checkNum)
    return num;
}

function verifyMultiple(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function generateRandomInt(max) {
    return Math.floor(Math.random() * max);
}