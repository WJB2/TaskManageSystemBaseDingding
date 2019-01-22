package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStaffDomainLink {

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

}
