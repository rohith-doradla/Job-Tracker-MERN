import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },

    sectionName: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Section =
  mongoose.models.Section || mongoose.model('Section', sectionSchema);

export default Section;
