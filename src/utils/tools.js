export function formatDate(format, { date, isUTC }) {
    if (!format) return null;

    if (!date) {
        date = new Date();
    } else {
        date = new Date(date);
    }

    let y; let m; let d; let h; let i; let
        s;

    if (isUTC) {
        y = date.getFullYear();
        m = completeNum(date.getUTCMonth() + 1);
        d = completeNum(date.getUTCDate());
        h = completeNum(date.getUTCHours());
        i = completeNum(date.getUTCMinutes());
        s = completeNum(date.getUTCSeconds());
    } else {
        y = date.getFullYear();
        m = completeNum(date.getMonth() + 1);
        d = completeNum(date.getDate());
        h = completeNum(date.getHours());
        i = completeNum(date.getMinutes());
        s = completeNum(date.getSeconds());
    }

    return format.replace('y', y).replace('m', m).replace('d', d).replace('h', h)
        .replace('i', i)
        .replace('s', s);
}

export function completeNum(num) {
    return num < 10 ? `0${num}` : num;
}

export function getIdentity(len) {
    const SEED = '0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz6789'
        .split('');
    const SIZE = SEED.length;
    const LEN = 20;
    if (!len || typeof len !== 'number') {
        len = LEN;
    }

    let uid = '';
    while (len-- > 0) {
        uid += SEED[Math.random() * SIZE | 0];
    }

    return uid;
}

/**
 * 科学的加法
 * @returns {*}
 */
Number.prototype.add = function (arg) {
    return addition(arg, this);
};

Array.prototype.unique = function () {
    const r = [];
    for (const o of this) {
        if (!r.includes(o)) {
            r.push(o);
        }
    }
    return r;
};

function addition(arg1, arg2) {
    let r1; let r2; let m; let
        c;

    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }

    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }

    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        const cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm;
            arg2 = Number(arg2.toString().replace('.', ''));
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
}

/**
 * 科学的减法
 * @param arg
 * @returns {*}
 */
Number.prototype.sub = function (arg) {
    return subtraction(arg, this);
};

function subtraction(arg1, arg2) {
    let r1; let r2; let m; let
        n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg2 * m - arg1 * m) / m).toFixed(n));
}

/**
 * 科学的乘法
 * @param arg
 * @returns {*}
 */
Number.prototype.mul = function (arg) {
    return multiplication(arg, this);
};

function multiplication(arg1, arg2) {
    let m = 0; const s1 = arg1.toString(); const
        s2 = arg2.toString();

    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }

    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }

    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 * 科学的除法
 * @param arg
 * @returns {*}
 */
Number.prototype.div = function (arg) {
    return division(this, arg);
};

function division(arg1, arg2) {
    let t1 = 0; let t2 = 0; let r1; let
        r2;

    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }

    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }


    r1 = Number(arg1.toString().replace('.', ''));

    r2 = Number(arg2.toString().replace('.', ''));

    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 隐藏姓名
 * */
export function nameMask(name) {
    return name.replace(/.(?=.)/g, '*');
}

/**
 * 隐藏电话
 * */
export function mobileMask(mobile) {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 隐藏银行卡或身份证
 * */
export function idMask(id) {
    // return id.replace(/(\d{8})\d{4}(\d{6})/, "$1****$2");
    if (id.length === 16) {
        return id.replace(/\d{12}(\d{4})/, '**** **** **** **** $1');
    } if (id.length === 17) {
        return id.replace(/\d{13}(\d{4})/, '**** **** **** **** $1');
    } if (id.length === 18) {
        return id.replace(/\d{14}(\d{4})/, '**** **** **** **** $1');
    } if (id.length === 19) {
        return id.replace(/\d{15}(\d{4})/, '**** **** **** **** $1');
    }
}

export function getCloseTime(arr) {
    const o = new Date().getTime();
    return arr.find(e => o < e);
}
