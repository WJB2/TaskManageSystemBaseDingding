package com.hozensoft.task.core.dao.query;

import com.hozensoft.task.core.dto.ProjectDto;
import com.hozensoft.task.core.dto.ProjectItemDto;
import com.hozensoft.task.core.dto.ProjectQueryDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectQuery {

    ProjectDto findProjectById(@Param("tenantId") String tenantId, @Param("projectId")String projectId);

    List<ProjectItemDto> findProjectList(ProjectQueryDto params);
}
