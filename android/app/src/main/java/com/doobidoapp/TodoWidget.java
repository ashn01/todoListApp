package com.doobidoapp;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.widget.RemoteViews;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Implementation of App Widget functionality.
 */
public class TodoWidget extends AppWidgetProvider {
    public static final String UPDATE_BUTTON_CLICKED = "action.UPDATE_BUTTON_CLICKED";


    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for(int appWidgetId : appWidgetIds){
            //Toast.makeText(context, "onUpdate", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(context, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);

            // shared
            //SharedPreferences prefs = context.getSharedPreferences(SHARED_PRES, Context.MODE_PRIVATE);
            //String buttonText = prefs.getString(KEY_BUTTON_TEXT + appWidgetId, "Press Me");

            // service
            Intent serviceIntent = new Intent(context, TodoWidgetService.class);
            serviceIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);

            serviceIntent.setData(Uri.parse(serviceIntent.toUri(Intent.URI_INTENT_SCHEME)));

            RemoteViews views = new RemoteViews(context.getPackageName(),R.layout.todo_widget);
            views.setOnClickPendingIntent(R.id.refresh_widget_button,
                    getPendingSelfIntent(context,UPDATE_BUTTON_CLICKED, appWidgetIds)); // refresh

            // set selectedCategory
            String categoryName=null;
            try{
                SharedPreferences pref = context.getSharedPreferences("DATA",Context.MODE_PRIVATE);
                String appString = pref.getString("appData","{\"value\":'All'}");
                JSONObject appData = new JSONObject(appString);
                categoryName = appData.getString("value");
            } catch (JSONException e){
                categoryName="All";
            }finally {
                views.setTextViewText(R.id.category_name, categoryName);
            }

            // set listview and empty
            views.setRemoteAdapter(R.id.widget_list_view,serviceIntent);
            views.setEmptyView(R.id.widget_list_view, R.id.widget_progress_bar);

            Bundle appWidgetOptions = appWidgetManager.getAppWidgetOptions(appWidgetId);
            resizeWidget(appWidgetOptions, views);

            appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.widget_list_view);
           // appWidgetManager.updateAppWidget(appWidgetId,null);
            appWidgetManager.updateAppWidget(appWidgetId,views);
        }
        super.onUpdate(context, appWidgetManager, appWidgetIds);
    }

    private PendingIntent getPendingSelfIntent(Context context, String action, int[] appWidgetIds) {

        Intent intent = new Intent(context, TodoWidget.class); // An intent directed at the current class (the "self").
        intent.setAction(action);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS,appWidgetIds);
        return PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }


    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.todo_widget);

        resizeWidget(newOptions, views);
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private void resizeWidget(Bundle appWidgetOptions, RemoteViews views){
        int minWidth = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH);
        int maxWidth = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH);
        int minHeight = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT);
        int maxHeight = appWidgetOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT);

        // appear disappear by widget size
        if(maxHeight > 100){
            //views.setViewVisibility(R.id.refresh_widget_button, View.VISIBLE);
        }else{
            //views.setViewVisibility(R.id.refresh_widget_button, View.GONE);
        }

    }

    @Override
    public void onReceive(Context context, Intent intent) {
        // Call onUpdate function
        super.onReceive(context, intent);
        if(intent.getAction().equals(TodoWidget.UPDATE_BUTTON_CLICKED)) {
            Bundle extras = intent.getExtras();
            if(extras != null) {
                int[] appWidgetIds = extras.getIntArray(AppWidgetManager.EXTRA_APPWIDGET_IDS);

                if(appWidgetIds != null && appWidgetIds.length > 0) {
                    Toast.makeText(context, "Doobido Updated", Toast.LENGTH_SHORT).show();
                    this.onUpdate(context, AppWidgetManager.getInstance(context), appWidgetIds);
                }
            }
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        //Toast.makeText(context, "onDeleted", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onEnabled(Context context) {
        //Toast.makeText(context, "onEnabled", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDisabled(Context context) {
        //Toast.makeText(context, "OnDisabled", Toast.LENGTH_SHORT).show();
    }
}
