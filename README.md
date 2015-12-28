# Dev & Statistics

Node Version 5.3.0
NPM Version 3.5.2

## Client

The client is a React based frontend, using alt for it's flux implementation.

## Server

The sever is running node, with a redis server for rate limiting and sqllite as an internal
datastore. API results are served from a static cache, which we simply update the static files
each time the task runs which collections additional data.