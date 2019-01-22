package com.hozensoft.task.enumeration;

public enum TaskTypeEnum {

    NORMAL(1, "普通任务"),

    CORPORATE(2, "协作任务");

    private int value;

    private String description;

    TaskTypeEnum(int value, String description){
        this.value = value;
        this.description = description;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static TaskTypeEnum valueOf(int i) {
        for (TaskTypeEnum status : TaskTypeEnum.values()) {
            if (i == status.getValue()) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknow Status's value " + i);
    }
}
