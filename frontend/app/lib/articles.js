export const articles = [
  { slug: 'separation-anxiety-dogs', title: 'Understanding Separation Anxiety in Dogs', category: 'Anxiety', description: 'Learn common signs, triggers, and gentle ways to support a dog who struggles when left alone.', readingTime: 6, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80' },
  { slug: 'signs-of-stress-pets', title: 'Recognizing Signs of Stress in Pets', category: 'Behavior', description: 'Subtle body language cues that may indicate your pet is feeling overwhelmed.', readingTime: 5, image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80' },
  { slug: 'safe-space-dog', title: 'Creating a Safe Space for Your Dog', category: 'Environment', description: 'How to design a calm, secure area your dog can retreat to.', readingTime: 4, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80' },
  { slug: 'loud-noises-dogs', title: 'Helping Dogs Cope With Loud Noises', category: 'Anxiety', description: 'Practical strategies for fireworks, thunderstorms, and other startling sounds.', readingTime: 6, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80' },
  { slug: 'healthy-daily-routine', title: 'Building a Healthy Daily Routine', category: 'Care', description: 'Consistent schedules that support emotional balance and good behavior.', readingTime: 5, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80' },
  { slug: 'positive-reinforcement', title: 'Positive Reinforcement for Better Behavior', category: 'Training', description: 'Reward-based training principles that build trust and confidence.', readingTime: 7, image: 'https://images.unsplash.com/photo-1537151622738-702f1f655d46?w=800&q=80' },
  { slug: 'mental-stimulation-enrichment', title: 'Mental Stimulation and Enrichment for Dogs', category: 'Care', description: 'Activities that engage the mind and reduce boredom-related stress.', readingTime: 6, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80' },
  { slug: 'senior-pets-emotional-wellbeing', title: "Supporting Senior Pets' Emotional Well-being", category: 'Senior', description: 'Gentle care approaches for aging companions.', readingTime: 5, image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80' },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const categories = [...new Set(articles.map((a) => a.category))];
