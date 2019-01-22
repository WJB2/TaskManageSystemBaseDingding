package com.hozensoft.task.core.dao.query;

import com.hozensoft.task.core.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface TaskQuery {

    TaskDto findTaskById(@Param("taskId")String taskId);

    List<TaskItemDto> findTaskList(TaskQueryDto params);

    /**
     * 统计我的任务情况
     *
     * @param tenantId
     * @param staffId
     * @return
     */
    TaskCountsDto countsOwnerTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("now") Date now);

    /**
     * 统计参与人情况
     * 
     * @param tenantId
     * @param staffId
     * @param now
     * @return
     */
    TaskCountsDto countsParticipatorTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("now") Date now);

    /**
     * 统计责任人的任务情况
     *
     * @param tenantId
     * @param staffId
     * @return
     */
    TaskCountsDto countsAssigneeTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("now") Date now);

    /**
     * 统计待审批任务数量
     *
     * @param tenantId
     * @param staffId
     * @param now
     * @return
     */
    Long countsAuditorTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("now") Date now);

    /**
     * 统计关注人的任务情况
     *
     * @param tenantId
     * @param staffId
     * @return
     */
    TaskCountsDto countsSupervisorTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("now") Date now);

    /**
     * 统计某段时间内
     *
     * @param tenantId
     * @param staffId
     * @param beginTime
     * @param endTime
     * @return
     */
    Long findStaffTaskBounsPoints(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                  @Param("beginTime")Date beginTime, @Param("endTime") Date endTime);

    /**
     * 统计员工完成任务数量
     *
     * @param tenantId
     * @param staffId
     * @param projectId
     * @param beginTime
     * @param endTime
     * @return
     */
    Long countStaffCompletedTask(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                  @Param("beginTime")Date beginTime, @Param("endTime") Date endTime);

    /**
     * 统计责任人任务情况
     *
     * @param tenantId
     * @param staffId
     * @param projectId
     * @param beginTime
     * @param endTime
     * @param currentStaffId
     * @param currentTime
     * @return
     */
    List<TaskAssigneeReportDto> reportTaskByAssignee(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                                     @Param("beginTime")Date beginTime, @Param("endTime") Date endTime, @Param("currentStaffId")String currentStaffId,
                                                     @Param("currentTime")Date currentTime);

    /**
     * 统计项目任务情况
     *
     * @param tenantId
     * @param staffId
     * @param projectId
     * @param beginTime
     * @param endTime
     * @param currentStaffId
     * @param currentTime
     * @return
     */
    List<TaskProjectReportDto> reportTaskByProject(@Param("tenantId") String tenantId, @Param("staffId") String staffId, @Param("projectId")String projectId,
                                                     @Param("beginTime")Date beginTime, @Param("endTime") Date endTime, @Param("currentStaffId")String currentStaffId,
                                                     @Param("currentTime")Date currentTime);
}
