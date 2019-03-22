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

// GET PROJECTS AND ACTIONS BY ID
server.get('/api/projects/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const project = await projectDB.get(id);

    if (id) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: 'Please provide an ID' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to get project' });
  }
});

server.get('/api/actions/:id', (req, res) => {
  let { id } = req.params;

  try {
    const action = actionsDB.get(id);

    if (id) {
      res.status(200).json(action);
    } else {
      res.status(400).json({ message: 'Please provide an ID' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to get action' });
  }
});

server.listen(4000);
