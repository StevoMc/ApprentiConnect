// Report Model
type ReportType = {
  id: number;
  title: string;
  content: string[];
  published: boolean;
  authorId?: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

// Account Model
type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

// Session Model
type Session = {
  id: string;
  sessionToken?: string;
  userId?: string;
  expires?: Date;
  accessToken?: string;
  createdAt: Date;
  updatedAt?: Date;
  user?: User;
};

// User Model
type User = {
  id: string;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  username?: string | null;
  emailVerified?: Date | null;
  password?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  accounts?: Account[];
  reports?: ReportType[];
  sessions?: Session[];
};

// VerificationToken Model
type VerificationToken = {
  identifier?: string;
  token?: string;
  expires?: Date;
};
