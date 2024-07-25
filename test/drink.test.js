const Drink = require("../items/drink");
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("Drink class", function () {
    it("should create a new Drink object", () => {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        assert.equal(drink.options.name, 'Large');
        assert.equal(drink.options.price, 5);
        assert.equal(drink.options.flavor, 'Pepsi');
        assert.equal(drink.options.billingPriority, 100);
        assert.equal(drink.options.billingCode, '1234');
    });

    it("should return the billing priority", function () {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        assert.equal(drink.billingPriority, 100);
    });

    it("should return the billing code", function () {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        assert.equal(drink.billingCode, '1234');
    });

    it("should calculate the bill", function () {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const bill = {
            total: 0.0,
            items: []
        };
        drink.calculate(bill);
        assert.equal(bill.total, 5);
    });

    it("should render the object", function () {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const obj = drink.renderToObject();
        assert.equal(obj.type, 'drink');
        assert.equal(obj.name, 'Large - Pepsi');
        assert.equal(obj.price, 5);
        assert.equal(obj.billingPriority, 100);
        assert.equal(obj.billingCode, '1234');
    });

    it("should render the string", function () {
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const str = drink.renderToString();
        assert.equal(str, 'Large - Pepsi');
    });

    it("should render the string when flavor is undefined", function () {
        const drink = new Drink('Large', 5, undefined, 100, '1234');
        const str = drink.renderToString();
        assert.equal(str, 'Large - Drink');
    });
});