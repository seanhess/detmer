all: build

build:
	tsc server/server.ts public/app.ts

install:
	cd server && npm install && cd ..
	# bower components will get synched with rsync

upload:
	# sync all the files
	rsync -rav -e ssh --delete --exclude-from config/exclude.txt . root@librosapp.tk:~/libros

deploy: upload
	# run the remote commands
	ssh -t root@librosapp.tk "cd ~/libros && bash config/deploy.sh"
