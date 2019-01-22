package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskOperateLogStaffLink;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskOperateLogStaffLinkRepo {

    int addTaskOperateLogStaffLinkList(@Param("links") List<TaskOperateLogStaffLink> links);

    int editTaskOperateLogStaffLinkReaded(TaskOperateLogStaffLink link);
}
