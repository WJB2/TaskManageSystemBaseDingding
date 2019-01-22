package com.hozensoft.task.event.dispatcher;

import com.hozensoft.task.TmEventConst;
import com.hozensoft.task.core.dto.TaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessagePostProcessor;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;

@Component
public class TaskDispatcher {

    @Autowired
    private JmsTemplate jmsTemplate;

    public void dispatchTaskCreatedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_CREATED);
                return message;
            }
        });
    }

    public void dispatchTaskEditedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_EDITED);
                return message;
            }
        });
    }

    public void dispatchTaskCompletedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_COMPLETED);
                return message;
            }
        });
    }

    public void dispatchTaskRestartedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_RESTARTED);
                return message;
            }
        });
    }

    public void dispatchTaskSuspendedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_SUSPENDED);
                return message;
            }
        });
    }

    public void dispatchTaskResumeEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_RESUME);
                return message;
            }
        });
    }

    public void dispatchTaskMarkUnreachableEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_UNREACHABLE);
                return message;
            }
        });
    }

    public void dispatchTaskMarkReachableEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_REACHABLE);
                return message;
            }
        });
    }

    public void dispatchTaskArchivedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_ARCHIVED);
                return message;
            }
        });
    }

    public void dispatchTaskUnarchivedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_UNARCHIVED);
                return message;
            }
        });
    }

    public void dispatchTaskDeletedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_DELETED);
                return message;
            }
        });
    }

    public void dispatchTaskAuditedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_AUDITED);
                return message;
            }
        });
    }

    public void dispatchTaskAuditRevokedEvent(TaskDto task){
        this.jmsTemplate.convertAndSend(TmEventConst.TM_QUEUE, task, new MessagePostProcessor() {
            public Message postProcessMessage(Message message) throws JMSException {
                message.setJMSType(TmEventConst.TM_TASK_AUDIT_REVOKED);
                return message;
            }
        });
    }
}
