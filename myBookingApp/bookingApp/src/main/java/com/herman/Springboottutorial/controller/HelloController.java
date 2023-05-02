package com.herman.Springboottutorial.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
public class HelloController {

//    @Autowired
//    private WebClient webClient;

    @GetMapping("/api/hello")
    public String hello(Principal principal) {
        return "Hello";
        //return "Hello " +principal.getName()+", Welcome to Daily Code Buffer!!";
    }

//    @GetMapping("/api/users")
//    public String[] users(
//            @RegisteredOAuth2AuthorizedClient("api-client-authorization-code")
//            OAuth2AuthorizedClient client){
//        return this.webClient
//                .get()
//                .uri("http://127.0.0.1:8090/api/users")
//                .attributes(oauth2AuthorizedClient(client))
//                .retrieve()
//                .bodyToMono(String[].class)
//                .block();
//    }
}
