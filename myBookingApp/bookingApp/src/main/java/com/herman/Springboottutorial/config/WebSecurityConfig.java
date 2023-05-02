//package com.herman.Springboottutorial.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig {
//    private static final String[] WHITE_LIST_URLS = {
//            "/hello/**",
//            "/register/**",
//            "/verifyRegistration/**",
//            "/resendVerifyToken/**",
//            "/bookingDates/**",
//            "/rooms/**",
//            "/api/hello",
//            "http://localhost:3000/**",
//            "http://localhost:4000/**"
//    };
//
//    @Bean
//       public PasswordEncoder passwordEncoder(){
//           return new BCryptPasswordEncoder(11);
//    }
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity https) throws Exception {
//        https
//                .cors()
//                .and()
//                .csrf()
//                .disable()
//                .authorizeHttpRequests()
//                .requestMatchers(WHITE_LIST_URLS).permitAll()
//                .requestMatchers(WHITE_LIST_URLS).authenticated()
//                .requestMatchers("/api/**").authenticated();
////                .and()
////                .oauth2Login(oauth2login ->oauth2login.loginPage("/oauth2/authorization/api-client-oidc"))
////                .oauth2Client(Customizer.withDefaults());
//
//        return https.build();
//    }
//}
