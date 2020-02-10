### ATM 
***Authored by Nishant Kumar***

### API Documentation

***Note*** IP address is set to localhost and PORT number 30000 enabled for listning request.
           Change the router address according the server.

           
***Register parameters***
**Router:** 127.0.0.1:3000/register

**mandatory params** card_number(eight digit number)
                     PIN (four digit PIN)
                     contact (ten digit mobile number)

***Deposit***
**Router** 127.0.0.1:3000/deposit

**mandatory params** card_number(eight digit card number)
                     PIN (four digit PIN)
                     amount (Deposit amount)

***Withdraw***
**Router** 127.0.0.1:3000/withdraw

**mandatory params** card_number(eight digit card number)
                     PIN (four digit PIN)
                     amount (Withdraw amount)



### Error code 
    300 : Invalid PIN
    200 : Withdraw Limit Exceeded
    100 : Invalid card number 
    400 : card already registered