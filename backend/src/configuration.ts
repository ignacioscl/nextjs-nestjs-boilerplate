export default () => ({
  port: parseInt(process.env.PORT!, 10) ?? 8100,
  nodeEnv: process.env.NODE_ENV,
  initAdmin: process.env.INIT_ADMIN,
  initAdminPassword: process.env.INIT_ADMIN_PASSWORD,
})
