package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.Project;
import com.hozensoft.task.core.service.ProjectService;
import com.hozensoft.test.DaoBaseTester;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ProjectRepoTester extends DaoBaseTester {

    @Autowired
   private ProjectRepo projectRepo;

    @Autowired
    private ProjectService projectService;

    @Test
    public void testAddProject(){
        Project pj = new Project();
        pj.setName("哪里的问题");
        pj.setTenantId("213");
        pj.setId("2123");
        projectRepo.addProject(pj);
        System.out.println(pj);
    }
}
