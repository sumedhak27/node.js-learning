const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAllProducts()
    .then(([products]) => {
      res.render("shop/product-list", {
        prod: products,
        pageTitle: "All products",
        path: "/products"
      });
    })
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId
  Product.findById(productId)
  .then(([product]) => {
    res.render("shop/product-detail", {
      prod: product[0],
      pageTitle: product.title ,
      path: "/product-detail"
    })
  })
  .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
    Product.fetchAllProducts()
    .then(([products]) => {
        res.render("shop/index", {
          prod: products,
          pageTitle: "Shop",
          path: "/"
        });
      })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart' ,{
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.postCart = (req, res, next) => {
    // const prodId = req.body.productId;
    // Product.findById(prodId, (product) => {
    //   Cart.addProduct(prodId, product.price)
    // })
    res.redirect('/cart')
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}