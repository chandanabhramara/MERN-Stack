const cors= require("cors");
const mongoose=require("mongoose");
const express=require("express");
const FormDataModel = require("./model/FormData");
const TodoDataModel = require("./model/Tododata");

const app= express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ToDo");


  app.post("/register",(req,res)=>{

    const{ email,password } = req.body;
    FormDataModel.findOne({ email:email}).then((user)=>{
        if(user){
            res.json("Already registered");
        }else {
        FormDataModel.create(req.body)
        .then((log_reg_form)=>res.json(log_reg_form))
        .catch((err)=>res.json(err));
        }
    });
  });
  app.post("/login",(req,res)=>{
  const{ email,password } = req.body;
    FormDataModel.findOne({ email:email}).then((user) => {
        if(user){
          if(user.password === password) {
            res.json("Success");
          }else{
            res.json("worng password");
          }
          }
          else{
            res.json("No records found!");
          }
        });
        });

        app.post("/create",(req,res) =>{
          const { title , description} = req.body;
          TodoDataModel.create({title:title,description:description,status:"pending"})
          .then((todo)=>{
            console.log("Todo is added",todo);
            res.json(todo);
          })
          .catch((err) =>{
            console.error("Error adding todo:",err);
            res.status(500),json(err);
          });
        
        });

        
        app.get("/view", async (req, res) => {
          try{
            const todos = await TodoDataModel.find();
            res.json(todos);
          }
          catch (error){
            console.error("Enter fetching todos:",error);
            res.status(500),json(err);
          }
        });

        app.get('/todos/:id', (req,res) => {
          const { id } = req.params;
          TodoDataModel.findById(id)
          .then((todo) =>{
            if(!todo){
              res.status(404).send('Todo not found');
            }
            else{
              res.json(todo);
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('server error');
          });
        });

        app.put('/edit/:id', (req, res) => {
          const { id } = req.params;
          const { title, description, status } = req.body;
        
          TodoDataModel.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
          )
            .then((todo) => {
              if (!todo) {
                res.status(404).send('Todo not found');
              } else {
                res.json(todo);
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Server error');
            });
        });
      
        app.delete('/delete/:id',(req, res) =>{
          const { id } = req.params;

          TodoDataModel.findByIdAndDelete(id)
          .then((todo) => {
            if(!todo){
              return res.status(404).send('Todo not found');
            }
            res.json(todo);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('sever error');
          });
        });
        
      
      app.listen(8000, () => {
        console.log("Server listining on http://127.0.0.1:8000");
      });