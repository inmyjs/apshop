/*===============================================================*/
-- apshop平台初始化数据脚本
-- kunoy 20171101
-- 版本 V1.0.171101
/*===============================================================*/

-- ------------------------------------------------------------
-- 初始化管理员信息
-- ------------------------------------------------------------

INSERT INTO `user` VALUES (
10000000,'admin','Admin','A','0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0','0',NULL,NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0','0','\n2017-12-09 16:30:06  禁用\n2017-12-09 16:30:10  正常','2017-11-20 02:46:55','2017-12-12 19:19:18',NULL,9,'2017-12-12 19:19:18');
INSERT INTO `userlogin` VALUES ('admin',10000000,'$2a$10$nrRFB0Y53DauFxVdrm1yk.preQ9KKgWGPUO33CXW6BRxyF7WRPbqG','$2a$10$nrRFB0Y53DauFxVdrm1yk.','0');

-- ------------------------------------------------------------
-- 初始化【简易词典表, 词典标题表: WordbookTitle, Wordbook】
-- ------------------------------------------------------------

-- USER_TYPE 用户类型: 0=员工, C=客户, P=合作伙伴, T=临时用户
DELETE FROM Wordbook WHERE KeyWord='USER_TYPE';
DELETE FROM WordbookTitle WHERE KeyWord='USER_TYPE';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('USER_TYPE', '用户类型: 0=员工, C=客户, P=合作伙伴, T=临时用户');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('USER_TYPE','0','员工',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('USER_TYPE','C','客户',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('USER_TYPE','P','合作伙伴',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('USER_TYPE','T','临时用户',90);

-- ID_TYPE 证件类型: 0=身份证, 1=护照, 2=军官证
DELETE FROM Wordbook WHERE KeyWord='ID_TYPE';
DELETE FROM WordbookTitle WHERE KeyWord='ID_TYPE';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('ID_TYPE', '证件类型: 0=身份证, 1=护照, 2=军官证');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('ID_TYPE','0','身份证',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('ID_TYPE','C','护照',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('ID_TYPE','P','军官证',30);

-- NATIONALITY 民族: 0=未知, 1=汉族, 2=满族, 3=蒙古族, 4=回族, 5=藏族, 6=壮族, 7=苗族, 8=维吾尔族, 9=土家族
--	10=彝族, 11=布依族, 12=侗族, 13=瑶族, 14=朝鲜族, 15=白族, 16=哈尼族, 17=哈萨克族, 18=黎族, 19=傣族, 99=其他少数民族
DELETE FROM Wordbook WHERE KeyWord='NATIONALITY';
DELETE FROM WordbookTitle WHERE KeyWord='NATIONALITY';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('NATIONALITY', '民族: 0=未知, 1=汉族, 2=满族, 3=蒙古族, 4=回族, 5=藏族, 6=壮族, 7=苗族, 8=维吾尔族, 99=其他少数民族');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','1','汉族',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','2','满族',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','3','蒙古族',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','4','回族',40);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','5','藏族',50);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','6','壮族',60);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','7','苗族',70);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','8','维吾尔族',80);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','9','土家族',90);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','10','彝族',100);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','11','布依族',110);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','12','侗族',120);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','13','瑶族',130);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','14','朝鲜族',140);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','15','白族',150);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','16','哈尼族',160);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','17','哈萨克族',170);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','18','黎族',180);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','19','傣族',190);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('NATIONALITY','99','其他少数民族',990);

-- RELIGION 宗教: 0=无宗教, 1=佛教, 2=道教, 3=基督教, 4=天主教, 5=东正教, 6=伊斯兰教, 99=其他教
DELETE FROM Wordbook WHERE KeyWord='RELIGION';
DELETE FROM WordbookTitle WHERE KeyWord='RELIGION';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('RELIGION', '宗教: 0=无宗教, 1=佛教, 2=道教, 3=基督教, 4=天主教, 5=东正教, 6=伊斯兰教, 99=其他教');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','0','无宗教',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','1','佛教',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','2','道教',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','3','基督教',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','4','天主教',40);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','5','东正教',50);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','6','伊斯兰教',60);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('RELIGION','99','其他教',900);

-- POLITYFACE 政治面貌: 0=未知, 1=群众, 2=共产党员, 99=民主党党员
DELETE FROM Wordbook WHERE KeyWord='POLITYFACE';
DELETE FROM WordbookTitle WHERE KeyWord='POLITYFACE';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('POLITYFACE', '政治面貌: 0=未知, 1=无党派人士, 2=共产党员, 99=民主党党员');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('POLITYFACE','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('POLITYFACE','1','无党派人士',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('POLITYFACE','2','共产党员',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('POLITYFACE','3','民主党党员',30);

-- MARRIAGE 婚姻情况: 0=未知, 1=已婚, 2=未婚, 3=离异, 4=丧偶
DELETE FROM Wordbook WHERE KeyWord='MARRIAGE';
DELETE FROM WordbookTitle WHERE KeyWord='MARRIAGE';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('MARRIAGE', '婚姻情况: 0=未知, 1=已婚, 2=未婚, 3=离异, 4=丧偶');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('MARRIAGE','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('MARRIAGE','1','已婚',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('MARRIAGE','2','未婚',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('MARRIAGE','3','离异',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('MARRIAGE','4','丧偶',40);

-- BLOOD 血型: 0=未知, 1=A型, 2=B型, 3=O型, 4=AB型
DELETE FROM Wordbook WHERE KeyWord='BLOOD';
DELETE FROM WordbookTitle WHERE KeyWord='BLOOD';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('BLOOD', '血型: 0=未知, 1=A型, 2=B型, 3=O型, 4=AB型');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('BLOOD','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('BLOOD','1','A型',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('BLOOD','2','B型',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('BLOOD','3','O型',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('BLOOD','4','AB型',40);

-- GENDER 性别: 0=未知, M=男性, F=女性
DELETE FROM Wordbook WHERE KeyWord='GENDER';
DELETE FROM WordbookTitle WHERE KeyWord='GENDER';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('GENDER', '性别: 0=未知, M=男性, F=女性');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('GENDER','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('GENDER','M','男性',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('GENDER','F','女性',20);

-- EDUCATION 学历: 0=未知, 1=专科以下, 2=专科, 3=本科, 4=硕士, 5=博士
DELETE FROM Wordbook WHERE KeyWord='EDUCATION';
DELETE FROM WordbookTitle WHERE KeyWord='EDUCATION';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('EDUCATION', '学历: 0=未知, 1=专科以下, 2=专科, 3=本科, 4=硕士, 5=博士');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','0','未知',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','1','专科以下',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','2','专科',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','3','本科',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','4','硕士',40);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('EDUCATION','5','博士',50);

-- STATUS 状态: 0=正常, S=失效, C=建档, N=新员工, E=过期, P=暂停, F=欠费, X=待清理
DELETE FROM Wordbook WHERE KeyWord='STATUS';
DELETE FROM WordbookTitle WHERE KeyWord='STATUS';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('STATUS', '状态: 0=正常, S=失效, C=建档, N=新员工, E=过期, P=暂停, F=欠费, X=待清理');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','0','正常',0);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','S','失效',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','C','建档',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','N','新员工',30);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','E','过期',40);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','P','暂停',50);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','F','欠费',60);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('STATUS','X','待清理',90);


-- LOGINLOG_TYPE 登录日志类型: L=登录, Q=退出, P=重要行为
DELETE FROM Wordbook WHERE KeyWord='LOGINLOG_TYPE';
DELETE FROM WordbookTitle WHERE KeyWord='LOGINLOG_TYPE';
INSERT INTO WordbookTitle(KeyWord, KeyWord_DESC) VALUES('LOGINLOG_TYPE', '登录日志类型: L=登录, Q=退出, P=重要行为');
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('LOGINLOG_TYPE','L','登录',10);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('LOGINLOG_TYPE','Q','退出',20);
INSERT INTO Wordbook(KeyWord,Word_Value,Word_Display,Sort_No) VALUES('LOGINLOG_TYPE','P','重要行为',30);

