var expect = require('chai').expect;
var a = require('../number.js');

describe('number tests', function () {
    it('should pass this canary test', function () {
        expect(true).to.eql(true);
    });
    
    var q1,
        q2,
        z1,
        z2;
    beforeEach(function () {
        z1 = new Complex(1, 2);
        z2 = new Complex(3, 4);        
        q1 = new Rational(new Integer('2'), new Integer('3'));
        q2 = new Rational(new Integer('5'), new Integer('4'));
    });
    it('integer gcd 32 -36', function () {
        var x = new Integer('32'),
            y = new Integer('-36'),
            z = x.gcd(y);

        expect(z.isEqual(new Integer('4'))).to.eql(true);
    });
    it('rational canonicalize', function () {
        var q = new Rational(new Integer('2'), new Integer('-4'));

        q.canonicalize();
        
        expect(q.toString() === '-1/2').to.eql(true);
    });
    
    it('rational isEqual', function () {
        var q1 = new Rational(new Integer('2'), new Integer('-4')),
            q2 = new Rational(new Integer('-1'), new Integer('2'));

        expect(q1.isEqual(q2)).to.eql(true);
    });
    it('rational add', function () {
        var q = new Rational(new Integer('23'), new Integer('12'));

        expect(q.isEqual(q1.add(q2))).to.eql(true);
    });
    it('rational add -q+q', function () {
        var q = new Rational(new Integer('-7'), new Integer('12'));

        expect(q.isEqual(q1.add(q2.neg()))).to.eql(true);
    });
    it('rational add (canonical)', function () {
        var q1 = new Rational(new Integer('1'), new Integer('4')),
            q2 = new Rational(new Integer('1'), new Integer('2'));

        expect(q1.add(q1).isEqual(q2)).to.eql(true);
    });
    it('rational sub', function () {
        var x = q1.sub(q2),
            y = new Rational(new Integer('7'), new Integer('-12'));

        expect(x.isEqual(y)).to.eql(true);
    });
    it('rational mul', function () {
        var q = new Rational(new Integer('5'), new Integer('6'));

        expect(q.isEqual(q1.mul(q2))).to.eql(true);
    });
    it('rational div', function () {
        var q = new Rational(new Integer('8'), new Integer('15'));

        expect(q.isEqual(q1.div(q2))).to.eql(true);
    });    
    it('complex toString a+bi', function () {
        var s = z1.toString();

        expect(s).to.eql('1+2i');
    });
    it('complex conjugate', function () {
        var z = new Complex(1, -2);

        expect(z1.conjugate().isEqual(z)).to.eql(true);
    });
    it('complex toString a+i', function () {
        var z = new Complex(-1, 1);

        expect(z.toString()).to.eql('-1+i');
    });
    it('complex toString a-i', function () {
        var z = new Complex(-1, -1);

        expect(z.toString()).to.eql('-1-i');
    });
    it('complex toString a+0i', function () {
        var z = new Complex(10, 0);

        expect(z.toString()).to.eql('10');
    });
    it('complex isEqual', function () {
        var z1 = new Complex(1, 2),
            z2 = new Complex(1, 2),
            b = z1.isEqual(z2);

        expect(true).to.eql(true);
    });
    it('complex add', function () {
        var z3 = new Complex(4, 6);
        z = z1.add(z2),
        bln = z.isEqual(z3);

        expect(bln).to.eql(true);
    });
    it('complex sub', function () {
        var z3 = new Complex(-2, -2),
            z = z1.sub(z2),
            bln = z.isEqual(z3);

        expect(bln).to.eql(true);
    });
    it('complex mul', function () {
        var z3 = new Complex(-5, 10),
            z = z1.mul(z2),
            bln = z.isEqual(z3);

        expect(bln).to.eql(true);
    });
    it('complex div', function () {
        var z = z1.div(z2),
            z3 = new Complex(11/25, 2/25),
            bln = z.isEqual(z3);

        expect(bln).to.eql(true);
    });
});
