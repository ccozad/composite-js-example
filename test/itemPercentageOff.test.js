const ItemPercentageOffTotal = require('../discounts/itemPercentageOff');
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("ItemPercentageOffTotal class", function () {
    it("should create a new ItemPercentageOffTotal object", () => {
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        assert.equal(discount.options.name, '10% off item');
        assert.equal(discount.options.targetBillingCode, '1234');
        assert.equal(discount.options.percentageOff, 10);
        assert.equal(discount.options.billingPriority, 200);
        assert.equal(discount.options.billingCode, '1234');
    });

    it("should return the billing priority", function () {
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        assert.equal(discount.billingPriority, 200);
    });

    it("should return the billing code", function () {
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        assert.equal(discount.billingCode, '1234');
    });

    it("should calculate the bill", function () {
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        const bill = {
            total: 100.0,
            items: [
                {
                    options: {
                        billingCode: '1234',
                        price: 100
                    }
                }
            ]
        };
        discount.calculate(bill);
        assert.equal(bill.total, 90);
    });

    it("should calculate the bill when there are multiple items", function () {
        // The discount should be applied to the most expensive item
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        const bill = {
            total: 100.0,
            items: [
                {
                    options: {
                        billingCode: '1234',
                        price: 30
                    }
                },
                {
                    options: {
                        billingCode: '1234',
                        price: 50
                    }
                },
                {
                    options: {
                        billingCode: '1234',
                        price: 20
                    }
                }
            ]
        };
        discount.calculate(bill);
        assert.equal(bill.total, 95);
    });

    it("should calculate the bill when there are no items", function () {
        const discount = new ItemPercentageOffTotal('1234', 10, 200, '1234');
        const bill = {
            total: 100.0,
            items: []
        };
        discount.calculate(bill);
        assert.equal(bill.total, 100);
    });
});