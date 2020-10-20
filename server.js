const express = require('express')
const mongoose = require('mongoose')
const snippetRouter = require('./routes/snippets')
const methodOverride = require('method-override')
const app = express()
const Snippet = require('./models/snippet')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://HarshTest:82374jcps@snipbin.k5b8h.mongodb.net/SnipBin?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  }, () => console.log('Connected to DB!'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/views/styling'))
app.use(express.static(__dirname + '/lib/codemirror'))
app.use(express.static(__dirname + '/lib/codemirror'))
app.use(express.static(__dirname + '/lib/codemirror'))
app.use(express.static(__dirname + '/lib/codemirror'))
app.use(express.static(__dirname + '/lib/highlight-js/styles'))

app.get('/', async (req, res) => {
  // const snippets = await Snippet.find().sort({ createdAt: 'desc' })
  // res.render('snippet/index', { snippets: snippets })

  res.render('snippet/new', { snippet: new Snippet() })
})

app.use('/snippet', snippetRouter)

const port = process.env.PORT || '5000';
app.listen(port, () => console.log('Listening'))
