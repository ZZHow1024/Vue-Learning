package com.zzhow.day3backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commodity {
    private Integer id;
    private String name;
    private BigDecimal price;
    private String creator;

    public Commodity(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Commodity commodity)) return false;
        return Objects.equals(id, commodity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
