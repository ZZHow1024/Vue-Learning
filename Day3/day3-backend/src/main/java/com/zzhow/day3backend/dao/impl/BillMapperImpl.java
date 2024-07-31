package com.zzhow.day3backend.dao.impl;

import com.zzhow.day3backend.dao.BillMapper;
import com.zzhow.day3backend.pojo.Commodity;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
@Repository
public class BillMapperImpl implements BillMapper {
    private ArrayList<Commodity> commodities;
    private Integer id = 5;

    {
        resetBill();
    }

    @Override
    public List<Commodity> selectList() {
        return commodities;
    }

    @Override
    public void insertBill(Commodity commodity) {
        commodity.setId(++id);
        commodities.add(commodity);
    }

    @Override
    public void resetBill() {
        commodities = new ArrayList<>();
        commodities.add(new Commodity(1, "球鞋", new BigDecimal("299.00"), "小黑"));
        commodities.add(new Commodity(2, "防晒霜", new BigDecimal("99.00"), "小黑"));
        commodities.add(new Commodity(3, "手表", new BigDecimal("588.00"), "小黑"));
        commodities.add(new Commodity(4, "棉大衣", new BigDecimal("199.00"), "小黑"));
        commodities.add(new Commodity(5, "鸭舌帽", new BigDecimal("99.00"), "小黑"));
    }

    @Override
    public void deleteBill(Integer id) {
        commodities.remove(new Commodity(id));
    }
}
