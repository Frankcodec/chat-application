const mysql = require('mysql');
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const escapeString = require('sql-escape');
const generateID = () => Math.random().toString(36).substring(2, 10);

/*
//First connection for database
const fconnection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: ''
	}
);
*/

//main connection after database has been created
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'chatappapk',
  user: 'root',
  password: '',
  }
);
const table1 = "create table if not exists users (sno int not null primary key auto_increment,userID varchar(20) not null unique,firstname varchar(50) not null,lastname varchar(50) not null,email varchar(50) not null unique,password text not null)";
const table2 = "create table if not exists chats (sno int(100) not null primary key auto_increment,sendername varchar(50) not null,receivername varchar(50) not null,senderemail varchar(50) not null,receiveremail varchar(50) not null,messages text not null,time text not null)";
const table3 = "create table if not exists status (sno int not null primary key auto_increment,statusID varchar(20) not null unique,firstname varchar(50) not null,lastname varchar(50) not null,email varchar(50) not null,statusitem varchar(300) not null)"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/*
fconnection.connect(function(err) {
  if (err) {
    throw err;
  }
  fconnection.query("CREATE DATABASE IF NOT EXISTS chatApp ", function (err, result, fields) {
    if (err) {
      throw err;
    };
    console.log(result);
  });
});
*/

connection.connect(function(err) {
  if (err){
    throw err;
  }
  connection.query(table1, function (err, result, fields) {
    if (err){
      throw err;
    }
    console.log(result);

  })
})

connection.connect(function(err) {

  connection.query(table3, function (err, result, fields) {
   
    console.log(result);

  })
})

connection.connect(function(err) {

  connection.query(table2, function (err, result, fields) {
 
    console.log(result);

  })
})



    app.post("/api/register", (req, res) => {
      const { firstname, lastname, email, password } = req.body;
      const id = generateID();
      connection.connect(function (err) {
        connection.query("SELECT * FROM users", function (err, result, fields) {
          const clean = result.filter(
            (user) => user.email === email, 
        );
      if (clean.length === 0) {
          const newUser = { id, firstname, lastname, email, password };
          connection.connect(function (err) {
          
          connection.query("INSERT INTO users (userID, firstname, lastname, email, password) values ('"+id+"', '"+firstname+"', '"+lastname+"', '"+email+"', '"+password+"')", function(err, result, fields) {
            if (err) {throw err};
            console.log(result);

            return res.json({
              message: "Account created successfully",
            })
          });
          })
      }
      else{
      res.json({
        error_message: clean.length,
      })
    }
        })
      })
      
    })


app.post("/api/login", (req, res) => {
      const { email, password } = req.body;
      connection.connect(function (err) {
        connection.query("SELECT * FROM users", function (err, result, fields) {
          // body...
        
      const clean = result.filter(
          (user) => user.email === email && user.password === password,
        )
      if (clean.length > 0) {
          return res.json({
            message: "Login successful",
            id: clean[0].id,
            firstname: clean[0].firstname,
            lastname: clean[0].lastname,
            email: clean[0].email,
          }) 
      } else {
          res.json({
            error_message: "Invalid email or password",
          })
      }
      })
      })
    })

app.post("/api/all/users", (req, res) => {
  const {me} = req.body; 
  connection.connect( function (err) {
    connection.query("SELECT * FROM users WHERE email != '"+me+"' ", function (err, result, fields) {
      res.json({
        users: result,
      })
    })
  })
      
})


app.post("/api/chat", (req, res) => {
      const { senderemail, receiveremail } = req.body;
      connection.connect(function (err) {
      connection.query("SELECT * FROM chats", function (err, result, fields) {
    
    console.log(result)
      const clean = result.filter(
        (user) => (user.senderemail === senderemail && user.receiveremail === receiveremail) || (user.senderemail === receiveremail && user.receiveremail === senderemail),
        )
      return res.json({
        chats: clean
      })
      console.log(clean);
    });

  });
});

app.post("/api/send/message", (req, res) => {
  const {sendername, senderemail, receivername, receiveremail, messageBody} = req.body;
  let date = new Date();
  let mainDate = date.toLocaleString();
  const mainmessageBody = escapeString(messageBody);
  connection.connect(function (err) {
    connection.query("INSERT INTO chats (sendername, senderemail, receivername, receiveremail, messages, time) VALUES ('"+sendername+"', '"+senderemail+"', '"+receivername+"', '"+receiveremail+"', '"+mainmessageBody+"', '"+mainDate+"')")
  })
})

app.post("/api/filter/users", (req, res) => {
  const {customers, me} = req.body;

  connection.connect(function (err) {
    connection.query("SELECT * FROM users WHERE firstname like '%"+customers+"%' AND email != '"+me+"' ", function (err, result, fields) {
      return res.json({
        customersList: result
      })
    });
    
  })
  
})

app.get("/api/all/status", (req, res) => {
  connection.connect( function (err) {
    connection.query("SELECT * FROM status", function (err, result, fields) {
      res.json({
        status: result,
      })
    })
  })
})

app.post("/api/status", (req, res) => {
  const {person} = req.body;
  connection.connect( function (err) {
    connection.query("SELECT * FROM status WHERE email = '"+person+"' ", function (err, result, fields) {
      res.json({
        status: result
      })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
