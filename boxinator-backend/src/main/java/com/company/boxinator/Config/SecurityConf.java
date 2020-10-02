package com.company.boxinator.Config;

import com.company.boxinator.Models.User;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SecurityConf {
    public String cleanInput(String input){
        return Jsoup.clean(
                StringEscapeUtils.escapeHtml4(StringEscapeUtils.escapeEcmaScript
                        (StringUtils.replace(input, "'", "''")))
                            , Whitelist.basic());
    }
    public boolean validInputs(String... inputs){
        for (String input: inputs) {
            if(!cleanInput(input).equals(input))
                return false;
        }
        return true;
    }
}
