/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.7.20-log : Database - qtaotao
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`qtaotao` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `qtaotao`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_id` int(4) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `admin_name` varchar(40) DEFAULT NULL COMMENT '管理员姓名',
  `password` varchar(30) NOT NULL COMMENT '密码',
  `permissions` int(1) NOT NULL COMMENT '权限',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`admin_id`,`admin_name`,`password`,`permissions`) values (1,'root','123456',1),(4,'mingming','123456',0);

/*Table structure for table `advertisement` */

DROP TABLE IF EXISTS `advertisement`;

CREATE TABLE `advertisement` (
  `adv_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '广告分类编号',
  `adv_type` int(4) DEFAULT NULL COMMENT '广告类型（1：轮播图，2：一栏广告图，3：三栏广告图）',
  `adv_key` varchar(60) DEFAULT NULL COMMENT '索引名字',
  `image` varchar(800) DEFAULT NULL COMMENT '图片地址',
  `pro_id` varchar(10) DEFAULT NULL COMMENT '产品编号',
  PRIMARY KEY (`adv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `advertisement` */

insert  into `advertisement`(`adv_id`,`adv_type`,`adv_key`,`image`,`pro_id`) values (30,1,'轮播图','http://localhost:3000/NbTOXXH2Jo4daHapoeZkVt3h.jpg;http://localhost:3000/B4M2n8lyL9nVTFFgqQY3FrvS.jpg;http://localhost:3000/f3dU4ULE8Cd_uZqfRGapCeI0.jpg','86;85;87'),(31,3,'春季新品','http://localhost:3000/RSfz_Ybq7vBXleYrST40ZFL1.png;http://localhost:3000/iqSicra4VYBOxOTamFas4l12.png;http://localhost:3000/9JxNjIiB9GCwh3ZuZcbsXFMx.png','83;85;81'),(34,2,'一栏广告图','http://localhost:3000/IyOUQhcEjiXoi9FiFyb2e7YY.webp','82');

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `cart_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '购物车编号',
  `user_id` varchar(10) NOT NULL COMMENT '用户编号',
  `pro_id` int(10) NOT NULL COMMENT '产品编号',
  `cart_data` datetime(6) DEFAULT NULL COMMENT '加入购物车时间',
  `cart_count` int(11) NOT NULL COMMENT '数量',
  `spe_id` int(11) DEFAULT NULL COMMENT '商品规格',
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

insert  into `cart`(`cart_id`,`user_id`,`pro_id`,`cart_data`,`cart_count`,`spe_id`) values (39,'18',82,'2018-05-04 15:19:21.000000',2,64);

/*Table structure for table `entry` */

DROP TABLE IF EXISTS `entry`;

CREATE TABLE `entry` (
  `entry_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '描述编号',
  `order_id` int(10) NOT NULL COMMENT '订单编号',
  `pro_id` int(10) NOT NULL COMMENT '产品编号',
  `price` int(20) DEFAULT NULL COMMENT '价格',
  `count` int(4) DEFAULT NULL COMMENT '订购数量',
  `spe_id` int(11) DEFAULT NULL COMMENT '产品规格编号',
  `courier_num` varchar(200) DEFAULT NULL COMMENT '快递单号',
  PRIMARY KEY (`entry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8;

/*Data for the table `entry` */

insert  into `entry`(`entry_id`,`order_id`,`pro_id`,`price`,`count`,`spe_id`,`courier_num`) values (139,127,69,128,1,15,'韵达 122342344432'),(140,128,82,69,1,64,NULL),(141,129,83,179,1,69,NULL),(142,130,90,256,3,108,'圆通 889283639191055175 '),(143,131,83,179,1,69,NULL),(144,131,77,125,1,27,NULL);

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `order_no` varchar(50) DEFAULT NULL COMMENT '生成订单的编号',
  `user_id` int(10) DEFAULT NULL COMMENT '会员编号',
  `send_name` varchar(40) DEFAULT NULL COMMENT '收货姓名',
  `send_adress` varchar(200) DEFAULT NULL COMMENT '收货地址',
  `send_phone` varchar(40) DEFAULT NULL COMMENT '收货人电话',
  `payment` varchar(200) DEFAULT NULL COMMENT '付款方式',
  `meno` varchar(200) DEFAULT NULL COMMENT '备注说明',
  `add_time` datetime DEFAULT NULL COMMENT '订单生成时间',
  `tag` int(4) DEFAULT NULL COMMENT '订单处理标记(1:未付款，2：未发货，3：未收货，4：已收货，5：申请退货退款，6：换货)',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;

/*Data for the table `order` */

insert  into `order`(`order_id`,`order_no`,`user_id`,`send_name`,`send_adress`,`send_phone`,`payment`,`meno`,`add_time`,`tag`) values (127,'QGF7XE5T4ZT6127',16,'明明','广东省阳江市阳春春城站前三路','13437850035','zhifubao','','2018-05-02 23:16:27',4),(128,'OENB11U0YGZI128',18,'张伟','请输入收货地址','13437850036','weixin','','2018-05-04 15:05:56',2),(129,'UH31QF6MU4Q9129',18,'张伟','请输入收货地址','13437850036','','','2018-05-04 15:18:10',1),(130,'P18M9WWGQ1Y7130',16,'明明','广东省阳江市阳春春城站前三路','13437850035','weixin','','2018-05-05 11:22:15',4),(131,'JKFTHBZF2ZQD131',16,'明明','广东省阳江市阳春春城站前三路','13437850035','weixin','','2018-05-13 17:34:01',2);

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `pro_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '产品编号',
  `pro_name` varchar(60) DEFAULT NULL COMMENT '产品名',
  `sale_count` int(4) DEFAULT NULL COMMENT '销售数量',
  `image` varchar(800) DEFAULT NULL COMMENT '图片路径',
  `price` varchar(40) DEFAULT NULL COMMENT '成本价格',
  `stack` tinyint(1) DEFAULT NULL COMMENT '是否上架',
  `decript` mediumtext COMMENT '产品介绍',
  `sor_id` int(8) DEFAULT NULL COMMENT '产品分类编号',
  `tags` text COMMENT '标签',
  `sale_price` varchar(40) DEFAULT NULL COMMENT '售价',
  `city` varchar(20) DEFAULT NULL COMMENT '发货地址',
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`pro_id`,`pro_name`,`sale_count`,`image`,`price`,`stack`,`decript`,`sor_id`,`tags`,`sale_price`,`city`) values (68,'男装 运动长裤 404166 优衣库UNIQLO',NULL,'http://localhost:3000/0eQ9kGELxoS5ESegFixIcfP5.jpg;http://localhost:3000/UOqJOopT5QfccfwTmK_7Bife.jpg;http://localhost:3000/posgdHrffDSUOzKw8TLmOnyh.jpg;http://localhost:3000/6IXGLudx62JMONCcyWNCg5d0.jpg;http://localhost:3000/OjBAriy54EaKWhhC3QpDsq7M.webp;http://localhost:3000/GN7RrOHYJmmANHRH5_0vK33b.webp','255',1,'初上市价格199元',155,'2','199','上海'),(69,'休闲裤子男士韩版潮流运动裤小脚铅笔九9分中长裤2018夏季工装库',NULL,'http://localhost:3000/Q07fec0cAsCEu4DY3LQBBUrS.jpg;http://localhost:3000/-UR12ANvic3hS-k-xhdtiTfh.jpg;http://localhost:3000/0zvbutAFpCG_j2uoUU9yWo2g.jpg;http://localhost:3000/XVpf9sVjKYK132Ip8pXzrXEn.jpg;http://localhost:3000/aCja8Bq75jpWm1JRv8H3FzPa.webp;http://localhost:3000/F0PtFEjsEopbYesNiCero70-.webp;http://localhost:3000/gt5txK9byHgolAMEy8K-Z_qS.webp','388.00',1,'-',155,'3','128','广州'),(70,'花花公子男士休闲裤春夏季小脚哈伦裤九分裤韩版潮流男裤子运动裤',NULL,'http://localhost:3000/mIKp-C7JB7G_RtlBEe-sUTsz.jpg;http://localhost:3000/-T-3am9oVI-NF07Xz0uB0FCJ.jpg;http://localhost:3000/ULkm9JIdEkVuzkLEgMeLwk4X.jpg;http://localhost:3000/H88AZRAa4oXV6RpWAaQkgvca.jpg;http://localhost:3000/nOBxYvEjqMvE2NziQTiWKYH5.webp;http://localhost:3000/UPKSPnu8MshxsDrduQw8Jkuj.webp;http://localhost:3000/MfFCND1o1d_42DZsjxc9i4vK.webp','268.00',1,'花花公子品牌正品 速干高品质休闲裤',155,'3','139.00','杭州'),(77,'红色连衣裙2018新款女装春装修身显瘦小个子复古甜美小香风打底裙',NULL,'http://localhost:3000/hVwqJvKVNqiUo6cViD1Edc2A.webp;http://localhost:3000/KPhB4G7tL-jucXGdXSz5OGEm.webp;http://localhost:3000/CFLL25aNUPlgOSiYq3o02CFE.webp;http://localhost:3000/q_MRG4V2WhH0UBgBKO4Nz8lR.webp;http://localhost:3000/qi3JCl4Sjsjio6DgcwM3f0gj.webp;http://localhost:3000/N8M9bjiL-PEoMNAPazclGtGd.webp;http://localhost:3000/ZwluKqxCwh6BhX7aIDBixqdM.webp','312',1,'香飘飘短裙，女神必备',152,'2','125','东莞'),(78,'春季西装女士职业套装时尚气质OL职业装西服正装女装面试工作服女',NULL,'http://localhost:3000/LJtXAjdrXovj05I4HTx9GZ_b.jpg;http://localhost:3000/9oXHPZ6GD0YxtfHy-ZzXrcEA.jpg;http://localhost:3000/TzlnRu7xQVeqHEqQFAw6kWld.jpg;http://localhost:3000/LETTkUKuiLJhW0ZDZQwIciMt.jpg;http://localhost:3000/wXTQoQyBsn-HPt41VfJRCHSd.jpg;http://localhost:3000/G4msLISF8IQZVJu2AdYPTiHl.webp;http://localhost:3000/_vBTOlxISfE61NPwXJgH3q1V.webp','640',1,'自由搭配 修身 轻职业 两色可选',161,'2,3','322','广东深圳'),(79,'细跟鞋女尖头工作鞋高跟单鞋2018新款春季一字扣带包头女凉鞋韩版',NULL,'http://localhost:3000/dyw5lwEFs0JSRTp1YqaLrKsG.webp;http://localhost:3000/lQxu96tvl83YDo2PWO9RDbc5.webp;http://localhost:3000/RtLJV7v5eM_s9oPggcH0XRk6.webp;http://localhost:3000/NmTEH1mgS3Kjd1UHtKfEFzTk.webp;http://localhost:3000/5MFiZ9dMY_3_R-IyPXWhwP0U.webp;http://localhost:3000/4FOXyGKrlSWnYniYwVaOgkNF.webp;http://localhost:3000/_M1sPHBobrTCikk_0F5r3C5Q.webp;http://localhost:3000/daZZrLLvXcQVq9gP1y8UKiJK.webp;http://localhost:3000/AT85z0ZY8wXTAKxlhZkWJTsK.webp;http://localhost:3000/cg6hH25O_jvLw-gHxLAuaX6z.webp','588',1,'女神必备',154,'2,3','88','广东惠州'),(80,'Five Plus新女夏装纯色拼接荷叶边高腰阔腿短裤休闲裤2JM2064300',NULL,'http://localhost:3000/omGCucAh0XrbPd3_GplQk2Cm.webp;http://localhost:3000/8o5C0SnWydUhqHTxFJHDbz3s.webp;http://localhost:3000/b2MtsSN-uyTM4S_1UkeQs6H1.webp;http://localhost:3000/KYDWEYy9PdMo3urboUd4ivn0.webp;http://localhost:3000/8AadAGp05WtFkbYX8x1EhgYp.webp;http://localhost:3000/SMKWw7V9J2VumouPLKuRmDYj.webp;http://localhost:3000/NCQ3yXzgGZ5NYoE8bF1T7Gca.webp;http://localhost:3000/4YqZjN40FKJp1GrePPohx-oC.webp','439',1,'店铺优惠',153,'2','263','广东广州'),(81,'Lily2018夏新款女装时尚通勤A型黑色修身显瘦短裤118220C5108',NULL,'http://localhost:3000/p04EV8xx0NH4VaaBMggbVa3I.webp;http://localhost:3000/c4V8BBx3mYHIxMGSukvRccub.webp;http://localhost:3000/UUjYzWysTDMXtzf2u_N1zVJW.webp;http://localhost:3000/lBuc-yErKlC_H0bsZobQQ64h.webp;http://localhost:3000/nsJ_Buq2qTbYyFc517w7BrwI.webp;http://localhost:3000/S1-QIBhA4CMnrGmbqet4H8WD.webp;http://localhost:3000/_Aw7c64FVQPYYJIlmxIrAYFf.webp;http://localhost:3000/2Q0XwdebiPCYR7nZ1qWLQokI.webp','399',1,'线下门店有售 当季新品',153,'2','199','上海福田'),(82,'法国小媳妇 SANDRO 18春夏 清新拼色束腰连体短裤ROSALYN P6237E',NULL,'http://localhost:3000/rX5OVj-BL8gTFL9HHOJfq_W_.webp;http://localhost:3000/oezrxOQEs53XVSVR1PtXmF-s.webp;http://localhost:3000/5eaZuzWxi3FeaEdf87qWKg0R.webp;http://localhost:3000/pPtRdGJAve5RPETLismMeGHI.webp;http://localhost:3000/0oW8WEMrqmdHApO9qUZsw2cK.webp;http://localhost:3000/a-b9egn9h1npkI-ED7bXvcKn.webp;http://localhost:3000/nDYl6G-KXrRRwoH2_lQ1aQnG.webp;http://localhost:3000/y7IC-2bUEILX8pQPC-SdMhQG.webp;http://localhost:3000/MHungFMxvFKsb8A20o7ZOMEm.webp;http://localhost:3000/7s6xs14b8GSLBA5HM94-wJhR.webp','198',1,'宽松显瘦',152,'3,2','69','浙江杭州'),(83,'2018新款网红连衣裙T恤网纱裙超仙半身裙小清新bf套装女夏两件套',NULL,'http://localhost:3000/eB9id-niFCJ-QRil3mJ4S0uc.webp;http://localhost:3000/rB9UguIy-ofX9FMubGp20mv5.webp;http://localhost:3000/U10WDAC-CO6X_n8oCdy43B_A.webp;http://localhost:3000/tGRkhgqgTCX7jFcOPYu2klcv.webp;http://localhost:3000/APhmcl54qJQF1OdbhH3Ww6Qf.webp;http://localhost:3000/BaDnjh400V4qYnpyA6sCIRxy.webp;http://localhost:3000/sxi0cB53mcJ-oZu0spAbkJo6.webp;http://localhost:3000/JnW9SXJlUf8kllnBBUftsZdU.webp;http://localhost:3000/vb41sV_PXlyj9QjzeBHkUwhR.webp;http://localhost:3000/Ym-GTXEWnc0rnNFNMUkkjTwj.webp','235',1,'活力女神装备',152,'2','179','广东深圳'),(84,'冰冰家2018夏季新款泰国潮牌文艺方领荷叶边装饰优雅中长款连衣裙',NULL,'http://localhost:3000/N6TiCa3KaQDzshXcgXUZWaqq.webp;http://localhost:3000/CAuMYnoipzrxcv33B3eB5wr9.webp;http://localhost:3000/_XwVtgXqYokVNz1crXo-tDEf.webp;http://localhost:3000/s8AV3d0hmXpMYbRwcqPo0L20.webp;http://localhost:3000/5QKdxlJ1p8X88YR6IjrLmVt2.webp;http://localhost:3000/PfpzpgptAsJjPhtF0A-rD6UC.webp;http://localhost:3000/ZIXHOxNzs-N35-jnMM4l4PQk.webp;http://localhost:3000/CL75T0pOl1WTkD1OVx2KJuWY.webp','226',1,'-',152,'2','132','广东广州'),(85,'JONSROO/句索连衣裙女2018新款裙子中长雪纺修身显瘦碎花学生长裙',NULL,'http://localhost:3000/AFObFt9_53h2zuzdCSJ5AEUR.webp;http://localhost:3000/7tVN50BTarx3FGd_y735k0nx.webp;http://localhost:3000/GniTc1JdK6rndZj2bYD7lyf0.webp;http://localhost:3000/gexJCR9GqFJf1QYFbLmIsLxh.webp;http://localhost:3000/VD5qIBVriVdQ_R-Y8jLYFWAx.webp;http://localhost:3000/Qt_xPmy_-rDAXl_qK43ermg5.webp;http://localhost:3000/E05N4hqbVVFhEKMUIt7FPu-Y.webp;http://localhost:3000/MDfCYN-gFI2kGifHyBTJTXzx.webp','168',1,'仙飘飘女裙，夏季清爽',152,'2','250','浙江杭州'),(86,'卡姿兰口红持久保湿不脱色韩国防水学生款可爱不沾杯抖音同款正品',NULL,'http://localhost:3000/KgMDl0Lc-y1I_OIHcbYUVTx-.webp;http://localhost:3000/WmD1LoYk9fkJim4u95RrHeaC.webp;http://localhost:3000/OwzD2zTSbU1QmjVuQwsPHNpo.webp;http://localhost:3000/ue4dwpqLc7eXCJ5bwA7pai5_.webp;http://localhost:3000/WmD1LoYk9fkJim4u95RrHeaC.webp;http://localhost:3000/F4NvpNuHHk7RB-bhHeF6pqpI.webp;http://localhost:3000/Zab89WJ_uGMrPzMPNe8Xdj77.webp;http://localhost:3000/-MPk7459ffPKplKj3JJx8xe5.webp;http://localhost:3000/pMi_ukjWGyiW1DKMSjqeu3DL.webp;http://localhost:3000/Ujux6zDw1LzPYdxs7ZGBhgqh.webp','219',1,'-',162,'2','97','广东广州'),(87,'乔丹 格兰夏季男鞋气垫运动鞋男中学生网面防臭跑步旅游休闲鞋361',NULL,'http://localhost:3000/fFA45u-vCa0cmgWEUGFzxMT_.webp;http://localhost:3000/8RBN1hzI9qfUNLTiSaM5Z8aV.webp;http://localhost:3000/69KOC16CoHOND1a37qLw-lDQ.webp;http://localhost:3000/7JTr4SzAC9hHQ_T218pB_DU1.webp;http://localhost:3000/ueSa0hwGjz7Uw1hHxRO1MwJf.webp;http://localhost:3000/YX2sgbPhwNMfvdIODnzn5j9M.webp;http://localhost:3000/0cZAWF8OMR_RWKcUdAOgl9E_.webp;http://localhost:3000/jZ5-NnaV0YIbO8IGsNMZMbPr.webp','899',1,'-',163,'2','599','广东珠海'),(88,'【数码男生】Canon/佳能EOS 1300D 入门级 单反相机数码高清 旅游',NULL,'http://localhost:3000/s2A99DRpIQVfmLcvF9z3nckW.webp;http://localhost:3000/xgioAuaIStzq7WiSqpzGpRq9.webp;http://localhost:3000/NtUshGEeDs6VscaDT7SP8AMC.webp;http://localhost:3000/LnSA9xTBFYNc4HvDtmjFE-6s.webp;http://localhost:3000/YDPq3clc4mdw30rN5xK2B_-X.webp;http://localhost:3000/ITAAa-Kz6mkonXF6TncH3e-I.webp;http://localhost:3000/AOpgR23on1526cpzjfc-H4Oi.webp;http://localhost:3000/GjDGcv1YZt-rfLBeQobfr-w7.webp;http://localhost:3000/rkXW6w01E2mv71JmM3efSEVO.webp;http://localhost:3000/8POABg1FM7cK6OTvn3q_H6qT.webp;http://localhost:3000/cQBxGEtt7qJ4v-RFEL7kew7t.webp','6089',1,'-',164,'2','5099','广东广州'),(89,'2018新款夏季包头凉鞋女粗跟中空单鞋时尚花朵一字高跟鞋中跟鞋女',NULL,'http://localhost:3000/VbBO20tTl6dvNHbWr0SZY88Y.webp;http://localhost:3000/4NDG7Ujqi1i48l1T3AIVF4Ec.webp;http://localhost:3000/9CsFVqzqOcrT7bUOlfmWb1Gu.webp;http://localhost:3000/619SsLkrCB6ncJ5Z_W-tzq2b.webp;http://localhost:3000/2QLc4uWGeYhVU5ECz6zkl3oW.webp;http://localhost:3000/sAPs9BLOGwpQWSI13pLN6Tol.webp;http://localhost:3000/LFhEeERV2BmsQbcv1--1uc26.webp','258',1,'美丽的邂逅',154,'2','428','四川成都'),(90,'香港2018夏新款女包包时尚单肩小方包菱格链条包韩版百搭斜挎包潮',NULL,'http://localhost:3000/zU61zXH_c7yaH9LID6CuXQ6T.jpg;http://localhost:3000/2629iJU6iVU3o4y0giwZ9joB.jpg;http://localhost:3000/oYma5_09TIt_tWBA9OB7c4xU.jpg;http://localhost:3000/PIVuHSdz3ucSjkfyCRE2YvqH.jpg;http://localhost:3000/1Ua_6DEQWTCv5HQuRqyHGMNq.jpg;http://localhost:3000/fKyHsqb0lEeE-NDJ9CdkqVL_.jpg;http://localhost:3000/RJAlpTrPSAb2ezrSbs0DBVxb.jpg;http://localhost:3000/_mpcAMfFmxbz3ztCNPGlrp4L.jpg;http://localhost:3000/ckPXZn2KEPmexvPtWMT0mSfN.jpg;http://localhost:3000/0sx6zASjF2RWbDO4-XoWLUO3.jpg;http://localhost:3000/T6R_beevnPhi_pbMPcIh314t.jpg;http://localhost:3000/dGHUV5CXcGqwEprfn5UN715C.jpg','599',1,'经典菱格 时尚百搭',166,'2','256','广东深圳');

/*Table structure for table `sort` */

DROP TABLE IF EXISTS `sort`;

CREATE TABLE `sort` (
  `sor_id` int(4) NOT NULL AUTO_INCREMENT COMMENT '产品分类编号',
  `sor_name` varchar(40) DEFAULT NULL COMMENT '分类名',
  `add_data` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`sor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;

/*Data for the table `sort` */

insert  into `sort`(`sor_id`,`sor_name`,`add_data`) values (152,'连衣裙','2018-04-10 20:00:33'),(153,'短裤夏','2018-04-10 20:01:15'),(154,'高跟单鞋','2018-04-10 20:01:42'),(155,'运动裤','2018-04-10 20:02:15'),(161,'正装','2018-04-13 21:53:35'),(162,'口红','2018-05-02 22:35:52'),(163,'运动鞋','2018-05-02 22:52:07'),(164,'相机','2018-05-02 23:10:50'),(165,'手机','2018-05-03 19:22:41'),(166,'斜挎包','2018-05-05 11:18:13');

/*Table structure for table `specifications` */

DROP TABLE IF EXISTS `specifications`;

CREATE TABLE `specifications` (
  `spe_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品规格',
  `spe_name` varchar(20) DEFAULT NULL COMMENT '规格名称',
  `pro_id` int(10) DEFAULT NULL COMMENT '产品编号',
  `stock` int(10) DEFAULT NULL COMMENT '库存',
  PRIMARY KEY (`spe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

/*Data for the table `specifications` */

insert  into `specifications`(`spe_id`,`spe_name`,`pro_id`,`stock`) values (1,'暗示',NULL,0),(2,'阿达啊',64,0),(3,'大神',65,0),(4,'M',66,0),(5,'L',66,0),(6,'XL',66,0),(7,'M',67,0),(8,'L',67,0),(9,'XL',67,0),(10,'165/72A/S',68,0),(11,'170/80A/M',68,0),(12,'175/88A/L',68,0),(13,'M',69,0),(14,'X',69,0),(15,'XL',69,0),(16,'M',70,0),(17,'L',70,0),(18,'XL',70,0),(19,'dsad',72,0),(20,'adas',72,0),(21,'adas',72,0),(22,'sdf',74,0),(23,'df',74,0),(24,'asd',75,0),(25,'asda',76,0),(26,'S',77,0),(27,'M',77,0),(28,'L',77,0),(29,'S',78,0),(30,'M',78,0),(31,'L',78,0),(32,'XL',78,0),(33,'XXL',78,0),(34,'XXXL',78,0),(35,'XXXXL',78,0),(36,'33黑',79,0),(37,'34黑',79,0),(38,'35黑',79,0),(39,'36黑',79,0),(40,'37黑',79,0),(41,'38黑',79,0),(42,'39黑',79,0),(43,'40黑',79,0),(44,'33青',79,0),(45,'34青',79,0),(46,'35青',79,0),(47,'36青',79,0),(48,'37青',79,0),(49,'38青',79,0),(50,'39青',79,0),(51,'40青',79,0),(52,'37白',79,0),(53,'38白',79,0),(54,'XS黑色',80,0),(55,'S黑色',80,0),(56,'L黑色',80,0),(57,'XS',81,0),(58,'S',81,0),(59,'M',81,0),(60,'L',81,0),(61,'XL',81,0),(62,'S黑色',82,0),(63,'M黑色',82,0),(64,'L黑色',82,0),(65,'S白色',82,0),(66,'M白色',82,0),(67,'L白色',82,0),(68,'S码黄色',83,0),(69,'M码黄色',83,0),(70,'L码黄色',83,0),(71,'S码白色',83,0),(72,'M码白色',83,0),(73,'L码白色',83,0),(74,'S',84,0),(75,'M',84,0),(76,'L',84,0),(77,'XL',84,0),(78,'XS',85,0),(79,'S',85,0),(80,'M',85,0),(81,'L',85,0),(82,'01东京樱粉',86,0),(83,'02首尔俏粉',86,0),(84,'03巴黎艳粉',86,0),(85,'04维港恋粉',86,0),(86,'05加州亮橘',86,0),(87,'36',87,0),(88,'37',87,0),(89,'38',87,0),(90,'39',87,0),(91,'40',87,0),(92,'41',87,0),(93,'42',87,0),(94,'43',87,0),(100,'36黑色',89,0),(101,'37黑色',89,0),(102,'38黑色',89,0),(103,'39黑色',89,0),(104,'36米色',89,0),(105,'37米色',89,0),(106,'38米色',89,0),(107,'白色大号',90,0),(108,'黑色大号',90,0),(109,'黑色小号',90,0),(110,'白色小号',90,0),(111,'',91,0),(112,'xzc',91,0),(113,'',91,0),(114,'dsf',91,0),(115,'都是',92,0);

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `tags_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '标签编号',
  `tags_name` varchar(40) DEFAULT NULL COMMENT '标签名',
  `add_data` datetime NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tags` */

insert  into `tags`(`tags_id`,`tags_name`,`add_data`) values (2,'包邮','2018-03-11 18:03:31'),(3,'满减','2018-03-11 18:19:34');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(5) NOT NULL AUTO_INCREMENT COMMENT '会员编号',
  `uname` char(20) NOT NULL COMMENT '会员名',
  `password` char(20) DEFAULT NULL COMMENT '密码',
  `phone_num` varchar(11) DEFAULT NULL COMMENT '电话',
  `email` char(20) DEFAULT NULL COMMENT '电子邮件',
  `rate` int(1) DEFAULT '0' COMMENT '用户角色',
  `real_name` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uid`,`uname`,`password`,`phone_num`,`email`,`rate`,`real_name`,`address`) values (16,'明明','123456*','13437850035',NULL,0,NULL,'广东省阳江市阳春春城站前三路'),(17,'梁明明','123456','13437850059',NULL,0,NULL,NULL),(18,'张伟','123456','13437850036',NULL,0,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
