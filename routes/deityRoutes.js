import express from "express";
import Deity from '../models/Deity.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const {name} = req.query
    let deities
    if(name) {
      deities = await Deity.find({name})
    } else {
      deities = await Deity.find()
    }
    res.json(deities)
  }
  catch(err) {
    console.error(err)
  }
})

export default router
