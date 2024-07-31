package com.zzhow.day3backend.dao;

import com.zzhow.day3backend.pojo.Commodity;

import java.util.List;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
public interface BillMapper {
    List<Commodity> selectList();

    void insertBill(Commodity commodity);

    void resetBill();

    void deleteBill(Integer id);
}
