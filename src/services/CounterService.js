export function getOrderPayCounter() {
    const orderpay = localStorage.getItem('counterOrderPay')
    return orderpay
}

export function setOrderPayCounter() {
    const orderpay = localStorage.setItem('counterOrderPay')
    console.log('ordercount val', orderpay)
}