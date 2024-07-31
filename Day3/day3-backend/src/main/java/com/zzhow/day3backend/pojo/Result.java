package com.zzhow.day3backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private int code;
    private String msg;
    private Object data;

    public static Result success() {
        return new Result(200, "success", null);
    }

    public static Result success(Object data) {
        return new Result(200, "success", data);
    }
}
