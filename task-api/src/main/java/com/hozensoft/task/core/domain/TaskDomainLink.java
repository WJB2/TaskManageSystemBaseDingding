package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskDomainLink {

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
     * 任务模型字段
     */
    private String taskField;

    /**
     * 引用实体类型
     */
    private String domainType;

    /**
     * 引用实体ID
     */
    private String domainId;

    /**
     * 显示顺序
     */
    private Integer sortNo;

    /**
     * 完成
     */
    private Boolean completed;

    /**
     * 完成时间
     */
    private Date completedTime;
}
