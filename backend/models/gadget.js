import mongoose from 'mongoose';

const gadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  specs: {
    display: String,
    processor: String,
    storageOptions: [String],
    battery: String,
    os: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Gadget = mongoose.model('Gadget', gadgetSchema);

export default Gadget;
