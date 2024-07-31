package com.zzhow.day3backend.service;

import com.zzhow.day3backend.pojo.Commodity;

import java.util.List;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
public interface BillService {
    List<Commodity> list();

    void saveBill(Commodity commodity);

    void removeBill(Integer id);
}
