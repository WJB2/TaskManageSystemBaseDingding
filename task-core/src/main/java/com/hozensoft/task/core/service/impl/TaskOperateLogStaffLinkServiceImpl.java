package com.hozensoft.task.core.service.impl;

import com.google.common.collect.Lists;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.dao.repo.TaskOperateLogRepo;
import com.hozensoft.task.core.dao.repo.TaskOperateLogStaffLinkRepo;
import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.domain.TaskOperateLogStaffLink;
import com.hozensoft.task.core.service.TaskOperateLogStaffLinkService;
import com.hozensoft.utils.persistent.IdGen;
import liquibase.util.StringUtils;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class TaskOperateLogStaffLinkServiceImpl implements TaskOperateLogStaffLinkService {

    @Autowired
    private TaskOperateLogStaffLinkRepo taskOperateLogStaffLinkRepo;

    @Autowired
    private TaskOperateLogRepo taskOperateLogRepo;

    @Override
    @Transactional
    public void addTaskOperateLogStaffLink(ContextHolder holder,List<TaskOperateLogStaffLink> links) {

        if(CollectionUtils.isEmpty(links)){
            return;
        }

        links.stream().forEach((item)->{
            if(StringUtils.isEmpty(item.getId())){
                item.setId(IdGen.generate());
            }
        });

        List<List<TaskOperateLogStaffLink>> linksList = Lists.partition(links, 50);

        for(List<TaskOperateLogStaffLink> list : linksList){
            taskOperateLogStaffLinkRepo.addTaskOperateLogStaffLinkList(list);
        }
    }

    @Override
    @Transactional
    public void editTaskOperateLogStaffLinkReaded(ContextHolder holder, String operateLogId){

        TaskOperateLog taskOperateLog = taskOperateLogRepo.loadTaskOperateLogById(holder.getTenantId(), operateLogId);

        TaskOperateLogStaffLink link = new TaskOperateLogStaffLink();

        link.setTenantId(holder.getTenantId());
        link.setOperateLogId(operateLogId);
        link.setTaskId(taskOperateLog.getTaskId());
        link.setStaffId(holder.getStaffId());
        link.setReaded(true);
        link.setReadedTime(new Date());

        taskOperateLogStaffLinkRepo.editTaskOperateLogStaffLinkReaded(link);
    }
}
