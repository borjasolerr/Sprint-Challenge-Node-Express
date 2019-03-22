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

// POST AN ACTION AND PRJECT
server.post('/api/projects', async (req, res) => {
  let { name, description } = req.body;

  try {
    const newProject = projectDB.insert({ name, description });

    if (name === undefined || description === undefined) {
      res.status(400).json({ error: 'Please provide a name and description' });
    } else {
      res.status(201).json(newProject);
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to post new project' });
  }
});

server.post('/api/actions', async (req, res) => {
  let { notes, description } = req.body;

  try {
    const newAction = actionsDB.insert({ notes, description });
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({ error: 'Unable to post new action' });
  }
});

// DELETE PROJECTs AND ACTIONS
server.delete('/api/projects/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const project = await projectDB.get(id);

    if (project) {
      await projectDB.remove(id);
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: 'Could not find the project' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to remove project' });
  }
});

server.delete('/api/actions/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const action = await actionsDB.get(id);

    if (action) {
      await actionsDB.remove(id);
      res.status(200).json(action);
    } else {
      res.status(400).json({ message: 'Could not find action' });
    }
  } catch {
    res.status(500).json({ error: 'Unable to remove action' });
  }
});

server.listen(4000);
