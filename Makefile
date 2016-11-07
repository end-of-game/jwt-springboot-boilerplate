
all: build-images

deps:
	cd frontweb && ng build --environment=prod

build: build-frontweb build-backend

build-frontweb:
	echo $(CURDIR) && cd  $(CURDIR)/frontweb && ng build --environment=prod

build-backend:
	echo $(CURDIR) && cd  $(CURDIR)/backend && mvn clean package -DskipTests

build-images:
	echo $(CURDIR) && cd  $(CURDIR) && docker-compose build

clean:
	rm -rf frontweb/dist

.PHONY: deps build build-frontweb build-backend build-images clean
