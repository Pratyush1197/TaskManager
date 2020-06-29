# TaskManager
Task-Manager using React.js, firebase and express.js



## Installation Process
1)Clone the folder

2) Open the folder in your terminal and run npm install to install all the dependencies

3) Install forever globally on your local machine using the command - npm install forever -g Forever helps to let the backend server to run even when it throws any error

4) Create a Database in firebase cloud firestore and copy the api key and other credentials in the dest.js file in src folder(full instructions in presentation file also available)

Note- if the backend does not start from forever then do node server.js inside src folder to get the errors in the console.( I prefer to use forever after debugging the errors if any comes)

Running the app- Run npm run start to start the frontend (cd TaskManager-> npm run start) and in other terminal run - forever start server.js (inside src folder) Your Backend will also start. (cd TaskManager -> cd src -> forever start server.js )

Note- Full instructions with screenshots are present in the presentation file.


## Create Database in Firebase 

We are using firebase cloud firestore for database. Open the firebase google console and make a new project. Now create a database and add a new web app. You can also check the documentation for creating the cloud firestore database.

Copy all the Credentials of new web app which you created and replace it with the placeholders I have used in the dest file which is inside the  src folder.

Go to the Authentication tab and enable the Email/Password as shown in screenshot.



Databse may have not been connected. To do it Go to Databse-> Rules and change the false to true as shown in below screenshot and save the changes



Your Database is connected.

Starting the app-

Run npm run start to start the frontend (cd TaskManager-> npm run start) and in other terminal   run -
forever start server.js (inside src folder)  Your Backend will also start. 
(cd TaskManager -> cd src -> forever start server.js  )

SignUp
Login window will open so click on the SignUp button (if you haven’t made any) as shown in the below screenshot .
Now enter your details. if any error is made while signing up an error will be popped as shown in screenshot below.



Now on successful creation of account a success message will be shown .Now go to login page and sign in.



After Signing in You will get the following window. 



Click on the blue float button below to Add a new task. Following window will pop.

So enter your task details here

1) Task name
2) Due Date
3) Tag
4) Set Priority- You can see the priority on the color of ‘tag’ badge i.e if color of ‘tag’ badge is red then priority high . If color is yellow then medium priority and green color for low priority.


Features-

Edit,Delete – You have the option of deleting and editing any task. Note that while editing make sure to reset the Due date parameter everytime when the Edit box is opened.

Archive- Click on the green float button adjacent to add button to open the tasks which are completed or whose due date has passed.

The archive window is shown as below-

New tag-  This is the tag given to latest tasks added. It will remain there foraroun 10 minutes and then disappear

Sort- 
1) Click on the heading Tag to sort the table on basis of priority i.e with highest priority(red tag) will be shown first as shown in ss


 Here on sorting on basis of priority shows red then yellow then green tag
You can also sort by alphabetical order ofTask names by clicking on Task heading
Filter – You can filter tasks on basis of tagname . Click on the tagname ‘meeting’ 

It will filter the results and show only tasks whose tag is having meeting assigned. As shown in ss


These are the features Click on the SignOut button to log off. You cannot open anyone’s account without signing it as protected routes are used for it

I have used express for api handling and axios for fetching the apis.

Thank you :) 

