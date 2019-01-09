/*===============================================================*/
-- apshop平台数据结构
-- inmyjs 20190101
-- 版本 V1.0.171101
-- ---------------------------------------------------------------
-- 文档需要对齐, Tab键设置为4个空格
-- 表的备注: 如: --序号表: Sequence
-- 字段名注释规范: 单行注释标志COMMENT+字段中文抬头+半角左括号+标志及详细说明+半角右括号。
-- 举例字段的备注: COMMENT '字典状态(*, 0=正常, S=失效)'。
-- 表命名规则: 以大小写英文来进行命名, 太长的英文可采用尽可能的规范缩写。
-- 字段命名规则: 以英文大小写进行命名, 多层意思中间用_连接, 部分常用字段可不用_连接。
-- 所有的ID都不用连接符_, 因为使用频率很高。
-- 核心ID字段采用单字缩写, 以方便未来的使用, 如: UID=用户ID, CID=客户ID, EID=设备ID, PID=产品ID
-- 非核心ID一般不用单字缩写, 如: LogID=日志ID, ORGID=机构ID, CommunityID=小区ID
-- 带*的字段是通过Wordbook字典来解释的
-- 部分字段规范：
-- 1、标识一般采用Flag, 数据类型一般是CHAR(1), 双态的标志用[Y]和[N]
-- 2、状态统一使用Status或以此为后缀的词
-- 3、备注全部使用Note, 数据类型是TEXT
-- 4、日期采用_Date为后缀, 类型是DATE, 时间采用_Time为后缀, 类型是DATETIME
-- 5、单据采用B_开头的表名, 以区别于其他对象
-- 标准状态采用Status, 其设置为: 0=正常, S=失效, P=暂停, N=新建/未转正/未开通
-- 部分常用于计算的表名有部分约定, 如:
-- B_开头的表是各种单据, C_开头的表是各种合同协议, R_开头的表是各种报告, 其他为对象基本资料等
-- 表名后缀为_H的为历史备份表, 表名后缀为_L的为日志表, 表名后缀为_D的一般是明细表
-- 数量用DECIMAL(12,3), 价格用DECIMAL(10,2), 金额用DECIMAL(16,2)
-- 单据号的构成：两位大写单据类型+YYMMDD+6位顺序号（顺序号建议为月更新或日更新）
/*===============================================================*/
-- 基础表结构
-- 这些对象的修改都无相应模块, 由程序员或后台模块自动维护
-- ---------------------------------------------------------------
-- 序号表: Sequence
-- 简易词典表, 词典标题表: WordbookTitle, Wordbook
-- 系统配置表: Config
-- 单据类型表: BillType
-- 文档表: Document
-- ---------------------------------------------------------------
-- 核心对象表结构
-- 这些对象暂时都由直接模块完成, 如需使用单据完成, 再行修改
-- ---------------------------------------------------------------
-- 用户, 用户登录, 用户登录日志: User, UserLogin, UserLogin_L

/*==============================================================*/

set character_set_client      = utf8mb4;
set character_set_connection  = utf8mb4;
set character_set_database    = utf8mb4;
set character_set_results     = utf8mb4;
set character_set_server      = utf8mb4;

-- ----------------------------------------------------------------
-- 简易词典表和词典标题表: wordbookTitle, wordbook
-- 建立: inmyjs 20190101
-- WordbookTitle与Wordbook需建立外键
-- 所有关键字字母均需为大写
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS wordbook;
DROP TABLE IF EXISTS wordbookTitle;
CREATE TABLE wordbookTitle
(
keyword				VARCHAR(30) NOT NULL			COMMENT '词典关键字',
keywordDESC		    TEXT NOT NULL					COMMENT '词典关键字说明',
CONSTRAINT PK_wordbookTitle PRIMARY KEY(keyword)
);
ALTER TABLE wordbookTitle COMMENT= '词典标题表';

CREATE TABLE wordbook
(
keyword				VARCHAR(30) NOT NULL			COMMENT '词典关键字',
wordValue			VARCHAR(30) NOT NULL			COMMENT '关键字的值',
wordDisplay		    VARCHAR(100) NOT NULL			COMMENT '关键字显示的中文值',
sortNo				INT DEFAULT 0 NOT NULL			COMMENT '显示顺序',
status				CHAR(1) DEFAULT '0' NOT NULL	COMMENT '字典状态(0=正常, S=失效)',
note				TEXT							COMMENT '备注',
CONSTRAINT PK_wordbook PRIMARY KEY(keyword,wordValue)
);
ALTER TABLE wordbook COMMENT= '简易词典表';

-- ----------------------------------------------------------------
-- region: region
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `region_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `region_name` varchar(120) NOT NULL DEFAULT '',
  `region_type` tinyint(1) NOT NULL DEFAULT '2',
  `agency_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`region_id`)
);

-- ----------------------------------------------------------------
-- 系统配置表: config
-- 建立: inmyjs 20190101
-- 该表由架构师维护, 在所有子系统和库里均相同
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS config;
CREATE TABLE config
(
systemName			VARCHAR(30) NOT NULL			COMMENT '子系统的英文名',
systemCName		    VARCHAR(100) 			        COMMENT '子系统的中文名',
configName			VARCHAR(30) NOT NULL			COMMENT '用户配置的分组名称',
keyWord				VARCHAR(30) NOT NULL			COMMENT '配置参数关键字',
configValue		    VARCHAR(100) NOT NULL			COMMENT '配置参数的值',
configDefaultValue  VARCHAR(100) 			        COMMENT '配置参数的默认值',
configDESC			VARCHAR(30) 		            COMMENT '配置参数说明',
status				CHAR(1) DEFAULT '0' NOT NULL	COMMENT '状态(0=正常, S=失效)',
note				TEXT							COMMENT '备注',
CONSTRAINT PK_config PRIMARY KEY(systemName,configName,keyWord)
);
ALTER TABLE config COMMENT= '系统配置表';

-- ----------------------------------------------------------------
-- 文档表: document
-- 建立: inmyjs 20190101
--
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS document;
CREATE TABLE document
(
did					INT AUTO_INCREMENT				COMMENT '文档ID(自增序号)',
docUrl				VARCHAR(200)					COMMENT '文档的Url链接',
docType			    VARCHAR(20)		                COMMENT '文档类型(*,doc=文档,image=图片,video=视频,other=其他文件)',
docName			    VARCHAR(30)						COMMENT '文档名称',
note				TEXT							COMMENT '备注,该值可填写一些文档的说明',
create_Time			DATETIME DEFAULT NOW()			COMMENT '记录建立时间',
CONSTRAINT PK_document PRIMARY KEY(did)
);
ALTER TABLE document COMMENT= '文档表';

-- ----------------------------------------------------------------
-- 用户, 用户登录, 用户登录日志: user, userLogin, userLogin_L
-- 建立: inmyjs 20190101
-- 用户ID为自增变量, 采用8位编号, 从10000001开始
-- 员工和合作伙伴也可以是客户, 但当客户成为合作伙伴或员工时，则必须是员工或合作伙伴
-- 用户重要的日志变动放在Note字段里
-- ----------------------------------------------------------------
-- 用户表: user
DROP TABLE IF EXISTS user;
CREATE TABLE user
(
-- 关键信息
uid					INT AUTO_INCREMENT				COMMENT '用户内码(自增序号)',
username			VARCHAR(30) NOT NULL			COMMENT '用户名称',
nickname			VARCHAR(30) 			        COMMENT '用户昵称',
avatar			    VARCHAR(100) 			        COMMENT '头像',
userType			CHAR(1) NOT NULL				COMMENT '用户类型(*, 0=员工, C=客户, P=合作伙伴, T=临时用户, A=管理员)',
IDType				CHAR(1) DEFAULT '0'         	COMMENT '证件类型(*, 0=身份证, 1=护照, 2=军官证)',
IDNO				VARCHAR(30) 			        COMMENT '证件号码(登录识别)',
cell				VARCHAR(30) 			        COMMENT '联系手机(登录识别,仅能有一个号码)',

secQuestion1		VARCHAR(100)					COMMENT '安全问题1',
secQuestion2		VARCHAR(100)					COMMENT '安全问题2',
secQuestion3		VARCHAR(100)					COMMENT '安全问题3',
secAnswer1			VARCHAR(100)					COMMENT '加密安全答案1',
secAnswer2			VARCHAR(100)					COMMENT '加密安全答案2',
secAnswer3			VARCHAR(100)					COMMENT '加密安全答案3',
secPassword		    VARCHAR(30)						COMMENT '安全密码, 成为正式用户后必须填加',

-- 其他信息
status				CHAR(1) DEFAULT '0' not null	COMMENT '状态(*, 0=正常, C=禁用)',
validStatus			CHAR(1) DEFAULT '0' NOT NULL	COMMENT '状态(0=未验证,C=已失效 S=已验证)',
note				TEXT		 					COMMENT '备注',
createTime			DATETIME DEFAULT NOW()		COMMENT '记录建立时间',
modifyTime			DATETIME DEFAULT NOW() ON UPDATE NOW()	COMMENT '最后修改时间',
closeDate			DATE							COMMENT '禁用日期',
loginNum		    INT DEFAULT 0 NOT NULL			COMMENT '登录次数',
lastLoginTime		DATETIME			            COMMENT '最后登录时间',

CONSTRAINT PK_user PRIMARY KEY(uid)
);
ALTER TABLE user COMMENT= '用户表';
ALTER TABLE user AUTO_INCREMENT=10000000;
CREATE UNIQUE INDEX IDX_user_username ON user(username);
CREATE UNIQUE INDEX IDX_user_IDNO ON user(IDNO);
CREATE UNIQUE INDEX IDX_user_cell ON user(cell);

-- 用户登录表: userLogin, 同一个UID的加密密码是相同的
DROP TABLE IF EXISTS userLogin;
CREATE TABLE userLogin
(
loginString			VARCHAR(100) NOT NULL			COMMENT '登录识别串, 由User表填加, 包括身份证, 电话, 邮箱等',
uid					INT								COMMENT '用户内码',
password			VARCHAR(100) NOT NULL			COMMENT '加密的登录密码',
salt				VARCHAR(100) NOT NULL			COMMENT '加密盐',
status				CHAR(1) DEFAULT '0' NOT NULL	COMMENT '状态(冗余, *, 0=正常, S=失效)',
CONSTRAINT PK_userLogin PRIMARY KEY(loginString)
);
ALTER TABLE userLogin COMMENT= '用户登录识别表';

-- 用户登录日志表: userLogin_L
DROP TABLE IF EXISTS userLogin_L;
CREATE TABLE userLogin_L
(
logID				INT AUTO_INCREMENT				COMMENT '日志内码(自增序号)',
uid					INT NOT NULL					COMMENT '用户内码',
loginString			VARCHAR(100)					COMMENT '登录识别串, 登录行为时要记录',
loginLogType		CHAR(1)							COMMENT '登录日志类型（L=登录, Q=退出, P=重要行为)',
logDESC			    TEXT							COMMENT '日志描述',
createTime			DATETIME DEFAULT NOW()		    COMMENT '记录建立时间',
CONSTRAINT PK_userLogin_L PRIMARY KEY(logID)
);
ALTER TABLE userLogin_L COMMENT= '用户登录日志表';

-- ----------------------------------------------------------------
-- 邮箱验证表: email_valid
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS email_valid;
CREATE TABLE email_valid
(
logID				INT AUTO_INCREMENT				COMMENT '日志内码(自增序号)',
email		        VARCHAR(50) NOT NULL			COMMENT '邮箱',
validType		    CHAR(1)							COMMENT '类型（R=注册, F=忘记密码)',
token		        VARCHAR(250) NOT NULL			COMMENT 'token',
url		            VARCHAR(300) NOT NULL			COMMENT 'url',
createTime			DATETIME DEFAULT NOW()		    COMMENT '记录建立时间',
validTime			DATETIME 	                    COMMENT '有效时间',
validStatus				CHAR(1) DEFAULT '0' NOT NULL	COMMENT '状态(0=未验证,C=已失效 S=已验证)',
CONSTRAINT PK_email_valid PRIMARY KEY(logID)
);
ALTER TABLE email_valid COMMENT= '邮箱验证表';

-- ----------------------------------------------------------------
-- 微信消息表: pay_msg
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS pay_msg;
CREATE TABLE pay_msg
(
logID				INT AUTO_INCREMENT				COMMENT '日志内码(自增序号)',
msgType		        VARCHAR(10) NOT NULL			COMMENT '消息类型',
memo		        VARCHAR(20) 			        COMMENT '备注',
description		    VARCHAR(100) 			        COMMENT '描述',
tradeNo		        VARCHAR(100) 			        COMMENT '订单号',
username		    VARCHAR(20) 			        COMMENT '姓名',
amount		        DECIMAL(16,2) 			        COMMENT '金额',
status		        VARCHAR(50) 			        COMMENT '状态',
raw		            TEXT        			        COMMENT '原始消息',
payTime			    DATETIME 		                COMMENT '支付时间',
CONSTRAINT PK_pay_msg PRIMARY KEY(logID)
);
ALTER TABLE pay_msg COMMENT= '支付消息表';

-- ----------------------------------------------------------------
-- 商店表: shop
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
    `shopID`            INT AUTO_INCREMENT NOT NULL             COMMENT 'ID',
    sender              varchar(45)                             COMMENT '寄件人姓名',
    shopName            varchar(45)                             COMMENT '商店名称',
    shopTitle           varchar(45)                             COMMENT '商店标题',
    shopDescribe        varchar(100)                             COMMENT '商店描述',
    shopKeyWord         varchar(45)                             COMMENT '商店关键字',
    location            varchar(45)                             COMMENT '所在省市区',
    completeAddress     varchar(45)                             COMMENT '详细地址',
    serviceQQ           varchar(20)                             COMMENT '客服QQ',
    serviceEmail        varchar(45)                             COMMENT '邮件地址',
    serviceCall         varchar(20)                             COMMENT '客服电话',
    shopLogo            varchar(200)                             COMMENT '商店 Logo',
    wxImg               varchar(200)                             COMMENT '官方微信',
    status				CHAR(1) DEFAULT '0' NOT NULL	        COMMENT '状态(0=正常, C=失效)',
CONSTRAINT PK_shop PRIMARY KEY (`shopID`)
);
ALTER TABLE shop COMMENT= '商店表';

-- ----------------------------------------------------------------
-- 商品分类表: shop_goodsClass
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_goodsClass`;
CREATE TABLE `shop_goodsClass` (
    `goodsClassID`     INT AUTO_INCREMENT NOT NULL                    COMMENT 'ID',
    `parentId`         varchar(45)  NOT NULL                   COMMENT '父级ID',
    `name`             varchar(100)                             COMMENT '名称',
    `isLeaf`            tinyint DEFAULT 1                       COMMENT '是否为叶子节点',
    sortNo				INT DEFAULT 0 NOT NULL			        COMMENT '显示顺序',
    status				CHAR(1) DEFAULT '0' NOT NULL	        COMMENT '状态(0=正常, C=失效)',
    `delFlag`           tinyint(1)                              COMMENT '删除标记',
CONSTRAINT PK_shop_goodsClass PRIMARY KEY (`goodsClassID`)
);
ALTER TABLE shop_goodsClass COMMENT= '商品分类表';

-- ----------------------------------------------------------------
-- 商品表: shop_goods
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_goods`;
CREATE TABLE `shop_goods` (
  `goodsID`             INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
  `storeID`             INT                                 COMMENT '预留商城ID',
  `name`                varchar(255)                        COMMENT '商品名称',
  `title`               varchar(255)                        COMMENT '商品标题',
  `subTitle`            varchar(255)                        COMMENT '副标题',
  `goodsClassID`        varchar(45)                         COMMENT '商品分类',
  `goodsType`           CHAR(1) DEFAULT 'E' NOT NULL	    COMMENT '商品类型(E=实物, V=虚拟商品)',
  `imgurl`              varchar(255)                        COMMENT '商品主图',
  `price`               Decimal(18,2)                       COMMENT '销售价',
  `priceMarket`         Decimal(18,2)                       COMMENT '市场价',
  `stock`               int(32)                             COMMENT '库存',
  `note`                text                                COMMENT '商品详情',
  `prop`                text                                COMMENT '属性详情',
  `spec`                text                                COMMENT '规格详情',
  `param`               text                                COMMENT '参数详情',
  `hasSpec`             tinyint(1)                          COMMENT '启用规格',
  `unit`                varchar(25)                         COMMENT '计量单位',
  `upAt`                DATETIME                            COMMENT '上架时间',
  `downAt`              DATETIME                            COMMENT '下架时间',
  `numView`             int(32) DEFAULT '0'                 COMMENT '浏览量',
  `numComment`          int(32) DEFAULT '0'                 COMMENT '评论量',
  `numSale`             int(32) DEFAULT '0'                 COMMENT '销售量',
  `numSaleWeek`         int(32) DEFAULT '0'                 COMMENT '周销售量',
  sortNo				INT DEFAULT 0 NOT NULL			     COMMENT '显示顺序',
  `opBy`                varchar(32)                          COMMENT '操作人',
  `opAt`                DATETIME                             COMMENT '操作时间',
  `recommendFlag`       char(1) DEFAULT '0' NOT NULL      COMMENT '推荐标记(*,0:不推荐,1:推荐)',
  `goodsStatus`         char(1) DEFAULT '0' NOT NULL      COMMENT '商品状态(*,0:新建,D:下架,U:上架,C:删除)',
  CONSTRAINT PK_shop_goods PRIMARY KEY (`goodsID`)
);
ALTER TABLE shop_goods COMMENT= '商品表';
ALTER TABLE shop_goods AUTO_INCREMENT=10000000;
-- ----------------------------------------------------------------
-- 商品图片表: shop_goodsImages
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_goodsImages`;
CREATE TABLE `shop_goodsImages` (
  `id`                  INT AUTO_INCREMENT NOT NULL         COMMENT 'ID',
  `goodsID`             INT NOT NULL                        COMMENT '商品ID',
  `name`                varchar(45)                        COMMENT '名称',
  `imgurl`              varchar(255)                         COMMENT '图片地址',
  sortNo				INT DEFAULT 0 NOT NULL			     COMMENT '显示顺序',
  CONSTRAINT PK_shop_goodsImages PRIMARY KEY (`id`)
);
ALTER TABLE shop_goodsImages COMMENT= '商品图片表';

-- ----------------------------------------------------------------
-- 推荐商品: shop_hot_goods
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_hot_goods`;
CREATE TABLE `shop_hot_goods` (
  `goodsID`             INT NOT NULL                        COMMENT '商品ID',
  `imgurl`              varchar(255)                         COMMENT '商品图片',
  `name`                varchar(255)                        COMMENT '商品名称',
  sortNo				INT DEFAULT 0 NOT NULL			     COMMENT '显示顺序',
  CONSTRAINT PK_shop_hot_goods PRIMARY KEY (`goodsID`)
);
ALTER TABLE shop_hot_goods COMMENT= '推荐商品';

-- ----------------------------------------------------------------
-- 购物车: shop_cart
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart` (
  `id`                  INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
  `uid`                 INT NOT NULL                       COMMENT '会员ID',
  `goodsID`             INT NOT NULL                       COMMENT '商品ID',
  `goodsType`            CHAR(1) DEFAULT 'E' NOT NULL	    COMMENT '商品类型(E=实物, V=虚拟商品)',
   `name`                varchar(255)                        COMMENT '商品名称',
  `num`                 int(32) NOT NULL                   COMMENT '数量',
  `price`               Decimal(18,2)                       COMMENT '购买价',
  `imgurl`              varchar(255)                        COMMENT '商品图片',
  CONSTRAINT PK_shop_cart PRIMARY KEY (`id`)
);
ALTER TABLE shop_cart COMMENT= '购物车';

-- ----------------------------------------------------------------
-- 订单表: shop_order
-- 建立: inmyjs 20190101
-- billStatus，状态处理如下:
-- P=待付款, 表示等待客户付款, 如款只付了一部分为L。
-- S=正常完成，表示已付款。
-- C=中止, 在单据结束(S)前, 都可以人为中止, 中止时单据状态改为C=中止
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_order`;
CREATE TABLE `shop_order` (
    billNo				VARCHAR(45) NOT NULL			COMMENT '单据号',
    payCode				VARCHAR(10) NOT NULL			COMMENT '支付号',
    billDate			DATE  NOT NULL					COMMENT '单据日期',
    `uid`               INT   NOT NULL                  COMMENT '会员ID',
    username			VARCHAR(30) NOT NULL			COMMENT '用户名称',
    billAmount			DECIMAL(16,2) NOT NULL			COMMENT '总金额',
    prefAmount		    DECIMAL(16,2) NOT NULL			COMMENT '优惠金额',
    payableAmount		DECIMAL(16,2) NOT NULL			COMMENT '实付金额',
    paidAmount			DECIMAL(16,2) NOT NULL			COMMENT '已付金额',
    billStatus			CHAR(1) DEFAULT 'P' NOT NULL	COMMENT '状态(*, 见业务单据头说明)',
    note				TEXT							COMMENT '备注',
    createTime			DATETIME DEFAULT NOW()			COMMENT '记录建立时间',
    modifyTime			DATETIME DEFAULT NOW() ON UPDATE NOW()		COMMENT '最后修改时间',
  CONSTRAINT PK_shop_order PRIMARY KEY (`billNo`)
);
ALTER TABLE shop_order COMMENT= '订单表';
CREATE UNIQUE INDEX IDX_shop_order_billNo ON shop_order(billNo);
CREATE UNIQUE INDEX IDX_shop_order_payCode ON shop_order(payCode);
-- ----------------------------------------------------------------
-- 订单商品: shop_order_goods
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_order_goods`;
CREATE TABLE `shop_order_goods` (
  `id`                  INT AUTO_INCREMENT NOT NULL          COMMENT 'ID',
   billNo				VARCHAR(45) NOT NULL			      COMMENT '单据号',
  `goodsID`             INT NOT NULL                         COMMENT '商品ID',
  `name`                varchar(255)                        COMMENT '商品名称',
  `goodsType`            CHAR(1) DEFAULT 'E' NOT NULL	    COMMENT '商品类型(E=实物, V=虚拟商品)',
  `num`                 int(32) NOT NULL                     COMMENT '数量',
  `price`               Decimal(18,2)                        COMMENT '购买价',
  `imgurl`              varchar(255)                         COMMENT '商品图片',
  CONSTRAINT PK_shop_order_goods PRIMARY KEY (`id`)
);
ALTER TABLE shop_order_goods COMMENT= '订单商品';

-- ----------------------------------------------------------------
-- 订单表: shop_payment
-- 建立: inmyjs 20190101
-- billStatus，状态处理如下:
-- P=待付款, 表示等待客户付款, 如款已付或者暂时不需要付款(此状态由财务人员审)则状态改为B。
-- S=正常完成，表示已付款。
-- C=中止, 在单据结束(S)前, 都可以人为中止, 中止时单据状态改为C=中止
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_payment`;
CREATE TABLE `shop_payment` (
`id`                  INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
    billNo				VARCHAR(45) NOT NULL			COMMENT '单据号',
    payType			    CHAR(1) DEFAULT '0' NOT NULL	COMMENT '支付类型(*,0=正常, A=后台确认)',
    opBy                VARCHAR(30)                     COMMENT '操作者',
    payCode				VARCHAR(10) NOT NULL			COMMENT '支付号',
    payDate			    DATE  NOT NULL					COMMENT '支付日期',
    `uid`               INT   NOT NULL                  COMMENT '会员ID',
    paidAmount			DECIMAL(16,2) NOT NULL			COMMENT '已付金额',
    billStatus			CHAR(1) DEFAULT 'P' NOT NULL	COMMENT '状态(*, 见业务单据头说明)',
    note				TEXT							COMMENT '备注',
    createTime			DATETIME DEFAULT NOW()			COMMENT '记录建立时间',
  CONSTRAINT PK_shop_payment PRIMARY KEY (`id`)
);
ALTER TABLE shop_payment COMMENT= '订单支付表';

-- ----------------------------------------------------------------
-- 用户商品: shop_user_goods
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_user_goods`;
CREATE TABLE `shop_user_goods` (
  `id`                  INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
  `uid`                 INT   NOT NULL                     COMMENT '会员ID',
  `goodsID`             INT   NOT NULL                     COMMENT '商品ID',
  `name`                varchar(255)                        COMMENT '商品名称',
  `goodsType`            CHAR(1) DEFAULT 'E' NOT NULL	    COMMENT '商品类型(E=实物, V=虚拟商品)',
  `num`                 int(32)  NOT NULL                   COMMENT '数量',
  `price`               Decimal(18,2)                       COMMENT '购买价',
  `imgurl`              varchar(255)                        COMMENT '商品图片',
   payTime			    DATETIME DEFAULT NOW()			    COMMENT '购买时间',
  CONSTRAINT PK_shop_user_goods PRIMARY KEY (`id`)
);
ALTER TABLE shop_user_goods COMMENT= '用户商品';

-- ----------------------------------------------------------------
-- 收藏夹: shop_user_wishlist
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `shop_user_wishlist`;
CREATE TABLE `shop_user_wishlist` (
  `id`                  INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
  `uid`                 INT   NOT NULL                     COMMENT '会员ID',
  `goodsID`             INT   NOT NULL                     COMMENT '商品ID',
  `name`                varchar(255)                       COMMENT '商品名称',
  `goodsType`            CHAR(1) DEFAULT 'E' NOT NULL	    COMMENT '商品类型(E=实物, V=虚拟商品)',
  `price`               Decimal(18,2)                       COMMENT '购买价',
  `imgurl`              varchar(255)                        COMMENT '商品图片',
   createTime			DATETIME DEFAULT NOW()			    COMMENT '创建时间',
  CONSTRAINT PK_shop_user_wishlist PRIMARY KEY (`id`)
);
ALTER TABLE shop_user_wishlist COMMENT= '收藏夹';

-- ----------------------------------------------------------------
-- 访客留言: guest_message
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `guest_message`;
CREATE TABLE `guest_message` (
  `id`                  INT AUTO_INCREMENT NOT NULL         COMMENT 'ID',
  `uid`                 INT                                 COMMENT '会员ID',
  `name`                varchar(20)NOT NULL                 COMMENT '姓名',
  `tell`               varchar(30) NOT NULL                COMMENT 'tell',
  `title`               varchar(100)NOT NULL   	            COMMENT '主题',
  `content`             TEXT                                COMMENT '内容',
  `reply`               TEXT                                COMMENT '回复',
   `status`            CHAR(1) DEFAULT '0' NOT NULL	        COMMENT '状态(0=新建, S=已完结)',
   createTime			DATETIME DEFAULT NOW()			    COMMENT '创建时间',
  CONSTRAINT PK_guest_message PRIMARY KEY (`id`)
);
ALTER TABLE guest_message COMMENT= '访客留言';

-- ----------------------------------------------------------------
-- 日报表: report_day
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `report_day`;
CREATE TABLE `report_day` (
  `id`                  INT AUTO_INCREMENT NOT NULL         COMMENT 'ID',
  `reportDate`			 DATE  NOT NULL					    COMMENT '日期',
  `reportType`           varchar(20)  NOT NULL	            COMMENT '报表类型',
   `data`               varchar(20) NOT NULL                COMMENT '数据',
  CONSTRAINT PK_report_day PRIMARY KEY (`id`)
);
ALTER TABLE report_day COMMENT= '日报表';

-- ----------------------------------------------------------------
-- 博客分类表: blog_class
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `blog_class`;
CREATE TABLE `blog_class` (
    `blogClassID`      INT AUTO_INCREMENT NOT NULL              COMMENT 'ID',
    `blogType`         CHAR(1) DEFAULT '0' NOT NULL	            COMMENT '类型(D=定制, A=API)',
    `parentId`         varchar(45)  NOT NULL                    COMMENT '父级ID',
    `name`             varchar(100)                             COMMENT '名称',
    `isLeaf`            tinyint   DEFAULT 1                     COMMENT '是否为叶子节点',
    sortNo				INT DEFAULT 0 NOT NULL			        COMMENT '显示顺序',
    status				CHAR(1) DEFAULT '0' NOT NULL	        COMMENT '状态(0=正常, C=失效)',
CONSTRAINT PK_blog_class PRIMARY KEY (`blogClassID`)
);
ALTER TABLE blog_class COMMENT= '博客分类表';

-- ----------------------------------------------------------------
-- 博客文章: blog
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `blogID`               INT AUTO_INCREMENT NOT NULL        COMMENT 'ID',
  `blogClassID`          INT                                COMMENT '分类ID',
  `title`                varchar(20)NOT NULL                COMMENT '标题',
  `subTitle`            varchar(255)                        COMMENT '副标题',
  `about`                varchar(100)NOT NULL               COMMENT '简介',
  `coverImg`             varchar(100)NOT NULL   	        COMMENT '封面',
  `content`              TEXT                               COMMENT '内容',
   `status`              CHAR(1) DEFAULT '0' NOT NULL	    COMMENT '状态(0=正常, C=失效)',
   createTime			 DATETIME DEFAULT NOW()			    COMMENT '创建时间',
  CONSTRAINT PK_blog PRIMARY KEY (`blogID`)
);
ALTER TABLE blog COMMENT= '博客';

-- ----------------------------------------------------------------
-- 专题: subject
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `subjectID`            INT AUTO_INCREMENT NOT NULL         COMMENT 'ID',
  `title`                varchar(100)NOT NULL                 COMMENT '标题',
  `subTitle`            varchar(255)                        COMMENT '副标题',
  `about`                varchar(100)                        COMMENT '简介',
  `coverImg`             varchar(100)NOT NULL   	         COMMENT '封面',
  `content`              TEXT                                COMMENT '内容',
  `recommendFlag`        char(1) DEFAULT '0' NOT NULL        COMMENT '推荐标记(*,0:不推荐,1:推荐)',
   `status`              CHAR(1) DEFAULT '0' NOT NULL	     COMMENT '状态(0=正常, C=失效)',
   createTime			 DATETIME DEFAULT NOW()			     COMMENT '创建时间',
  CONSTRAINT PK_subject PRIMARY KEY (`subjectID`)
);
ALTER TABLE subject COMMENT= '专题';

-- ----------------------------------------------------------------
-- 专题关联产品: subject_goods
-- 建立: inmyjs 20190101
-- ----------------------------------------------------------------
DROP TABLE IF EXISTS `subject_goods`;
CREATE TABLE `subject_goods` (
  `logID`                INT AUTO_INCREMENT NOT NULL         COMMENT 'ID',
  `subjectID`            INT  NOT NULL                       COMMENT '专题ID',
  `goodsID`              INT   NOT NULL                      COMMENT '商品ID',

  CONSTRAINT PK_subject_goods PRIMARY KEY (`logID`)
);
ALTER TABLE subject_goods COMMENT= '专题关联产品';



