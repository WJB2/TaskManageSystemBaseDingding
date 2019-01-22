package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.Project;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectRepo {

    int addProject (Project project);

    int addProjectMemberIdList(@Param("tenantId") String tenantId, @Param("projectId") String projectId,
                               @Param("memberIdList")List<String> memberIdList);

    int addProjectOrgIdList(@Param("tenantId") String tenantId, @Param("projectId")String projectId,
                            @Param("orgIdList")List<String> orgIdList);

    int editProject(Project project);

    int patchEditProject(Project project);

    int deleteProjectById(@Param("tenantId") String tenantId, @Param("projectId")String projectId);

    int deleteProjectMemberByProjectId(@Param("tenantId")String tenantId, @Param("projectId")String projectId);

    int deleteProjectOrgByProjectId(@Param("tenantId")String tenantId, @Param("projectId")String projectId);

    Project loadProjectById(@Param("tenantId") String tenantId, @Param("projectId")String projectId);
}
