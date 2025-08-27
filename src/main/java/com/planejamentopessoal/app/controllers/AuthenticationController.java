package com.planejamentopessoal.app.controllers;

import com.planejamentopessoal.app.domains.user.User;
import com.planejamentopessoal.app.domains.user.dto.AuthenticationDTO;
import com.planejamentopessoal.app.infra.security.TokenJWTDTO;
import com.planejamentopessoal.app.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<TokenJWTDTO> login(@RequestBody @Valid AuthenticationDTO dto){
        var authenticationToken = new UsernamePasswordAuthenticationToken(dto.userName(), dto.password());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.generateToken((User) authentication.getPrincipal());

        return ResponseEntity.ok(new TokenJWTDTO(tokenJWT));
    }
}
