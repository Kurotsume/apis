To run app project directory and run

node app 

This will run the app on your localserver port 3000
localserver:3000

Remember to have mongoDB running.

Command for this is mongod
In case it's not working mongod --repair will usually fix it

This is how you get and manipulate the data
http://mongoosejs.com/docs/guide.html

To simulate routes you can use Postman. For example:
localhost:3000/api
localhost:3000/api/id