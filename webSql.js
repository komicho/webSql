class websql
{
    constructor (name)
    {
        this.db = openDatabase(name, '1.0', 'Test DB', 2 * 1024 * 1024);
    }
    
    sqlOrder(sql, callback = false)
    {
        this.db.transaction(function (tx) {  
            tx.executeSql(sql,[],function(tx, results){  //<--- this results param
                if(results.rows.length > 0) {
                    var tamounts = [];
                    for(var i = 0; i < results.rows.length; i++) {
                        tamounts.push(results.rows[i]);
                    }
				    callback(tamounts);
				}
            });
        });
    }
    
    table(name)
    {
        this.tableName = name;
        return this;
    }
    
    insert (array)
    {
        var insert = 'INSERT INTO `' + this.tableName + '` (';
        for (var i in array) {
            insert += i + ', ';
        }
        insert = insert.substr(0, insert.length-2);
        insert += ') VALUES (';
        for (var i in array) {
            insert += '"' + array[i] + '", ';
        }
        insert = insert.substr(0, insert.length-2) + ')';
        this.sql = insert;
        return this;
    }
    
    update (array)
    {
        var update = 'UPDATE `' + this.tableName + '` SET ';
        for (var i in array) {
            update += i + "='" + array[i] + "', ";
        }
        update = update.substr(0, update.length-2);
        this.sql = update;
        return this;
    }
    
    get delete ()
    {
        var _delete = 'DELETE FROM `' + this.tableName + '`';
        this.sql = _delete;
        return this;
    }
    
    select()
    {
        var _select = 'SELECT * FROM `' + this.tableName + '`';
        this.sql = _select;
        return this;
    }
    
    where(array)
    {
        if ( !this.whereLastOr ) {
            var where = ' WHERE ';
        } else {
            var where = ' && ';
        }
        for (var i in array) {
            var typeValue = typeof array[i]; // integer
            if ( typeValue == 'integer' ) {
                var value = array[i];
            } else {
                var value = "'" + array[i] + "'";
            }
            where += '`' + i + '`' + ' = ' + ""+ array[i] +" && ";
        }
        where = where.substr(0, where.length-3);
        this.whereLastAnd = true;
        this.sql = this.sql + where;
        return this;
    }
    
    orWhere(array)
    {
        if ( !this.whereLastAnd ) {
            var where = ' WHERE ';
        } else {
            var where = ' || ';
        }
        for (var i in array) {
            var typeValue = typeof array[i]; // integer
            if ( typeValue == 'integer' ) {
                var value = array[i];
            } else {
                var value = "'" + array[i] + "'";
            }
            where += '`' + i + '`' + ' = ' + ""+ array[i] +" || ";
        }
        where = where.substr(0, where.length-3);
        this.whereLastOr = true;
        this.sql = this.sql + where;
        return this;
    }
    
    get outSql ()
    {
        console.log(this.sql);
    }
    
    run (callback = false)
    {
        this.sqlOrder(this.sql, callback);
    }
}