const seed = require('./helpers/seed');

(async () => {
    await seed();
    process.exit();
})()
