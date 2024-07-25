module.exports = class Order {
    constructor() {
        this.entries = [];
    }

    addEntry(entry) {
        this.entries.push(entry);
    }

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
}