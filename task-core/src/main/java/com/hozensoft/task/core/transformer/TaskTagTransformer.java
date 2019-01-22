package com.hozensoft.task.core.transformer;

import com.hozensoft.task.core.domain.TaskTag;
import com.hozensoft.task.core.dto.TaskTagValueDto;

import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

public class TaskTagTransformer {

    public static TaskTag transforTaskTagAddToDomain(TaskTagValueDto taskTag){
        TaskTag domain = new TaskTag();

        BeanUtils.copyProperties(taskTag,domain);

        if(StringUtils.isBlank(domain.getId())){
            domain.setId(IdGen.generate());
        }


        return domain;
    }

    public static TaskTag transforTaskTagEditToDomain(TaskTagValueDto taskTag){
        TaskTag domain = new TaskTag();

        BeanUtils.copyProperties(taskTag,domain);

        return  domain;
    }
}
