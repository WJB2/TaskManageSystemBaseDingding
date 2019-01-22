package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskDomainLink;
import com.hozensoft.task.core.dto.TaskDomainLinkQueryDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskDomainLinkRepo {

    int addLinks(@Param("links") List<TaskDomainLink> links);

    int deleteLinksByTaskInfo(@Param("tenantId") String tenantId,
                                 @Param("taskId") String taskId,
                                 @Param("taskField") List<String> taskField,
                                 @Param("domainType") List<String> domainType);

    int editLink(TaskDomainLink link);

    List<TaskDomainLink> loadTaskDomainLinkList(TaskDomainLinkQueryDto params);
}
