import express from "express";
import Mantra from "../models/Mantra.js";

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const {deityId} = req.query
    let mantras
    if(deityId) {
      mantras = await Mantra.find({ deityId }).populate('deityId')
    } else {
      mantras = await Mantra.find().populate('deityId')
    }
    res.json(mantras)
  }
  catch(err) {
    console.error(err)
  }
})

export default router
