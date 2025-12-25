
export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  aiSummary?: string;
}

export interface UserEmail {
  address: string;
  domain: string;
  createdAt: Date;
}

export type AppView = 'inbox' | 'home';
