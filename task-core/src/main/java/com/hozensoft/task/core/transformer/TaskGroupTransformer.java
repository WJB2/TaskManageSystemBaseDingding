package com.hozensoft.task.core.transformer;

import com.hozensoft.task.core.domain.TaskGroup;
import com.hozensoft.task.core.dto.TaskGroupValueDto;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

public class TaskGroupTransformer {

    public static TaskGroup transforTaskGroupAddToDomain(TaskGroupValueDto taskGroup){
        TaskGroup domain = new TaskGroup();

        BeanUtils.copyProperties(taskGroup,domain);

        if(StringUtils.isBlank(domain.getId())){
            domain.setId(IdGen.generate());
        }


        return domain;
    }

    public static TaskGroup transforTaskGroupEditToDomain(TaskGroupValueDto taskGroup){
        TaskGroup domain = new TaskGroup();

        BeanUtils.copyProperties(taskGroup,domain);

        return  domain;
    }
}
