var expect = require('chai').expect;
require('../number.js');

describe('number tests', function () {
    it('should pass this canary test', function () {
        expect(true).to.eql(true);
    });
    
    var n0,
        n1,
        n2,
        z0,
        z1,
        z2,
        z3,
        z4,
        n0,
        n1,
        n2,
        q1,
        q2,
        i0,
        i1,
        i2;
    beforeEach(function () {
        n0 = 0,
        n1 = 10;
        n2 = -10;
        z0 = new Complex(0, 0);
        z1 = new Complex(1, 2);
        z2 = new Complex(3, 4);
        z3 = new Complex(-2, 1);
        z4 = new Complex(4, -3);
        n0 = 0;
        n1 = 10;
        n2 = -10;
        q1 = new Rational(new Integer('2'), new Integer('3'));        
        q2 = new Rational(new Integer('5'), new Integer('-4'));
        i0 = new Integer('0');
        i1 = new Integer('10');
        i2  = new Integer('-10');
    });
    it('number neg 0', function () {
        expect(n0.neg()).to.eql(0);
    });
    it('number neg 10', function () {
        expect(n1.neg()).to.eql(-10);
    });
    it('number neg -10', function () {
        expect(n2.neg()).to.eql(10);
    });
    it('number getSign 0', function () {
        expect(n0.getSign()).to.eql(0);
    });
    it('number getSign 10', function () {
        expect(n1.getSign()).to.eql(1);
    });
    it('number getSign -10', function () {
        expect(n2.getSign()).to.eql(-1);
    });
    it('number isZero 0', function () {
        expect(n0.isZero()).to.eql(true);
    });
    it('number isZero 10', function () {
        expect(n1.isZero()).to.eql(false);
    });
    it('number isPositive 0', function () {
        expect(n0.isPositive()).to.eql(false);
    });
    it('number isPositive 10', function () {
        expect(n1.isPositive()).to.eql(true);
    });
    it('number isPositive -10', function () {
        expect(n2.isPositive()).to.eql(false);
    });
    it('number isNegative 0', function () {
        expect(n0.isNegative()).to.eql(false);
    });
    it('number isNegative 10', function () {
        expect(n1.isNegative()).to.eql(false);
    });
    it('number isNegative -10', function () {
        expect(n2.isNegative()).to.eql(true);
    });
    it('number isEqual 10', function () {
        expect(n1.isEqual(10)).to.eql(true);
    });
    it('number toComplex 0', function () {
        expect(n0.toComplex().isEqual(new Complex(0, 0))).to.eql(true);
    });
    it('number toComplex 10', function () {
        expect(n1.toComplex().isEqual(new Complex(10, 0))).to.eql(true);
    });
    it('number toComplex -10', function () {
        expect(n2.toComplex().isEqual(new Complex(-10, 0))).to.eql(true);
    });
    it('complex toString 1+2i', function () {
        expect(z1.toString()).to.eql('1+2i');
    });
    it('complex toString 3+4i', function () {
        expect(z2.toString()).to.eql('3+4i');
    });
    it('complex toString -2+i', function () {
        expect(z3.toString()).to.eql('-2+i');
    });
    it('complex toString 4-3i', function () {
        expect(z4.toString()).to.eql('4-3i');
    });
    it('complex isEqual 1+2i', function () {
        expect(z1.isEqual(new Complex(1, 2))).to.eql(true);
    });
    it('complex neg 1+2i', function () {
        expect(z1.neg().isEqual(new Complex(-1, -2))).to.eql(true);
    });
    it('complex conjugate 1+2i', function () {
        expect(z1.conjugate().isEqual(new Complex(1, -2))).to.eql(true);
    });
    it('complex conjugate -2+i', function () {
        expect(z3.conjugate().isEqual(new Complex(-2, -1))).to.eql(true);
    });
    it('complex conjugate 4-3i', function () {
        expect(z4.conjugate().isEqual(new Complex(4, 3))).to.eql(true);
    });
    it('complex isReal 1+2i', function () {
        expect(z1.isReal()).to.eql(false);
    });
    it('complex isReal 10', function () {
        var z = new Complex(10, 0);

        expect(z.isReal()).to.eql(true);
    });
    it ('complex getSign -10', function () {
        var sign = new Complex(-10, 0).getSign();
        
        expect(sign).to.eql(-1);
    });
    it ('complex getSign 10', function () {
        var sign = new Complex(10, 0).getSign();
        
        expect(sign).to.eql(1);
    });
    it ('complex getSign 0', function () {
        var sign = z0.getSign();

        expect(sign).to.eql(0);
    });
    it('complex isZero 0+0i', function () {
        expect(z0.isZero()).to.eql(true);
    });
    it('complex isZero 1+2i', function () {
        expect(z1.isZero()).to.eql(false);
    });
    it('complex isPositive 10+0i', function () {
        expect(new Complex(10, 0).isPositive()).to.eql(true);
    });
    it('complex isPositive 0+0i', function () {
        expect(new Complex(0, 0).isPositive()).to.eql(false);
    });
    it('complex isPositive -10+0i', function () {
        expect(new Complex(-10, 0).isPositive()).to.eql(false);
    });
    it('complex isNegative 10+0i', function () {
        expect(new Complex(10, 0).isNegative()).to.eql(false);
    });
    it('complex isNegative 0+0i', function () {
        expect(new Complex(0, 0).isNegative()).to.eql(false);
    });
    it('complex isNegative -10+0i', function () {
        expect(new Complex(-10, 0).isNegative()).to.eql(true);
    });
    it('complex add 1+2i 3+4i', function () {
        var z = new Complex(4, 6);
        
        expect(z1.add(z2).isEqual(z)).to.eql(true);
    });
    it('complex sub 1+2i 3+4i', function () {
        var z = new Complex(-2, -2);
        
        expect(z1.sub(z2).isEqual(z)).to.eql(true);
    });
    it('complex mul 1+2i 3+4i', function () {
        var z = new Complex(-5, 10);
        
        expect(z1.mul(z2).isEqual(z)).to.eql(true);
    });
    it('complex div 1+2i 3+4i', function () {
        var z = new Complex(11/25, 2/25);
        
        expect(z1.div(z2).isEqual(z)).to.eql(true);
    });
    it('complex lt 1 2', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(2, 0);

        expect(z1.lt(z2)).to.eql(true);
    });
    it('complex lt 1 1', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(1, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt 2 1', function () {
        var z1 = new Complex(2, 0),
            z2 = new Complex(1, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt -1 1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(1, 0);

        expect(z1.lt(z2)).to.eql(true);
    });
    it('complex lt -1 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-1, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt -2 -1', function () {
        var z1 = new Complex(-2, 0),
            z2 = new Complex(-1, 0);

        expect(z1.lt(z2)).to.eql(true);
    });
    it('complex lt -2 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-2, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt 0 0', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(0, 0);

        expect(z1.lt(z2)).to.eql(false);
    });    
    it('complex lt 0 1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(1, 0);

        expect(z1.lt(z2)).to.eql(true);
    });
    it('complex lt 1 0', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(0, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt 0 -1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(-1, 0);

        expect(z1.lt(z2)).to.eql(false);
    });
    it('complex lt -1 0', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(0, 0);

        expect(z1.lt(z2)).to.eql(true);
    });
    it('complex le 1 2', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(2, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le 1 1', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(1, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le 2 1', function () {
        var z1 = new Complex(2, 0),
            z2 = new Complex(1, 0);

        expect(z1.le(z2)).to.eql(false);
    });
    it('complex le -1 1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(1, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le -1 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-1, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le -2 -1', function () {
        var z1 = new Complex(-2, 0),
            z2 = new Complex(-1, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le -2 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-2, 0);

        expect(z1.le(z2)).to.eql(false);
    });
    it('complex le 0 0', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(0, 0);

        expect(z1.le(z2)).to.eql(true);
    });    
    it('complex le 0 1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(1, 0);

        expect(z1.le(z2)).to.eql(true);
    });
    it('complex le 1 0', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(0, 0);

        expect(z1.le(z2)).to.eql(false);
    });
    it('complex le 0 -1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(-1, 0);

        expect(z1.le(z2)).to.eql(false);
    });
    it('complex le -1 0', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(0, 0);

        expect(z1.le(z2)).to.eql(true);
    });    
    it('complex gt 1 2', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(2, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt 1 1', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(1, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt 2 1', function () {
        var z1 = new Complex(2, 0),
            z2 = new Complex(1, 0);

        expect(z1.gt(z2)).to.eql(true);
    });
    it('complex gt -1 1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(1, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt -1 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-1, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt -2 -1', function () {
        var z1 = new Complex(-2, 0),
            z2 = new Complex(-1, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt -2 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-2, 0);

        expect(z1.gt(z2)).to.eql(true);
    });
    it('complex gt 0 0', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(0, 0);

        expect(z1.gt(z2)).to.eql(false);
    });    
    it('complex gt 0 1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(1, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex gt 1 0', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(0, 0);

        expect(z1.gt(z2)).to.eql(true);
    });
    it('complex gt 0 -1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(-1, 0);

        expect(z1.gt(z2)).to.eql(true);
    });
    it('complex gt -1 0', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(0, 0);

        expect(z1.gt(z2)).to.eql(false);
    });
    it('complex ge 1 2', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(2, 0);

        expect(z1.ge(z2)).to.eql(false);
    });
    it('complex ge 1 1', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(1, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge 2 1', function () {
        var z1 = new Complex(2, 0),
            z2 = new Complex(1, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge -1 1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(1, 0);

        expect(z1.ge(z2)).to.eql(false);
    });
    it('complex ge -1 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-1, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge -2 -1', function () {
        var z1 = new Complex(-2, 0),
            z2 = new Complex(-1, 0);

        expect(z1.ge(z2)).to.eql(false);
    });
    it('complex ge -2 -1', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(-2, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge 0 0', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(0, 0);

        expect(z1.ge(z2)).to.eql(true);
    });    
    it('complex ge 0 1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(1, 0);

        expect(z1.ge(z2)).to.eql(false);
    });
    it('complex ge 1 0', function () {
        var z1 = new Complex(1, 0),
            z2 = new Complex(0, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge 0 -1', function () {
        var z1 = new Complex(0, 0),
            z2 = new Complex(-1, 0);

        expect(z1.ge(z2)).to.eql(true);
    });
    it('complex ge -1 0', function () {
        var z1 = new Complex(-1, 0),
            z2 = new Complex(0, 0);

        expect(z1.ge(z2)).to.eql(false);
    });
    it('complex lt 1+0i 1', function () {
        expect(new Complex(1, 0).lt(1)).to.eql(false);
    });
    it('complex lt 1+0i 0', function () {
        expect(new Complex(1, 0).lt(0)).to.eql(false);
    });
    it('complex lt 1+0i -1', function () {
        expect(new Complex(1, 0).lt(-1)).to.eql(false);
    });
    it('complex lt 1+0i 2', function () {
        expect(new Complex(1, 0).lt(2)).to.eql(true);
    });
    it('number lt 1 1+0i', function () {
        expect((1).lt(new Complex(1, 0))).to.eql(false);
    });
    it('number lt 0 1+0i', function () {
        expect((0).lt(new Complex(1, 0))).to.eql(true);
    });
    it('number lt -1 1+0i', function () {
        expect((-1).lt(new Complex(1, 0))).to.eql(true);
    });
    it('number lt 1 1', function () {
        expect((1).lt(1)).to.eql(false);
    });
    it('number lt 0 1', function () {
        expect((0).lt(1)).to.eql(true);
    });
    it('number lt -1 1', function () {
        expect((-1).lt(1)).to.eql(true);
    });
    it('number add 10 -10', function () {
        expect(n1.add(n2).isEqual(0)).to.eql(true);
    });
    it('number add 0 -10', function () {
        expect(n0.add(n2).isEqual(-10)).to.eql(true);
    });
    it('rational toNumber 2/3', function () {
        expect(q1.toNumber().isEqual(0.6666666666666666)).to.eql(true);
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
    it('rational add 2/3+5/-4', function () {
        var q = new Rational(new Integer('-7'), new Integer('12'));

        expect(q.isEqual(q1.add(q2))).to.eql(true);
    });
    it('rational add (canonical)', function () {
        var q1 = new Rational(new Integer('1'), new Integer('4')),
            q2 = new Rational(new Integer('1'), new Integer('2'));

        expect(q1.add(q1).isEqual(q2)).to.eql(true);
    });
    it('rational sub 2/3 5/-4', function () {
        var q = new Rational(new Integer('23'), new Integer('12'));

        expect(q1.sub(q2).isEqual(q)).to.eql(true);
    });
    it('rational mul 2/3 5/-4', function () {
        var q = new Rational(new Integer('-5'), new Integer('6'));

        expect(q1.mul(q2).isEqual(q)).to.eql(true);
    });
    it('rational div 2/3 5/-4', function () {
        var q = new Rational(new Integer('-8'), new Integer('15'));

        expect(q.isEqual(q1.div(q2))).to.eql(true);
    });
    it('integer toRatioonal 10', function () {
        var q = new Rational(i1, new Integer('1'));
        
        expect(i1.toRational().isEqual(q)).to.eql(true);
    });
    it('integer gcd 32 -36', function () {
        var x = new Integer('32'),
            y = new Integer('-36'),
            z = x.gcd(y);

        expect(z.isEqual(new Integer('4'))).to.eql(true);
    });
    it('integer neg 10', function () {
        expect(i1.neg().isEqual(i2)).to.eql(true);
    });
    it('integer neg -10', function () {
        expect(i2.neg().isEqual(i1)).to.eql(true);
    });
    it('integer isZero 0', function () {
        expect(i0.isZero()).to.eql(true);
    });
    it('integer isZero 10', function () {
        expect(i1.isZero()).to.eql(false);
    });
    it('integer isZero -10', function () {
        expect(i2.isZero()).to.eql(false);
    });
    it('integer isPositive 0', function () {
        expect(i0.isPositive()).to.eql(false);
    });
    it('integer isPositive 10', function () {
        expect(i1.isPositive()).to.eql(true);
    });
    it('integer isPositive -10', function () {
        expect(i2.isPositive()).to.eql(false);
    });
    it('integer isNegative 0', function () {
        expect(i0.isNegative()).to.eql(false);
    });
    it('integer isNegative 10', function () {
        expect(i1.isNegative()).to.eql(false);
    });
    it('integer isNegative -10', function () {
        expect(i2.isNegative()).to.eql(true);
    });
    it('integer add 0 10', function () {
        expect(i0.add(i1).isEqual(i1)).to.eql(true);
    });
    it('integer add 0 -10', function () {
        expect(i0.add(i2).isEqual(i2)).to.eql(true);
    });
    it('integer add 10 -10', function () {
        expect(i1.add(i2).isZero()).to.eql(true);
    });
    it('integer sub 0 10', function () {
        expect(i0.sub(i1).isEqual(i2)).to.eql(true);
    });
    it('integer sub 0 -10', function () {
        expect(i0.sub(i2).isEqual(i1)).to.eql(true);
    });
    it('integer sub 10 -10', function () {
        expect(i1.sub(i2).isEqual(new Integer('20'))).to.eql(true);
    });
    it('integer mul 0 10', function () {
        expect(i0.mul(i1).isZero()).to.eql(true);
    });
    it('integer mul 0 -10', function () {
        expect(i0.mul(i2).isZero()).to.eql(true);
    });
    it('integer mul 10 -10', function () {
        expect(i1.mul(i2).isEqual(new Integer('-100'))).to.eql(true);
    });
    it('integer div 0 10', function () {
        expect(i0.div(i1).isZero()).to.eql(true);
    });
    it('integer div 0 -10', function () {
        expect(i0.div(i2).isZero(i1)).to.eql(true);
    });
    it('integer div 10 -10', function () {
        expect(i1.div(i2).isEqual(new Integer('-1'))).to.eql(true);
    });
    it('integer abs 0', function () {
        expect(i0.abs().isZero()).to.eql(true);
    });
    it('integer abs 10', function () {
        expect(i1.abs().isEqual(i1)).to.eql(true);
    });
    it('integer abs -10', function () {
        expect(i2.abs().isEqual(i1)).to.eql(true);
    });
    it('integer floorQuotient 5 2', function () {
        var i1 = new Integer('5'),
            i2 = new Integer('2'),
            i3 = new Integer('2');

        expect(i1.floorQuotient(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorQuotient -5 2', function () {
        var i1 = new Integer('-5'),
            i2 = new Integer('2'),
            i3 = new Integer('-3');

        expect(i1.floorQuotient(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorQuotient -5 2', function () {
        var i1 = new Integer('-5'),
            i2 = new Integer('-2'),
            i3 = new Integer('2');

        expect(i1.floorQuotient(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorQuotient -5 2', function () {
        var i1 = new Integer('5'),
            i2 = new Integer('-2'),
            i3 = new Integer('-3');

        expect(i1.floorQuotient(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorRemainder 5 2', function () {
        var i1 = new Integer('5'),
            i2 = new Integer('2'),
            i3 = new Integer('1');

        expect(i1.floorRemainder(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorRemainder -5 2', function () {
        var i1 = new Integer('-5'),
            i2 = new Integer('2'),
            i3 = new Integer('1');

        expect(i1.floorRemainder(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorRemainder -5 2', function () {
        var i1 = new Integer('5'),
            i2 = new Integer('-2'),
            i3 = new Integer('-1');

        expect(i1.floorRemainder(i2).isEqual(i3)).to.eql(true);
    });
    it('integer floorRemainder -5 2', function () {
        var i1 = new Integer('-5'),
            i2 = new Integer('-2'),
            i3 = new Integer('-1');

        expect(i1.floorRemainder(i2).isEqual(i3)).to.eql(true);
    });
});
