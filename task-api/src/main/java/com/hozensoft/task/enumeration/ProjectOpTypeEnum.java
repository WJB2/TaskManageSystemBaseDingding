package com.hozensoft.task.enumeration;

/**
 * 项目操作类型
 */
public enum ProjectOpTypeEnum {

    NEW(1, "创建项目"),

    EDIT(2, "修改项目"),

    DELETE(3, "删除项目"),

    ARCHIVE(4, "项目归档"),

    UNARCHIVE(5, "项目回档");

    private int value;

    private String description;

    ProjectOpTypeEnum(int value, String description){
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

    public static ProjectOpTypeEnum valueOf(int i) {
        for (ProjectOpTypeEnum status : ProjectOpTypeEnum.values()) {
            if (i == status.getValue()) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknow Status's value " + i);
    }
}
