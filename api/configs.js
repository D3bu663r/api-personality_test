const configs = {
    production: {
        database_connection: 'mongodb://root:root@cluster0-shard-00-00-imp7h.mongodb.net:27017,cluster0-shard-00-01-imp7h.mongodb.net:27017,cluster0-shard-00-02-imp7h.mongodb.net:27017/personality_test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
        secret_key: 'cHJvZHVjdGlvbg=='
    },
    default: {
        database_connection: 'mongodb://root:root@cluster0-shard-00-00-imp7h.mongodb.net:27017,cluster0-shard-00-01-imp7h.mongodb.net:27017,cluster0-shard-00-02-imp7h.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
        secret_key: 'dGVzdA=='
    }
}

module.exports = configs[process.env.CONFIGS] || configs.default;