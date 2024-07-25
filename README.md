# Introduction

The composite pattern gives a uniform interface to collections and individual objects, allowing both to be processed by the same logic. In this example we'll use a restaurant bill to show how the composite pattern can be used to model a real world problem.

Using the composite pattern to calculate the total for an order
```js
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
```

The results of the calculation
```js
{
  total: 11,
  items: [
    {
      type: 'combo',
      name: 'Combo: Burger, Fries, Large - Pepsi',
      price: 15,
      billingPriority: 100,
      billingCode: 'a'
    },
    {
      type: 'constantOffTotal',
      name: 'Up to $5 off total',
      price: -5,
      billingPriority: 200,
      billingCode: 'SAVE5'
    },
    {
      type: 'salesTax',
      name: '10% CA sales tax',
      price: 1,
      billingPriority: 300,
      billingCode: 'TAX'
    }
  ]
}
```

# The domain

The bill we will model will be for a fast food type establishment that sells multiple items as a combo and individual items. The goal will be to calculate the total price the customer needs to pay. Besides the food itself, we'll include the idea of non-food fees such as tax and card fees. Discounts such as coupons, sales and manager overrides will also be included.

## Items

 - Food (Hamburger, fries, etc.)
 - Drink (Soda, milk, etc.)
 - Combo (Some combination of food and drinks)

## Fees

 - Tax (Based on locality, calculated on the total)

## Discounts

 - Constant value off (constant amount off not to exceed the total)
 - Percentage value off

 ## Bringing it all together

  - A customer paying for an order wants to know the final amount and the itemized list of fees and deductions. We'll need some type of shared state to operate on.

```js
const bill = {
    total: 0.0,
    items:[],
}
```

Each entry on the bill needs to be able to:
 - Identify a billing code
 - Indicate priority to influence order of operations
 - Calculate the impact to the total
 - Render itself on the final bill

```js
class BillEntry {
    billingCode()
    billingPriority()
    calculate(bill)
    renderToString()
    renderToObject()
}
```

Processing a bill should do all the following:

 1. Sort all bill entries in ascending priority
 2. Iterate through each item
    1. Call calculate with the current bill state
    2. Update the items on the bill
 3. Return the final bill

 Because every entry, whether it be simple or complex has a uniform interface, we can process any combination of orders using the same logic.

 ```js
 calculateBill() {
    const bill = {
        total: 0.0,
        items: []
    };
    this.entries = this.entries.sort((a, b) => a.billingPriority - b.billingPriority);
    this.entries.forEach(entry => {
        bill.total = entry.calculate(bill);
        bill.items.push(entry.renderToObject());
    });

    return bill;
}
```

Resources
 - https://en.wikipedia.org/wiki/Composite_pattern
 - https://refactoring.guru/design-patterns/composite
