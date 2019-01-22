package com.hozensoft.task.core.dto;

import com.hozensoft.task.enumeration.TaskTagTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class TaskTagItemDto implements Serializable {

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
