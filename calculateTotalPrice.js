/*
    There is a class called OrderItem which has properties ID, OrderID, ProductID, Price,
    Qty. Create a function to calculate the total price of the order with the parameter in
    the function in the form of an array of OrderItems.
    NB : You can choose whatever language that you want
*/

class OrderItem {
    constructor(ID, OrderID, ProductID, Price, Qty) {
        this.ID = ID;
        this.OrderID = OrderID;
        this.ProductID = ProductID;
        this.Price = Price;
        this.Qty = Qty;
    }

    getValue(props){
        return this[props]; 
    }
}

// Test Value
const OrderItems = [
    new OrderItem(1, 1, 1, 1000, 1),
    new OrderItem(2, 1, 2, 2000, 2),
    new OrderItem(3, 2, 1, 1000, 3),
    new OrderItem(4, 2, 2, 2000, 4),
]

/* Array Reduce =  arr.reduce(callback(accumulator, currentValue), initialValue) */
function calculateTotalPrice(orderItems) {
    // prderItems.reduce((totalPrice, current) => {return totalPrice + (current.Price * current.Qty)}, 0)

    let totalPrice = 0;
    orderItems.forEach((item) => {
        totalPrice = totalPrice + (item.Price * item.Qty);
    })

    console.log(totalPrice)
    return totalPrice;
}


console.log(OrderItems)
console.log(calculateTotalPrice(OrderItems))