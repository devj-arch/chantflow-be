// import mongoose from "mongoose"

// const deitySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
// })

// export default mongoose.model('Deity', deitySchema)

import mongoose from 'mongoose';

const deitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null = default deity
});

export default mongoose.model('Deity', deitySchema);
