package com.doobidoapp;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DBHelper extends SQLiteOpenHelper {
    public static final String DATABASE_NAME="doobido.db";

    private static final String SQL_CREATE_CATEGORY =
            "create table if not exists category (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "categoryName TEXT," +
            "color TEXT," +
            "checked BOOLEAN," +
            "Owner TEXT" +
            ");";
    private static final String SQL_CREATE_TODO =
            "create table if not exists todo (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "todoName TEXT," +
                    "todoDescription TEXT," +
                    "todoDeadline DATE," +
                    "todoCompleted BOOLEAN," +
                    "categoryId INTEGER," +
                    "FOREIGN KEY (categoryId) REFERENCES category(id)" +
                    ");";
    private static final String SQL_INSERT_ALL =
            "INSERT OR IGNORE INTO CATEGORY (id, categoryName, color, checked) VALUES (0, 'All', '#ffffff', 1)";
    public DBHelper(Context context){
        super(context,DATABASE_NAME,null,1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.wtf("wtf","onCreate DB");
        db.execSQL(SQL_CREATE_CATEGORY);
        db.execSQL(SQL_CREATE_TODO);
        db.execSQL(SQL_INSERT_ALL);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
