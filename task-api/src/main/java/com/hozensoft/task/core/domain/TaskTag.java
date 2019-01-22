package com.hozensoft.task.core.domain;

import com.hozensoft.task.enumeration.TaskTagTypeEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/**
 * 任务标签
 */
public class TaskTag {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 标签类型
     */
    private TaskTagTypeEnum tagType;

    /**
     * 标签内容
     */
    private String name;

    /**
     * 颜色
     */
    private String label;

    /**
     * 组织ID
     */
    private String orgId;

    /**
     * 人员ID
     */
    private String staffId;
}
