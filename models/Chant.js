// import mongoose from "mongoose";

// const ChantSchema = new mongoose.Schema({
//   deity: [
//     {

//     }
//   ],

//   pastChants: [
//     {
//     }
//   ],
//   mantras: [
//     {

//     }
//   ]
// });

// const Chant = mongoose.model("Chant", ChantSchema);
// export default Chant;

import mongoose from 'mongoose';

const ChantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, required: true }, // for guest users
  mantraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mantra', required: true },
  duration: { type: Number, required: true }, // in seconds or minutes
  mood: { type: String }, // optional — e.g., peaceful, tired, stressed
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Chant', ChantSchema);
