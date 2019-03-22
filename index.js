// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!

const express = require('express');
const server = express();

const projectDB = require('./data/helpers/projectModel');
const actionsDB = require('./data/helpers/actionModel');

server.use(express.json());

// GET PROJECTS AND GET ACTIONS
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectDB.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Unable to get projects' });
  }
});

server.get('/api/actions', async (req, res) => {
  try {
    const actions = await actionsDB.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ error: 'Unable to get actions' });
  }
});

server.listen(4000);
