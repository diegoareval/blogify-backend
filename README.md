# Blogify: it is a kind of blog to make interactive articles

### How to run it
* Make sure you have [mongoDB] installed. At the terminal run the following command:
```sh
mongod --dbpath <path_to_data/db_folder>
```
* Make sure [Redis] is also installed and running.<br /><br />
* Run the server in development mode by typing the following command:
```sh
npm run dev
```
* Run the server in production mode by typing the following command:
```sh
npm run start
```

### How to run it (using Docker)
* Make sure you have [docker] installed. At the root folder run the following command:
```sh
docker-compose up -d
```
### API documentation
https://documenter.getpostman.com/view/1551953/TzCJgpnb


### Further reading
- https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive/
- https://mannhowie.com/clean-architecture-node

[Robert C. Martin]: <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
[docker]: <https://www.docker.com/>
[mongoDB]: <https://www.mongodb.com/try/download/community>
[Redis]: <https://redis.io/download>
