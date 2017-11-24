you can call WebSql by orm

# new
Choose the name of the database
```javascript
var db = new websql('name_db');
```
# table
Choose the table name
```javascript
.table('name_table')
```
# insert
```javascript
.insert({
    'key' : 'value'
});
```
# update
```javascript
.update({
    'key' : 'value'
});
```
# select
```javascript
.select();
```
# delete
```javascript
.delete;
```
# where
```javascript
.where({
    'key' : 'value'
});
```
# orWhere
```javascript
.orWhere({
    'key' : 'value'
});
```
# outSql
out sql text
```javascript
.outSql;
```
# run
run sql order
```javascript
.run(callback);
```
# Full example
```javascript
var db = new websql('mydb');
// create table
db.sqlOrder('CREATE TABLE IF NOT EXISTS users (username, email)');
// insert
db.table('users').insert({
    'username' : 'komicho',
    'email' : 'komicho@mail.com'
}).run();
db.table('users').insert({
    'username' : 'adam',
    'email' : 'adam@mail.com'
}).run();
// update
db.table('users').update({
    'username' : 'karim',
}).where({
    rowid:1
}).run();
// del 
db.table('users').delete.where({
    rowid:1
}).run();
// select
db.table('users').select().run(function(req){
    req.forEach(function (item) {
        console.log(item);
    });
});
```