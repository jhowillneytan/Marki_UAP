package com.Marki.uap;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DemoApplicationTests {

    @Value("${local.server.port}")
    private int port;

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    private final HttpClient client = HttpClient.newHttpClient();

    @Test
    void homeServesTheOriginalFrontend() throws Exception {
        var home = get("");
        assertThat(home.statusCode()).isEqualTo(200);
        assertThat(home.headers().firstValue("Content-Type").orElse("")).startsWith("text/html");
        assertThat(home.body()).isEqualTo(resource("index.html"));
        assertThat(get("index.html").body()).isEqualTo(home.body());
    }

    @Test
    void scriptsStylesFontsAndDownloadsAreServedUnchanged() throws Exception {
        // Follow the actual HTML and CSS references so a missing dependency breaks the test.
        var references = Pattern.compile("(?:src|href)=\"([^\"]+)\"")
                .matcher(new String(resource("index.html"), StandardCharsets.UTF_8));
        while (references.find()) {
            String path = references.group(1);
            assertResource(path);
            if (path.endsWith(".css")) {
                var fonts = Pattern.compile("url\\(([^)]+)\\)")
                        .matcher(new String(resource(path), StandardCharsets.UTF_8));
                while (fonts.find()) {
                    assertResource(fonts.group(1));
                }
            }
        }
        assertResource("formularios/Marki_Encuesta_al_dueno.pdf");
        assertResource("formularios/Marki_Ficha_de_evaluacion.pdf");
        assertResource("formularios/Marki_Validacion_por_expertos.pdf");
        assertResource("apps_script/Codigo.gs");
        assertResource("verificacion/datos_simulados.json");
    }

    @Test
    void missingResourcesAndUnknownEndpointsKeepTheir404() throws Exception {
        assertThat(get("missing.js").statusCode()).isEqualTo(404);
        assertThat(get("api/missing").statusCode()).isEqualTo(404);
    }

    private void assertResource(String path) throws Exception {
        var response = get(path);
        assertThat(response.statusCode()).as(path).isEqualTo(200);
        assertThat(response.body()).as(path).isEqualTo(resource(path));
        String type = response.headers().firstValue("Content-Type").orElse("");
        if (path.endsWith(".js")) {
            assertThat(type).as(path).contains("javascript");
        } else if (path.endsWith(".css")) {
            assertThat(type).as(path).startsWith("text/css");
        }
    }

    private HttpResponse<byte[]> get(String path) throws Exception {
        return client.send(HttpRequest.newBuilder(
                URI.create("http://localhost:" + port + contextPath + "/" + path)).GET().build(),
                HttpResponse.BodyHandlers.ofByteArray());
    }

    private byte[] resource(String path) throws Exception {
        return new ClassPathResource("static/" + path).getContentAsByteArray();
    }

}
