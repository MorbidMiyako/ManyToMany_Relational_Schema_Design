module.exports = {
    jwtSecret: process.env.JWT_SECRET || `Agoodsoldierneverstealsseccrets`,
    PORT: process.env.PORT || 5503,
    env: process.env.DB_ENV || "development"
  };
  