package com.hozensoft.task.core.dto;

import com.hozensoft.system.core.dto.StaffItemDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskAssigneeReportDto {

    /**
     * 责任人ID
     */
    private String assigneeId;

    /**
     * 责任人
     */
    private StaffItemDto assignee;

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

    /**
     * 责任人积分
     */
    private Long assigneeBonusPoints;

    /**
     * 参与人积分
     */
    private Long participatorBonusPoints;

    /**
     * 创建人积分
     */
    private Long ownerBonusPoints;
}
