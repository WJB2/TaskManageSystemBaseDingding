package com.hozensoft.task.core.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.core.domain.Organization;
import com.hozensoft.system.core.dto.*;
import com.hozensoft.system.core.service.OrganizationService;
import com.hozensoft.system.core.service.PositionService;
import com.hozensoft.system.core.service.StaffService;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.system.utils.awared.CreatedAwared;
import com.hozensoft.system.utils.awared.UpdatedAwared;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.dao.query.ProjectQuery;
import com.hozensoft.task.core.dao.repo.ProjectDomainLinkRepo;
import com.hozensoft.task.core.dao.repo.ProjectOpLogRepo;
import com.hozensoft.task.core.dao.repo.ProjectRepo;
import com.hozensoft.task.core.domain.Project;
import com.hozensoft.task.core.domain.ProjectDomainLink;
import com.hozensoft.task.core.dto.*;
import com.hozensoft.task.core.service.ProjectService;
import com.hozensoft.task.core.transformer.ProjectTransformer;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hozensoft.system.core.domain.Staff;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ProjectQuery projectQuery;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PositionService positionService;

    @Autowired
    private StaffService staffService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private ProjectOpLogRepo projectOpLogRepo;

    @Autowired
    private ProjectDomainLinkRepo projectDomainLinkRepo;

    @Override
    @Transactional
    public ProjectDto addProject(ContextHolder holder, ProjectValueDto projectDto) {

        Project pj = ProjectTransformer.transforProjectAddToDomain(projectDto);

        PositionDto currentPosition = positionService.findPositionById(holder, projectDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, pj, CreatedAwared.class, UpdatedAwared.class);

        pj.setTenantId(holder.getTenantId());
        pj.setDeletedFlag(false);

        projectRepo.addProject(pj);

        List<ProjectDomainLink> links = createProjectDomainLink(holder, pj);

        if(!CollectionUtils.isEmpty(links)){
            addProjectDomainLinkList(links);
        }

        ProjectDto outDto = findProjectById(holder,pj.getId());

        return outDto;
    }

    @Override
    @Transactional
    public ProjectDto editProject(ContextHolder holder, ProjectValueDto projectDto) {

        Project pj = ProjectTransformer.transforProjectEditToDomain(projectDto);
        pj.setTenantId(holder.getTenantId());

        projectDomainLinkRepo.deleteLinksByProjectInfo(holder.getTenantId(), pj.getId(), null, null);

        PositionDto currentPosition = positionService.findPositionById(holder, projectDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, pj, UpdatedAwared.class);

        projectRepo.patchEditProject(pj);

        List<ProjectDomainLink> links = createProjectDomainLink(holder, pj);

        if(!CollectionUtils.isEmpty(links)){
            addProjectDomainLinkList(links);
        }

        ProjectDto outDto = findProjectById(holder,pj.getId());

        return outDto;
    }

    @Override
    @Transactional
    public ProjectDto patchEditProject(ContextHolder holder, ProjectValueDto projectValueDto) {

        Project pj = ProjectTransformer.transforProjectEditToDomain(projectValueDto);
        pj.setTenantId(holder.getTenantId());

        List<String> projectFields = new ArrayList<>();

        if(!CollectionUtils.isEmpty(pj.getMemberIdList())){
            projectFields.add("memberIdList");
        }

        if(!CollectionUtils.isEmpty(pj.getOrgIdList())){
            projectFields.add("orgIdList");
        }

        projectDomainLinkRepo.deleteLinksByProjectInfo(holder.getTenantId(), pj.getId(), projectFields, null);

        projectRepo.patchEditProject(pj);

        List<ProjectDomainLink> links = createProjectDomainLink(holder, pj);

        if(!CollectionUtils.isEmpty(links)){
            addProjectDomainLinkList(links);
        }

        ProjectDto outDto = findProjectById(holder,pj.getId());

        return outDto;
    }

    @Override
    @Transactional
    public void archiveProject(ContextHolder holder, String projectId) {

        Project project = projectRepo.loadProjectById(holder.getTenantId(), projectId);

        project.setArchived(true);
        project.setArchivedCounts(project.getArchivedCounts()!=null?project.getArchivedCounts()+1:1);
        project.setArchiveTime(new Date());

        projectRepo.patchEditProject(project);
    }

    @Override
    @Transactional
    public void unarchiveProject(ContextHolder holder, String projectId) {
        Project project = projectRepo.loadProjectById(holder.getTenantId(), projectId);

        project.setArchived(false);

        projectRepo.patchEditProject(project);
    }

    @Override
    @Transactional
    public void deleteProjectById(ContextHolder holder, String projectId) {

        Project pj = projectRepo.loadProjectById(holder.getTenantId(), projectId);
        pj.setDeletedFlag(true);
        projectRepo.editProject(pj);
    }

    @Override
    public ProjectDto findProjectById(ContextHolder holder, String projectId) {

        ProjectDto pj = projectQuery.findProjectById(holder.getTenantId(), projectId);

        ProjectDomainLinkQueryDto params = ProjectDomainLinkQueryDto.builder().
                tenantId(holder.getTenantId()).projectId(Arrays.asList(projectId)).build();

        List<ProjectDomainLink> links = projectDomainLinkRepo.loadProjectDomainLinkList(params);

        List<String> staffIdList = links.stream().filter((item)->{
            return item.getDomainType().equals(Staff.class.getSimpleName());
        }).map((item)->{
            return item.getDomainId();
        }).collect(Collectors.toList());
        pj.setMemberIdList(links.stream().filter(item->item.getProjectField().equals("memberIdList")).map(item->item.getDomainId()).collect(Collectors.toList()));
        pj.setAssigneeIdList(links.stream().filter(item->item.getProjectField().equals("assigneeIdList")).map(item->item.getDomainId()).collect(Collectors.toList()));
        pj.setParticipatorIdList(links.stream().filter(item->item.getProjectField().equals("participatorIdList")).map(item->item.getDomainId()).collect(Collectors.toList()));
        pj.setSupervisorIdList(links.stream().filter(item->item.getProjectField().equals("supervisorIdList")).map(item->item.getDomainId()).collect(Collectors.toList()));

        List<String> orgIdList = links.stream().filter((item)->{
            return item.getDomainType().equals(Organization.class.getSimpleName());
        }).map((item)->{
            return item.getDomainId();
        }).collect(Collectors.toList());
        pj.setOrgIdList(orgIdList);

        if(StringUtils.isNotBlank(pj.getCreatedById())){
            staffIdList.add(pj.getCreatedById());
        }
        if(StringUtils.isNotBlank(pj.getUpdatedById())){
            staffIdList.add(pj.getCreatedById());
        }
        if(StringUtils.isNotBlank(pj.getDeletedById())){
            staffIdList.add(pj.getCreatedById());
        }
        if(StringUtils.isNotBlank(pj.getCreatedOrgId())){
            orgIdList.add(pj.getCreatedOrgId());
        }
        if(StringUtils.isNotBlank(pj.getUpdatedOrgId())){
            orgIdList.add(pj.getUpdatedOrgId());
        }
        if(StringUtils.isNotBlank(pj.getDeletedOrgId())){
            orgIdList.add(pj.getDeletedOrgId());
        }

        List<StaffItemDto> staffList = Collections.emptyList();
        if(staffIdList.size()>0){
            StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(staffIdList).build();
            staffList = staffService.findStaffList(holder, staffParams, new Limitable());
        }
        Map<String, StaffItemDto> staffHash = staffList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        List<OrganizationItemDto> orgList = Collections.emptyList();
        if(orgIdList.size()>0){
            OrganizationQueryDto orgParams = OrganizationQueryDto.builder().tenantId(holder.getTenantId()).id(orgIdList).build();
            orgList = organizationService.findOrganizationList(holder, orgParams, new Limitable());
        }
        Map<String, OrganizationItemDto> orgHash = orgList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        if(!CollectionUtils.isEmpty(pj.getMemberIdList())){
            List<StaffItemDto> items =  pj.getMemberIdList().stream().map((item)->{
                return staffHash.get(item);
            }).collect(Collectors.toList());

            pj.setMemberList(items);
        }

        if(!CollectionUtils.isEmpty(pj.getAssigneeIdList())){
            List<StaffItemDto> items =  pj.getAssigneeIdList().stream().map((item)->{
                return staffHash.get(item);
            }).collect(Collectors.toList());

            pj.setAssigneeList(items);
        }

        if(!CollectionUtils.isEmpty(pj.getParticipatorIdList())){
            List<StaffItemDto> items =  pj.getParticipatorIdList().stream().map((item)->{
                return staffHash.get(item);
            }).collect(Collectors.toList());

            pj.setParticipatorList(items);
        }

        if(!CollectionUtils.isEmpty(pj.getSupervisorIdList())){
            List<StaffItemDto> items =  pj.getSupervisorIdList().stream().map((item)->{
                return staffHash.get(item);
            }).collect(Collectors.toList());

            pj.setSupervisorList(items);
        }

        if(!CollectionUtils.isEmpty(pj.getOrgIdList())){
            List<OrganizationItemDto> items =  pj.getOrgIdList().stream().map((item)->{
                return orgHash.get(item);
            }).collect(Collectors.toList());

            pj.setOrgList(items);
        }

        pj.setCreatedBy(staffHash.get(pj.getCreatedById()));
        pj.setUpdatedBy(staffHash.get(pj.getUpdatedById()));
        pj.setDeletedBy(staffHash.get(pj.getDeletedById()));
        pj.setCreatedOrg(orgHash.get(pj.getCreatedOrgId()));
        pj.setUpdatedOrg(orgHash.get(pj.getUpdatedOrgId()));
        pj.setDeletedOrg(orgHash.get(pj.getDeletedOrgId()));

        return pj;
    }

    @Override
    public Project loadProjectById(ContextHolder holder, String projectId) {

        return projectRepo.loadProjectById(holder.getTenantId(), projectId);
    }

    @Override
    public List<ProjectItemDto> findProjectList(ContextHolder holder, ProjectQueryDto params, Limitable limitable) {
        PageHelper.offsetPage(limitable.getOffset(),limitable.getLimit());

        List<ProjectItemDto> list = projectQuery.findProjectList(params);

        fillLinkedDomains(holder, list);

        return list;
    }

    @Override
    public PageInfo<ProjectItemDto> findProjectPage(ContextHolder holder, ProjectQueryDto params, Pageable pageable){

        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());
        List<ProjectItemDto> list = projectQuery.findProjectList(params);

        fillLinkedDomains(holder, list);

        return new PageInfo<>(list);
    }

    protected void fillLinkedDomains(ContextHolder holder, List<ProjectItemDto> list){

        Map<String, ProjectItemDto> projectHash = list.stream().collect(Collectors.toMap(ProjectItemDto::getId, item->item));
        List<String> projectIdList = list.stream().map(item->item.getId()).collect(Collectors.toList());

        ProjectDomainLinkQueryDto projectDomainLinkParams = ProjectDomainLinkQueryDto.builder().tenantId(holder.getTenantId()).projectId(projectIdList).build();
        List<ProjectDomainLink> projectDomainLinks = projectDomainLinkRepo.loadProjectDomainLinkList(projectDomainLinkParams);

        List<String> staffIdList = new ArrayList<>();
        projectDomainLinks.stream().filter(item->{
            return item.getProjectField().equals("memberIdList");
        }).forEach((item)->{
            ProjectItemDto prj = projectHash.get(item.getProjectId());

            if(prj!=null){
                if(prj.getMemberIdList()==null){
                    prj.setMemberIdList(new ArrayList<>());
                }

                prj.getMemberIdList().add(item.getDomainId());
            }

            staffIdList.add(item.getDomainId());
        });

        projectDomainLinks.stream().filter(item->{
            return item.getProjectField().equals("assigneeIdList");
        }).forEach((item)->{
            ProjectItemDto prj = projectHash.get(item.getProjectId());

            if(prj!=null){
                if(prj.getAssigneeIdList()==null){
                    prj.setAssigneeIdList(new ArrayList<>());
                }

                prj.getAssigneeIdList().add(item.getDomainId());
            }

            staffIdList.add(item.getDomainId());
        });

        projectDomainLinks.stream().filter(item->{
            return item.getProjectField().equals("participatorIdList");
        }).forEach((item)->{
            ProjectItemDto prj = projectHash.get(item.getProjectId());

            if(prj!=null){
                if(prj.getParticipatorIdList()==null){
                    prj.setParticipatorIdList(new ArrayList<>());
                }

                prj.getParticipatorIdList().add(item.getDomainId());
            }

            staffIdList.add(item.getDomainId());
        });

        projectDomainLinks.stream().filter(item->{
            return item.getProjectField().equals("supervisorIdList");
        }).forEach((item)->{
            ProjectItemDto prj = projectHash.get(item.getProjectId());

            if(prj!=null){
                if(prj.getSupervisorIdList()==null){
                    prj.setSupervisorIdList(new ArrayList<>());
                }

                prj.getSupervisorIdList().add(item.getDomainId());
            }

            staffIdList.add(item.getDomainId());
        });

        List<String> orgIdList = new ArrayList<>();
        projectDomainLinks.stream().filter(item->{
            return item.getProjectField().equals("orgIdList");
        }).forEach((item)->{
            ProjectItemDto prj = projectHash.get(item.getProjectId());

            if(prj!=null){
                if(prj.getOrgIdList()==null){
                    prj.setOrgIdList(new ArrayList<>());
                }

                prj.getOrgIdList().add(item.getDomainId());
            }

            orgIdList.add(item.getDomainId());
        });

        list.stream().forEach(item->{
            if(StringUtils.isNotBlank(item.getCreatedById())){
                staffIdList.add(item.getCreatedById());
            }
            if(StringUtils.isNotBlank(item.getUpdatedById())){
                staffIdList.add(item.getUpdatedById());
            }
            if(StringUtils.isNotBlank(item.getDeletedById())){
                staffIdList.add(item.getDeletedById());
            }

            if(StringUtils.isNotBlank(item.getCreatedOrgId())){
                orgIdList.add(item.getCreatedOrgId());
            }
            if(StringUtils.isNotBlank(item.getUpdatedOrgId())){
                orgIdList.add(item.getUpdatedOrgId());
            }
            if(StringUtils.isNotBlank(item.getDeletedOrgId())){
                orgIdList.add(item.getDeletedOrgId());
            }
        });

        StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(staffIdList).build();
        List<StaffItemDto> staffList = staffService.findStaffList(holder, staffParams, new Limitable());
        Map<String, StaffItemDto> staffHash = staffList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        OrganizationQueryDto orgParams = OrganizationQueryDto.builder().tenantId(holder.getTenantId()).id(orgIdList).build();
        List<OrganizationItemDto> orgList = organizationService.findOrganizationList(holder, orgParams, new Limitable());
        Map<String, OrganizationItemDto> orgHash = orgList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        list.stream().forEach((pj)->{
            if(!CollectionUtils.isEmpty(pj.getMemberIdList())){
                List<StaffItemDto> items =  pj.getMemberIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());
                pj.setMemberList(items);
            }

            if(!CollectionUtils.isEmpty(pj.getAssigneeIdList())){
                List<StaffItemDto> items =  pj.getAssigneeIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());
                pj.setAssigneeList(items);
            }

            if(!CollectionUtils.isEmpty(pj.getParticipatorIdList())){
                List<StaffItemDto> items =  pj.getParticipatorIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());
                pj.setParticipatorList(items);
            }

            if(!CollectionUtils.isEmpty(pj.getSupervisorIdList())){
                List<StaffItemDto> items =  pj.getSupervisorIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());
                pj.setSupervisorList(items);
            }

            if(!CollectionUtils.isEmpty(pj.getOrgIdList())){
                List<OrganizationItemDto> items =  pj.getOrgIdList().stream().map((item)->{
                    return orgHash.get(item);
                }).collect(Collectors.toList());

                pj.setOrgList(items);
            }

            pj.setCreatedBy(staffHash.get(pj.getCreatedById()));
            pj.setCreatedOrg(orgHash.get(pj.getCreatedOrgId()));
            pj.setUpdatedBy(staffHash.get(pj.getUpdatedById()));
            pj.setUpdatedOrg(orgHash.get(pj.getUpdatedOrgId()));
            pj.setDeletedBy(staffHash.get(pj.getDeletedById()));
            pj.setDeletedOrg(orgHash.get(pj.getDeletedById()));
        });
    }

    protected List<ProjectDomainLink> createProjectDomainLink(ContextHolder holder, Project pj){
        List<ProjectDomainLink> links = new ArrayList<>();

        if(!CollectionUtils.isEmpty(pj.getMemberIdList())){

            for(int i=0; i<pj.getMemberIdList().size(); i++){

                ProjectDomainLink link = new ProjectDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setProjectId(pj.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setProjectField("memberIdList");
                link.setDomainId(pj.getMemberIdList().get(i));
                link.setSortNo(i+1);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(pj.getAssigneeIdList())){

            for(int i=0; i<pj.getAssigneeIdList().size(); i++){

                ProjectDomainLink link = new ProjectDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setProjectId(pj.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setProjectField("assigneeIdList");
                link.setDomainId(pj.getAssigneeIdList().get(i));
                link.setSortNo(i+1);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(pj.getParticipatorIdList())){

            for(int i=0; i<pj.getParticipatorIdList().size(); i++){

                ProjectDomainLink link = new ProjectDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setProjectId(pj.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setProjectField("participatorIdList");
                link.setDomainId(pj.getParticipatorIdList().get(i));
                link.setSortNo(i+1);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(pj.getSupervisorIdList())){

            for(int i=0; i<pj.getSupervisorIdList().size(); i++){

                ProjectDomainLink link = new ProjectDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setProjectId(pj.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setProjectField("supervisorIdList");
                link.setDomainId(pj.getSupervisorIdList().get(i));
                link.setSortNo(i+1);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(pj.getOrgIdList())){
            for(int i=0; i<pj.getOrgIdList().size(); i++){
                ProjectDomainLink link = new ProjectDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setProjectId(pj.getId());
                link.setDomainType(Organization.class.getSimpleName());
                link.setProjectField("orgIdList");
                link.setDomainId(pj.getOrgIdList().get(i));
                link.setSortNo(i+1);

                links.add(link);
            }
        }


        return links;
    }

    protected void addProjectDomainLinkList(List<ProjectDomainLink> linkList){
       List<List<ProjectDomainLink>> lists = Lists.partition(linkList, 50);

        lists.stream().forEach((list)->{
            projectDomainLinkRepo.addLinks(list);
        });
    }
}
