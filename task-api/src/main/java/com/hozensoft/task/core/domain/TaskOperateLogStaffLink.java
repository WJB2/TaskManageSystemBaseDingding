package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 任务操作日志关系表
 */
@Getter
@Setter
public class TaskOperateLogStaffLink {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 任务ID
     */
    private String taskId;

    /**
     * 人员ID
     */
    private String staffId;

    /**
     * 操作日志ID
     */
    private String operateLogId;

    /**
     * 是否已读
     */
    private Boolean readed;

    /**
     * 浏览时间
     */
    private Date readedTime;

    /**
     * 显示顺序
     */
    private Integer sortNo;
}
