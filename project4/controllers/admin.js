const Product = require('../models/product')

exports.getAddProduct = (req, res, next)=>{
  res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      editing: false
  })
}

exports.postAddProduct = (req, res, next)=>{
  const title = req.body.title
  const imgUrl = req.body.imgUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product(title,imgUrl,description,price)
  product.save()
  .then(() => {
    res.redirect('/admin-products')
  })
  .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next)=>{
  let editMode = req.query.edit
  console.log("edit : " + editMode)
  // if(!editMode){
  //   return res.redirect('/')
  // }
  const prodId = req.params.productId
  Product.findById(prodId) 
  .then(([product]) => {
    console.log(product)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/edit-product',
      editing: true,
      prod: product[0]
    })
  })
  .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  Product.delete(req.params.productId)
  .then(() => {
    const title = req.body.title
    const imgUrl = req.body.imgUrl
    const description = req.body.description
    const price = req.body.price
    const product = new Product(title,imgUrl,description,price)
    product.save()
    res.redirect('/admin-products')
  })
  .catch(err => console.log(err))
  
}

exports.postDeleteProduct = (req, res, next) => {
  Product.delete(req.params.productId)
  .then(() => {
    res.redirect("/admin-products")
  })
  .catch(err => console.log(err))
}

exports.getAllProducts = (req, res, next) => {
    Product.fetchAllProducts()
    .then(([products]) => {
      res.render("admin/products", {
        prod: products,
        pageTitle: "All products",
        path: "/admin-products"
      });
    })
    .catch(err => console.log(err))
}