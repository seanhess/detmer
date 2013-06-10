Installation
-------------

Install RethinkDB
Install Node 0.10

Clone the repository

    git clone URL
    cd detmer

Install SASS

    gem install sass
    gem install modular-scale

Install dependencies

    make install


Running
-------

Run rethinkdb

    rethinkdb

compile typescript (Build in Sublime Text)

    make

Run

    cd server && node server.js

Then visit http://localhost:3000/

If you want to use nodemon: (will automatically restart)

    npm install -g nodemon
    cd server && nodemon


Git Workflow
-------------

All from bash

    # clone the repository (will make a folder called "detmer")
    git clone URL
    cd detmer

    # everything below runs in detmer folder. 

    # make yourself a branch
    git branch mybranch

    # switch branches
    git checkout mybranch

    # merges latest changes from server
    git pull origin master 

    # make some changes
    # ...

    # stages, then commits all your files
    git add . 
    git commit -m "a good commit message"

    # push your changes to the server
    git push origin mybranch

    # undo any unstaged changes
    git checkout .





Front End Code
--------------

### Fonts

* To control web fonts: https://github.com/typekit/webfontloader




