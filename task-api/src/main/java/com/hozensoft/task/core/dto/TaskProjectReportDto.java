package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskProjectReportDto {

    /**
     * 责任人ID
     */
    private String projectId;

    /**
     * 责任人
     */
    private ProjectItemDto project;

    /**
     * 未完成总数
     */
    private Long incomplete;

    /**
     * 未完成未逾期
     */
    private Long incompleteUnderway;

    /**
     * 未完成已逾期
     */
    private Long incompleteExpired;

    /**
     * 已完成
     */
    private Long completed;

    /**
     * 提前完成
     */
    private Long completedBefore;

    /**
     * 逾期完成
     */
    private Long completedAfter;

    /**
     * 已归档
     */
    private Long archived;
}
