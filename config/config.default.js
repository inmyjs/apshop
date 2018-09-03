/**
 *  默认配置
 * @type
 */
module.exports = {
    keys: "AP6kls362",
    payKeys: "appay2018",
    server: "http://localhost:7001",
    payServer: "http://localhost:8018",
    viewTemplate:'red',
    baseDir:__dirname+'',
    private_key:"-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICWwIBAAKBgGCG1hRBi7GOWftJF5sHc4at+IVxZUf/mjB2pPS3JCgi3GJn9hbp\n" +
    "GdwV08TlSAK0o55gHLfTKEShunEtqZ7i6zrIF714qntmSmXOFWHzmQqHaRGpown/\n" +
    "5hsjQ4VsLTykYAxaImqNKBxyQ92tCPxRLmnTAunLK29Es5n4bayCITQzAgMBAAEC\n" +
    "gYApuqDZ6OwnOk8UHykhUDtVQehqZ/dNBOb3hJMTaAktgMSdliwBA4y2ZIlEWYqk\n" +
    "AMurMAm6PoLuCKy9OOxXT+o42sdXlPWWFyc2xKZ3JodijIsKPOctx9ZG30YUZ/Qq\n" +
    "QoUfG8ChYo4rCcDViFAVuLEGxBxrwz7BSlANAgnSD2C94QJBAKwMxBzjLlgw+7oD\n" +
    "2i5VUtWJJm9ngajj9WM18Tb9GVdWCvDAlk1GHAeKvF3HeBN82JlUpg2PhaGPvGXJ\n" +
    "OmUV7s0CQQCPoEJKx+NLWYO0dZyds4iscFtX215HSSTL5jjkedAvJ45ApseI2/zN\n" +
    "pbpUAx2WlIypOZi3MGH7wBTHvzDK3a7/AkAVbAF/F0pN8Mtm/dPMsRL/Q3Rlqp2a\n" +
    "Scfj8nN2RU1CcpQqJdCRDomu5rdNdeidhI3ziXajeZtJ4nuysLt0mqaBAkAG9mTg\n" +
    "TSpWl8NLtzvdZTul6Fh1PNwoJoKTI9j0MneGIavCtJMNrmRl77fFpNUFXLQo6/Lc\n" +
    "RospchlPyZPq8a4vAkEAlwH0XMPiehpZ9JKZ07uY2Z/PjPjvOoqC8Xi/bDyBUZEH\n" +
    "G1+cJ4nKdeNgl5/h+meIobLoBjljvcbHKV2bwhQ6KQ==\n" +
    "-----END RSA PRIVATE KEY-----",
    view: {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    },
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    middleware: ['isLoginUser','saveSession','errorHandler'],
    isLoginUser: {
        match: '/user',
    },
    errorHandler: {
        match: '/api',
    },
    security: {
        domainWhiteList: ['http://localhost:9527'],
        csrf: {
            ignore: /\/api|\/admin/,
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
            cookieName: 'ctoken', // Cookie 中的字段名，默认为 csrfToken
            sessionName: 'ctoken', // Session 中的字段名，默认为 csrfToken
        }
    },
    email: {
        service: 'QQ',
        user: '573391755@qq.com',
        pass: 'etpwhpnxtmfybebe',
    }
};