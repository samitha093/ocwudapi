const router = require('express').Router();
let Product = require('../models/product.model');
const puppeteer = require('puppeteer');

router.route('/').get((req, res) => {
  res.status(200).json("You Are Connected to api");
});

router.route('/items').get((req, res) => {
  Product.find({})
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/urldatabase').post((req, res) => {
  const url = req.body.url;
  Product.find({url:req.body.url})
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/urlweb').post((req, res) => {
  const url = req.body.url;
  let datas;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {waitUntil:"networkidle2"});

    datas = await page.evaluate(()=>{
      let date = document.querySelector('.woocommerce-product-details__short-description :nth-child(2)').innerText;;
      let version = document.querySelector('.woocommerce-product-details__short-description :nth-child(3)').innerText;;
      return{
        date,
        version
      }
    })
    res.json(datas)
    await browser.close();
  })();
});


router.route('/urlsave').post((req, res) => {
  const url = req.body.url;
  let datas;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {waitUntil:"networkidle2"});

    datas = await page.evaluate(()=>{
      let date = document.querySelector('.woocommerce-product-details__short-description :nth-child(2)').innerText;;
      let version = document.querySelector('.woocommerce-product-details__short-description :nth-child(3)').innerText;;
      return{
        date,
        version
      }
    })
    const last_update_date = datas.date;
    const last_update = datas.version;
    const newproduct = new Product({
      url,
      last_update_date,
      last_update
    });
    newproduct.save()
      .then(() => res.json('Saved'))
      .catch(err => res.status(400).json('Error: ' + err));
    await browser.close();
  })();
});




  module.exports = router;