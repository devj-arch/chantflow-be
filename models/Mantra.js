import mongoose from "mongoose"

const mantraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity', required: false },
  description: { type: String, required: false },
}, { timestamps: true })

export default mongoose.model('Mantra', mantraSchema)

// import mongoose from 'mongoose';

// const mantraSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity', required: false },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // for custom mantras
// });

// export default mongoose.model('Mantra', mantraSchema);
