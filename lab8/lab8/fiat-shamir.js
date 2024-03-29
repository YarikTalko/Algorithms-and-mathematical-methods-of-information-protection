let p, q, n, t = 1, v, s, vModularInverse;
generateKeys();
let r, x, b, y, x1;
performTheWorkStep();

document.getElementById("output").innerHTML =
    "p = " + p + "<br>" +
    "q = " + q + "<br>" +
    "n = " + n + "<br>" +
    "v = " + v + "<br>" +
    "vMI = " + vModularInverse + "<br>" +
    "s = " + s + "<br>" +
    "r = " + r + "<br>" +
    "x = " + x + "<br>" +
    "b = " + b + "<br>" +
    "y = " + y + "<br>" +
    "x1 = " + x1 + "<br>" +
    "y^2*v^b = " + Math.round(y ** 2 * v ** b % n) + "<br>" +
    "r^2*s^2*v = " + Math.round(r ** 2 * s ** 2 * v % n) + "<br>" +
    "r^2*vMI*v = " + Number(BigInt(r) ** 2n * BigInt(vModularInverse) * BigInt(v) % BigInt(n)) + "<br>";

function generateKeys() {
    do {
        p = generatePrimeNumber();
        q = generatePrimeNumber();
    } while (p === q)
    n = Number(BigInt(q) * BigInt(p));
    v = generateVNumber();
    s = (1 / Math.sqrt(v)) % n;
}

function performTheWorkStep() {
    for (let i = 0; i < t; i++) {
        do {
            r = generateRandomInt(n);
        } while (getGreatestCommonDivisor(r, n) !== 1);
        x = Number(BigInt(r) ** 2n % BigInt(n));
        b = generateRandomInt(2);
        y = r * s ** b;
        x1 = Math.round((y ** 2) * (v ** b) % n);
    }
}

function generateVNumber() {
    let num, check;
    do {
        num = generateRandomInt(n);
        if (getGreatestCommonDivisor(num, n) !== 1) {
            check = false;
        } else if (!checkQuadraticResidue(num)) {
            check = false;
        } else if (!checkModularInverseNumber(num)) {
            check = false;
        } else {
            check = true;
        }
    } while (!check) ;
    return num;
}

function checkModularInverseNumber(v) {
    let num, i = 1;
    do {
        num = Number(BigInt(v) * BigInt(i) % BigInt(n));
        if (i > n) {
            return false;
        }
        i++;
    } while (num !== 1);
    vModularInverse = i - 1;
    return true;
}

function checkQuadraticResidue(num) {
    for (let i = 0; i < n; i++) {
        if (BigInt(i) ** 2n % BigInt(n) === BigInt(num)) {
            return true;
        }
    }
    return false;
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