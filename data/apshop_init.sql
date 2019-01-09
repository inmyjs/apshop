/*===============================================================*/
-- 平台初始化数据脚本
-- Inmyjs 20180917
-- 版本 V1.0.180917
/*===============================================================*/


-- ------------------------------------------------------------
-- 初始化管理员信息
-- ------------------------------------------------------------

INSERT INTO `user` VALUES (
10000000,'admin','Admin','https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif','A','0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0','','2017-11-20 02:46:55','2017-12-12 19:19:18',NULL,9,'2017-12-12 19:19:18');
INSERT INTO `userLogin` VALUES ('admin',10000000,'$2a$10$nrRFB0Y53DauFxVdrm1yk.preQ9KKgWGPUO33CXW6BRxyF7WRPbqG','$2a$10$nrRFB0Y53DauFxVdrm1yk.','0');

-- ------------------------------------------------------------
-- 初始化【系统配置表:config】
-- ------------------------------------------------------------
INSERT INTO `config` (`systemName`, `systemCName`, `configName`, `keyWord`, `configValue`, `configDefaultValue`, `configDESC`) VALUES
('Apshop', '天启商城', 'baseConfig', 'isClose', '0', '0', '关闭网站'),
('Apshop', '天启商城', 'baseConfig', 'closeReason', '天启商城暂时需要关闭，给您带来不便，尽请谅解。恢复时间请关系官方微信。', '天启商城暂时需要关闭，给您带来不便，尽请谅解。恢复时间请关系官方微信。', '关闭原因'),
('Apshop', '天启商城', 'baseConfig', 'isRegister', '1', '1', '开启注册'),
('Apshop', '天启商城', 'baseConfig', 'ICPNO', '第0号', '第0号', 'ICP备案证书号'),
('Apshop', '天启商城', 'baseConfig', 'consumptionPointsName', 'A币', 'A币', '消费积分名称'),
('Apshop', '天启商城', 'baseConfig', 'integralConversionRatio', '1:20', '1:20', '积分换算比例'),
('Apshop', '天启商城', 'baseConfig', 'integralPaymentRatio', '1:10', '1:10', '积分支付比例'),
('Apshop', '天启商城', 'baseConfig', 'shopNumberPrefix', 'AP', 'AP', '商品货号前缀'),
('Apshop', '天启商城', 'baseConfig', 'isCommentReviewed', '1', '1', '用户评论是否需要审核'),
('Apshop', '天启商城', 'baseConfig', 'registerPresentExp', '100', '100', '会员注册赠送积分'),
('Apshop', '天启商城', 'baseConfig', 'pageTitle', 'APSHOP官网|小程序开发|微信开发', 'APSHOP官网|小程序开发|微信开发', '网站标题'),
('Apshop', '天启商城', 'baseConfig', 'pageKeywords', 'Apshop,小程序、微信、APP开发,服务号、订阅号、网站开发,egg', 'egg,Apshop,小程序、微信、APP开发,服务号、订阅号、网站开发', '网站关键字'),
('Apshop', '天启商城', 'baseConfig', 'pageDescription', 'Apshop，基于egg.js的开源商城系统，定位高端商城', '0', '网站描述'),
('Apshop', '天启商城', 'baseConfig', 'CopyRight', 'Copyright © 2018-2019 Inmyjs All Rights Reserved.', 'Copyright © 2018-2019 Inmyjs All Rights Reserved.', '版权信息'),
('Apshop', '天启商城', 'baseConfig', 'logo', '/public/logo.png', '/public/logo.png', '网站logo');

-- ------------------------------------------------------------
-- 初始化【商店表:shop】
-- ------------------------------------------------------------
INSERT INTO `apshop`.`shop` (`shopID`, `sender`, `shopName`, `shopTitle`, `shopDescribe`, `shopKeyWord`, `location`, `completeAddress`, `serviceQQ`, `serviceEmail`, `serviceCall`, `shopLogo`, `wxImg`) VALUES
(1, 'Inmyjs', 'Inmyjs旗舰店', 'Inmyjs旗舰店', '专业开发微信小程序、服务号、App、企业网站、智能平台等系统。', 'Apshop,小程序、微信、APP开发,服务号、订阅号、网站开发,egg', '云南省昆明市五华区', '科光路8号', '573391755', '573391755@qq.com', '15394971279', '/public/logo.png','/public/wx.png');

-- ------------------------------------------------------------
-- 初始化【简易词典表, 词典标题表: wordbookTitle, wordbook】
-- ------------------------------------------------------------

-- USER_TYPE 用户类型: 0=员工, C=客户, P=合作伙伴, T=临时用户
DELETE FROM wordbook WHERE keyWord='USER_TYPE';
DELETE FROM wordbookTitle WHERE keyWord='USER_TYPE';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('USER_TYPE', '用户类型: 0=员工, C=客户, P=合作伙伴, T=临时用户');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('USER_TYPE','0','员工',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('USER_TYPE','C','客户',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('USER_TYPE','P','合作伙伴',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('USER_TYPE','T','临时用户',90);

-- ID_TYPE 证件类型: 0=身份证, 1=护照, 2=军官证
DELETE FROM wordbook WHERE keyWord='ID_TYPE';
DELETE FROM wordbookTitle WHERE keyWord='ID_TYPE';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('ID_TYPE', '证件类型: 0=身份证, 1=护照, 2=军官证');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('ID_TYPE','0','身份证',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('ID_TYPE','C','护照',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('ID_TYPE','P','军官证',30);

-- NATIONALITY 民族: 0=未知, 1=汉族, 2=满族, 3=蒙古族, 4=回族, 5=藏族, 6=壮族, 7=苗族, 8=维吾尔族, 9=土家族
--	10=彝族, 11=布依族, 12=侗族, 13=瑶族, 14=朝鲜族, 15=白族, 16=哈尼族, 17=哈萨克族, 18=黎族, 19=傣族, 99=其他少数民族
DELETE FROM wordbook WHERE keyWord='NATIONALITY';
DELETE FROM wordbookTitle WHERE keyWord='NATIONALITY';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('NATIONALITY', '民族: 0=未知, 1=汉族, 2=满族, 3=蒙古族, 4=回族, 5=藏族, 6=壮族, 7=苗族, 8=维吾尔族, 99=其他少数民族');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','1','汉族',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','2','满族',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','3','蒙古族',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','4','回族',40);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','5','藏族',50);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','6','壮族',60);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','7','苗族',70);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','8','维吾尔族',80);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','9','土家族',90);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','10','彝族',100);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','11','布依族',110);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','12','侗族',120);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','13','瑶族',130);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','14','朝鲜族',140);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','15','白族',150);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','16','哈尼族',160);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','17','哈萨克族',170);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','18','黎族',180);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','19','傣族',190);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('NATIONALITY','99','其他少数民族',990);

-- RELIGION 宗教: 0=无宗教, 1=佛教, 2=道教, 3=基督教, 4=天主教, 5=东正教, 6=伊斯兰教, 99=其他教
DELETE FROM wordbook WHERE keyWord='RELIGION';
DELETE FROM wordbookTitle WHERE keyWord='RELIGION';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('RELIGION', '宗教: 0=无宗教, 1=佛教, 2=道教, 3=基督教, 4=天主教, 5=东正教, 6=伊斯兰教, 99=其他教');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','0','无宗教',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','1','佛教',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','2','道教',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','3','基督教',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','4','天主教',40);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','5','东正教',50);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','6','伊斯兰教',60);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('RELIGION','99','其他教',900);

-- POLITYFACE 政治面貌: 0=未知, 1=群众, 2=共产党员, 99=民主党党员
DELETE FROM wordbook WHERE keyWord='POLITYFACE';
DELETE FROM wordbookTitle WHERE keyWord='POLITYFACE';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('POLITYFACE', '政治面貌: 0=未知, 1=无党派人士, 2=共产党员, 99=民主党党员');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('POLITYFACE','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('POLITYFACE','1','无党派人士',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('POLITYFACE','2','共产党员',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('POLITYFACE','3','民主党党员',30);

-- MARRIAGE 婚姻情况: 0=未知, 1=已婚, 2=未婚, 3=离异, 4=丧偶
DELETE FROM wordbook WHERE keyWord='MARRIAGE';
DELETE FROM wordbookTitle WHERE keyWord='MARRIAGE';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('MARRIAGE', '婚姻情况: 0=未知, 1=已婚, 2=未婚, 3=离异, 4=丧偶');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('MARRIAGE','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('MARRIAGE','1','已婚',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('MARRIAGE','2','未婚',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('MARRIAGE','3','离异',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('MARRIAGE','4','丧偶',40);

-- BLOOD 血型: 0=未知, 1=A型, 2=B型, 3=O型, 4=AB型
DELETE FROM wordbook WHERE keyWord='BLOOD';
DELETE FROM wordbookTitle WHERE keyWord='BLOOD';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('BLOOD', '血型: 0=未知, 1=A型, 2=B型, 3=O型, 4=AB型');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('BLOOD','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('BLOOD','1','A型',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('BLOOD','2','B型',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('BLOOD','3','O型',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('BLOOD','4','AB型',40);

-- GENDER 性别: 0=未知, M=男性, F=女性
DELETE FROM wordbook WHERE keyWord='GENDER';
DELETE FROM wordbookTitle WHERE keyWord='GENDER';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('GENDER', '性别: 0=未知, M=男性, F=女性');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('GENDER','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('GENDER','M','男性',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('GENDER','F','女性',20);

-- EDUCATION 学历: 0=未知, 1=专科以下, 2=专科, 3=本科, 4=硕士, 5=博士
DELETE FROM wordbook WHERE keyWord='EDUCATION';
DELETE FROM wordbookTitle WHERE keyWord='EDUCATION';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('EDUCATION', '学历: 0=未知, 1=专科以下, 2=专科, 3=本科, 4=硕士, 5=博士');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','0','未知',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','1','专科以下',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','2','专科',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','3','本科',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','4','硕士',40);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('EDUCATION','5','博士',50);

-- STATUS 状态: 0=正常, S=失效, C=建档, N=新员工, E=过期, P=暂停, F=欠费, X=待清理
DELETE FROM wordbook WHERE keyWord='STATUS';
DELETE FROM wordbookTitle WHERE keyWord='STATUS';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('STATUS', '状态: 0=正常, S=失效, C=建档, N=新员工, E=过期, P=暂停, F=欠费, X=待清理');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','0','正常',0);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','S','失效',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','C','建档',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','N','新员工',30);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','E','过期',40);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','P','暂停',50);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','F','欠费',60);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('STATUS','X','待清理',90);


-- LOGINLOG_TYPE 登录日志类型: L=登录, Q=退出, P=重要行为
DELETE FROM wordbook WHERE keyWord='LOGINLOG_TYPE';
DELETE FROM wordbookTitle WHERE keyWord='LOGINLOG_TYPE';
INSERT INTO wordbookTitle(keyWord, keyWordDESC) VALUES('LOGINLOG_TYPE', '登录日志类型: L=登录, Q=退出, P=重要行为');
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('LOGINLOG_TYPE','L','登录',10);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('LOGINLOG_TYPE','Q','退出',20);
INSERT INTO wordbook(keyWord,wordValue,wordDisplay,sortNo) VALUES('LOGINLOG_TYPE','P','重要行为',30);


