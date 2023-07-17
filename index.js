const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const fileupload=require('express-fileupload');
const mycon=require('mysql');
const { request,response } = require('express');


const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());
app.use(express.static('public'));

const c=mycon.createConnection(
    {
        host:"localhost",
        port:"3306",
        user:"root",
        password:"Msd@007,",
        database:"employeecrud"

    }
)
c.connect(function(error)
{
    if(error)
    {
        console.log("error");
    }
    else{
        console.log("database connected");

    }
})



app.post('/Signup_data',(request,response)=>{
    let {username,email,password}=request.body;
   
   
    let sql='insert into signupdata(username,email,password) values (?,?,?)';

    c.query(sql,[username,email,password],(error,result)=>{
        if(error)
        {
            let s={"status":"error"}
                   response.send(s)
        }
        else{
                    let s={"status":"success"}
                    response.send(s)
                  }
    })
})

app.post('/Signin_data',(request,response)=>{
    let {username,password} = request.body;
    let sql = 'select * from signupdata where username=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            
            let s = {"status":"error"};
            response.send(s);
        }
        else if(result.length > 0){

            let id = result[0].id;
            let username1 = result[0].username;
            let password1 = result[0].password;
            if(username1 == username && password1 == password){
                let s = {"status":"Success","id":id};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid"};
                response.send(s);
            }
        }
        else{
            let s ={"status":"final_error"};
            response.send(s);
        }
    })

})
app.get('/Getsignup_data/',(request,response)=>{
    let sql='select * from signupdata';

    c.query(sql,(error,result)=>{
        if(error)
        {
            s={"status":"error"}
            response.send(s);
        }
        else{
            response.send(result);
        }
    })

})


app.post('/Delete',(request,response)=>{
    let id=request.body.id;
    let sql='delete from signupdata where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            let b={"status":"error"};
            response.send(b);
            
        }
        else{
            let b={"status":"delete"};
            response.send(b)
        }
    })
})

app.get('/Update_data/:id',(request,response)=>{

    let {id} =request.params;
    
    

    let sql = 'select * from signupdata where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})


app.put('/Update_data/:id',(request,response)=>{
    let {id} =request.params;
    let {username,email,password}=request.body;
    let sql='update signupdata set username=?,email=?,password=? where id=?';
    c.query(sql,[username,email,password,id],(error,result)=>{
        if(error)
        {
            let s={"status":"error"}
                   response.send(s)
        }
        else{
                    let s={"status":"success"}
                    response.send(s)
                  }
    })
})

app.listen(3000,()=>{console.log("database running 3000")});