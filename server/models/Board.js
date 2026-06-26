import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    boardName: {
      type: String,
      required: true,
    },
    
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default Board;
