const PercentageOffTotal = require('../discounts/percentageOffTotal');
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("PercentageOffTotal class", function () {
    it("should create a new PercentageOffTotal object", () => {
        const discount = new PercentageOffTotal(10, 200, '1234');
        assert.equal(discount.options.name, '10% off total');
        assert.equal(discount.options.percentageOff, 10);
        assert.equal(discount.options.billingPriority, 200);
        assert.equal(discount.options.billingCode, '1234');
    });

    it("should return the billing priority", function () {
        const discount = new PercentageOffTotal(10, 200, '1234');
        assert.equal(discount.billingPriority, 200);
    });

    it("should return the billing code", function () {
        const discount = new PercentageOffTotal(10, 200, '1234');
        assert.equal(discount.billingCode, '1234');
    });

    it("should calculate the bill", function () {
        const discount = new PercentageOffTotal(10, 200, '1234');
        const bill = {
            total: 100.0,
            items: []
        };
        discount.calculate(bill);
        assert.equal(bill.total, 90);
    });

    it("should render the object", function () {
        const discount = new PercentageOffTotal(10, 200, '1234');
        const obj = discount.renderToObject();
        assert.equal(obj.type, 'percentageOffTotal');
        assert.equal(obj.name, '10% off total');
        assert.notExists(obj.price);
        assert.equal(obj.billingPriority, 200);
        assert.equal(obj.billingCode, '1234');

        //Price is undefined until calculate is called
        discount.calculate({ total: 100.0 });
        const obj2 = discount.renderToObject();
        assert.equal(obj2.price, -10);
    });

    it("should render the string", function () {
        const discount = new PercentageOffTotal(10, 200, '1234');
        const str = discount.renderToString();
        assert.equal(str, '10% off total');
    });
});