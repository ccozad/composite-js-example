const SalesTax = require('../fees/salesTax');
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("SalesTax class", function () {
    it("should create a new SalesTax object", () => {
        const fee = new SalesTax(7, "CA", 300, '1234');
        assert.equal(fee.options.name, '7% CA sales tax');
        assert.equal(fee.options.taxPercentage, 7);
        assert.equal(fee.options.municipality, 'CA');
        assert.equal(fee.options.billingPriority, 300);
        assert.equal(fee.options.billingCode, '1234');
    });

    it("should return the billing priority", function () {
        const fee = new SalesTax(7, "CA", 300, '1234');
        assert.equal(fee.billingPriority, 300);
    });

    it("should return the billing code", function () {
        const fee = new SalesTax(7, "CA", 300, '1234');
        assert.equal(fee.billingCode, '1234');
    });

    it("should calculate the bill", function () {
        const fee = new SalesTax(7, "CA", 300, '1234');
        const bill = {
            total: 100.0,
            items: []
        };
        fee.calculate(bill);
        assert.equal(bill.total, 107);
    });

    it("should render the object", function () {
        const fee = new SalesTax(7, "CA", 300, '1234');
        const obj = fee.renderToObject();
        assert.equal(obj.type, 'salesTax');
        assert.equal(obj.name, '7% CA sales tax');
        assert.notExists(obj.price);
        assert.equal(obj.billingPriority, 300);
        assert.equal(obj.billingCode, '1234');

        //Price is undefined until calculate is called
        fee.calculate({ total: 200.0 });
        const obj2 = fee.renderToObject();
        assert.closeTo(obj2.price, 14, 0.01);
    });

    it("should render the string", function () {
        const fee = new SalesTax(7, "CA", 300, '1234');
        const str = fee.renderToString();
        assert.equal(str, '7% CA sales tax');
    });
});