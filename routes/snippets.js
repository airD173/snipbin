const express = require('express')
const Snippet = require('../models/snippet')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('snippet/new', { snippet: new Snippet() })
})

router.get('/:id', async (req, res) => {
  paste  = await Snippet.findById(req.params.id)
  res.render('snippet/show', { snippet: paste })
})

router.post('/', async (req, res, next) => {
  req.snippet = new Snippet()
  
  next()
}, saveArticleAndRedirect('new'))

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let snippet = req.snippet
    snippet.title = req.body.title
    snippet.code = req.body.code
    
    try {
      snippet = await snippet.save()
      res.redirect(`/snippet/${snippet.id}`)
    } catch (e) {
      console.log(e)
      res.render(`snippet/${path}`, { snippet: snippet })
    }
  }
}

module.exports = router
