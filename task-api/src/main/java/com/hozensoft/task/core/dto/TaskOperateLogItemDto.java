package com.hozensoft.task.core.dto;

import com.hozensoft.system.core.dto.StaffItemDto;
import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 *
 */
@Getter
@Setter
public class TaskOperateLogItemDto {

    /**
     * ID
     */
    private String id;

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
     * 操作人
     */
    private StaffItemDto operateBy;

    /**
     * 操作时间
     */
    private Date operateTime;

    /**
     * 描述
     */
    private String description;
}
