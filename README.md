# **Poller-koajs** #

## Prerequisites ##
Nodejs, git, npm

## Setup ##
1) Clone the repo and npm install
 > npm install

Additionally you will need knex cli to be installed.
 > npm install -g knex

## Run ##
Run following command from parent directory to start the application
 >  npm start

## Database Setup ##

1) Update knexfile.js to use your local development database.

2) Run following command to create tables.
   > knex migrate:latest
   
   For staging/production, use
   > knex migrate:latest --env production
   
## Test
Using postman or a similar tool, post to 
http://localhost:3000/polls

``` json
{
	"title":"Test",
	"options":["test1"]
}
```

Expected response should be a successful poll

```json
{
    "status": "success",
    "data": {
        "id": "5",
        "title": "Test",
        "uuid": "11b6fdb5-e01f-44ba-94cb-4e937f743615",
        "options": [
            {
                "id": "2",
                "description": "test1",
                "poll_id": "5"
            }
        ]
    }
}
```
