package com.hozensoft.task;

/**
 * 任务管理模块事件类型
 */
public interface TmEventConst {

    String TM_QUEUE = "TM_QUEUE";

    /**
     * 任务新建事件
     */
    String TM_TASK_CREATED = "TM_TASK_CREATED";

    /**
     * 任务修改
     */
    String TM_TASK_EDITED = "TM_TASK_EDITED";

    /**
     * 任务完成
     */
    String TM_TASK_COMPLETED = "TM_TASK_COMPLETED";

    /**
     * 任务重启
     */
    String TM_TASK_RESTARTED = "TM_TASK_RESTARTED";

    /**
     * 任务归档
     */
    String TM_TASK_ARCHIVED = "TM_TASK_ARCHIVED";

    /**
     * 任务回档
     */
    String TM_TASK_UNARCHIVED = "TM_TASK_UNARCHIVED";

    /**
     * 任务挂起
     */
    String TM_TASK_SUSPENDED = "TM_TASK_SUSPENDED";

    /**
     * 任务恢复
     */
    String TM_TASK_RESUME = "TM_TASK_RESUME";

    /**
     * 任务无法完成
     */
    String TM_TASK_UNREACHABLE = "TM_TASK_UNREACHABLE";

    /**
     * 任务可以完成
     */
    String TM_TASK_REACHABLE = "TM_TASK_REACHABLE";

    /**
     * 任务删除
     */
    String TM_TASK_DELETED = "TM_TASK_DELETED";

    /**
     * 任务审核
     */
    String TM_TASK_AUDITED = "TM_TASK_AUDITED";

    /**
     * 任务审核撤销
     */
    String TM_TASK_AUDIT_REVOKED = "TM_TASK_AUDIT_REVOKED";
}
