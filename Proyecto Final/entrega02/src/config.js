export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: { //Cambiar por la config personal
        "type": "service_account",
        "project_id": "apcoderhouse32065-ce3a9",
        "private_key_id": "1cf18d18b6ef9f5c9047a226436d4d9ca6badefb",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC805vaAnZ8NJkr\nDoLhNoEfQ8zaXdrOXFUYIohQ3mn5YKy9nfZwg0lSXZi2RoleeuoEnyGLJCJBgZmq\n3OU3xayjUUaWRhd2zyktxMivPWGHVwxEk90Nf+Vq9/8aD/cGv8DKH+pGR6yTq5Tm\n87m0ZMggPR23GSXnADe/9K/DYhmGYr03Ms7rRDJXY5DBoikheqlhNC8l6aPxJ0dd\nQhgzZIWhi1pbvxniLhVO29AQ3H1iHBcfhoEysmQrdhk/26LpqRLTw5KzbxnwttMF\njFOwjL1Z50d8symu6Qie3zjHkDCjWmbp/5ViiUv1C0mfnygRG/fIHeB43tRLST17\nebXd7XNRAgMBAAECggEAHv8FiGX7GSxxMDYzmdCepYk1qWrariFN/qY8hjncX4lV\nEdNKTvHeKV0f4lv11MKMg7GziemmjeY+WWPlZKBYVH7U/XoIBALBmbfB0bJbviG1\n69Px53NlL4gCIj8Yp8z2Uremd17wn1T9HmRHyar5hwFBTXsdU6wfeq0p5QLHed2X\nPuhUIUnQkJLlvtcOzU3HZbT8wgtrgUGRAggIab/jUKfyeM0NzYM1eNjPpNKkihmJ\nKdtkb/SN4bBP459BIB2OxJO9h4mhxsSrRY/WAnVvrTM/SJ+vuda1iGlZVyq9/1xx\nZABt3WmeMXf7PquVFqm7xtdN0SPlY5BeC/3d19DEOQKBgQDlRP3WiyqMYkePCCqn\nv3RNrDwn9P6mAwA683+P8b5jube6diro0QFIJS/WnpU9+QfrF7Pa8v/Cr2WhR5/a\nFa6521llXwwhL8zpphgkplKDVdT/F8jY9z3Sd8n3lhuYXxQekanAS/DsMxPrYn1U\n7Ama61qeMfdDpqCnEve8tMd66wKBgQDS14SFKcA5uQ97eOmLp379DsRIs44aIvRn\nXzeZZRkjXjTspUruta2cYRAMuuXLH9UIx2q/fQVZtZlazApdnf3lXXEHIUrPn8db\nx5uBXjGb8jPGwV1KWfLmmVTkR8Y8XPbtk1qwotzSSXU7t/8KWKR2EpyZH2jceIvN\np5HfhBVDswKBgQC3psEy531owJ0TrPYGM22lfm8djrmhH8xCbKTlGD9rQOw0l82d\nezZspSUh5RwlbWNzZSQ0IezP9ZISU/5vQmkZBeUhN7bOqqyZCOxUB0sXW1zoDhRc\nAAjsm/oTspFeR+Mk7Yetuuc9PVkad2Vv7jdvelG3YMzxyvrrel0qMyGLiwKBgQCj\nZ7SlH76C/hIpt4QJYD7jEVa+oao4R27zzq/giqH470JFRbXVW6i50eAGfbMqwfjx\nXNw2nEZRSJUZ8Zj3BUOJR+oZhIvebg6r6v9yO/Zmzkeieqo6vYurfJp2ccoJbmNR\nrSpUS2So9ZWOOwPGmPydJb+ITPeQJzzynjRH7q4sUQKBgHbJz0Ing8Q0BeRd9LbC\njBY1cTlTUO15Yehzrf1Tn9dgJT2gUmzES7t8aG+PQLcu/Q2EtwWJPsWDlsOzqd6d\nyqzT2xUX4S1CTx5klPP95MIeT14PeLlN6GHBvqiAD0kMJG3LPtkoSMBX9rVY5Sd7\nPC3ID6mNrM0YvtO5vdfRxZ8r\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-bvreb@apcoderhouse32065-ce3a9.iam.gserviceaccount.com",
        "client_id": "117846046961502076803",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bvreb%40apcoderhouse32065-ce3a9.iam.gserviceaccount.com"
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    }
}
