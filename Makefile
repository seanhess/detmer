all: build

build:
	# tsc -sourcemap server/server.ts public/app.ts
	# tsc server/server.ts public/app.ts
	tsc server/test/rethinkdb.test.ts

test: build
	cd server && bin/test test/*.test.js

install:
	cd server && npm install && cd ..
	# bower components will get synched with rsync

upload:
	# sync all the files
	rsync -rav -e ssh --delete --exclude-from config/exclude.txt . root@detmer:~/detmer

deploy: upload
	# run the remote commands
	ssh -t root@detmer "cd ~/detmer && bash config/deploy.sh"


# oh, cool, if a directory exists, it doesn't rebuild it
.PHONY: test test-w
