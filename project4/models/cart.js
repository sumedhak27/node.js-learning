const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')
const p = path.join(rootDir, 'data' , 'cart.json' )

const fetchCartFromFile = cb => {
    fs.readFile( p , (err, fileContent) => {
        if(!err){
            cb(JSON.parse(fileContent))
        }
        else{
            cb({ products: [], totalPrice: 0})
        }
    })
}

module.exports = class Cart{
    static addProduct(id, price){ 
        fetchCartFromFile((cart) => {
            const currProIndex = cart.products.findIndex( prod => prod.id ==id )
            const currPro = cart.products[currProIndex]
            let updatedPro
            if(currPro){
                updatedPro = {...currPro}
                updatedPro.qty++
                cart.products[currProIndex].qty++ 
            }
            else{
                updatedPro = {id: id , price: price}
                cart.products.push(updatedPro)
            }
            cart.totalPrice +=  updatedPro.price
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
            
        })
    }
}