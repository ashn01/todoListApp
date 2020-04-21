package com.doobidoapp;

public class WidgetItem {
    int _id;
    String todoName;
    String todoDescription;
    public WidgetItem(int _id,String todoName,String todoDescription){
        this._id = _id;
        this.todoName = todoName;
        this.todoDescription = todoDescription;
    }
    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String getTodoName() {
        return todoName;
    }

    public void setTodoName(String todoName) {
        this.todoName = todoName;
    }

    public String getTodoDescription() {
        return todoDescription;
    }

    public void setTodoDescription(String todoDescription) {
        this.todoDescription = todoDescription;
    }
}
