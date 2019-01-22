package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskDomainLink;
import com.hozensoft.task.core.domain.TaskStaffDomainLink;
import com.hozensoft.task.core.dto.TaskDomainLinkQueryDto;
import com.hozensoft.task.core.dto.TaskStaffDomainLinkQueryDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskStaffDomainLinkRepo {

    int addLinks(@Param("links") List<TaskStaffDomainLink> links);

    int deleteLinksByTaskInfo(@Param("tenantId") String tenantId,
                              @Param("taskId") String taskId,
                              @Param("staffId") String staffId,
                              @Param("taskField") List<String> taskField,
                              @Param("domainType") List<String> domainType);

    List<TaskStaffDomainLink> loadTaskStaffDomainLinkList(TaskStaffDomainLinkQueryDto params);
}
