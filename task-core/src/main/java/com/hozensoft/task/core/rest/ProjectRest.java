package com.hozensoft.task.core.rest;


import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.task.core.dto.ProjectDto;
import com.hozensoft.task.core.dto.ProjectItemDto;
import com.hozensoft.task.core.dto.ProjectQueryDto;
import com.hozensoft.task.core.dto.ProjectValueDto;
import com.hozensoft.task.core.service.ProjectService;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "项目管理接口")
@RestController
@RequestMapping("api/tm/project")
public class ProjectRest {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public @ResponseBody ProjectDto addProject(@RequestBody ProjectValueDto projectDto){

        projectDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return  projectService.addProject(ContextUtils.fetchContext(),projectDto);
    }

    @PutMapping("/{projectId}")
    public @ResponseBody ProjectDto editProject(@PathVariable("projectId")String projectId,
                                                @RequestBody ProjectValueDto projectDto){
        projectDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return  projectService.editProject(ContextUtils.fetchContext(),projectDto);
    }

    @PatchMapping("/{projectId}")
    public @ResponseBody ProjectDto patchEditProject(@PathVariable("projectId")String projectId,
                                                @RequestBody ProjectValueDto projectDto){
        projectDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return  projectService.patchEditProject(ContextUtils.fetchContext(),projectDto);
    }

    @DeleteMapping(value = "/{projectId}")
    public void deleteProjectById(@PathVariable("projectId")String projectId){

        projectService.deleteProjectById(ContextUtils.fetchContext(),projectId);
    }


    @GetMapping("/{projectId}")
    public @ResponseBody ProjectDto findProjectById(@PathVariable("projectId")String projectId){

        return  projectService.findProjectById(ContextUtils.fetchContext(),projectId);
    }

    @GetMapping(value = "/list")
    public @ResponseBody
        List<ProjectItemDto> findProjectList(ProjectQueryDto params, Limitable limitable){

        if(StringUtils.isBlank(params.getTenantId())){
            params.setTenantId(ContextUtils.getCurrentTenant().getId());
        }
        return projectService.findProjectList(ContextUtils.fetchContext(),params,limitable);
    }

    @GetMapping(value = "/page")
    public @ResponseBody
    PageInfo<ProjectItemDto> findProjectPage(ProjectQueryDto params, Pageable pageable){

        if(StringUtils.isBlank(params.getTenantId())){
            params.setTenantId(ContextUtils.getCurrentTenant().getId());
        }
        return projectService.findProjectPage(ContextUtils.fetchContext(),params,pageable);
    }
}
