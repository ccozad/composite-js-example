const Order = require('./orders/order');
const Food = require('./items/food');
const Drink = require('./items/drink');
const Combo = require('./items/combo');
const ConstantOffTotal = require('./discounts/constantOffTotal');
const SalesTax = require('./fees/salesTax');

// Create a complex order and calculate the bill
const order = new Order();
        
const tax = new SalesTax(10, "CA", 300, 'TAX');
order.addEntry(tax);
        
const burger= new Food('Burger', 7, '1');
const fries = new Food('Fries', 3, '2');
const drink = new Drink('Large', 5, 'Pepsi', 100, '3');
const combo = new Combo('Combo', 100, 'a');
combo.addItem(burger);
combo.addItem(fries);
combo.addItem(drink);
order.addEntry(combo);

const discount = new ConstantOffTotal(5, 200, 'SAVE5');
order.addEntry(discount);

const bill = order.calculateBill();
console.log(bill);

