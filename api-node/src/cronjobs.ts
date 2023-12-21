import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// const cron = require("node-cron");
// const { capture } = require("./third-parties/sentry.js");

// const { notificationsCronJob, scheduleNotificationsInactivity5DaysCronJob } = require("./notifications");
// const { reminderCronJob } = require("./controllers/reminder");

// cron.schedule("* * * * *", async () => {
//   // every minute
//   await launchCronJob("notifications", notificationsCronJob);
//   launchCronJob("reminder", reminderCronJob);
// });

// cron.schedule("* * * * *", async () => {
//   // every minute
//   await launchCronJob("test", async () => {
//     console.log("test cron job " + new Date());
//   });
// });

// cron.schedule("0 0 4 * * * *", async () => {
//   // every day at 4 am, find users with lastConsoAdded = 4 days ago and create a notification for tomorrow (6th day)
//   launchCronJob("schedule notifications 5 days inactivity", scheduleNotificationsInactivity5DaysCronJob);
// });

// const launchCronJob = async (name, job) => {
//   try {
//     job();
//   } catch (e) {
//     capture(e, { level: "error", extra: { name } });
//   }
// };
