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

router.put('/:id', async (req, res, next) => {
  req.snippet = await Snippet.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let snippet = req.snippet
    snippet.title = req.body.title
    snippet.description = req.body.description
    snippet.code = req.body.code

    try {
      console.log('trying to save.')
      snippet = await snippet.save()
      res.redirect(`https://snip-bin.herokuapp.com/${snippet.id}`)
    } catch (e) {
      console.log(e)
      res.render(`snippet/${path}`, { snippet: snippet })
    }
  }
}

module.exports = router
