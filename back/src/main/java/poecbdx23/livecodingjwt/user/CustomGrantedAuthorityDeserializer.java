package poecbdx23.livecodingjwt.user;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomGrantedAuthorityDeserializer extends StdDeserializer<Collection<? extends GrantedAuthority>> {

    public CustomGrantedAuthorityDeserializer() {
        this(null);
    }

    public CustomGrantedAuthorityDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Collection<? extends GrantedAuthority> deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (JsonNode authorityNode : node) {
            String authority = authorityNode.get("authority").asText();
            authorities.add(new SimpleGrantedAuthority(authority));
        }
        return authorities;
    }
}