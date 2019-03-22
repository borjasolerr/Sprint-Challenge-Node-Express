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
  let { project_id, notes, description } = req.body;

  try {
    if (project_id && description && notes) {
      const newAction = actionsDB.insert(req.body);
      res.status(201).json(newAction);
    } else {
      res.status(500).json({ error: 'Could not add action.' });
    }
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
  } catch (err) {
    res.status(500).json({ error: 'Unable to remove action' });
  }
});

// UPDATE PROJECTS AND ACTIONS BY ID
server.put('/api/projects/:id', async (req, res) => {
  let { id } = req.params;
  let { name, description, completed } = req.body;

  try {
    const project = await projectDB.get(id);

    if (project) {
      await projectDB.update(id, { name, description, completed });
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: 'Could not find project' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to update the project' });
  }
});

server.put('/api/actions/:id', async (req, res) => {
  let { id } = req.params;
  let { project_id, notes, description } = req.body;

  try {
    const action = await actionsDB.get(id);

    if (action) {
      if (project_id && description && notes) {
        await actionsDB.update(id, req.body);
        res.status(200).json(action);
      } else {
        res.status(400).json({ message: 'Could not update the action' });
      }
    } else {
      res.status(400).json({ message: 'Could not find the action' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to update the action' });
  }
});

// GET ALL ACTIONS FOR A PROJECT
server.get('/api/projects/:id/actions', (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(allActions => {
      if (!allActions.length) {
        res.status(404).json({ error: 'The actions of the project with the specified ID does not exist.' });
      } else {
        res.status(200).json(allActions);
      }
    })
    .catch(err => res.status(500).json({ error: 'The actions of the projects could not be retrieved' }));
});

server.listen(4000);
