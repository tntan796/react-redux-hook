var express = require('express');
var router = express.Router();
var TaskMockData = require('../common/mock-data/tasks-mock-data');
const tasks = TaskMockData;
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: '',
    data: tasks
  })
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const findTask = tasks.find(t => t.id === id);
    if (findTask) {
      res.status(200).json({
        success: true,
        message: '',
        data: findTask
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Task not found',
      data: null
    });
});

router.post('/create', function(req, res, next) {
  try {
    const data = req.body;
    data.id = uuidv4();
    tasks.push(data);
    res.status(201).json({
      success: true,
      message: '',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Add fail',
      data: null
    });
  }
})

router.post('/edit', function(req, res, next) {
  const data = req.body;
  try {
    const updateIndex = tasks.findIndex(t => t.id === data.id);
    if (updateIndex !== -1) {
      tasks[updateIndex] = {...tasks[updateIndex], ...data};
      console.log('index:', updateIndex);
      console.log(tasks);
      res.status(200).json({
        success: true,
        message: '',
        data: tasks[updateIndex]
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Not found task',
        data: null
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Edit fail',
      data: null
    });
  }
})

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  try {
    const deleteIndex = tasks.findIndex(t => t.id === id);
    if (deleteIndex !== -1) {
      tasks.splice(deleteIndex, 1);
      res.status(200).json({
        success: true,
        message: '',
        data: null
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Not found task',
        data: null
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete fail',
      data: null
    })
  }
})


module.exports = router;
