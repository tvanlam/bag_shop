package bag.configuration.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.startsWith("/auth/")
                || uri.startsWith("/verify")
                || uri.startsWith("/actuator")
                || "OPTIONS".equalsIgnoreCase(request.getMethod());
    }

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain chain) throws ServletException, IOException {

        String token = resolveAccessToken(request);

        if (token != null) {
            try {
                if (jwtTokenUtil.isTokenValid(token, false)) {
                    String username = jwtTokenUtil.getUsernameFromToken(token, false);
                    String role = jwtTokenUtil.getPositionFromAccessToken(token);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    username, null,
                                    Collections.singletonList(new SimpleGrantedAuthority(role)));

                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    String position = jwtTokenUtil.getPositionFromAccessToken(token);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    log.info("Token valid, user={}, role={}", username, position);

                } else {
                    SecurityContextHolder.clearContext();
                }
            } catch (Exception ex) {
                SecurityContextHolder.clearContext();
                log.debug("JWT filter error: {}", ex.getMessage());
            }
        }
        chain.doFilter(request, response);
    }

    private String resolveAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.regionMatches(true, 0, "Bearer ", 0, 7)) {
            return header.substring(7).trim();
        }
        if (request.getCookies() != null) {
            for (var c : request.getCookies()) {
                if ("accessToken".equals(c.getName()) && c.getValue() != null && !c.getValue().isBlank()) {
                    return c.getValue();
                }
            }
        }
        return null;
    }
}
