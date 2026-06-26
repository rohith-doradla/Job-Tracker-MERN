import Section from '../models/Section.js';

import { useParams } from 'react-router-dom';

//GET /api/sections
async function getSections(req, res) {
  try {
    const { boardId } = useParams();

    const sections = await Section.find({ boardId: boardId }).lean();

    const result = sections.map((s) => ({ ...s, id: s._id.toString() }));

    return res.json({ data: result });
  } catch (error) {}
}

// POST /api/sections
async function createSection(req, res) {
  try {
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ error: 'Failed to create section' });
    }

    const { boardId } = useParams();

    const section = await Section.insertOne({ boardId, sectionName });

    return res.json({ success: true });
  } catch (error) {}
}

// PUT /api/sections/:sectionId
async function updateSection(req, res) {
  try {
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sectionId = req.params.sectionId;

    const sectionDetails = await Section.findById(sectionId);

    if (!sectionDetails) {
      return res.status(400).json({ error: 'Section not found' });
    }

    await Section.findByIdAndUpdate(sectionId, { sectionName });

    return res.json({ success: true });
  } catch (error) {}
}

// DELETE /api/sections/:sectionId
async function deletetSection(req, res) {
  try {
    const { sectionId } = req.params.sectionId;

    const sectionDetails = await Section.findById(sectionId);

    if (!sectionDetails) {
      return res.sttaus(400).json({ error: 'Section Not found' });
    }

    await Section.findByIdAndUpdate(sectionId, { sisDeleted: true });

    return res.json({ success: true });
  } catch (error) {}
}

export { getSections, createSection, updateSection, deleteSection };
