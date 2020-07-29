function totalPriceCart(data){
    let totalCartPrice = 0
    for (let i = 0; i < data.length; i++) {
        let price = data[i].Product.price
        let quantity = data[i].quantity
        let totalPrice = price*quantity
        totalCartPrice += totalPrice
    }
    return totalCartPrice
}

module.exports = totalPriceCart