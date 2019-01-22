package com.hozensoft.task.core.transformer;

import com.hozensoft.task.core.domain.Task;
import com.hozensoft.task.core.dto.TaskValueDto;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

public class TaskTransformer {
    public static Task transforTaskAddtoDomain(TaskValueDto  task){

        Task domain = new Task();

        BeanUtils.copyProperties(task, domain);

        if(StringUtils.isBlank(domain.getId())){
            domain.setId(IdGen.generate());
        }

        if(domain.getDeletedFlag()!=null){
            domain.setDeletedFlag(false);
        }

        return domain;
    }

    public static Task transforTaskTransferEditToDomain(TaskValueDto task){

        Task domain = new Task();

        BeanUtils.copyProperties(task,domain);

        return domain;
    }
}
