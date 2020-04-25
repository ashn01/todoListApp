package com.doobidoapp;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RemoteViews;

import androidx.appcompat.app.AppCompatActivity;

public class TodoAppWidgetConfig  extends AppCompatActivity {

    public static final String SHARED_PRES = "prefs";
    public static final String KEY_BUTTON_TEXT  = "keyButtonText";

    private int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private EditText editTextButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.todo_widget_config);

        Intent configIntent = getIntent();
        Bundle extras = configIntent.getExtras();
        if(extras != null) {
            appWidgetId = extras.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        Intent resultValue = new Intent();
        resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        setResult(RESULT_CANCELED, resultValue);

        if(appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID){
            finish(); // something wrong
        }

        editTextButton = findViewById(R.id.edit_text_button);
    }

    public void confirmConfiguration(View v){
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(this);

        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,intent,0);

        String buttonText = editTextButton.getText().toString();

        Intent serviceIntent = new Intent(this, TodoWidgetService.class);
        serviceIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        serviceIntent.setData(Uri.parse(serviceIntent.toUri(Intent.URI_INTENT_SCHEME)));


        RemoteViews views = new RemoteViews(this.getPackageName(), R.layout.todo_widget);
        views.setOnClickPendingIntent(R.id.refresh_widget_button, pendingIntent);
        views.setCharSequence(R.id.refresh_widget_button, "setText", buttonText); // send text
        views.setRemoteAdapter(R.id.widget_list_view, serviceIntent);
        views.setEmptyView(R.id.widget_list_view,R.id.widget_progress_bar);

        appWidgetManager.updateAppWidget(appWidgetId, views);

        SharedPreferences prefs = getSharedPreferences(SHARED_PRES, MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(KEY_BUTTON_TEXT + appWidgetId, buttonText);

        editor.apply();

        Intent resultValue = new Intent();
        resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        setResult(RESULT_OK, resultValue);
        finish();
    }
}
