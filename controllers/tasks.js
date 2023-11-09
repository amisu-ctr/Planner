const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({status:'success', data:{tasks, nbHits: tasks.length}})
});

const createTask = asyncWrapper(async (req, res) => {
  
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json({ task });

});

const getTask = async(req, res, next) => {
  const  {id:taskID} = req.params
  const task = await Task.findOne({_id:taskID})
  if(!task) {
    const error = new Error('Not Found');
    error.status = 404;
    return next(error)
    return res.status(404).json({msg: "No task with id : "+taskID})
  }
  res.status(200).json({task})
};

const updateTask = asyncWrapper( async (req, res) => {

    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
      //option validators needed to respond with the new value
      new: true,
      runValidators: true,
      overwrite: true
    })
    if(!task) {
      return res.status(404).json({msg: "No task with id : "+taskID})
    }
    res.status(200).json({task})

});

const deleteTask = asyncWrapper(async (req, res) => {

    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID})
    if(!task) {
      return res.status(404).json({msg:`No task with id: ${taskID}`})
    }
    res.status(200).json({task})
 
});

module.exports = { getAllTasks, updateTask, createTask, getTask, deleteTask };
