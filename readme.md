### ATM 

This application is developed using Nodejs
install the following dependencies to install and run the application

**install following dependencies**
node init -y

npm init 

npm install express


##All the API have been tested using POSTMAN. follow the API documentation to learn more.



### API Documentation

***Note*** IP address is set to localhost and PORT number 30000 enabled for listning request.
           Change the router address according the server.


***Register parameters***
**Router:** 127.0.0.1:3000/register

**mandatory params** card_number(eight digit number)</br>
                     PIN (four digit PIN)</br>
                     contact (ten digit mobile number)</br>


***Validate parameters***
**Router:** 127.0.0.1:3000/validate

**mandatory params** card_number(eight digit number)</br>
                     PIN (four digit PIN)</br>
                     

***Deposit***
**Router** 127.0.0.1:3000/deposit

**mandatory params** card_number(eight digit card number)</br>
                     PIN (four digit PIN)</br>
                     amount (Deposit amount)</br>

***Withdraw***
**Router** 127.0.0.1:3000/withdraw

**mandatory params** card_number(eight digit card number)</br>
                     PIN (four digit PIN)</br>
                     amount (Withdraw amount)</br>


***ATM cash refill***
**Router** 127.0.0.1:3000/atm

**mandatory params** name</br>
                     PIN (four digit PIN)</br>
                     n2000</br>
                     n500</br>
                     n100</br>



### Response error codes
    300 : Invalid PIN
    200 : Withdraw Limit Exceeded
    100 : Invalid card number 
    400 : card already registered
    500 : invalid admin
