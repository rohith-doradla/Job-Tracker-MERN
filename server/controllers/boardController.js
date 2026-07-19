import Board from '../models/Board.js';

// GET /api/boards
async function getBoards(req, res) {
  try {
    const userId = req.session.userId;

    const boards = await Board.find({ userId: userId }).lean();

    const result = boards.map((b) => ({
      ...b,
      id: b._id.toString(),
    }));

    return res.json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch boards' });
  }
}

// console.log(error);

async function getBoard(req, res) {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    return res.json({ data: board });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch board' });
  }
}

// POST /api/boards
async function createBoard(req, res) {
  try {
    const { boardName } = req.body;

    // console.log('Session:', req.session);

    if (!boardName) {
      return res.status(400).json({ error: 'Missing required feilds' });
    }

    const userId = req.session.userId;
    // console.log(userId);

    const board = await Board.insertOne({ userId, boardName });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create Boards' });
  }
}

// PUT /api/boards/:boardId
async function updateBoard(req, res) {
  try {
    const { boardName } = req.body;

    if (!boardName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const boardId = req.params.boardId;

    const boardDetails = await Board.findById(boardId);

    if (!boardDetails) {
      return res.status(404).json({ error: 'Board Not found' });
    }

    await Board.findByIdAndUpdate(boardId, { boardName });

    // console.log(boardDetails);

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Failed to update board' });
  }
}

// DELETE /api/boards/:boardId
async function deleteBoard(req, res) {
  try {
    const boardId = req.params.boardId;

    const boardDetails = await Board.findById(boardId);

    if (!boardDetails) {
      return res.status(404).json({ error: 'Board Not found' });
    }

    await Board.findByIdAndUpdate(boardId, { isDeleted: true });

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Failed to deleted board' });
  }
}

export { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
