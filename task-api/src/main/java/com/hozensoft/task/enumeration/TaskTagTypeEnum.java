package com.hozensoft.task.enumeration;

public enum TaskTagTypeEnum {

    SYSTEM(1, "系统标签"),

    ORGANIZATION(2, "组织标签"),

    STAFF(3, "个人标签");

    private int value;

    private String description;

    TaskTagTypeEnum(int value, String description){
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

    public static TaskTagTypeEnum valueOf(int i) {
        for (TaskTagTypeEnum status : TaskTagTypeEnum.values()) {
            if (i == status.getValue()) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknow Status's value " + i);
    }
}
