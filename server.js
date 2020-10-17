const express = require('express')
const mongoose = require('mongoose')
const Snippet = require('./models/snippet')
const snippetRouter = require('./routes/snippets')
const methodOverride = require('method-override')
const app = express()

const mongoconnection = require('./mongoclient.json')

mongoose.connect(mongoconnection.mongoconnectionid, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  }, () => console.log('Connected to DB!'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/views/styling'))
app.use(express.static(__dirname + '/lib/codemirror/js'))
app.use(express.static(__dirname + '/lib/codemirror/style'))
app.use(express.static(__dirname + '/lib/codemirror/themes'))

app.get('/', async (req, res) => {
  const snippets = await Snippet.find().sort({ createdAt: 'desc' })
  res.render('snippet/index', { snippets: snippets })
})

app.use('/snippet', snippetRouter)

app.listen(5000) 