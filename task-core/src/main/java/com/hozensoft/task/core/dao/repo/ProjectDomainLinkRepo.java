package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.ProjectDomainLink;
import com.hozensoft.task.core.dto.ProjectDomainLinkQueryDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectDomainLinkRepo {

    int addLinks(@Param("links") List<ProjectDomainLink> links);

    int deleteLinksByProjectInfo(@Param("tenantId")String tenantId,
                                 @Param("projectId") String projectId,
                                 @Param("projectField")List<String> projectField,
                                 @Param("domainType")List<String> domainType);

    List<ProjectDomainLink> loadProjectDomainLinkList(ProjectDomainLinkQueryDto params);
}
