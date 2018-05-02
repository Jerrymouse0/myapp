# myapp
## Node+Express+MySQL多表增删查改
- 1.安装NodeJS，npm，MySQL，Navicat for MySQL
- 2.全局安装express:```npm install express express-generator -g```
- 3.开启MySQL服务，打开Navicat，新建连接(连接名任意)，  
    再新建数据库，库名为oa(设置编码格式为uft-8)，  
    在数据库中新建表，此项目用到两张表(user,info)，表结构如下：  
![userID](https://github.com/Jerrymouse0/myapp/blob/master/public/images/1.png)
![userName](https://github.com/Jerrymouse0/myapp/blob/master/public/images/2.png)
![userAge](https://github.com/Jerrymouse0/myapp/blob/master/public/images/3.png)
![infoID](https://github.com/Jerrymouse0/myapp/blob/master/public/images/4.png)
![infoPassword](https://github.com/Jerrymouse0/myapp/blob/master/public/images/5.png)
![infoSex](https://github.com/Jerrymouse0/myapp/blob/master/public/images/6.png)

- 4.进入项目文件夹，用cmd命令运行：```npm start```，用浏览器打开 http://localhost:3000/users 
- 5.数据库配置的更改请看[db.js文件](https://github.com/Jerrymouse0/myapp/blob/master/config/db.js)    
  其中，host为主机名，如果在本地跑，就用localhost    
  user为MySQL用户名，password为MySQL密码，database为项目所用的数据库名  

  

