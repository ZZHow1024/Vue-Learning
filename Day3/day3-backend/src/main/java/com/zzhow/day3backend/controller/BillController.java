package com.zzhow.day3backend.controller;

import com.zzhow.day3backend.pojo.Commodity;
import com.zzhow.day3backend.pojo.Result;
import com.zzhow.day3backend.service.BillService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author ZZHow
 * @date 2024/7/30
 */
@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
    private static final Logger log = LoggerFactory.getLogger(BillController.class);
    @Autowired
    private BillService billService;

    @GetMapping
    public Result list(String creator, HttpServletResponse response) {
        log.info("用户请求访问账单：creator = {}", creator);

        //response.setHeader("Access-Control-Allow-Origin", "*");
        return Result.success(billService.list());
    }

    @PostMapping
    public Result saveBill(@RequestBody Commodity commodity) {
        log.info("用户添加 / 重置账单，commodity = {}", commodity);

        billService.saveBill(commodity);

        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result removeBill(@PathVariable Integer id) {
        log.info("用户删除账单，id = {}", id);

        billService.removeBill(id);

        return Result.success();
    }
}
