let p, q, n, fN, e, d;
generateKeys();
let r, x, rT;
performTheWorkStep();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "q = " + q + "<br>" +
    "n = " + n + "<br>" +
    "fN = " + fN + "<br>" +
    "e = " + e + "<br>" +
    "d = " + d + "<br>" +
    "r = " + r + "<br>" +
    "x = " + x + "<br>" +
    "rT = " + rT + "<br>";

function generateKeys() {
    do {
        p = generatePrimeNumber();
        q = generatePrimeNumber();
        n = Number(BigInt(q) * BigInt(p));
        fN = Number(BigInt(q - 1) * BigInt(p - 1));
        e = generateRandomInt(fN);
        d = generateModularInverseNumber();
    } while (p === q || e % 2 === 0 || getGreatestCommonDivisor(e, fN) !== 1)
}

function generateModularInverseNumber() {
    let num, i = 1;
    do {
        num = (e * i) % (fN);
        i++;
        if (i > fN) {
            return -1;
        }
    } while (num !== 1);
    return i - 1;
}

function performTheWorkStep() {
    r = generateRandomInt(n);
    x = Number(BigInt(r) ** BigInt(e) % BigInt(n));
    rT = Number(BigInt(x) ** BigInt(d) % BigInt(n));
}

function getGreatestCommonDivisor(num1, num2) {
    if (num2 === 0) {
        return num1;
    }
    return getGreatestCommonDivisor(num2, num1 % num2);
}

function generatePrimeNumber() {
    let checkNum, num;
    do {
        num = generateRandomInt(256);
        checkNum = num > 127 ? verifyMultiple(num) : false;
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