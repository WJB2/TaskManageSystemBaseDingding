package com.hozensoft.task.event.handler;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiMessageCorpconversationAsyncsendV2Request;
import com.dingtalk.api.response.OapiMessageCorpconversationAsyncsendV2Response;
import com.google.common.collect.Lists;
import com.hozensoft.dingtalk.base.dao.repo.DingtalkCorpInfoRepo;
import com.hozensoft.dingtalk.base.dao.repo.DtStaffRepo;
import com.hozensoft.dingtalk.base.domain.CorpInfo;
import com.hozensoft.dingtalk.base.domain.DtStaffLink;
import com.hozensoft.dingtalk.corp.service.DingtalkCorpTokenService;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.TmEventConst;
import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.dto.TaskDto;
import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import com.taobao.api.ApiException;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;


@Component
public class DingtalkMessageHandler {

    @Autowired
    private DtStaffRepo dtStaffRepo;

    @Autowired
    private DingtalkCorpInfoRepo corpInfoRepo;

    @Autowired
    private DingtalkCorpTokenService corpTokenService;

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_CREATED + "'"
    )
    public void onTaskCreatedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        List<String> nameList = taskDto.getAssigneeList().stream().
                map(assignee->assignee.getName()).collect(Collectors.toList());

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getCreatedBy().getName() + " 发布了新任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form2 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form2.setKey("任务责任人 : ");
        form2.setValue(String.join("、", nameList));
        formList.add(form2);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("开始时间 : ");
        form3.setValue(taskDto.getBeginTime()!=null?DateFormatUtils.format(taskDto.getBeginTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        OapiMessageCorpconversationAsyncsendV2Request.Form form4 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form4.setKey("结束时间 : ");
        form4.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form4);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_EDITED + "'"
    )
    public void onTaskEditedEvent(TaskDto taskDto){
        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 修改了任务信息");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("更新时间 : ");
        form3.setValue(taskDto.getUpdatedTime()!=null?DateFormatUtils.format(taskDto.getUpdatedTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().addAll(taskDto.getParticipatorIdList()!=null?taskDto.getParticipatorIdList():Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_COMPLETED + "'"
    )
    public void onTaskCompletedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getCompletedBy().getName() + " 完成了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("截止日期 : ");
        form3.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        OapiMessageCorpconversationAsyncsendV2Request.Form form4 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form4.setKey("完成日期 : ");
        form4.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form4);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_RESTARTED + "'"
    )
    public void onTaskRestartedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 重启了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("截止日期 : ");
        form3.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_SUSPENDED + "'"
    )
    public void onTaskSuspendedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 挂起了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("截止日期 : ");
        form3.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_RESUME + "'"
    )
    public void onTaskResumeEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 恢复了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        OapiMessageCorpconversationAsyncsendV2Request.Form form3 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form3.setKey("截止日期 : ");
        form3.setValue(taskDto.getEndTime()!=null?DateFormatUtils.format(taskDto.getEndTime(), "yyyy-MM-dd"):"");
        formList.add(form3);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_ARCHIVED + "'"
    )
    public void onTaskArchivedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 归档了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_UNARCHIVED + "'"
    )
    public void onTaskUnarchivedEvent(TaskDto taskDto){

        OapiMessageCorpconversationAsyncsendV2Request.Msg msg = new OapiMessageCorpconversationAsyncsendV2Request.Msg();
        CorpInfo corpInfo = corpInfoRepo.loadCorpInfoByTenantId(taskDto.getTenantId());

        if(corpInfo==null){
            return;
        }

        String accessToken = corpTokenService.getAccessTokenByCorpInfo(corpInfo);

        msg.setMsgtype("oa");
        msg.setOa(new OapiMessageCorpconversationAsyncsendV2Request.OA());
        OapiMessageCorpconversationAsyncsendV2Request.OA oa = msg.getOa();

        oa.setHead(new OapiMessageCorpconversationAsyncsendV2Request.Head());
        oa.getHead().setText("任务中心");
        msg.getOa().setBody(new OapiMessageCorpconversationAsyncsendV2Request.Body());
        oa.getBody().setContent(taskDto.getUpdatedBy().getName() + " 回档了任务");
        List<OapiMessageCorpconversationAsyncsendV2Request.Form> formList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.Form form1 = new OapiMessageCorpconversationAsyncsendV2Request.Form();
        form1.setKey("任务名称 : ");
        form1.setValue(taskDto.getTitle());
        formList.add(form1);

        oa.getBody().setForm(formList);
        taskDto.getAssigneeIdList().addAll(taskDto.getSupervisorIdList()!=null? taskDto.getSupervisorIdList(): Collections.emptyList());
        taskDto.getAssigneeIdList().add(taskDto.getCreatedById());
        List<DtStaffLink> links = dtStaffRepo.loadDtStaffLinkListByStaffId(taskDto.getTenantId(),taskDto.getAssigneeIdList());

        List<String> dingtalkUserIdList = links.stream().map(link->link.getDingtalkUserId()).collect(Collectors.toList());

        sendMessage(dingtalkUserIdList, msg, accessToken);
    }

    protected void sendMessage(List<String> dingtalkUserIdList, OapiMessageCorpconversationAsyncsendV2Request.Msg msg, String accessToken){
        DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2");

        Lists.partition(dingtalkUserIdList, 20).stream().forEach((dingtalkUserIds)->{
            OapiMessageCorpconversationAsyncsendV2Request request = new OapiMessageCorpconversationAsyncsendV2Request();
            request.setUseridList(String.join(",", dingtalkUserIds));

            request.setToAllUser(false);
            request.setMsg(msg);

            try {
                OapiMessageCorpconversationAsyncsendV2Response response = client.execute(request, accessToken);

                if(!response.getErrcode().equals(new Long(0))){
                    throw new RuntimeException(response.getErrmsg());
                }
            } catch (ApiException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
