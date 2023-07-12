//package poecbdx23.livecodingjwt.user;
//
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import poecbdx23.livecodingjwt.user.CustomAuthority;
//import java.io.IOException;
//import java.util.HashSet;
//import java.util.Set;
//
//public class UserDeserializer extends JsonDeserializer<User> {
//
//    private ObjectMapper objectMapper = new ObjectMapper();
//
//    @Override
//    public User deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
//        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
//
//        Set<CustomAuthority> authorities = new HashSet<>();
//        JsonNode authoritiesNode = node.get("authorities");
//        if (authoritiesNode != null && authoritiesNode.isArray()) {
//            for (JsonNode authorityNode : authoritiesNode) {
//                String authority = authorityNode.asText();
//                authorities.add(new CustomAuthority(authority));
//            }
//        }
//
//
//        Long id = node.get("id").asLong();
//        String firstname = node.get("firstname").asText();
//        String lastname = node.get("lastname").asText();
//        String email = node.get("email").asText();
//        String password = node.get("password").asText();
//        String role = node.get("role").asText();
//
//        // Reste du code...
//
//        User user = new User();
//        user.setId(id);
//        user.setFirstname(firstname);
//        user.setLastname(lastname);
//        user.setEmail(email);
//        user.setPassword(password);
//        user.setRole(role);
//        user.setAuthorities(authorities);
//
//        return user;
//    }
//}