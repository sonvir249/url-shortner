const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()

// Connect database.
mongoose.connect('mongodb://localhost:27017/urlShortener')

// Set view engine.
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

// homepage.
app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls})
})

// post request to generate short urls.
app.post('/shortUrls', async (req, res) => {
  console.log(req.body.fullUrl);
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
})

// Redirect short urls to main url.
app.get('/:shortUrl', async (req, res) => {
  const getShortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
  console.log(getShortUrl);
  if (getShortUrl == null) return res.sendStatus(404)

  getShortUrl.clicks++
  getShortUrl.save()
  res.redirect(getShortUrl.full)
})

app.listen(process.env.POT || 5001);
