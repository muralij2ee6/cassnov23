package com.galvanize;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
//@TestPropertySource(locations= "classpath:application-test.properties")
@ActiveProfiles("test")
class AnimalShelterApplicationTests {

	@Test
	void contextLoads() {
	}

}
