import Job from '../models/Job.js';

// GET api/jobs/sectionId
async function getJobs(req, res) {
  try {
    const { sectionId } = req.params;

    // console.log(sectionId);

    const jobs = await Job.find({
      sectionId: sectionId,
      isDeleted: false,
    }).lean();

    // console.log(jobs);

    const result = jobs.map((job) => ({ ...job, id: job._id.toString() }));

    console.log(result);

    return res.json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

// POST api/jobs/sectionId

async function createJob(req, res) {
  try {
    const { companyName, jobName, description } = req.body;

    if (!companyName || !jobName) {
      return res.status(400).json({ error: 'Failed to create job' });
    }

    const { sectionId } = req.params;

    const job = await Job.insertOne({
      sectionId,
      companyName,
      jobName,
      description,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to create Job' });
  }
}

//PUT api/jobs/sectionId
async function updateJob(req, res) {
  try {
    const { companyName, jobName, location, jobLink, description } = req.body;

    if (!companyName || !jobName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { jobId } = req.params;

    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
      return res.status(400).json({ error: 'Job not found' });
    }

    await Job.findByIdAndUpdate(jobId, {
      companyName,
      jobName,
      location,
      jobLink,
      description,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update Job' });
  }
}

// DELETE api/jobs/sectionId
async function deleteJob(req, res) {
  try {
    const { jobId } = req.params;

    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
      return res.status(400).json({ error: 'Job not found' });
    }
    await Job.findByIdAndUpdate(jobId, { isDeleted: true });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete job' });
  }
}

export { getJobs, createJob, updateJob, deleteJob };
