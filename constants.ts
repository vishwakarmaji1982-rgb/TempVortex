
export const AVAILABLE_DOMAINS = [
  'vortexmail.com',
  'tempvortex.io',
  'swiftinbox.net',
  'cloudymail.xyz',
  'ghostbox.cc'
];

export const MOCK_EMAILS = [
  {
    id: '1',
    from: 'support@github.com',
    subject: 'Confirm your account registration',
    content: 'Thank you for signing up! Please click the link below to verify your email address and start coding. Your temporary access code is 552193.',
    timestamp: new Date(),
    isRead: false
  },
  {
    id: '2',
    from: 'newsletter@techcrunch.com',
    subject: 'Daily Tech Roundup',
    content: 'AI is taking over the world. Today we discuss how LLMs like Gemini are revolutionizing temporary email services by providing summaries and security audits...',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isRead: false
  },
  {
    id: '3',
    from: 'no-reply@amazon.com',
    subject: 'Your Order #123-4567-890 has shipped',
    content: 'Good news! Your package is on its way. Track your delivery of "Mechanical Keyboard" using the button below. Expected arrival: Friday.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Why Temporary Emails are Your Best Defense Against Data Breaches',
    excerpt: 'In an age of constant leaks, learn how a buffer email can save your primary digital identity.',
    author: 'Vortex Security',
    date: 'Oct 24, 2023',
    readTime: '5 min',
    category: 'Security'
  },
  {
    id: 'blog-2',
    title: '10 Sites That Spam You the Most (And How to Avoid Them)',
    excerpt: 'We analyzed 1,000 signups to find the biggest inbox offenders in the industry.',
    author: 'Privacy Pro',
    date: 'Nov 02, 2023',
    readTime: '8 min',
    category: 'Privacy'
  },
  {
    id: 'blog-3',
    title: 'The Future of AI in Email Management',
    excerpt: 'How LLMs are being used to detect phishing before you even open the message.',
    author: 'Tech Guru',
    date: 'Nov 12, 2023',
    readTime: '6 min',
    category: 'AI'
  }
];
