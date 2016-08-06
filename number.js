var RADIX = Math.pow(10, 5),
    NUM_SIZE = Math.log10(RADIX);

Integer = function (s) {
    var sign = 1,
        nums = [],
        len = 0,
        s0 = s;

    if (s0 === '0') {
        sign = 0;
    }
    if (s0[0] === '-') {
        sign = -1;
        s0 = s0.slice(1);
    }    
    nums.push(parseInt(s0.slice(-NUM_SIZE), 10));
    s0 = s0.slice(0, -NUM_SIZE);
    for (len = s0.length; len !== 0; len = s0.length) {
        nums.push(parseInt(s0.slice(-NUM_SIZE), 10));
        s0 = s0.slice(0, -NUM_SIZE);
    }
    this.getSign = function () {
        return sign;
    };
    this.getNums = function () {
        return nums.slice();
    };
    this.copy = function () {
        var s0 = s;

        return new Integer(s);
    };
};
Integer.prototype.toRational = function () {
    return new Rational(this, new Integer('1'));
};
Integer.prototype.toNumber = function () {
    return parseFloat(this.toString());
};
Integer.prototype.toComplex = function () {
    return new Complex(this.toNumber(), 0);
};
Integer.prototype.toString = function () {
    var result = '',
        nums = this.getNums(),
        len = nums.length,
        i,
        s,
        flag = false;

    if (this.getSign() === -1) {
        result += '-';
    } 
    for (i = len; i > 0; i -= 1) {
        s = nums[i - 1].toString();
        if (flag) {
            if (s.length < NUM_SIZE) {
                result += new Array(NUM_SIZE - s.length + 1).join('0');
            }
        } else {
            flag = true;
        }
        result += s;
    }
    return result;
};
Integer.prototype.isEqual = function (z) {
    if (z instanceof Rational) {
        return this.toRational().isEqual(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().isEqual(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().isEqual(z);
    }
    return this.toString() === z.toString();
};
Integer.prototype.lt = function (z) {
    if (z instanceof Rational) {
        return this.toRational().lt(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().lt(z);
    }
    return this.sub(z).isNegative();
};
Integer.prototype.le = function (z) {
    if (z instanceof Rational) {
        return this.toRational().le(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().le(z);
    }
    var t = this.sub(z);
    
    return t.isNegative() || t.isZero();
};
Integer.prototype.gt = function (z) {
    if (z instanceof Rational) {
        return this.toRational().gt(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().gt(z);
    }
    return this.sub(z).isPositive();
};
Integer.prototype.ge = function (z) {
    if (z instanceof Rational) {
        return this.toRational().ge(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().ge(z);
    }
    var t = this.sub(z);
    
    return t.isPositive() || t.isZero();
};
Integer.prototype.gcd = function (n) {
    var x = this.abs(),
        y = n.abs(),
        q = x.floorQuotient(y),
        r = x.floorRemainder(y);

    if (r.isZero()) {
        return y;        
    }    
    return y.gcd(r);
};

Integer.prototype.neg = function () {
    var s = this.toString();

    if (s[0] === '-')  {
        return new Integer(s.slice(1));
    }
    return new Integer('-' + s);
};
Integer.prototype.isZero = function () {
    return this.getSign() === 0;
};
Integer.prototype.isPositive = function () {
    return this.getSign() === 1;
};
Integer.prototype.isNegative = function () {
    return this.getSign() === -1;
};
Integer.prototype.factorial = function () {
    var result = new Integer('1'),
        t = new Integer(this.toString()),
        one = new Integer('1');

    for (;t.isPositive(); t = t.sub(one)) {
        result = result.mul(t);        
    }
    return result;
};
Integer.prototype.add = function (z) {
    if (z instanceof Rational) {
        return this.toRational().add(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().add(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().add(z);
    }
    var nums1 = this.getNums(),
        sign1 = this.getSign(),
        len1 = nums1.length,
        nums2 = z.getNums(),
        sign2 = z.getSign(),
        len2 = nums2.length,
        nums3,
        nums4,
        len3,
        len4,
        sign3,
        n,
        a = 0,
        b,
        i,
        result = '',
        s,
        flag;

    if (len1 > len2) {
        nums3 = nums1;
        len3 = len1;
        sign3 = sign1;
        nums4 = nums2;
        len4 = len2;
    } else if (len1 < len2) {
        nums3 = nums2;
        len3 = len2;
        sign3 = sign2;
        nums4 = nums1;
        len4 = len1;
    } else if (nums1[len1 - 1] > nums2[len1 - 1]) {
        nums3 = nums1;
        len3 = len1;
        sign3 = sign1;
        nums4 = nums2;
        len4 = len2;
    } else {
        nums3 = nums2;
        len3 = len2;
        sign3 = sign2;
        nums4 = nums1;
        len4 = len1;
    }        
    if (sign1 === sign2) {
        for (i = 0; i < len4; i += 1) {
            n = nums3[i] + nums4[i] + a;
            if (n >= RADIX) {
                a = 1;
                b = n - RADIX;
            } else {
                a = 0;
                b = n;
            }
            nums3[i] = b;
        }
        for (i = len4; i < len3; i += 1) {
            n = nums3[i] + a;
            if (n >= RADIX) {
                a = 1;
                nums3[i] = n - RADIX;
            } else {
                a = 0;
                break;
            }            
        }
        if (a !== 0) {
            nums3[i] = a;
        }
        if (sign1 === -1) {
            result += '-';
        }
    } else {
        for (i = 0; i < len4; i += 1) {
            nums3[i] -= a;
            if (nums3[i] < nums4[i]) {
                a = 1;
                nums3[i] += RADIX;
            } else {
                a = 0;
            }        
            nums3[i] -= nums4[i];        
        }    
        for (i = len4; i < len3; i += 1) {
            nums3[i] -= a;
            if (nums3[i] < 0) {
                a = 1;
                nums3[i] += RADIX;
            } else {
                break;
            }
        }    
        for (i = len3; i > 0; i -= 1) {
            if (nums3[i - 1] === 0) {
                nums3.pop();
            } else {
                break;
            }
        }
        if (i === 0) {
            return new Integer("0");
        }
        if (sign3 === -1) {
            result += '-';
        }
    }
    flag = false;
    for (i = nums3.length; i > 0; i -= 1) {
        s = nums3[i - 1].toString();
        if (flag) {
            if (s.length < NUM_SIZE) {
                result += new Array(NUM_SIZE - s.length + 1).join('0');
            }
        } else {
            flag = true;
        }
        result += s;
    }
    return new Integer(result);
};
Integer.prototype.mul = function (z) {
    if (z instanceof Rational) {
        return this.toRational().mul(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().mul(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().mul(z);
    }    
    var nums1 = this.getNums(),
        sign1 = this.getSign(),
        len1 = nums1.length,
        nums2 = z.getNums(),
        sign2 = z.getSign(),
        len2 = nums2.length,
        nums3 = [],
        sign3 = sign1 * sign2,
        len3,
        n,
        a,
        b,
        i,
        j,
        result = '',
        s,
        flag = false;

    for (j = 0; j < len2; j += 1) {
        for (i = 0; i < len1; i += 1) {
            if (nums3[j + i] === undefined) {
                nums3[j + i] = nums1[i] * nums2[j];
            } else {
                nums3[j + i] += nums1[i] * nums2[j];
            }
        }
    }
    a = 0;
    for (i = 0, len3 = nums3.length; i < len3; i += 1) {
        n = nums3[i] + a;
        a = Math.floor(n / RADIX);
        b = n % RADIX;
        nums3[i] = b;
    }
    if (a !== 0) {
        nums3[i] = a;
    }
    if (sign3 === -1) {
        result += '-';
    }
    flag = false;
    for (i = nums3.length; i > 0; i -= 1) {
        s = nums3[i - 1].toString();
        if (flag) {
            if (s.length < NUM_SIZE) {
                result += new Array(NUM_SIZE - s.length + 1).join('0');
            }
        } else {
            flag = true;
        }
        result += s;
    }
    return new Integer(result);
};
Integer.prototype.sub = function (z) {
    return this.add(z.neg());
};
Integer.prototype.div = function (z) {
    if (z instanceof Rational) {
        return this.toRational().div(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().div(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().div(z);
    }
    return new Rational(this, z);
};
Integer.prototype.abs = function () {
    if (this.isPositive() || this.isZero()) {
        return this.copy();
    }
    return this.neg();
};
Integer.prototype.floorQuotient = function (n) {
    var n1 = this.copy(),
        n2 = n.copy(),
        one = new Integer('1'),
        q = new Integer('0');
    
    if (n.isZero()) {
        return NaN;
    }
    if (this.isZero()) {
        return this.copy();
    }
    if (this.isPositive() && n.isPositive()) {
        for (; n1.ge(n2);) {
            q = q.add(one);
            n1 = n1.sub(n2);
        }
        return q;
    }
    if (this.isPositive() && n.isNegative()) {
        for (; n1.isPositive();) {
            q = q.sub(one);
            n1 = n1.add(n2);
        }
        return q;
    }
    if (this.isNegative() && n.isPositive()) {
        for (; n1.isNegative(); ) {
            q = q.sub(one);
            n1 = n1.add(n2);            
        }
        return q;
    }
    if (this.isNegative() && n.isNegative()) {
        for (; n1.le(n2); ) {
            q = q.add(one);
            n1 = n1.sub(n2);
        }
        return q;
    }
    throw {
        type: 'unknown',
        message: 'Integer floorQuotient',
    }
};
Integer.prototype.floorRemainder = function (n) {
    return this.sub(n.mul(this.floorQuotient(n)));
};

Rational = function (num, den) {
    var num,
        den,
        sign;

    if (num.isZero()) {
        sign = 0;
    } else {
        sign = num.getSign() * den.getSign();
    }
    num = num.abs();
    den = den.abs();
    this.getSign = function () {
        return sign;
    }
    this.getNumerator = function () {
        return num;
    };
    this.setNumerator = function (n) {
        sign *= n.getSign();
        num = n.abs();
    };
    this.getDenominator = function () {
        return den;
    };
    this.setDenominator = function (n) {
        sign *= n.getSign();
        den = n.abs();
    };
};
Rational.prototype.toNumber = function () {
    return this.getNumerator().div(this.getDenominator()).toNumber();
};
Rational.prototype.toComplex = function () {
    return new Complex(this.toNumber(), 0);
};
Rational.prototype.toString = function () {
    var num,
        den,
        result = '';
    
    this.canonicalize();
    if (this.getSign() === -1) {
        result += '-';
    }
    num = this.getNumerator();
    den = this.getDenominator();

    result += num + '/' + den;
    
    return result;
};
Rational.prototype.isEqual = function (z) {
    if (z instanceof Integer) {
        return this.isEqual(z.toRational());
    }
    if (typeof z === 'number') {
        return this.toNumber().isEqual(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().isEqual(z);
    }
    this.canonicalize();
    z.canonicalize();
    return this.toString() === z.toString();
};
Rational.prototype.lt = function (z) {
    if (z instanceof Integer) {
        return this.lt(z.toRational());
    }
    if (typeof z === 'number') {
        return this.toNumber().lt(z);
    }
    return this.sub(z).isNegative();
};
Rational.prototype.le = function (z) {
    return this.isEqual(z) || this.lt(z);
};
Rational.prototype.gt = function (z) {
    if (z instanceof Integer) {
        return this.gt(z.toRational());
    }
    if (typeof z === 'number') {
        return this.toNumber().gt(z);
    }
    return this.sub(z).isPositive();
};
Rational.prototype.ge = function (z) {
    return this.isEqual(z) || this.gt(z);
};
Rational.prototype.canonicalize = function () {
    var num = this.getNumerator(),
        den = this.getDenominator(),
        g = num.gcd(den);

    this.setNumerator(num.floorQuotient(g));
    this.setDenominator(den.floorQuotient(g));
};
Rational.prototype.neg = function () {
    return new Rational(this.getNumerator().neg(), this.getDenominator());
};
Rational.prototype.isZero = function () {
    return this.getSign() === 0;
};
Rational.prototype.isPositive = function () {
    return this.getSign() === 1;
};
Rational.prototype.isNegative = function () {
    return this.getSign() === -1;
};
Rational.prototype.add = function (z) {
    if (z instanceof Integer) {
        return this.add(z.toRational());
    }
    if (typeof z === 'number') {
        return this.toNumber().add(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().add(z);
    }
    var num1 = this.getNumerator(),
        den1 = this.getDenominator(),
        sign1 = this.getSign(),
        num2 = z.getNumerator(),
        den2 = z.getDenominator(),
        sign2 = z.getSign();

    if (sign1 === -1) {
        num1 = num1.neg();
    }
    if (sign2 === -1) {
        num2 = num2.neg();
    }
    return new Rational(num1.mul(den2).add(num2.mul(den1)), den1.mul(den2));
};
Rational.prototype.sub = function (z) {
    return this.add(z.neg());
};
Rational.prototype.mul = function (z) {
    if (z instanceof Integer) {
        return this.mul(z.toRational());
    }
    if (typeof z === 'number') {
        return this.toNumber().mul(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().mul(z);
    }
    return new Rational(this.getNumerator().mul(z.getNumerator()),
                        this.getDenominator().mul(z.getDenominator()));
};
Rational.prototype.div = function (z) {
    if (z instanceof Integer) {
        return this.toRational().div(z);
    }
    if (typeof z === 'number') {
        return this.toNumber().div(z);
    }
    if (z instanceof Complex) {
        return this.toComplex().div(z);
    }
    return new Rational(this.getNumerator().mul(z.getDenominator()),
                        this.getDenominator().mul(z.getNumerator()));
};
Number.prototype.toComplex = function () {
    return new Complex(this, 0);
};
Number.prototype.isEqual = function (z) {
    if (z instanceof Integer || z instanceof Rational) {
        return this.isEqual(z.toNumber());
    }
    if (z instanceof Complex) {
        return this.toComplex().div(z);
    }
    return this === z;
};
Number.prototype.lt = function (z) {
    if (z instanceof Integer) {
        return this.lt(z.toNumber());
    }
    return this.sub(z).isNegative();
};
Number.prototype.le = function (z) {
    return this.isEqual(z) || this.lt(z);
};
Number.prototype.gt = function (z) {
    if (z instanceof Integer) {
        return this.gt(z.toNumber());
    }
    return this.sub(z).isPositive();
};
Number.prototype.ge = function (z) {
    return this.isEqual(z) || this.gt(z);
};
Number.prototype.isZero  = function () {
    return this === 0;
};
Number.prototype.isPositive = function () {
    return this > 0;
};
Number.prototype.isNegative = function () {
    return this < 0;
};
Number.prototype.getSign = function () {
    if (this < 0) {
        return -1;
    }
    if (this === 0) {
        return 0;
    }
    if (this > 0) {
        return 1;
    }
};
Number.prototype.neg = function () {
    return -this;
};
Number.prototype.isZero = function () {
    return this.getSign() === 0;
};
Number.prototype.isPositive = function () {
    return this.getSign() === 1;
};
Number.prototype.isNegative = function () {
    return this.getSign() === -1;
};
Number.prototype.add = function (z) {
    if (z instanceof Integer || z instanceof Rational) {
        return this.add(z.toNumber());
    }
    if (z instanceof Complex) {
        return this.toComplex().add(z);
    }    
    return this.add(z);
};
Number.prototype.sub = function (x) {
    if (z instanceof Integer || z instanceof Rational) {
        return this.sub(z.toNumber());
    }
    if (z instanceof Complex) {
        return this.toComplex().sub(z);
    }    
    return this - z;
};
Number.prototype.mul = function (z) {
    if (z instanceof Integer || z instanceof Rational) {
        return this.mul(z.toNumber());
    }
    if (z instanceof Complex) {
        return this.toComplex().mul(z);
    }    
    return this * z;
};
Number.prototype.div = function (x) {
    if (z instanceof Integer || z instanceof Rational) {
        return this.div(z.toNumber());
    }
    if (z instanceof Complex) {
        return this.toComplex().div(z);
    }    
    return this / z;
};
Complex = function (real, imag) {
    var real = real,
        imag = imag;

    this.getReal = function () {
        return real;
    };
    this.getImag = function () {
        return imag;
    };
};
Complex.prototype.toString = function () {
    var real = this.getReal(),
        imag = this.getImag(),
        str = real.toString();

    if (imag  === 0) {
        return str;
    }
    if (imag > 0) {
        str  += '+';
    }
    if (imag === 1) {
        str += 'i';
    } else if (imag === -1) {
        str += '-i';
    } else {
        str += imag + 'i';
    }
    return str;
};
Complex.prototype.isEqual = function (z) {
    if (z instanceof Integer ||
        z instanceof Rational ||
        typeof(z) === 'number') {
        return this.isEqual(z.toComplex());
    }
    return this.getReal() === z.getReal() && this.getImag() === z.getImag();
};
Complex.prototype.neg = function () {
    return new Complex(this.getReal().neg(), this.getImag().neg());
};
Complex.prototype.conjugate = function () {
    return new Complex(this.getReal(), this.getImag().neg());
};
Complex.prototype.add = function (z) {
    if (z instanceof Integer ||
        z instanceof Rational ||
        typeof(z) === 'number') {
        return this.add(z.toComplex());
    }
    return new Complex(this.getReal() + z.getReal(),
                       this.getImag() + z.getImag());
};
Complex.prototype.sub = function (z) {
    if (z instanceof Integer ||
        z instanceof Rational ||
        typeof(z) === 'number') {
        return this.sub(z.toComplex());
    }
    return new Complex(this.getReal() - z.getReal(),
                       this.getImag() - z.getImag());
};
Complex.prototype.mul = function (z) {
    if (z instanceof Integer ||
        z instanceof Rational ||
        typeof(z) === 'number') {
        return this.mul(z.toComplex());
    }
    var real = this.getReal() * z.getReal() - this.getImag() * z.getImag(),
        imag = this.getReal() * z.getImag() + this.getImag() * z.getReal();
    
    return new Complex(real, imag);
};
Complex.prototype.div = function (z) {
    if (z instanceof Integer ||
        z instanceof Rational ||
        typeof(z) === 'number') {
        return this.div(z.toComplex());
    }
    var z1 = z.conjugate(),
        z2 = this.mul(z1),
        n = z.mul(z1).getReal(),
        real = z2.getReal() / n,
        imag = z2.getImag() / n;

    return new Complex(real, imag);
};
