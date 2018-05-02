var express = require('express');
var router = express.Router();

var db = require("../config/db");

/**
 * 查询列表页
 */
router.get("/", function(req, res, next) {
    db.query("select a.id,a.name,a.age,b.password,case b.sex when 0 then '男' when 1 then '女' end sex from user a inner join info b on a.id = b.id", function(err, rows) {
        if (err) {
            res.render("users", { title: "用户列表", datas: [] });
        } else {
            res.render("users", { title: "用户列表", datas: rows });
        }
    });
});

/**
 * 添加用户
 */
router.get("/add", function(req, res, next) {
    res.render("add");
});
router.post("/add", function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    var password = req.body.password;
    var sex = req.body.sex;
    var sql1 = "insert into user(name,age) values('" + name + "','" + age + "')";
    var sql2 = "insert into info(password,sex) values('" + password + "','" + sex + "')";
    db.query(sql1, function(err, rows) {
        if (err) {
            res.send("新增失败" + err);
        } else {
            db.query(sql2, function(err, rows) {
                if (err) {
                    res.send("新增失败" + err);
                } else {
                    res.redirect("/users");
                }
            });
        }
    });
});

/**
 * 删除用户
 */
router.get("/del/:id", function(req, res) {
    var id = req.params.id;
    db.query("delete a,b from user a,info b where a.id = b.id and a.id = " + id, function(err, rows) {
        if (err) {
            res.send("删除失败" + err);
        } else {
            res.redirect("/users");
        }
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id", function(req, res, next) {
    var id = req.params.id;
    var sql = "select * from user inner join info on user.id = info.id where user.id = " + id;
    console.log(sql);
    db.query(sql, function(err, rows) {
        if (err) {
            res.send("修改页面跳转失败");
        } else {
            res.render("update", { datas: rows });
        }
    });
});

router.post("/update", function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var password = req.body.password;
    var sex = req.body.sex;
    var sql = "update user a,info b set a.name = '" + name + "',a.age = '" + age + "',b.password ='" + password + "',b.sex = '" + sex + "' where a.id = b.id and a.id = " + id;
    db.query(sql, function(err, rows) {
        if (err) {
            res.send("修改失败 " + err);
        } else {
            res.redirect("/users");
        }
    });
});


/**
 * 查询
 */
router.post("/search", function(req, res, next) {
    var name = req.body.s_name;
    var age = req.body.s_age;
    var password = req.body.s_password;
    var sex = req.body.s_sex
    var sql = "select a.id,a.name,a.age,b.password,case b.sex when 0 then '男' when 1 then '女' end sex from user inner join info on user.id = info.id where 1=1 ";
    if (name) {
        sql += " and name like '%" + name + "%'";
    }
    if (age) {
        sql += " and age = '" + age + "'";
    }
    if (sex) {
        sql += " and sex = '" + sex + "'";
    }
    db.query(sql, function(err, rows) {
        if (err) {
            res.send("查询失败: " + err);
        } else {
            res.render("users", { title: "用户列表", datas: rows, s_name: name, s_age: age, s_password: password, s_sex: sex });
        }
    });
})

module.exports = router;