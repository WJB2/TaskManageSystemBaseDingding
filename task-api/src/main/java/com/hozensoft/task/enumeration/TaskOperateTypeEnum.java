package com.hozensoft.task.enumeration;

public enum TaskOperateTypeEnum {

    NEW(1, "创建了任务"),

    EDIT(2, "修改了任务"),

    COMPLETE(3, "完成了任务"),

    RESTART(4, "重启了任务"),

    SUSPEND(5, "挂起了任务"),

    RESUME(6, "恢复了任务"),

    ARCHIVE(7, "归档了任务"),

    UNARCHIVE(8, "回档了任务"),

    DELETE(9, "删除了任务"),

    COMMENT(10, "备注"),

    MARK_UNREACHABLE(11, "标记为无法完成"),

    MARK_REACHABLE(12, "标记为可以完成"),

    PROGRESS(13, "标记进度"),

    AUDIT(14, "任务审核"),

    REVOKE_AUTID(15, "撤销任务审核");

    private int value;

    private String description;

    TaskOperateTypeEnum(int value, String description){
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

    public static TaskOperateTypeEnum valueOf(int i) {
        for (TaskOperateTypeEnum status : TaskOperateTypeEnum.values()) {
            if (i == status.getValue()) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknow Status's value " + i);
    }
}
