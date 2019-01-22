package com.hozensoft.task.core.dto;

import com.hozensoft.task.enumeration.TaskQueryTypeEnum;
import com.hozensoft.task.enumeration.TaskSortByEnum;
import com.hozensoft.task.enumeration.TaskStatusEnum;
import com.hozensoft.task.enumeration.TaskTypeEnum;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TaskQueryDto {

    /**
     * ID
     */
    private List<String> id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 所属项目ID
     */
    private List<String> projectId;

    /**
     * 上级任务ID
     */
    private List<String> parentId;

    /**
     * 任务类型
     */
    private TaskTypeEnum taskType;

    /**
     * 任务标题
     */
    private String text;

    /**
     * 负责人
     */
    private List<String> assigneeId;

    /**
     * 参与人
     */
    private List<String> participatorId;

    /**
     * 关注人
     */
    private List<String> supervisorId;

    /**
     * 创建人
     */
    private List<String> createdById;

    /**
     * 标签
     */
    private List<String> tagId;

    /**
     * 群组
     */
    private List<String> groupId;

    /**
     * 任务开始时间
     */
    private Date beginTimeRangeLeft;

    /**
     * 任务结开始时间
     */
    private Date beginTimeRangeRight;

    /**
     * 任务结束时间
     */
    private Date endTimeRangeLeft;

    private Date endTimeRangeRight;

    /**
     * 完成时间
     */
    private Date completedTimeRangeLeft;

    private Date completedTimeRangeRight;

    /**
     * 挂起状态
     */
    private Boolean suspended;

    /**
     * 是否完成
     */
    private Boolean completed;

    /**
     * 归档标记
     */
    private Boolean archived;

    /**
     * 逻辑删除标记
     */
    private Boolean deletedFlag;

    private Boolean includeSubTask;

    private String currentStaffId;

    private Date currentTime;

    /**
     * 查询类型
     */
    private TaskQueryTypeEnum queryType;

    /**
     * 任务状态
     */
    private TaskStatusEnum status;

    /**
     * 排序
     */
    private TaskSortByEnum sortBy;
}
