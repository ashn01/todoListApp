package com.doobidoapp;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.os.Bundle;
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
            String categoryName = "All";
            boolean showDelayed = true;
            String query;

            // get Settings from shared preference
            try{
                SharedPreferences pref = context.getSharedPreferences("DATA",Context.MODE_PRIVATE);
                String appString = pref.getString("appData","{\"selectedCategory\":'All',\"showDelayed\":true}");
                JSONObject appData = new JSONObject(appString);
                categoryName = appData.getString("selectedCategory");
                showDelayed = appData.getBoolean("showDelayed");
            } catch (JSONException e){
                categoryName="All";
                showDelayed = true;
            }

            // running sql to get data from db
            try {
                todos.clear();
                DBHelper helper = new DBHelper(context);
                SQLiteDatabase db = helper.getWritableDatabase();

                Cursor cursor;
                if(categoryName.equals("All")){
                    cursor = db.rawQuery(
                            "SELECT todoName, todoDescription, (strftime('%s',todoDeadline) - strftime('%s','now')) " +
                            "FROM TODO " +
                            "WHERE todoCompleted = 0 " +
                             (showDelayed ? "" : " AND (strftime('%s',todoDeadline) - strftime('%s','now')) > 0")
                            , null);
                }else{
                    cursor = db.rawQuery(
                            "SELECT t.todoName, t.todoDescription, (strftime('%s',t.todoDeadline) - strftime('%s','now')) " +
                            "FROM TODO t, CATEGORY c " +
                            "WHERE todoCompleted = 0 " +
                             (showDelayed ? "" : " AND (strftime('%s',todoDeadline) - strftime('%s','now')) > 0 ") +
                            "AND t.categoryId = c.id " +
                            "AND c.categoryName = ?", new String[]{categoryName});
                }

                if (cursor != null && cursor.moveToFirst()) {
                    int i = 0;
                    do {
                        String todoName = cursor.getString(0);
                        String todoDescription = cursor.getString(1);
                        double dateBetween = cursor.getDouble(2);
                        WidgetItem item = new WidgetItem(todoName,todoDescription,dateBetween);
                        todos.add(item);
                    } while (cursor.moveToNext());
                    cursor.close();
                }
            }catch (SQLException e){
                todos.clear();
                WidgetItem item = new WidgetItem(e.getMessage(),"", 0);
                todos.add(item);
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
            // date
            views.setTextViewText(R.id.date_between, getAppropriateTime(todos.get(position).getDateBetween()));
            if(todos.get(position).getDateBetween() < 0){ // if late
                views.setTextColor(R.id.date_between, Color.parseColor("#ffa5a5"));
            }else{
                views.setTextColor(R.id.date_between, Color.parseColor("#c494e2"));
            }
            //views.setTextViewText(R.id.todo_description, todos.get(position).getTodoDescription());

            Intent fillInIntent = new Intent();
            fillInIntent.putExtra("keyData",position);
            views.setOnClickFillInIntent(R.id.item_frame, fillInIntent);

            return views;
        }

        private String getAppropriateTime(double time){
            String ret=null;
            boolean isLate = false;
            if(time < 0) { // late and make it positive number
                isLate = true;
                time*=-1;
            }

            if(time < 60){
                ret = "less than a minute";
            }else{
                time/=60;
                if(time < 60){
                    ret = (int)time + " min";
                }else{
                    time/=60;
                    if(time < 24){
                        ret = (int)time + " h";
                    }else{
                        time /= 24;
                        ret = (int)time + " d";
                    }
                }
            }

            ret += (isLate ? " late" : " left");
            return ret;
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
