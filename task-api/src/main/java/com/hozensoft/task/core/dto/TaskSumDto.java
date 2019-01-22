package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskSumDto {

    /**
     * 任务数量
     */
    private Long taskCounts;

    /**
     * 任务积分
     */
    private Long taskBonusPoint;
}
