module.exports = {
  "host": "expenses-server.herokuapp.com",
  "port": process.env.PORT || 80,
  "postgres": process.env.DATABASE_URL,
  "public": "../public/",
  "auth": {
    "idField": "id",
    "token": {
      "secret": process.env.AUTH_SECRET
    },
    "local": {},
    "facebook": {
      "clientID": "your facebook client id",
      "clientSecret": "your facebook client secret",
      "permissions": {
        "scope": ["public_profile","email"]
      }
    }
  }
}
