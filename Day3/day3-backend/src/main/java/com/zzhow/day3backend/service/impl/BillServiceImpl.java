package com.zzhow.day3backend.service.impl;

import com.zzhow.day3backend.dao.BillMapper;
import com.zzhow.day3backend.pojo.Commodity;
import com.zzhow.day3backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillMapper billMapper;

    @Override
    public List<Commodity> list() {
        return billMapper.selectList();
    }

    @Override
    public void saveBill(Commodity commodity) {
        if(commodity.getId() != null)
            billMapper.resetBill();
        else
            billMapper.insertBill(commodity);
    }

    @Override
    public void removeBill(Integer id) {
        billMapper.deleteBill(id);
    }
}
