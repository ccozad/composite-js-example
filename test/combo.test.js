const Drink = require("../items/drink");
const Food = require("../items/food");
const Combo = require("../items/combo");
const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("Combo class", function () {
    it("should create a new Combo object", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        assert.equal(combo.options.name, 'Combo');
        assert.equal(combo.options.price, 15);
        assert.equal(combo.options.billingPriority, 100);
        assert.equal(combo.options.billingCode, '1234');
    });

    it("should return the billing priority", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        assert.equal(combo.billingPriority, 100);
    });

    it("should return the billing code", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        assert.equal(combo.billingCode, '1234');
    });

    it("should calculate the bill", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        const bill = {
            total: 0.0,
            items: []
        };
        combo.calculate(bill);
        assert.equal(bill.total, 15);
    });

    it("should render the object", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        const obj = combo.renderToObject();
        assert.equal(obj.type, 'combo');
        assert.equal(obj.name, 'Combo: Pizza, Large - Pepsi');
        assert.equal(obj.price, 15);
        assert.equal(obj.billingPriority, 100);
        assert.equal(obj.billingCode, '1234');
    });

    it("should render the string", function() {
        const food = new Food('Pizza', 10, 100, '1234');
        const drink = new Drink('Large', 5, "Pepsi", 100, '1234');
        const combo = new Combo('Combo', 100, '1234');
        combo.addItem(food);
        combo.addItem(drink);
        const str = combo.renderToString();
        assert.equal(str, 'Combo: Pizza, Large - Pepsi');
    });
});