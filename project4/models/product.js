const db = require('../util/database')

module.exports = class Product{
    constructor(title, imgurl, description, price ){
        this.title = title
        this.imgUrl = imgurl
        this.description = description
        this.price = price
        this.qty = 0;
    }
    save(){
      return db.execute('INSERT INTO products(title, price, description, imgUrl) VALUES (?,?,?,?)', [this.title, this.price, this.description, this.imgUrl])
    }

    static delete(prodId){
      return db.execute('DELETE FROM products WHERE id = ?',[prodId])
    }

    static fetchAllProducts(){
      return db.execute('SELECT * FROM products')
    }

    static findById(id){
      return db.execute('SELECT * FROM products WHERE id = ?',[id])
    }
}