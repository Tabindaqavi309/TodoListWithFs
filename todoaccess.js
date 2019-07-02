/* eslint-disable no-restricted-syntax */
const express = require('express');

const router = express.Router();

const fs = require('fs');

function readFile() {
  try {
    const jsonString = fs.readFileSync('./todolist.json');
    const todolist = JSON.parse(jsonString);
    return todolist;
  } catch (err) {
    console.log(err);
    return [];
  }
}
function WriteFile(object) {
  const jsonString = JSON.stringify(object);

  fs.writeFile('./todolist.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      return jsonString;
    }
  });
}


router.get('/', (req, res) => {
  const todoObject = readFile();
  return res.status(200).json(todoObject);
});

router.post('/', (req, res) => {
  const todoObject = readFile();

  todoObject.push(req.body);
  WriteFile(todoObject);

  res.status(201).json(todoObject);
});
router.patch('/:taskId', (req, res) => {
  const todoObject = readFile();
  const id = req.params.taskId;

  // eslint-disable-next-line prefer-arrow-callback
  for (const element of todoObject) {
    if (element.id === parseInt(id, 10)) {
      element.name = req.body.name;
      element['due-date'] = req.body['due-date'];
      WriteFile(todoObject);
      return res.status(200).json(todoObject);
    }
  }

  return res.status(400).json({
    message: 'Wrong Id',

  });
});

router.delete('/:taskId', (req, res) => {
  const todoObject = readFile();
  const id = req.params.taskId;
  for (const element of todoObject) {
    if (element.id === parseInt(id, 10)) {
      const index = todoObject.indexOf(element);
      todoObject.splice(index, 1);
      WriteFile(todoObject);
      return res.status(200).json(todoObject);
    }
  }

  return res.status(400).json({
    message: 'Wrong Id',
  });
});


router.get('/:taskId', (req, res) => {
  const todoObject = readFile();
  const id = req.params.taskId;
  for (const element of todoObject) {
    if (element.id === parseInt(id, 10)) {
      return res.status(200).json({ todos: element, message: 'Single Todo Fetched' });
    }
  }
  return res.status(400).json({
    message: 'Wrong Id',
  });
});
module.exports = router;
