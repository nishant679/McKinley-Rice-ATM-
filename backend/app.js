const express = require('express')
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("the server is up and running on port 3000");
})


//importing the JSON file to read and store user data.
const datapath = path.join(__dirname, './db/userdata.json')
//console.log(datapath)
//atm info
const atm_info = path.join(__dirname, './db/atm_data.json')

app.post('/atm', (req, res) => {
    const readfile = fs.readFileSync(atm_info);
    var atm_bal = JSON.parse(readfile);
    var valid = 0;
    var name = req.query.name;
    var PIN = req.query.PIN;
    //validating admin
    if (atm_bal.admin.name === name && atm_bal.admin.PIN === PIN) {
        valid = 1;
    }

    if (valid === 1) {


        //reading user info
        var n2000 = Number(req.query.n2000);
        var n500 = Number(req.query.n500);
        var n100 = Number(req.query.n100);
        var total = (n2000 * 2000) + (n500 * 500) + (n100 * 100);

        //updating atm balance
        atm_bal.atm_balance = total + atm_bal.atm_balance;
        atm_bal.note_type.n2000 = n2000 + atm_bal.note_type.n2000;
        atm_bal.note_type.n500 = n500 + atm_bal.note_type.n500;
        atm_bal.note_type.n100 = n100 + atm_bal.note_type.n100;

        //updating the JSON file
        var updateddata = JSON.stringify(atm_bal);
        fs.writeFileSync(atm_info, updateddata);

        res.send({
            "status": "success",
            "total_atm_bal ": atm_bal.atm_balance,

        })
    }
    else {
        var error_code = 500;
        res.send({ "status": "fail", "error_code": error_code })
    }

})


//Register New User 
app.post('/register', (req, res) => {

    const readfile = fs.readFileSync(datapath);
    var user_data = JSON.parse(readfile);
    //handling POST request to register a user
    console.log(req.query)
    var card_num = req.query.card_number;
    var pin = req.query.PIN;
    var contact = Number(req.query.contact);
    var error_code = 0;
    var newuser = {
        "card_number": "",
        "info": {
            "user_PIN": 0,
            "avl_bal": 0,
            "contact ": 0
        }
    }
    for (var i = 0; i < user_data.length; i++) {
        if (user_data[i].card_number === card_num) {
            error_code = 400;
        }
    }
    if (error_code != 400) {
        newuser.card_number = card_num;
        newuser.info.user_PIN = pin;
        newuser.info.contact = contact;

        console.log(newuser)

        //Updating the user info to the JSON file

        user_data.push(newuser);
        //writing the updated data to the file
        var updateddata = JSON.stringify(user_data);
        fs.writeFileSync(datapath, updateddata);

        res.send({
            "status": "success",
            "card number ": card_num,
            "available balance ": 0
        })
    }
    else {
        res.send({ "status": "fail", "error_code": error_code })
    }

})







app.get('/validate', (req, res) => {
    //Validating user with card number and PIN
    const readfile = fs.readFileSync(datapath);
    var user_data = JSON.parse(readfile);
    var card_num = req.query.card_number;
    var PIN = req.query.PIN;
    var pin_mtch = 0;
    var error_code = 0;
    for (var i = 0; i < user_data.length; i++) {
        if (user_data[i].card_number === card_num) {
            error_code = 400;

            if (user_data[i].info.PIN === PIN) {
                pin_mtch = 1;
            }
        }
    }

    if (error_code === 400) {
        res.send({ "status": "success" })
    }
    else {
        res.send({ "status": "fail", "error_code": error_code })
    }

})









app.post('/deposit', (req, res) => {
    //res.send("successfully deposited. ");
    console.log(req.query)
    const readfile = fs.readFileSync(datapath);
    var user_data = JSON.parse(readfile);

    //atm info 
    const readfile2 = fs.readFileSync(atm_info);
    var atm_bal = JSON.parse(readfile2);
    var card_num = req.query.card_number;
    var PIN = req.query.PIN;

    var amount = Number(req.query.amount);
    var flag = 0;
    var bal = 0;
    var error_code = 0;
    for (var i = 0; i < user_data.length; i++) {
        if (user_data[i].card_number === card_num) {
            console.log("card number matched")
            //checking if the PIN matched

            if (user_data[i].info.user_PIN === PIN) {
                user_data[i].info.avl_bal = user_data[i].info.avl_bal + amount;
                bal = user_data[i].info.avl_bal;
                flag = 1;
                atm_bal.note_type.n100 = atm_bal.note_type.n100 + amount;
            }
            else {
                error_code = 300;
            }
        }
    }
    var updateddata = JSON.stringify(user_data);
    fs.writeFileSync(datapath, updateddata);
    //update atm info 
    var updateddata = JSON.stringify(atm_bal);
    fs.writeFileSync(atm_info, updateddata);
    if (flag === 1) {
        res.send({
            "status": "success",
            "available balance ": bal
        })
    }
    else {
        res.send({ "status ": "fail", "error_code": error_code })
    }
    //writing the updated information to the json file 

})










//Withdraw amount API
app.post('/withdraw', (req, res) => {
    //performing withdraw operation
    const readfile = fs.readFileSync(datapath);
    var user_data = JSON.parse(readfile);
    //fetching atm info
    const readfile2 = fs.readFileSync(atm_info);
    var atm_bal = JSON.parse(readfile2);
    var card_num = req.query.card_number;
    var PIN = req.query.PIN;
    console.log(req.query.pin)
    // Pin and cardnumber validation code will go here 


    //On successful validation perform withdraw operation 
    var amount = Number(req.query.amount);
    var flag = 0;
    var error_code = 0;
    var avl_bal = 0;
    for (var i = 0; i < user_data.length; i++) {
        if (user_data[i].card_number === card_num) {
            console.log("card number matched")
            //checking if the PIN matched
            if (user_data[i].info.user_PIN === PIN) {
                //checking if amount exceeds available balance
                if (amount > user_data[i].info.avl_bal) {
                    error_code = 200
                }
                else {
                    user_data[i].info.avl_bal = user_data[i].info.avl_bal - amount;
                    flag = 1;
                    avl_bal = user_data[i].info.avl_bal;
                    atm_bal.note_type.n100 = atm_bal.note_type.n100 - amount;
                }
            }
            else {
                error_code = 300;
            }
        }
    }
    var updateddata = JSON.stringify(user_data);
    fs.writeFileSync(datapath, updateddata);
    //update atm balance
    var updateddata = JSON.stringify(atm_bal);
    fs.writeFileSync(atm_info, updateddata);
    if (flag === 1) {
        res.send({
            "status": "success",
            "avl_bal": avl_bal,
        })
    }
    else {
        res.send({ "status": "fail", "error_code": error_code })
    }
})




