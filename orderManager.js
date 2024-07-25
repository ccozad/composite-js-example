module.export = class OrderManager {
    constructor() {
        this.orderEntries = [];
    }

    addOrderEntry(entry) {
        this.orderEntries.push(entry);
    }

    calculateBill() {
        const bill = {
            total: 0.0,
            items: []
        };
        this.orderEntries.forEach(entry => {
            bill.total = entry.calculate(bill);
            bill.items.push(entry.renderToObject());
        });

        return bill;
    }
}