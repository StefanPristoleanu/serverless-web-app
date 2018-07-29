# serverless-web-app

Download the latest NodeJs version from this link.
https://nodejs.org/en/
Restart your computer for the changes to take place.

Check with the following commands that it has installed successfully:
# node -v 
# npm -v
Then, proceed to install the project's components with:
# npm install

To start the application, simply run:
# npm start

You should see the static website and be able to notice any change to the code that you will be doing from then on.

The project is split into three main folders:

The 'scr' folder contains all of the source code. 
The file 'App.js' is the root of the website, and from there all of the other pages are loaded with the help of a router.
In there you should replace all of the URL and ID global variables with your own values.

There are three main pages in the pages folder. The 'HomePage.js' is the first page that gets shown, and inside you should replace the Lorem Ipsum text and photos with your own.
The 'News.js' page contains panels with news, easily scalable.
Lastly, 'UserPage.js' gets shown only after logging in. It cotains a list of all of the events in the database, and provides the additional ability to add new events, entroll onto an existing one or logout.

Still inside the source folder, there is a component folder in which reside all of the common elements of the pages, anc can be easily integrated into new ones. More notably among those, the 'NavBar.js' and 'Footer.js' should have the Lorem Ipsum text replaced, and in 'CheckBoxDialog.js' the GDPR policy linked.

The second main folder is 'public', which contains all of the project's images and public resources.

The third main folder is 'lambda-functions' and inside there are the three functions used by the project, and whose APIURL should be placed inside 'App.js' after they have been set up in AWS Lambda.

APIURL1 matches 'getEvents.js', APIURL2 matches 'postEvent.js' and APIURL3 matches 'EnrollEvent.js'
