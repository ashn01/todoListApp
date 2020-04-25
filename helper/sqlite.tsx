import SQLite from 'react-native-sqlite-storage'
import ICategory  from '../interfaces/ICategory'
import ITodo from '../interfaces/ITodo'

var db:SQLite.SQLiteDatabase;

export async function connect() {
    return new Promise( async (resolve,reject)=>{
        db = await SQLite.openDatabase(
            {
                name: 'doobido.db',
                location: 'default',
                createFromLocation: '~www/doobido.db'
            },
            () => {
                console.log('connected to DB');
                resolve()
            }, err => {
                console.log(err)
                reject()
            }
        );

    })
}

// Tables
export async function createTables():Promise<boolean> {
    return new Promise((resolve, reject)=>{
        db.transaction(tx => {
            tx.executeSql(`create table if not exists category (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoryName TEXT,
                    color TEXT,
                    checked BOOLEAN,
                    Owner TEXT
                    );`);
            tx.executeSql(`create table if not exists todo (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    todoName TEXT,
                    todoDescription TEXT,
                    todoDeadline DATE,
                    todoCompleted BOOLEAN,
                    categoryId INTEGER,
                    FOREIGN KEY (categoryId) REFERENCES category(id)
                    );`);
            tx.executeSql(`INSERT OR IGNORE INTO CATEGORY (id, categoryName, color, checked) VALUES (0, 'All', '#ffffff', 1)`,[],
            (tx,res)=>{
                console.log('Success Add All category')
                resolve(true);
            },(tx,err)=>{
                console.log(err)
                reject(false);
                return false
            })
        })
    })
}

export function checkTable(){
    console.log("check table")
    db.transaction(tx => {
        tx.executeSql(`SELECT sql FROM sqlite_master WHERE type='table' AND name='todo'`,[],(tx,results)=>{
            console.log("table")
            var temp = [];
            for(let i=0;i<results.rows.length;++i)
            {
                temp.push(results.rows.item(i))
                console.log(temp[i])
            }
            console.log("Result rows: "+results.rows.length)
        })
    })
}

export function dropTables(){
    db.transaction(tx => {
        tx.executeSql(`drop table if exists category;`);
        tx.executeSql(`drop table if exists todo;`);
    })
}

// Categories
export function insertCategory(category:ICategory):Promise<number>
{
    return new Promise((resolve,reject)=>{
        const c = category.checked ? 1 : 0;
        db.transaction(tx=>{
            tx.executeSql(`INSERT INTO CATEGORY (categoryName, color, checked) VALUES (?,?,?);`,[category.categoryName,category.color,c],
            (tx,res)=>{
                console.log("Success insertCategory")
                resolve(res.insertId)
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export function updateCategory(category:ICategory):Promise<boolean>
{
    return new Promise((resolve,reject)=>{
        const c = category.checked ? 1 : 0;
        db.transaction(tx=>{
            tx.executeSql(`UPDATE CATEGORY SET categoryName = ?, color = ?, checked = ? WHERE id = ?`,
            [category.categoryName,category.color,c,category.id],
            (tx,res)=>{
                console.log("Success updateCategory")
                resolve(true)
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export async function getCategories():Promise<ICategory[]>
{
    return new Promise((resolve,reject)=>{
        db.transaction( tx=>{
            tx.executeSql(`SELECT * FROM CATEGORY WHERE id != 0`,[],
            (tx,res)=>{
                console.log("Success getCategories")
                var ret = [];
                for(let i=0;i<res.rows.length;++i)
                    ret.push(res.rows.item(i))
                resolve(ret);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}


export async function getCategory(id:number):Promise<ICategory>
{
    return new Promise((resolve, reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`SELECT * FROM CATEGORY WHERE id = ?`,[id],
            (tx,res)=>{
                var ret = res.rows.item(0)
                resolve(ret);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export async function deleteCategory(id:number):Promise<boolean>
{
    return new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`DELETE FROM CATEGORY WHERE id = ?`,[id],
            (tx,res)=>{
                resolve(true)
            },(tx,err)=>{
                console.log(err)
                reject(false)
                return false;
            })
        })
    })
}

// Todos
export function addTodo(todo:ITodo):Promise<number>
{
    return new Promise((resolve,reject)=>{
        const c = todo.todoCompleted ? 1 : 0;
        db.transaction(tx=>{
            tx.executeSql(`INSERT INTO TODO (todoName, todoDescription, todoDeadline, todoCompleted, categoryId) VALUES (?,?,?,?,?);`,
            [todo.todoName,todo.todoDescription,todo.todoDeadline.toISOString(),c,todo.categoryId],
                            (tx,res)=>{
                                console.log("Success addTodo")
                                resolve(res.insertId)
                            },(tx,err)=>{
                                console.log("Error")
                                console.log(err)
                                return false;
                            })
        })
    })
}

export function getAllTodos():Promise<ITodo[]>
{
    return new Promise((resolve, reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`SELECT t.id, t.todoName, t.todoDescription, t.todoDeadline, t.todoCompleted, t.categoryId , c.color FROM TODO t, CATEGORY c WHERE t.categoryId = c.id AND t.categoryId IN (SELECT id FROM CATEGORY WHERE checked = 1);`,[],
            (tx,res)=>{
                console.log("Success getAllTodos")
                var ret = [];
                for(let i=0;i<res.rows.length;++i)
                {
                    res.rows.item(i).todoDeadline = new Date(res.rows.item(i).todoDeadline); // back to date?
                    ret.push(res.rows.item(i))
                }
                resolve(ret);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export function getAllTodosName():Promise<String[]>
{
    return new Promise((resolve, reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`SELECT todoName FROM TODO WHERE todoCompleted = 0;`,[],
            (tx,res)=>{
                console.log("Success getAllTodosName")
                var ret = [];
                for(let i=0;i<res.rows.length;++i){
                    ret.push(res.rows.item(i))
                }
                resolve(ret);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export function getTodos(id:number):Promise<ITodo[]>
{
    return new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`SELECT t.id, t.todoName, t.todoDescription, t.todoDeadline, t.todoCompleted, t.categoryId , c.color FROM TODO t, CATEGORY c WHERE t.categoryId = c.id AND t.categoryId = ?;`,[id],
            (tx,res)=>{
                console.log("Success getTodos")
                var ret = [];
                for(let i=0;i<res.rows.length;++i){
                    res.rows.item(i).todoDeadline = new Date(res.rows.item(i).todoDeadline); // back to date?
                    ret.push(res.rows.item(i))
                }
                resolve(ret);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}
export function updateTodo(todo:ITodo):Promise<boolean>
{
    return new Promise((resolve,reject)=>{
        const c = todo.todoCompleted ? 1 : 0;
        db.transaction(tx=>{
            tx.executeSql(`UPDATE TODO SET todoName = ?, todoDescription = ?, todoDeadline = ?, todoCompleted = ?, categoryId = ? WHERE id = ?;`,
            [todo.todoName, todo.todoDescription, todo.todoDeadline.toISOString(), c, todo.categoryId, todo.id],
            (tx,res)=>{
                console.log("Success updateTodo")
                resolve(true);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

export function deleteTodo(todo:ITodo):Promise<boolean>
{
    return new Promise((resolve,reject)=>{
        db.transaction(tx=>{
            tx.executeSql(`DELETE FROM TODO WHERE id = ?`,[todo.id],
            (tx,res)=>{
                console.log("Success deleteTodo")
                resolve(true);
            },(tx,err)=>{
                console.log(err)
                return false;
            })
        })
    })
}

// test
export function test(str:string){
    console.log("insert")
    db.transaction(tx => {
        tx.executeSql(`insert into category (categoryName, color, checked) values ('Hello', '#ffffff', 0);`,[],
        (tx,res)=>{
            console.log("Success"+tx)
            console.log("Result: "+res)
        },
        (tx,err)=>{
            console.log(err)
            return false;
        })
    })

    console.log("select")
    db.transaction(tx => {
        tx.executeSql(`select * from category`,[],(tx,results)=>{
            console.log("ex")
            var temp = [];
            for(let i=0;i<results.rows.length;++i)
            {
                temp.push(results.rows.item(i))
                console.log(temp[i])
            }
            console.log("Result rows: "+results.rows.length)
        })
    })
}
