package com.doobidoapp;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.os.SystemClock;
import android.util.Pair;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class TodoWidgetService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new TodoWidgetItemFactory(getApplicationContext(),intent);
    }

    class TodoWidgetItemFactory implements RemoteViewsFactory{
        private Context context;
        private int appWidgetId;
        private List<WidgetItem> todos = new ArrayList<WidgetItem>();
        TodoWidgetItemFactory(Context context, Intent intent){
            this.context=context;
            this.appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        // instanciate
        @Override
        public void onCreate() {
            // connect to data source
            loadDateFromSQLite();
        }

        private void loadDateFromSQLite() {
            String categoryName = "";
            String query;

            try{
                SharedPreferences pref = context.getSharedPreferences("DATA",Context.MODE_PRIVATE);
                String appString = pref.getString("appData","{\"value\":'All'}");
                JSONObject appData = new JSONObject(appString);
                categoryName = appData.getString("value");
            } catch (JSONException e){
                categoryName="All";
            }

            try {
                todos.clear();
                DBHelper helper = new DBHelper(context);
                SQLiteDatabase db = helper.getWritableDatabase();

                Cursor cursor;
                if(categoryName.equals("All")){
                    cursor = db.rawQuery("SELECT todoName, todoDescription " +
                            "FROM TODO " +
                            "WHERE todoCompleted = 0 "
                            , null);
                }else{
                    cursor = db.rawQuery("SELECT t.todoName, t.todoDescription " +
                            "FROM TODO t, CATEGORY c " +
                            "WHERE todoCompleted = 0 " +
                            "AND t.categoryId = c.id " +
                            "AND c.categoryName = ?", new String[]{categoryName});
                }

                if (cursor != null && cursor.moveToFirst()) {
                    int i = 0;
                    do {
                        String todoName = cursor.getString(0);
                        String todoDescription = cursor.getString(1);
                        WidgetItem item = new WidgetItem(todoName,todoDescription);
                        todos.add(item);
                        //exampleData[i++] = todoName;
                    } while (cursor.moveToNext());
                    cursor.close();
                }
            }catch (SQLException e){
                todos.clear();
            }
        }

        @Override
        public void onDataSetChanged() {
            loadDateFromSQLite();
        }

        @Override
        public void onDestroy() {
            // close data source
        }

        @Override
        public int getCount() {
            return todos.size();
        }

        @Override
        public RemoteViews getViewAt(int position) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.todo_collection);
            views.setTextViewText(R.id.todo_name, todos.get(position).getTodoName());
            views.setTextViewText(R.id.todo_description, todos.get(position).getTodoDescription());

            return views;
        }


        @Override
        public RemoteViews getLoadingView() {
            return null;
        }

        @Override
        public int getViewTypeCount() {
            return 1;
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public boolean hasStableIds() {
            return true;
        }
    }
}
