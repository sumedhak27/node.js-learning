const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product{
    constructor(title, imgurl, description, price ){
        this.title = title
        this.imgUrl = imgurl
        this.description = description
        this.price = price
        this.qty = 0;
    }
    save(){
      this.id = Math.random().toString()
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err =>{
                console.log(err)
            })
        })
    }

    static delete(prodId , cb){
      getProductsFromFile(products => {
        let index = 0;
        for(let prod of products){
          if(prod.id === prodId){
            products.splice(index, 1)
          }
          index++
        }
        fs.writeFile(p, JSON.stringify(products), (err,succ) =>{
          if(err){
            console.log(err)
          }
          else{
            cb()
          }
        })

      })

    }

    static fetchAllProducts(cb){
        getProductsFromFile(cb)
    }

    static findById(id, cb){
      getProductsFromFile(products => {
        const product = products.find( p => p.id == id)
        console.log('sumedh2')
        cb(product)
      })
        
    }
}