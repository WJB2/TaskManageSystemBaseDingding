package com.hozensoft.task.core.service;



import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.Project;
import com.hozensoft.task.core.dto.ProjectDto;
import com.hozensoft.task.core.dto.ProjectItemDto;
import com.hozensoft.task.core.dto.ProjectQueryDto;
import com.hozensoft.task.core.dto.ProjectValueDto;

import java.util.List;

public interface ProjectService {

    ProjectDto addProject(ContextHolder holder, ProjectValueDto project);

    ProjectDto  editProject(ContextHolder holder, ProjectValueDto project);

    ProjectDto patchEditProject(ContextHolder holder, ProjectValueDto projectValueDto);

    void archiveProject(ContextHolder holder, String projectId);

    void unarchiveProject(ContextHolder holder, String projectId);

    void  deleteProjectById(ContextHolder holder, String projectId);

    ProjectDto findProjectById(ContextHolder holder,String projectId);

    Project loadProjectById(ContextHolder holder, String projectId);

    List<ProjectItemDto> findProjectList(ContextHolder holder, ProjectQueryDto params, Limitable limitable);

    PageInfo<ProjectItemDto>findProjectPage(ContextHolder holder,ProjectQueryDto params, Pageable pageable);
}
