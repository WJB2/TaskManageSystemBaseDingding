package com.hozensoft.test.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.PropertySource;


public class ApplicationServiceTestStarter {

    public static void main(String[] args) {

        SpringApplication.run(ApplicationServiceTestStarter.class);
    }
}
