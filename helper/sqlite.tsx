import * as SQLite from 'expo-sqlite'
import ICategory  from '../interfaces/ICategory'


const db = SQLite.openDatabase('doobido.db')

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
                    FOREIGN KEY (categoryID) REFERENCES category(id)
                    );`);
            resolve(true);
        })
    })
}

export function addOrEditCategory(id:number, category:ICategory)
{
    console.log(id)
    console.log(category)
    const c = category.checked ? 1 : 0;
    if(id === -1) // add
        addCategory(category.categoryName,category.color,category.checked)
    else // edit
        editCategory(id,category.categoryName,category.color,category.checked)
}

export function addCategory(name:string, color:string, checked:number|boolean)
{
    const c = checked ? 1 : 0;
    db.transaction(tx=>{
        tx.executeSql(`INSERT INTO CATEGORY (categoryName, color, checked) VALUES (?,?,?);`,[name,color,c],
        (tx,res)=>{
            console.log("Success")
        },(tx,err)=>{
            console.log(err)
            return false;
        })
    })
}

export function editCategory(id:number, name:string, color:string, checked:number|boolean)
{
    const c = checked ? 1 : 0;
    db.transaction(tx=>{
        tx.executeSql(`UPDATE CATEGORY SET categoryName = ?, color = ?, checked = ? WHERE id = ?`,[name,color,c,id],
        (tx,res)=>{
            console.log("Success")
        },(tx,err)=>{
            console.log(err)
            return false;
        })
    })
}

export async function getCategories():Promise<ICategory[]>
{
    return new Promise((resolve,reject)=>{
        db.transaction( tx=>{
            tx.executeSql(`SELECT * FROM CATEGORY`,[],
            (tx,res)=>{
                console.log("Success")
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

export function checkTable(){
    console.log("check table")
    db.transaction(tx => {
        tx.executeSql(`SELECT sql FROM sqlite_master WHERE type='table' AND name='category'`,[],(tx,results)=>{
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