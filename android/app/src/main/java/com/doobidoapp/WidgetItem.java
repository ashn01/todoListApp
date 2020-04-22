package com.doobidoapp;

public class WidgetItem {
    String todoName;
    String todoDescription;
    public WidgetItem(String todoName,String todoDescription){
        this.todoName = todoName;
        this.todoDescription = todoDescription;
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
