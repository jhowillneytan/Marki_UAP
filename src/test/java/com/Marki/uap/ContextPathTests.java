package com.Marki.uap;

import org.springframework.boot.test.context.SpringBootTest;

// The same frontend must also resolve relative assets when hosted below a prefix.
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "server.servlet.context-path=/marki")
class ContextPathTests extends DemoApplicationTests {
}
