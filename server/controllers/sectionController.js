import Section from '../models/Section.js';

//GET /api/sections
async function getSections(req, res) {
  try {
    const { boardId } = req.params;

    const sections = await Section.find({
      boardId: boardId,
      isDeleted: false,
    }).lean();

    const result = sections.map((s) => ({ ...s, id: s._id.toString() }));

    return res.json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch sections' });
  }
}

// POST /api/sections
async function createSection(req, res) {
  try {
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ error: 'Failed to create section' });
    }

    const { boardId } = req.params;

    const section = await Section.insertOne({ boardId, sectionName });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create section' });
  }
}

// PUT /api/sections/:sectionId
async function updateSection(req, res) {
  try {
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { sectionId } = req.params;

    const sectionDetails = await Section.findById(sectionId);

    if (!sectionDetails) {
      return res.status(400).json({ error: 'Section not found' });
    }

    await Section.findByIdAndUpdate(sectionId, { sectionName });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update section' });
  }
}

// DELETE /api/sections/:sectionId
async function deleteSection(req, res) {
  try {
    const { sectionId } = req.params;

    const sectionDetails = await Section.findById(sectionId);

    if (!sectionDetails) {
      return res.status(400).json({ error: 'Section not found' });
    }

    await Section.findByIdAndUpdate(sectionId, { isDeleted: true });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete section' });
  }
}

export { getSections, createSection, updateSection, deleteSection };
