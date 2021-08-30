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

router.route('/url').post((req, res) => {
  const url = req.body.url;
  let datas;
  (async () => {
    const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(url, {waitUntil:"networkidle2"});
    //await page.waitForXPath('/html/body/div[2]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[2]/div[2]')
    //const element = (await page.$x("/html/body/div[2]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[2]/div[2]"))[0];
    //const title = await page.$x("/html/body/div[2]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[2]/div[1]");
    //let text = await page.evaluate(h1 => h1.textContent, title[0]);
   // console.log(title)
    
    datas = await page.evaluate(()=>{
      let date = document.querySelector('.woocommerce-product-details__short-description :nth-child(2)').innerText;;
      let version = document.querySelector('.woocommerce-product-details__short-description :nth-child(3)').innerText;;
       (async () => {
         const newproduct = new Product({
          url,
          data
         });
          newproduct.save()
            .then(() => res.json('Saved'))
            .catch(err => res.status(400).json('Error: ' + err));
       }
      
      return{
        date,
        version
      }
    })
    //res.status(200).json(datas);
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
