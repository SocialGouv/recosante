import dotenv from 'dotenv';
dotenv.config();
import BrevoApi from './brevo-api.js';

/*
Remove campaigns sent before YYYY-MM-DD
https://developers.brevo.com/reference/getemailcampaigns-1
*/
// const campaignsResponse = await BrevoApi.get({
//   path: "/emailCampaigns",
//   query: {
//     type: "classic",
//     status: "sent",
//     startDate: new Date("2021-11-01T00:00:00+00:00").toISOString(),
//     endDate: new Date("2023-11-01T00:00:00+00:00").toISOString(),
//     limit: 50,
//     offset: 0,
//     excludeHtmlContent: true,
//     statistics: "campaignStats",
//   },
// });

// console.log(campaignsResponse);

// const campaigns = campaignsResponse.campaigns.map((camp) => ({
//   id: camp.id,
//   status: camp.status,
//   createdAt: camp.createdAt,
//   sentDate: camp.sentDate,
// }));

// console.log(
//   campaignsResponse.count
//   // JSON.stringify(
//   //   campaignsResponse.campaigns.map((camp) => ({
//   //     id: camp.id,
//   //     status: camp.status,
//   //     createdAt: camp.createdAt,
//   //     sentDate: camp.sentDate,
//   //   })),
//   //   null,
//   //   2
//   // )
// );

/*

https://developers.brevo.com/reference/updatecampaignstatus

*/

// TIP ids are in the form 9967, 9966, etc.
// So we don'tneed to fetch the campaigns abov

// for (let i = 7791; i > 0; i--) {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const result = await BrevoApi.put({
//     path: `/emailCampaigns/${i}/status`,
//     body: { status: 'archive' },
//   });
//   if (result === 429) break;
//   console.log(i, result);
// }

const listIds = [];

/*

https://developers.brevo.com/reference/deletelist-1

max 300 lists,

*/

for (const constactListId of listIds) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = await BrevoApi.remove({
    path: `/contacts/lists/${constactListId}`,
  });
  console.log(constactListId, result);
}
