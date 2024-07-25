# Introduction

The composite pattern gives a uniform interface to collections and individual objects, allowing both to be processed by the same logic. In this example we'll use a restaurant bill to show how the composite pattern can be used to model a real world problem.

# The domain

The bill we will model will be for a fast food type establishment that sells multiple items as a combo and individual items. The goal will be to calculate the total price the customer needs to pay. Besides the food itself, we'll include the idea of non-food fees such as tax and card fees. Discounts such as coupons, sales and manager overrides will also be included.

## Items

 - Food (Hamburger, fries, etc.)
 - Drink (Soda, milk, etc.)
 - Combo (Some combination of food and drinks)

## Fees

 - Tax (Based on locality, calculated on the total)
 - Fee (credit card fee, etc.)

## Discounts

 - Coupons (reduces the cost of one item or the total)
 - Sale (Reduces the cost of one item or the total)
 - Manager override (Acts like a coupon)

 ## Bringing it all together

  - A customer paying for an order wants to know the final amount and the itemized list of fees and deductions. We'll need some type of shared state to operate on.

```js
const bill = {
    total: 0.0,
    items:[],
}
```

Each item on the bill needs to have a billable property that can:
 - Calculate the impact to the total
 - Indicate priority to influence order of operations
 - Render itself on the final bill
 - Self identify a billing code

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
 2. Iterate through each item and call calculate with the current bill state
