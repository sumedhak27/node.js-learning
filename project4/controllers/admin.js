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
  res.redirect('/products')
}

exports.getEditProduct = (req, res, next)=>{
  let editMode = req.query.edit
  console.log("edit : " + editMode)
  // if(!editMode){
  //   return res.redirect('/')
  // }
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    console.log(product)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/edit-product',
      editing: true,
      prod: product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  Product.delete(req.params.productId,() => {
    const title = req.body.title
    const imgUrl = req.body.imgUrl
    const description = req.body.description
    const price = req.body.price
    const product = new Product(title,imgUrl,description,price)
    product.save()
    res.redirect('/admin-products')
  })
  
}

exports.postDeleteProduct = (req, res, next) => {
  Product.delete(req.params.productId, () => {
    res.redirect("/admin-products")
  })
}

exports.getAllProducts = (req, res, next) => {
    Product.fetchAllProducts(products => {
      res.render("admin/products", {
        prod: products,
        pageTitle: "All products",
        path: "/admin-products"
      });
    })
}