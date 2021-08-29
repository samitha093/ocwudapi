const router = require('express').Router();
let Product = require('../models/product.model');
const puppeteer = require('puppeteer');



router.route('/').get((req, res) => {
  Product.find({})
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/url').post((req, res) => {
  const url = req.body.url;
  let datas;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {waitUntil:"networkidle2"});

    datas = await page.evaluate(()=>{
      let data = document.querySelector('div[class="woocommerce-product-details__short-description"]').innerText;
      return{
        data
      }
    })
    res.status(400).json(datas);
    await browser.close();
  })();
});

router.route('/add').post((req, res) => {
  const url = req.body.url;
  const data = req.body.data;
  const newproduct = new Product({
    url,
    data
});

newproduct.save()
  .then(() => res.json('Saved'))
  .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;