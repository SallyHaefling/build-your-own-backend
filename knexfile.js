module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bikes',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
  //postgres://shawomehknjmmq:89f5e03252db3b82b01ac9192497ae87ae9853f927354bcd9caaf9eb31be6ceb@ec2-107-22-211-248.compute-1.amazonaws.com:5432/d94cc7du1b82s9
};
