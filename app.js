/*
 * @Author: mingming
 * @Date:   2018-03-02 21:27:47
 * @Last Modified by:   mingming
 * @Last Modified time: 2018-04-06 11:19:26
 */
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();
var multer = require('multer');
app.use("/", express.static(__dirname + "/public/img"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//设置跨域访问.
app.all('*',
function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//连接mysql数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mingming2014',
  database: 'qtaotao'
});

//获取所有商品分类信息
app.get('/sort/all',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from sort',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 获取商品详情信息
app.get('/product/detail',
function(req, res) {

  let tags = '';
  connection.query('select * from tags',
  function(error_, results_, fields_) {
    if (error_) throw error;
    tags = results_;

  });
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from product where pro_id=' + req.url.substr(req.url.indexOf('=') + 1),
  function(error_, results_, fields_) {
    results_.forEach(function(e, i) {
      let tagsArr = [];
      e.tags.split(',').forEach(function(ele, index) {
        tags.forEach(function(ele_, index_) {
          if (ele == ele_.tags_id) {
            tagsArr.push(ele_.tags_name);
          }
        });
      });
      e.tags = tagsArr.join(',');
    });
    if (error_) throw error_;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results_;
    res.json(dataJson);
  });

});
//获取商品列表
var tagsArr = [];

app.get('/product/list',
function(req, res) {
  let sort_id = req.url.substring(req.url.lastIndexOf('=') + 1, req.url.length);
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let tags = '';
  connection.query('select * from tags',
  function(error_, results_, fields_) {
    if (error_) throw error;
    tags = results_;

  });
  connection.query('select a.pro_id,a.image,a.pro_name,a.sale_count,a.sale_count,a.price,a.stack,a.decript,a.sale_price,a.tags,b.sor_name FROM product AS a,sort AS b WHERE a.sor_id=b.sor_id and  a.sor_id=' + sort_id,
  function(error, results, fields) {
    results.forEach(function(e, i) {
      let tagsArr = [];
      e.tags.split(',').forEach(function(ele, index) {
        tags.forEach(function(ele_, index_) {
          if (ele == ele_.tags_id) {
            tagsArr.push(ele_.tags_name);
          }
        });
      });
      e.tags = tagsArr.join(',');

    });
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

app.post('/product/list2',
function(req, res) {
  let sor_id = parseInt(req.body.sor_id);
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let tags = '';
  connection.query('select * from tags',
  function(error_, results_, fields_) {
    if (error_) throw error;
    tags = results_;

  });
    let spes = '';
  connection.query('select * from specifications',
  function(error_, results_, fields_) {
    if (error_) throw error;
    spes = results_;

  });
  let sort = '';
  connection.query('select * from sort',
  function(error_, results_, fields_) {
    if (error_) throw error;
    sort = results_;

  });
  let selectSql='select * from product';
  if(sor_id){
    selectSql=selectSql+ ' where sor_id="'+ sor_id+'"';
  }
  connection.query(selectSql,
  function(error, results, fields) {
    results.forEach(function(e, i) {
      let tagsArr = [];
      e.tags.split(',').forEach(function(ele, index) {
        tags.forEach(function(ele_, index_) {
          if (ele == ele_.tags_id) {
            tagsArr.push(ele_);
          }
        });
      });
      e.tags = tagsArr;
      sort.forEach(function(ele_, index_) {
        if (e.sor_id == ele_.sor_id) {
          e.sor_name = ele_.sor_name;
        }
      });
      let spesArr=[];
      spes.forEach(function(ele_, index_) {
        if (e.pro_id == ele_.pro_id) {
          spesArr.push(ele_);
        }
      });
      e.spes=spesArr;
    });
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 获取商品规格
app.post('/product/spec',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let tags = '';
  connection.query('select * from specifications where pro_id = ' + req.body.pro_id,
  function(error_, results_, fields_) {
    if (error_) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results_;
    res.json(dataJson);
  });
});
// 添加商品分类
app.post('/sort/add',
function(req, res) {
  let sorName = req.body.sor_name;
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from sort where sor_name ="' + sorName + '"',
  function(error, results, fields) {
    if (results.length) {
      res.status(200);
      dataJson.msg = "已在该分类";
      dataJson.code = 400;
      res.json(dataJson);
    } else {
      connection.query('insert into sort(sor_name,add_data) values(?,?)', [sorName, new Date().toLocaleString()],
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "分类添加成功";
        connection.query('select * from sort where sor_name ="' + sorName + '"',
        function(error, results, fields) {
          dataJson.data = results;
          res.json(dataJson);
        });
      });
    }
  });
});

// 删除商品分类
app.post('/sort/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from sort where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'sor_id=' + e;
    } else {
      deleteSql += ' or sor_id=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});
// 删除所有商品分类
app.post('/sort/delall',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('delete from sort',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "全部删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});
// 编辑商品分类
app.post('/sort/edit',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('update sort set sor_name = "' + req.body.sor_name + '" where sor_id ="' + req.body.sor_id + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "修改成功";
    res.json(dataJson);
  });
});

//获取所有商品标签信息
app.get('/tags/all',
function(req, res) {
  let tagsName = req.body.tags_name;
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from tags',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 添加商品标签
app.post('/tags/add',
function(req, res) {
  let tagsName = req.body.tags_name;
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from tags where tags_name ="' + tagsName + '"',
  function(error, results, fields) {
    if (results.length) {
      res.status(200);
      dataJson.msg = "已在该标签";
      dataJson.code = 400;
      res.json(dataJson);
    } else {
      connection.query('insert into tags(tags_name,add_data) values(?,?)', [tagsName, new Date().toLocaleString()],
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "标签添加成功";
        connection.query('select * from tags where tags_name ="' + tagsName + '"',
        function(error, results, fields) {
          dataJson.data = results;
          res.json(dataJson);
        });
      });
    }
  });
});

// 删除商品标签
app.post('/tags/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from tags where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'tags_id=' + e;
    } else {
      deleteSql += ' or tags_id=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});
// 删除所有商品标签
app.post('/tags/delall',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('delete from tags',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "全部删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});
// 编辑商品标签
app.post('/tags/edit',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('update tags set tags_name = "' + req.body.tags_name + '" where tags_id ="' + req.body.tags_id + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "修改成功";
    res.json(dataJson);
  });
});

// 上传图片
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart();

app.use(mutipart({
  uploadDir: './public/img'
}));

app.post('/upload', mutipartMiddeware,
function(req, res, next) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  res.status(200);
  dataJson.code = 200;
  dataJson.data = 'http://' + req.headers['host'] + '/' + req.files.files.path.replace('public\\img\\', '');
  res.json(dataJson);
  dataJson.msg = "上传成功";
});

// 添加商品
app.post('/product/add',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let pro_name = req.body.formdata.pro_name;
  let sale_count = req.body.formdata.sale_count;
  let image = req.body.formdata.image.join(';');
  let price = req.body.formdata.price;
  let sale_price = req.body.formdata.sale_price;
  let spe_name = req.body.formdata.spe_name;
  let stack;
  if (req.body.formdata.stack === '1') {
    stack = true;
  } else {
    stack = false;
  }
  let decript = req.body.formdata.decript;
  let tags = req.body.formdata.tags;
  let sor_id = req.body.formdata.sor_id;
  let pro_id;
  let city = req.body.formdata.city;
  connection.query('insert into product(sor_id,pro_name,sale_count,image,price,sale_price,stack,decript,tags,city) values(?,?,?,?,?,?,?,?,?,?)', [sor_id, pro_name, sale_count, image, price, sale_price, stack, decript, tags, city],
  function(error, results, fields) {
    if (error) throw error;
    // res.status(200);
    // dataJson.code = 200;
    // dataJson.msg = "商品添加成功";
    connection.query('select * from product where pro_name ="' + pro_name + '"',
    function(error, results, fields) {
      results.forEach(function(e, i) {
        if (pro_id < e.pro_id || !pro_id) {
          pro_id = e.pro_id;
        }
      });
      // 商品规格
      spe_name.forEach(function(e, i) {
        connection.query('insert into specifications(spe_name,pro_id,stock) values(?,?,?)', [e, pro_id, 0],
        function(error, results, fields) {});

      });
      if (error) throw error;
      res.status(200);
      dataJson.code = 200;
      dataJson.msg = "商品添加成功";
      dataJson.data = results;
      res.json(dataJson);
    });
  });

});


//修改商品信息
app.post('/product/edit',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let pro_name = req.body.formdata.pro_name;
  let sale_count = req.body.formdata.sale_count;
  let image = req.body.formdata.image.join(';');
  let price = req.body.formdata.price;
  let sale_price = req.body.formdata.sale_price;
  let spe_name = req.body.formdata.spe_name;
  let stack;
  if (req.body.formdata.stack === '1') {
    stack = true;
  } else {
    stack = false;
  }
  let decript = req.body.formdata.decript;
  let tags = req.body.formdata.tags;
  let sor_id = req.body.formdata.sor_id;
  let pro_id;
  let city = req.body.formdata.city;
  connection.query('update  `product` set sor_id="'+sor_id+'",pro_name="'+pro_name+'", `image`="'+image+'",price="'+price+'",sale_price="'+sale_price+'",decript="'+decript+'",tags="'+tags+'",city="'+city+'" where pro_id='+req.body.formdata.pro_id,
  function(error, results, fields) {
      res.status(200);
      dataJson.code = 200;
      dataJson.msg = "修改成功";
      dataJson.data = results;
      res.json(dataJson);
  });

});
// 删除商品
app.post('/product/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from product where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'pro_id=' + e;
    } else {
      deleteSql += ' or pro_id=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });

  let deleteSql_ = 'delete from cart where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql_ += 'pro_id=' + e;
    } else {
      deleteSql_ += ' or pro_id=' + e;
    }
  });
  connection.query(deleteSql_,
  function(error, results, fields) {
    if (error) throw error;
  });
});

// 添加会员
app.post('/user/add',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let uname = req.body.uname;
  let password = req.body.password;
  let phone_num = req.body.phone_num;
  let email = req.body.email;
  let real_name = req.body.real_name;
  let address = req.body.address;
  connection.query('select * from user where uname ="' + uname + '"',
  function(error, results, fields) {
    if (results.length) {
      res.status(200);
      dataJson.msg = "已在该用户名";
      dataJson.code = 400;
      res.json(dataJson);
    } else {
      connection.query('insert into user(uname,password,phone_num,email,real_name,address) values(?,?,?,?,?,?)', [uname, password, phone_num, email, real_name, address],
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "用户添加成功";
        connection.query('select * from user where uname ="' + uname + '"',
        function(error, results, fields) {
          dataJson.data = results;
          res.json(dataJson);
        });
      });
    }
  });
});

//获取会员列表
app.get('/user/list',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from user',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 删除会员
app.post('/user/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from user where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'uid=' + e;
    } else {
      deleteSql += ' or uid=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 编辑会员信息
app.post('/user/edit',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('update user set phone_num = "' + req.body.phone_num + '", email = "' + req.body.email + '" ,rate = "' + req.body.rate + '", address = "' + req.body.address + '" where uid ="' + req.body.uid + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "修改成功";
    res.json(dataJson);
  });
});

// 重置密码
app.post('/user/reset',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('update user set password = "' + req.body.newPwd + '" where uid ="' + req.body.uid + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "修改成功";
    res.json(dataJson);
  });
});

//用戶登錄
app.post('/user/login',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from user where phone_num=' + req.body.phone_num,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    results.forEach(function(e, i) {
      if (e.password == req.body.password) {
        dataJson.msg = "成功";
        dataJson.code = 200;
        dataJson.data.userid = e.uid;
        dataJson.data.userid = e.uid;
        dataJson.data.phone_num = e.phone_num;
        dataJson.data.uname = e.uname;
        dataJson.data.address = e.address;
      } else {
        dataJson.msg = "手机号或者密码错误！";
        dataJson.code = 400;
      }
      res.json(dataJson);
      return;
    });
    if (!results.length) {
      dataJson.msg = "手机号或者密码错误！";
      dataJson.code = 400;
      res.json(dataJson);
      return;
    }

  });
});

// 加入购物车
app.post('/cart/add',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from cart where user_id ="' + req.body.user_id + '" and pro_id="' + req.body.pro_id + '"' + 'and spe_id="' + req.body.spe_id + '"',
  function(error, results, fields) {
    if (results.length) {
      let count;
      let cart_id;
      results.forEach(function(e, i) {
        count = parseInt(e.cart_count) + parseInt(req.body.cart_count);
        cart_id = e.cart_id;
      });
      res.status(200);
      connection.query('update cart set cart_count = "' + count + '" where cart_id ="' + cart_id + '"' + 'and spe_id="' + req.body.spe_id + '"',
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.msg = "成功加入";
        res.json(dataJson);
      });
    } else {
      connection.query('insert into cart(user_id,pro_id,cart_data,cart_count,spe_id) values(?,?,?,?,?)', [req.body.user_id, req.body.pro_id, new Date().toLocaleString(), req.body.cart_count, req.body.spe_id],
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "成功加入";
        res.json(dataJson);

      });
    }
  });

});

// 随机生成数
function randomWord(randomFlag, min, max) {
  var str = "",
  range = min,
  arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

// 生成订单
app.post('/order/add',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let name = req.body.name;
  let user_id = req.body.user_id;
  let phone = req.body.phone;
  let address = req.body.address;
  let product = JSON.parse(req.body.product);
  let order_no = randomWord(false, 12);
  let time_ = new Date().toLocaleString();
  connection.query('INSERT  INTO `order`(`order_no`,`user_id`,`send_name`,`send_adress`,`send_phone`,`payment`,`meno`,`add_time`,`tag`) VALUES (?,?,?,?,?,?,?,?,?);', ['', user_id, name, address, phone, '', '', time_, 1],
  function(error, results, fields) {

    if (error) throw error;
    connection.query('update `order` set order_no = "' + order_no + results.insertId + '" where order_id =' + results.insertId,
    function(error, results, fields) {
      if (error) throw error;
    });
    product.forEach(function(e, i) {
      //查询商品价格
      let sale_price;
      connection.query('select * from product where pro_id = "' + e.pro_id + '"',
      function(error_, results_, fields_) {
        if (error) throw error;
        sale_price = results_[0].sale_price;
        connection.query('INSERT  INTO `entry`(`order_id`,`spe_id`,`pro_id`,`price`,`count`) VALUES (?,?,?,?,?);', [results.insertId, e.spe_id, e.pro_id, sale_price, e.num],
        function(error_, results_, fields_) {
          if (error_) throw error_;
          if (i === (product.length - 1)) {
            res.status(200);
            dataJson.code = 200;
            dataJson.msg = "成功";
            dataJson.data.orderId = results.insertId;
            res.json(dataJson);
          }
        });
      });

    });

  });
  product.forEach(function(e, i) {
    connection.query('delete  from cart where user_id ="' + user_id + '" and pro_id=' + e.pro_id,
    function(error, results, fields) {});
  });

});

// 查询订单价格
app.get('/order/price',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from entry where order_id=' + req.url.substr(req.url.indexOf('=') + 1),
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    let price = 0;
    results.forEach(function(e, i) {
      price = parseFloat(e.price) * parseFloat(e.count);
    });
    dataJson.data.price = price;
    res.json(dataJson);

  });
});

// 支付订单
app.post('/order/pay',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from `order`  where order_id =' + req.body.order_id,
  function(error_, results_, fields_) {
    if (results_[0].tag === 1) {
      connection.query('update `order` set payment = "' + req.body.payment + '", tag=2 where order_id =' + req.body.order_id,
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "支付成功";
        res.json(dataJson);
      });
    } else {
      res.status(200);
      dataJson.code = 200;
      dataJson.msg = "已支付订单请勿重复支付";
      res.json(dataJson);
    }

  });
});

// 更新购物车商品数量
app.post('/car/update',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('update cart set cart_count = "' + req.body.amount + '"where cart_id ="' + req.body.cart_id + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.code = 200;
    dataJson.msg = "成功";
    res.json(dataJson);
  });
});

// 查询购物车信息
app.post('/car/list',
function(req, res) {
  let uid = req.body.uid;
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from cart where user_id=' + uid,
  function(error, results, fields) {
    let productList = [];
    let tags;
    connection.query('select * from tags',
    function(error_, results_, fields_) {
      if (error_) throw error;
      tags = results_;

    });

    let specifications;
    connection.query('select * from specifications',
    function(error_, results_, fields_) {
      if (error_) throw error;
      specifications = results_;

    });
    results.forEach(function(e, i) {
      connection.query('select * from product where pro_id=' + e.pro_id,
      function(error_, results_, fields_) {
        results_.forEach(function(e_, i_) {
          e_.cart_count = e.cart_count;
          e_.cart_id = e.cart_id;
          tagsArr = [];
          e_.tags.split(',').forEach(function(ele, index) {
            tags.forEach(function(ele_, index_) {
              if (ele == ele_.tags_id) {
                tagsArr.push(ele_.tags_name);
              }
            });
          });
          specifications.forEach(function(ele_, index_) {
            if (e.spe_id == ele_.spe_id) {
              e_.spe_name = ele_.spe_name;
              e_.spe_id = ele_.spe_id;
            }
          });
          e_.tags = tagsArr.join(',');
          productList.push(e_);
          if (i === (results.length - 1) || i > (results.length - 1)) {
            if (error) throw error;
            res.status(200);
            dataJson.msg = "成功";
            dataJson.data = productList;
            res.json(dataJson);
            return;
          }

        });

      });

    });

  });
});

// 添加广告图信息
app.post('/advertisement/add',
function(req, res) {
  let tagsName = req.body.tags_name;
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let type = parseInt(req.body.formdata.type);
  let key = req.body.formdata.key;
  let image = req.body.formdata.image.join(';');
  let pro_id = req.body.formdata.pro_id.join(';');;
  connection.query('delete  from advertisement where adv_type ="' + type + '"',
  function(error, results, fields) {});
  connection.query('INSERT INTO `advertisement` (`adv_type`, `adv_key`, `image`,pro_id)  VALUES(?,?,?,?);', [type, key, image, pro_id],
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.code = 200;
    dataJson.msg = "广告添加成功";
    res.json(dataJson);
  });
});

//获取广告图信息
app.post('/advertisement/one',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };

  connection.query('select * from advertisement where adv_type="' + req.body.adv_type + '"',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

//获取广告图列表
app.get('/advertisement/list',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from advertisement',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 删除广告图
app.post('/advertisement/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from advertisement where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'adv_id=' + e;
    } else {
      deleteSql += ' or adv_id=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 管理员登录
app.post('/login/admin',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from admin where admin_name="'+req.body.name+'" and password="'+req.body.password+'"',
  function(error, results, fields) {
    if(results.length){
        res.status(200);
        dataJson.msg = "登录成功";
        dataJson.data.permissions=results[0].permissions;
        res.json(dataJson);
        return;
    }else{
          res.status(200);
        dataJson.code = 400;
        dataJson.msg = "用户名或者密码错误！";
        res.json(dataJson);
        return; 
    }

  });
});

// 获取订单列表
app.post('/order/list',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  connection.query('select * from `order`  where user_id= "' + req.body.user_id + '" and tag ="' + req.body.tag + '"',
  function(error, results, fields) {
    if (error) throw error;
    if (results.length) {
      results.forEach(function(e, i) {
        let price = 0;
        let count = 0;
        connection.query('select e.entry_id,e.order_id,e.pro_id,e.price,e.count,p.image from `entry` e,product p  where order_id= "' + e.order_id + '" and e.pro_id=p.pro_id',
        function(error_, results_, fields_) {
          let image = [];
          results_.forEach(function(e, i) {
            count += parseInt(e.count);
            price += parseFloat(e.price) * parseFloat(e.count);
            image.push(e.image.split(';')[0]);
          });
          e.price = price;
          e.count = count;
          e.image = image;
          if (i === (results.length - 1) || i > (results.length - 1)) {
            if (error) throw error;
            res.status(200);
            dataJson.code = 200;
            dataJson.data = results;
            dataJson.msg = "成功";
            res.json(dataJson);
            return;
          }
        });
      });
    } else {

      res.status(200);
      dataJson.code = 200;
      dataJson.data = results;
      dataJson.msg = "成功";
      res.json(dataJson);
      return;
    }

  });
});

// 获取订单详情
app.post('/order/detail',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  let spes = '';
  connection.query('select * from specifications',
  function(error_, results_, fields_) {
    if (error_) throw error;
    spes = results_;

  });
  connection.query('select * from `order`  where order_id= "' + req.body.order_id + '"',
  function(error, results, fields) {
    dataJson.data = results;
    if (error) throw error;
      connection.query('select e.entry_id,e.order_id,e.pro_id,e.spe_id,e.courier_num,e.price,e.count,p.image ,p.pro_name from `entry` e,product p  where order_id= "' + req.body.order_id + '" and e.pro_id=p.pro_id',
        function(error_, results_, fields_) {
          if (error_) throw error_;
          res.status(200);
          dataJson.code = 200;
          results_.forEach(function(e,i){
            spes.forEach(function(e_,i_){
              if(e_.spe_id===e.spe_id){
                e.spe_name=e_.spe_name;
              }
            });
            if(i===(results_.length-1)){
              dataJson.data[0].entry = results_;
              dataJson.msg = "成功";
              res.json(dataJson); 
            }
          });
    
        });

  });
});

app.post('/order/admin/list',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  let selectSql;
  if (req.body.tag) {
    selectSql = 'select * from `order`  where tag ="' + req.body.tag + '"';

  } else {
    selectSql = 'select * from `order`';
  }
  connection.query(selectSql,
  function(error, results, fields) {
    if (error) throw error;
    if (results.length) {
      results.forEach(function(e, i) {
        connection.query('select e.pro_id,e.price,e.count,e.spe_id ,e.courier_num,e.entry_id ,p.pro_name from `entry` e,product p  where order_id= "' + e.order_id + '" and e.pro_id=p.pro_id',
        function(error_, results_, fields_) {
          e.product = results_;
          results_.forEach(function(e_, i_) {
            connection.query('select * from `specifications` where spe_id= "' + e_.spe_id + '"',
            function(error__, results__, fields__) {
              e_.spe_name = results__[0].spe_name;
              if ((i === (results.length - 1) || i > (results.length - 1)) && (i_ === (results_.length - 1) || i_ > (results_.length - 1))) {
                if (error) throw error;
                res.status(200);
                dataJson.code = 200;
                dataJson.data = results;
                dataJson.msg = "查询成功";
                res.json(dataJson);
                return;
              }
            });
          });

        });
      });
    } else {

      res.status(200);
      dataJson.code = 200;
      dataJson.data = results;
      dataJson.msg = "查询成功";
      res.json(dataJson);
      return;
    }

  });
});

// 修改订单状态为已发货状态
app.post('/order/status',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  connection.query('update entry set courier_num = "' + req.body.courier_num + '"where entry_id ="' + req.body.entry_id + '"',
  function(error, results, fields) {
    res.status(200);
    dataJson.code = 200;
    dataJson.data = results;
    dataJson.msg = "修改成功";
    res.json(dataJson);
    return;
  });
  if(req.body.tag!==4){
    connection.query('select * from entry   where order_id="' + req.body.order_id + '"' ,
      function(error, results, fields) {
        let flag=1;
        results.forEach(function(e,i){
          if(!e.courier_num){
            flag=0;
          }
        });
        if(flag){
            connection.query('update `order` set tag = "3" where order_id ="' + req.body.order_id + '"' ,
              function(error, results, fields) {
            });
        }
    });
  }

});

// 修改订单状态为已完成状态
app.post('/order/status2',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };

connection.query('update `order` set tag = "4" where order_id ="' + req.body.order_id + '"' ,
  function(error, results, fields) {
    res.status(200);
    dataJson.code = 200;
    dataJson.data = results;
    dataJson.msg = "收货成功";
    res.json(dataJson);
    return;
});
});
// 取消订单
app.post('/order/del',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  connection.query('delete from `order` where order_id="'+req.body.order_id+'"',
  function(error, results, fields) {
    res.status(200);
    dataJson.code = 200;
    dataJson.data = results;
    dataJson.msg = "取消成功";
    res.json(dataJson);
    return;
  });
});
// 修改密码

app.post('/user/changePwd',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": []
  };
  connection.query('select *  from user  where `phone_num` = "' + req.body.phone + '" and `password` ="' + req.body.oldpassword + '"',
  function(error, results, fields) {
    if(results.length){
             connection.query('update `user` set password = "'+req.body.password+'" where phone_num ="' + req.body.phone + '"' ,
            function(error, results, fields) {
                res.status(200);
                dataJson.code = 200;
                dataJson.data = results;
                dataJson.msg = "修改成功";
                res.json(dataJson);
                return;
          });

    }else{
        res.status(200);
        dataJson.code = 400;
        dataJson.msg = "原始密码错误";
        res.json(dataJson);
        return; 
    }
  });
});



// 添加管理员
app.post('/admin/add',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let admin_name = req.body.admin_name;
  let password = req.body.password;
  connection.query('select * from admin where admin_name ="' + admin_name + '"',
  function(error, results, fields) {
    if (results.length) {
      res.status(200);
      dataJson.msg = "已在该用户名";
      dataJson.code = 400;
      res.json(dataJson);
    } else {
      connection.query('insert into admin(admin_name,password,permissions) values(?,?,0)', [admin_name, password],
      function(error, results, fields) {
        if (error) throw error;
        res.status(200);
        dataJson.code = 200;
        dataJson.msg = "用户添加成功";
        connection.query('select * from admin where admin_name ="' + admin_name + '"',
        function(error, results, fields) {
          dataJson.data = results;
          res.json(dataJson);
        });
      });
    }
  });
});

//获取管理员列表
app.get('/admin/list',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  connection.query('select * from admin',
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

// 删除管理员
app.post('/admin/delete',
function(req, res) {
  let dataJson = {
    "code": 200,
    "msg": "提示信息",
    "data": {}
  };
  let deleteSql = 'delete from admin where ';
  req.body.deleteArr.forEach(function(e, index) {
    if (index === 0) {
      deleteSql += 'admin_id=' + e;
    } else {
      deleteSql += ' or admin_id=' + e;
    }
  });
  connection.query(deleteSql,
  function(error, results, fields) {
    if (error) throw error;
    res.status(200);
    dataJson.msg = "删除成功";
    dataJson.data = results;
    res.json(dataJson);
  });
});

console.log('启动... 3000端口');
app.listen(3000);