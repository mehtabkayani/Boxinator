package com.company.boxinator.GoogleAuth2FA;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.lang.reflect.UndeclaredThrowableException;
import java.math.BigInteger;
import java.security.GeneralSecurityException;

public final class TOTPO {
    private TOTPO() {
    }

    public static String getOTP(String key) {
        return getOTP(getStep(), key);
    }

    public static boolean validate(String key, String otp) {
        return validate(getStep(), key, otp);
    }

    private static boolean validate(long step, String key, String otp) {
        return getOTP(step, key).equals(otp) || getOTP(step - 1L, key).equals(otp);
    }

    private static long getStep() {
//        return System.currentTimeMillis() / 30000L;
        return System.currentTimeMillis() / 30000L;
    }

    private static String getOTP(long step, String key) {
        String steps;
        for(steps = Long.toHexString(step).toUpperCase(); steps.length() < 16; steps = "0" + steps) {
        }

        byte[] msg = hexStr2Bytes(steps);
        byte[] k = hexStr2Bytes(key);
        byte[] hash = hmac_sha1(k, msg);
        int offset = hash[hash.length - 1] & 15;
        int binary = (hash[offset] & 127) << 24 | (hash[offset + 1] & 255) << 16 | (hash[offset + 2] & 255) << 8 | hash[offset + 3] & 255;
        int otp = binary % 1000000;

        String result;
        for(result = Integer.toString(otp); result.length() < 6; result = "0" + result) {
        }

        return result;
    }

    private static byte[] hexStr2Bytes(String hex) {
        byte[] bArray = (new BigInteger("10" + hex, 16)).toByteArray();
        byte[] ret = new byte[bArray.length - 1];
        System.arraycopy(bArray, 1, ret, 0, ret.length);
        return ret;
    }

    private static byte[] hmac_sha1(byte[] keyBytes, byte[] text) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA1");
            SecretKeySpec macKey = new SecretKeySpec(keyBytes, "RAW");
            hmac.init(macKey);
            return hmac.doFinal(text);
        } catch (GeneralSecurityException var4) {
            throw new UndeclaredThrowableException(var4);
        }
    }
}
