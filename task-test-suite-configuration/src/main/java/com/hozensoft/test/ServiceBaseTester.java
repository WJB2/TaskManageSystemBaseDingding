package com.hozensoft.test;

import com.hozensoft.test.main.ApplicationServiceTestStarter;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, classes = {ApplicationServiceTestStarter.class})
public class ServiceBaseTester {
}
