import type { PublicFeed } from '../types/models';

// Intentionally NOT live information. Replace via EXPO_PUBLIC_COMMUNITY_FEED_URL.
// Event dates and registration URLs are withheld until organizers publish real details.
export const sampleFeed: PublicFeed = {
  version: 1,
  updatedAt: '2026-11-07',
  communities: [
    {id:'vancouver',city:'Vancouver',country:'Canada',region:'British Columbia',label:'AWS Vancouver',tagline:'Learn, connect and build with local AWS enthusiasts.',website:'https://vancouver.awsday.ca',color:'#BDEAF7'},
    {id:'toronto',city:'Toronto',country:'Canada',region:'Ontario',label:'AWS Toronto',tagline:'A growing community of builders across the GTA.',website:'https://toronto.awsday.ca',color:'#FFE1D0'},
    {id:'victoria',city:'Victoria',country:'Canada',region:'British Columbia',label:'AWS Victoria',tagline:'Island builders sharing ideas and helping each other.',website:'https://victoria.awsday.ca',color:'#E2EDBF'}
  ],
  events: [
    {id:'van-monthly',communityId:'vancouver',kind:'meetup',title:'AWS Vancouver monthly meetup',summary:'Talks, conversations, and new connections with the Vancouver AWS community.',dateISO:null,dateLabel:'Next date to be announced',venue:'Vancouver, BC',registrationUrl:null,demo:true},
    {id:'van-day',communityId:'vancouver',kind:'community-day',title:'AWS Community Day Vancouver',summary:'A day of learning and community, organized by local builders.',dateISO:null,dateLabel:'Date to be announced',venue:'Vancouver, BC',registrationUrl:null,demo:true},
    {id:'tor-monthly',communityId:'toronto',kind:'meetup',title:'AWS Toronto monthly meetup',summary:'Join AWS builders for talks and networking in Toronto.',dateISO:null,dateLabel:'Next date to be announced',venue:'Toronto, ON',registrationUrl:null,demo:true},
    {id:'tor-day',communityId:'toronto',kind:'community-day',title:'AWS Community Day Toronto',summary:'Community learning and technical talks from Toronto builders.',dateISO:null,dateLabel:'Date to be announced',venue:'Toronto, ON',registrationUrl:null,demo:true},
    {id:'vic-monthly',communityId:'victoria',kind:'meetup',title:'AWS Victoria monthly meetup',summary:'Connect with cloud builders and explore new ideas together.',dateISO:null,dateLabel:'Next date to be announced',venue:'Victoria, BC',registrationUrl:null,demo:true},
    {id:'vic-day',communityId:'victoria',kind:'community-day',title:'AWS Community Day Victoria',summary:'Community-run technical conference for Victoria and Vancouver Island.',dateISO:null,dateLabel:'Date to be announced',venue:'Victoria, BC',registrationUrl:null,demo:true}
  ]
};
