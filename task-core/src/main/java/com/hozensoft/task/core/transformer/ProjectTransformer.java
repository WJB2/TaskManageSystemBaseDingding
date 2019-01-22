package com.hozensoft.task.core.transformer;

import com.hozensoft.task.core.domain.Project;
import com.hozensoft.task.core.dto.ProjectValueDto;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

public class ProjectTransformer {
    public static Project transforProjectAddToDomain(ProjectValueDto project){

        Project domain = new Project();

        BeanUtils.copyProperties(project,domain);

        if(StringUtils.isBlank(domain.getId())){
            domain.setId(IdGen.generate());
        }

        if(domain.getDeletedFlag()!=null){
            domain.setDeletedFlag(false);
        }


        return  domain;
    }

    public static Project transforProjectEditToDomain(ProjectValueDto project){

        Project domain = new Project();

        BeanUtils.copyProperties(project,domain);

        return  domain;
    }
}
