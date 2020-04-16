package com.doobidoapp;

import android.content.Intent;
import android.os.IBinder;
import android.widget.RemoteViewsService;

public class WidgetRemoteService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new WidgetRemoteViewsFactory(this.getApplicationContext());
    }
}
