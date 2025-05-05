const express = require("express");
const {Client} = require("pg");
const format = require('pg-format');
const cors = require('cors');
const app = express();
// const corsOptions ={
//     // origin:'*',
//     // optionsSuccessStatus : 200,
//     // methods:['GET','POST'],
//     // alloedHeaders:['Content-Type','Authorization']
//     "origin":"*",

//     "methods":"GET,POST,PUT,DELETE",
//     "preflightContinue":false,
//     "optionsSuccessStatus":204
// }
app.use(cors());
app.use(express.json());
const client=  new Client(
    {
        host:'localhost',
        user:'postgres',
        port:5432,
        password:'postgres',
        database:'test'
    }
 )
  client.connect()
  .then(()=>console.log("connected successfully") )
  //fetch data from user table
  app.get("/fetchData",(req,res)=>{
    const fetch_query="Select * from users "
    client.query(fetch_query,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result.rows)
        }
    })
})
//create the the account using user details
app.post("/user",async(req,res)=>{
    const {firstname,lastname,email,password,conformpass} = req.body
      const insert_query='INSERT INTO users (firstname,lastname,email,password,conformpass) VALUES ($1,$2,$3,$4,$5)'
      console.log("post data")
     try {
        if(password===conformpass){
      await client.query(insert_query,[firstname,lastname,email,password,conformpass])
      res.send("post the data")
      }
      else{
        res.send("Failure")
      }
     } catch (error) {
          res.send(error)
     }
  })
  
  //already account just login to dashbord
  app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
      const result = await client.query('SELECT * FROM users WHERE email = $1 AND password =$2',[email,password]);
      console.log(result);
      
      if(result.rows.length === 1){
  const user = result.rows[0];
  if (user.password === password ){
    return res.status(200).send('matched details');
  }
  else{
    return res.status(400).send('details not matched');
  }
      }
    }
    catch(err){
      return res.status(500).send("error occured");
    }
  })
  app.route('/todo')
  .post((req,res)=>{
    const {title,description,current,reminder} = req.body
       const insert_query='INSERT INTO todolist (title,description,current,reminder) VALUES ($1,$2,$3,$4)'
           client.query(insert_query,[title,description,current,reminder],(err,result)=>{
            if(err){
             res.send(err)
          }
           else{
             res.send(result.rows);
             }
         })
     })
  //view todotask from todolist table
  .get((req,res)=>{

    console.log("req is",req.query)
    let limit=req.query.limit;
    let status=req.query.status;
    let date=req.query.date;
    let offset=req.query.offset;
    if(date){

      const query="select * from todolist WHERE current::date = $1 limit $2 offset $3 ";
      client.query(query,[date,limit,offset],(err,result)=>{
        if(err){
          res.send(err);
        }
        else{
          res.json(result.rows);
        }
      })
    }
    else if(status){
      const fetch_query=`select * from todolist where status=$1 limit $2 offset $3  `
      client.query(fetch_query,[status,limit,offset],(err,result)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(result.rows);
        }
      })
      
    }
   else{
     const query="select * from todolist  limit $1 offset $2 ";
    client.query(query,[limit,offset],(err,result)=>{
      if(err){
        res.send(err);
      }
      else{
        res.json(result.rows);
      }
    })
  }
})    
//fetch the specific todo
app.get('/todo1/:id',(req,res)=>{
  const {id}=req.params;
     const insert_query='select * from todolist  WHERE id =$1'
         client.query(insert_query,[id],(err,result)=>{
          if(err){
           res.send(err)
        }
         else{
           res.send(result.rows);
           }
       })
   })
//update input values
app.put('/todo1/:id',(req,res)=>{
  const {id}=req.params;
  const {title,description,current,reminder} = req.body
     const insert_query='UPDATE todolist SET title=$1,description=$2,current=$3,reminder=$4 WHERE id =$5'
         client.query(insert_query,[title,description,current,reminder,id],(err,result)=>{
          if(err){
           res.send(err)
        }
         else{
           res.send(result.rows);
           }
       })
   })
   //delete the todo
   app.delete('/todo/:id',(req,res)=>{
    const {id}=req.params;
       const insert_query='DELETE from todolist WHERE id =$1'
           client.query(insert_query,[id],(err,result)=>{
            if(err){
             res.send(err)
          }
           else{
             res.send(result.rows);
             }
         })
     })
     //search todolist on title and description
     app.get('/search',(req,res)=>{
      let search=req.query.search;
      let limit=req.query.limit;
      let offset=req.query.offset;
      const fetch_query='select * from todolist where title like $1  or  description like $1 limit $2 offset $3  '
      client.query(fetch_query,[`${search}%`,limit,offset],(err,result)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(result.rows)
        }
      })
     })
     //select the task open or completed
     app.put('/status/:id',(req,res)=>{
      const {id}=req.params;
         const insert_query=`UPDATE todolist SET status='completed' WHERE id =$1`
             client.query(insert_query,[id],(err,result)=>{
              if(err){
               res.send(err)
            }
             else{
               res.send(result.rows[0]);
               }
           })
       })
       //insert multiple rows
       app.post('/dynamic',(req,res)=>{
        const data=req.body.data;
        const values = data.map(task=>[task.title,task.description,task.current,task.reminder]);
           const insert_query=format('INSERT INTO todolist (title,description,current,reminder) VALUES %L RETURNING *',values);
               client.query(insert_query,(err,result)=>{
                if(err){
                 res.send(err)
              }
               else{
                 res.send(result.rows);
                 }
             })
         })
  app.listen(4000,()=>{
      console.log("server run port number:4000");
  })