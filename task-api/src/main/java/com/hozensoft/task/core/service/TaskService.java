package com.hozensoft.task.core.service;


import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.Task;
import com.hozensoft.task.core.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface TaskService {

    /**
     * 新增任务
     * @param holder
     * @param task
     * @return
     */
    TaskDto addTask(ContextHolder holder, TaskValueDto task);

    /**
     * 编辑任务
     * @param holder
     * @param task
     * @return
     */
    TaskDto editTask(ContextHolder holder, TaskValueDto task);

    /**
     * 局部更新任务
     * @param holder
     * @param task
     * @return
     */
    TaskDto patchEditTask(ContextHolder holder, TaskValueDto task);

    void editTaskBonusPoints(ContextHolder holder, TaskBonusPointsValueDto taskBonusPointsValueDto);

    /**
     * 根据ID删除任务
     * @param holder
     * @param taskId
     */
    void deleteTaskById(ContextHolder holder,String taskId);

    /**
     * 根据ID获取任务
     * @param holder
     * @param taskId
     * @return
     */
    TaskDto findTaskById(ContextHolder holder, String taskId);

    Task loadTaskById(ContextHolder holder, String taskId);

    List<TaskItemDto> findTaskList(ContextHolder holder, TaskQueryDto params, Limitable limitable);

    PageInfo<TaskItemDto> findTaskPage(ContextHolder holder, TaskQueryDto params, Pageable pageable);

    /**
     * 完成任务
     */
    void completeTask(ContextHolder holder, String taskId);

    /**
     * 审核任务
     * @param holder
     * @param taskId
     */
    void auditTask(ContextHolder holder, String taskId);

    /**
     * 撤回任务审核
     * @param holder
     * @param taskId
     */
    void revokeTaskAudit(ContextHolder holder, String taskId);

    /**
     * 重新开始任务
     */
    void restartTask(ContextHolder holder, String taskId);

    /**
     * 挂起任务
     * @param holder
     * @param taskId
     */
    void suspendTask(ContextHolder holder, String taskId);

    /**
     * 重启任务
     * @param holder
     * @param taskId
     */
    void resumeTask(ContextHolder holder, String taskId);

    /**
     * 标注任务为无法完成
     *
     * @param holder
     * @param commentDto
     */
    void markTaskUnreachable(ContextHolder holder, TaskCommentValueDto commentDto);

    /**
     * 标注任务为可以完成
     *
     * @param holder
     * @param commentDto
     */
    void markTaskReachable(ContextHolder holder, TaskCommentValueDto commentDto);

    /**
     * 任务归档
     */
    void archiveTask(ContextHolder holder, String taskId);

    /**
     * 任务回档
     */
    void unarchiveTask(ContextHolder holder, String taskId);

    /**
     * 任务备注
     */
    void commentTaskById(ContextHolder holder, TaskCommentValueDto commentDto);

    void editTaskGroupById(ContextHolder holder, TaskDomainLinkValueDto links);

    /**
     * 统计我的任务情况
     *
     * @param holder
     * @param staffId
     * @return
     */
    TaskCountsDto countsOwnerTask(ContextHolder holder, String staffId);

    /**
     * 统计参与人任务情况
     *
     * @param holder
     * @param staffId
     * @return
     */
    TaskCountsDto countsParticipatorTask(ContextHolder holder, String staffId);

    /**
     * 统计责任人的任务情况
     *
     * @param holder
     * @param staffId
     * @return
     */
    TaskCountsDto countsAssigneeTask(ContextHolder holder, String staffId);

    /**
     * 统计待审核任务数量
     *
     * @param holder
     * @param staffId
     * @return
     */
    Long countsAuditorTask(ContextHolder holder, String staffId);

    /**
     * 统计关注人的任务情况
     *
     * @param holder
     * @param staffId
     * @return
     */
    TaskCountsDto countsSupervisorTask(ContextHolder holder, String staffId);

    TaskAssigneeReportDto findStaffTaskBounsPoints(ContextHolder holder, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                  @Param("beginTime")Date beginTime, @Param("endTime") Date endTime);

    Long countStaffCompletedTask(ContextHolder holder, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                  @Param("beginTime")Date beginTime, @Param("endTime") Date endTime);

    PageInfo<TaskAssigneeReportDto> reportTaskByAssignee(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime, Pageable pageable);

    PageInfo<TaskProjectReportDto> reportTaskByProject(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime, Pageable pageable);
}
