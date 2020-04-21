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

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */

import static com.doobidoapp.TodoAppWidgetConfig.KEY_BUTTON_TEXT;
import static com.doobidoapp.TodoAppWidgetConfig.SHARED_PRES;


public class TodoWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for(int appWidgetId : appWidgetIds){
            Toast.makeText(context, "onUpdate", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(context, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);

            // shared
            SharedPreferences prefs = context.getSharedPreferences(SHARED_PRES, Context.MODE_PRIVATE);
            String buttonText = prefs.getString(KEY_BUTTON_TEXT + appWidgetId, "Press Me");

            // service
            Intent serviceIntent = new Intent(context, TodoWidgetService.class);
            serviceIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            serviceIntent.setData(Uri.parse(serviceIntent.toUri(Intent.URI_INTENT_SCHEME)));


            RemoteViews views = new RemoteViews(context.getPackageName(),R.layout.todo_widget);
            views.setOnClickPendingIntent(R.id.example_widget_button, pendingIntent);
            views.setCharSequence(R.id.example_widget_button, "setText", buttonText); // name button
            views.setRemoteAdapter(R.id.example_widget_stack_view,serviceIntent);
            views.setEmptyView(R.id.example_widget_stack_view, R.id.example_widget_empty_view);

            Bundle appWidgetOptions = appWidgetManager.getAppWidgetOptions(appWidgetId);
            resizeWidget(appWidgetOptions, views);

            appWidgetManager.updateAppWidget(appWidgetId,views);
        }
        super.onUpdate(context, appWidgetManager, appWidgetIds);
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
            views.setViewVisibility(R.id.example_widget_text, View.VISIBLE);
            views.setViewVisibility(R.id.example_widget_button, View.VISIBLE);
        }else{
            views.setViewVisibility(R.id.example_widget_text, View.GONE);
            views.setViewVisibility(R.id.example_widget_button, View.GONE);
        }

    }


    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        Toast.makeText(context, "onDeleted", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onEnabled(Context context) {
        Toast.makeText(context, "onEnabled", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDisabled(Context context) {
        Toast.makeText(context, "OnDisabled", Toast.LENGTH_SHORT).show();
    }
}


/*
static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
            JSONObject appData = new JSONObject(appString);
            // Construct the RemoteViews object
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.todo_widget);
            views.setTextViewText(R.id.empty_view, appData.getString("text"));
            // Instruct the widget manager to update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }
 */