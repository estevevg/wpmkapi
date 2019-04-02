build:
	docker build -t everdura/mk8api -f Dockerfile ../

start:
	docker-compose up -d

stop:
	docker-compose down

test-start:
	cd ../
	npm start

test-test:
	cd ../
	npm test

db-start:
	docker run --name mongo -e MONGODB_DATABASE=mk8 -p 27017:27017 -d mongo:3.4

db-stop:
	docker stop mongo
	docker rm mongo
