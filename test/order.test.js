const Order = require('../orders/order');
const Food = require('../items/food');
const Drink = require('../items/drink');
const Combo = require('../items/combo');
const ConstantOffTotal = require('../discounts/constantOffTotal');
const SalesTax = require('../fees/salesTax');

const fixEsm = require('fix-esm');
const chai = fixEsm.require('chai');
const assert = chai.assert;

describe("Order class", function () {
    it("should create a new Order object", () => {
        const order = new Order();
        assert.exists(order);
        assert.exists(order.entries);
    });

    it("should add an item to the order", function () {
        const order = new Order();
        const food = new Food('Pizza', 10, '1234');
        order.addEntry(food);
        assert.equal(order.entries.length, 1);
    });

    it("should calculate a complex order", function () {
        const order = new Order();
        
        const tax = new SalesTax(10, "CA", 300, 'TAX');
        order.addEntry(tax);
        
        const food = new Food('Pizza', 10, '1');
        const drink = new Drink('Large', 5, 'Pepsi', 100, '2');
        const combo = new Combo('Combo', 100, 'a');
        combo.addItem(food);
        combo.addItem(drink);
        order.addEntry(combo);

        const discount = new ConstantOffTotal(5, 200, 'SAVE5');
        order.addEntry(discount);

        //Based on the priority order, we should see the following:
        // Process the combo first, then the discount, then the tax
        // 1. Combo: 10 + 5 = 15
        // 2. Discount: 15 - 5 = 10
        // 3. Tax: 10 + 1 = 11

        const bill = order.calculateBill();
        assert.equal(bill.total, 11);
    });

});