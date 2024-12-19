package com.revature.proj1.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.revature.proj1.entity.User;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.*;
import java.security.Key;
import java.util.Date;
import java.util.Set;

@Service
public class JwtAuthService {
    @Value("${jwtKey}")
    private String secretKey;
    
    public String jwtBuilder(User user){

        JwtBuilder jwt = Jwts.builder()
        .header()
        .type("JWT").and()
        .issuer(Long.toString(user.getUserId()))
        .audience().add(user.getRole().getRole()).and()
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60))
        .signWith(key());

        return jwt.compact();
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    // public void jwtVerification(String jwtCompact){
    //     Jwts.parser()
    //     .verifyWith((SecretKey)key())
    //     .build()
    //     .parse(jwtCompact);
    // }

    public String jwtGetId(String jwtCompact){
        return Jwts.parser()
                .verifyWith((SecretKey)key())
                .build().parseSignedClaims(jwtCompact)
                .getPayload()
                .getIssuer();
    }

    public String jwtGetRole(String jwtCompact){
        Set<String> role = Jwts.parser().verifyWith((SecretKey)key())
            .build().parseSignedClaims(jwtCompact)
            .getPayload()
            .getAudience();
        return role.contains("admin") ? "admin" : "employee";
    }
}
