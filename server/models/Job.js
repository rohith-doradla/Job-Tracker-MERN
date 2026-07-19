import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    companyName: { type: String, required: true },
    jobName: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    jobLink: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;
