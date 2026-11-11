export type Community = {
  id: string;
  city: string;
  country: string;
  region: string;
  label: string;
  tagline: string;
  website: string;
  color: string;
};
export type EventKind = 'meetup' | 'community-day' | 'workshop';
export type CommunityEvent = {
  id: string;
  communityId: string;
  kind: EventKind;
  title: string;
  summary: string;
  dateISO: string | null;
  dateLabel: string;
  venue: string;
  venueNote?: string;
  registrationUrl: string | null;
  demo?: boolean;
};
export type PublicFeed = { version: 1; updatedAt: string; communities: Community[]; events: CommunityEvent[] };
export type Profile = { name: string; role: string; email: string; website: string; interests: string };
export const defaultProfile: Profile = { name: '', role: '', email: '', website: '', interests: 'Serverless, AI, Platform Engineering' };
