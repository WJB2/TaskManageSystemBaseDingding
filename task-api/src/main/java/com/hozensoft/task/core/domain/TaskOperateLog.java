package com.hozensoft.task.core.domain;

import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 任务操作日志
 */
@Getter
@Setter
public class TaskOperateLog {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 操作类型
     */
    private TaskOperateTypeEnum opType;

    /**
     * 任务ID
     */
    private String taskId;

    /**
     * 操作人ID
     */
    private String operateById;

    /**
     * 操作时间
     */
    private Date operateTime;

    /**
     * 描述
     */
    private String description;
}
