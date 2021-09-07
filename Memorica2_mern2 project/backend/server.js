require('./atlas')
const model_mem = require('./memorymodel')

const express = require('express')
const app = new express()
const bp = require('body-parser')

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

// *****post********
app.post('/mem_post', async (req, res) => {
  const new_mem = await model_mem.Model({
    name: req.body.n,
    Memory: req.body.m,
    name2_printed: req.body.n2
  })
  new_mem.save((err, ok) => {
    if (ok) {
      // const a='posted'
      console.log('Memory Saved')
      model_mem.Model.findOne({ name: req.body.n }, (er, ok) => {
        if (ok) res.send(ok)
      }).select({ _id: 1 })
    }
    if (err) {
      console.log('Error occured while saving memory')
    }
  })
//  res.end()
})

// **********delete******
app.delete('/mem_post', async (req, res) => {
  const id = req.body.id
  model_mem.Model.deleteMany({ _id: id }, (err, ok) => {
    if (ok) {
      console.log('deleted')
      res.send({ mssg: 'deleted' })
    }
    if (err) {
      console.log('error occured while deleting')
      res.send({ mssg: ' Invalid id' })
    }
  })
})

// *************getid************
app.put('/mem_post', async (req, res) => {
  try {
    const finder_name = req.body.name
    await model_mem.Model.find({ name: finder_name }, (err, ok) => {
      if (ok) {
        console.log(ok)
        res.send(ok)
      }

      if (err) {
        console.log('sorry')
        res.send('<h1>Invalid User</h1>')
      }
    })

    res.end()
  } catch (e) {
    res.send(e)
  }
})

// ***********update***********
app.patch('/mem_post', async (req, res) => {
  const id = req.body.id
  const new_name = req.body.new_name
  const new_mem = req.body.new_mem
  model_mem.Model.updateOne({ _id: id }, { $set: { name: new_name, Memory: new_mem } }, (err, ok) => {
    if (ok) { res.send({ a: 'updated' }) }
    if (err) {
      res.send({ a: 'server error occured while updating' })
    }
  })

  res.end()
})

// ************show all records***************
app.get('/show', async (req, res) => {
  const all_mem = await model_mem.Model.find()
  res.send(all_mem)
})

app.listen(4000)
