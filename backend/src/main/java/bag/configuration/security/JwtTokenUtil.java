package bag.configuration.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {
    @Value("${app.jwt.access-token}")
    private String accessTokenSecret;

    @Value("${app.jwt.refresh-token}")
    private String refreshTokenSecret;

    @Value("${app.jwt.access-exp-seconds}")
    private Long accessTokenExpiration;

    @Value("${app.jwt.refresh-exp-seconds}")
    private Long refreshTokenExpiration;

    @PostConstruct
    public void init() {
        if (accessTokenSecret.length() < 64 || refreshTokenSecret.length() < 64) {
            throw new IllegalArgumentException("Secret key must be at least 64 characters for HS512");
        }
    }

    public SecretKey getSigningKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public Claims getClaimsFromToken(String token, boolean isRefreshToken) {
        try {
            String secret = isRefreshToken ? refreshTokenSecret : accessTokenSecret;
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey(secret)) // Sửa từ token thành secret
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Expired or invalid JWT token");
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token");
        }
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver, boolean isRefreshToken) {
        final Claims claims = getClaimsFromToken(token, isRefreshToken);
        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token, boolean isRefreshToken) {
        return getClaimFromToken(token, Claims::getSubject, isRefreshToken);
    }

    public Integer getAccountIdFromToken(String token, boolean isRefreshToken) {
        return getClaimFromToken(token, claims -> claims.get("accountId", Integer.class), isRefreshToken);
    }

    public String getPositionFromAccessToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("position", String.class), false);
    }

    public Date getExpirationDateFromToken(String token, boolean isRefreshToken) {
        return getClaimFromToken(token, Claims::getExpiration, isRefreshToken);
    }

    public boolean isTokenExpired(String token, boolean isRefreshToken) {
        return getExpirationDateFromToken(token, isRefreshToken).before(new Date());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject, boolean isRefreshToken) {
        long now = System.currentTimeMillis();
        long expirationTime = (isRefreshToken ? refreshTokenExpiration : accessTokenExpiration) * 1000;
        String secret = isRefreshToken ? refreshTokenSecret : accessTokenSecret;

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationTime))
                .signWith(getSigningKey(secret), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateAccessToken(int userId, String username, String position) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", userId);
        claims.put("position", position);
        return doGenerateToken(claims, username, false);
    }

    public String generateRefreshToken(int userId, String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountId", userId);
        return doGenerateToken(claims, username, true);
    }

    public boolean validateToken(String token, UserDetails userDetails, boolean isRefreshToken) {
        final String username = getUsernameFromToken(token, isRefreshToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, isRefreshToken));
    }
    public boolean isTokenValid(String token, boolean isRefreshToken) {
        try {
            return !isTokenExpired(token, isRefreshToken);
        } catch (Exception e) {
            return false;
        }
    }
}