package com.doobidoapp;

public class WidgetItem {
    private String todoName;
    private String todoDescription;
    private double dateBetween;

    public WidgetItem(String todoName,String todoDescription, double dateBetween){
        this.todoName = todoName;
        this.todoDescription = todoDescription;
        this.dateBetween = dateBetween;
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

    public double getDateBetween() {
        return dateBetween;
    }

    public void setDateBetween(double dateBetween) {
        this.dateBetween = dateBetween;
    }
}
