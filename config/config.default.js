/**
 *  默认配置
 * @type
 */
module.exports = {
    keys : 'Ap38dk30sS3l',
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
    session: {
        renew: true,
        maxAge: 7*24 * 3600 * 1000, // 7 天
    },
    lru : {
        client: {
            // all lru cache config available here
            max: 1000,
            maxAge: 1000 * 60 * 60*24, // 1 天
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    },
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    middleware: ['closeHandler','saveSession','errorHandler'],
    email: {
        service: 'QQ',
        user: 'xxxxxxxxx@qq.com',
        pass: 'xxxxxxxxxxxxxxxxx',
    }
};
