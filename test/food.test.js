const Food = require("../items/food");
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("Food class", function () {
    it("should create a new Food object", () => {
        const food = new Food('Pizza', 10, 100, '1234');
        assert.equal(food.options.name, 'Pizza');
        assert.equal(food.options.price, 10);
        assert.equal(food.options.billingPriority, 100);
        assert.equal(food.options.billingCode, '1234');
    });

    it("should return the billing priority", function () {
        const food = new Food('Pizza', 10, 100, '1234');
        assert.equal(food.billingPriority, 100);
    });

    it("should return the billing code", function () {
        const food = new Food('Pizza', 10, 100, '1234');
        assert.equal(food.billingCode, '1234');
    });

    it("should calculate the bill", function () {
        const food = new Food('Pizza', 10, 100, '1234');
        const bill = {
            total: 0.0,
            items: []
        };
        food.calculate(bill);
        assert.equal(bill.total, 10);
    });

    it("should render the object", function () {
        const food = new Food('Pizza', 10, 100, '1234');
        const obj = food.renderToObject();
        assert.equal(obj.type, 'food');
        assert.equal(obj.name, 'Pizza');
        assert.equal(obj.price, 10);
        assert.equal(obj.billingPriority, 100);
        assert.equal(obj.billingCode, '1234');
    });

    it("should render the string", function () {
        const food = new Food('Pizza', 10, 100, '1234');
        const str = food.renderToString();
        assert.equal(str, 'Pizza');
    });
});