const express = require('express')
const mongoose = require('mongoose')
const snippetRouter = require('./routes/snippets.js')
const methodOverride = require('method-override')
const app = express()
const Snippet = require('./models/snippet')

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, () => console.log('Connected to Database.'))

console.log(process.env.MONGO_CONNECTION)

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
  res.render('snippet/new', { snippet: new Snippet() })
})

app.use('/snippet', snippetRouter)

const port = process.env.PORT || '5000';
app.listen(port, () => console.log('Listening'))
