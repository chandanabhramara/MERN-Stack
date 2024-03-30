const mongoose = require("mongoose");

const TodoDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
})
const ToDoDataModel = mongoose.model('todo', TodoDataSchema);

module.exports = ToDoDataModel;