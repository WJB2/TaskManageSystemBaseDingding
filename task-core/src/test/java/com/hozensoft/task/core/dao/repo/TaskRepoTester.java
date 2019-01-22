package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.Task;
import com.hozensoft.task.core.dto.TaskValueDto;
import com.hozensoft.task.core.service.TaskService;
import com.hozensoft.test.DaoBaseTester;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class TaskRepoTester extends DaoBaseTester {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    TaskService taskService;

    @Test
    public void testAddTask(){
        Task task = new Task();
        task.setId("2222");
        task.setTitle("你TM傻逼吧");
        task.setTenantId("654");
        task.setArchived(false);

        taskRepo.addTask(task);
    }

    @Test
    public void testAddTaskDto(){
        Task task = new Task();
        task.setTitle("测试111");
        task.setArchived(true);
        task.setProgressStatus(100);
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        taskRepo.editTask(task);
        System.out.println("22222222222222222222222222222222222222222222222222222");
        System.out.println(task);
    }




}
