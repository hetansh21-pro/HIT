export interface QuestionItem {
  id: string;
  number: number;
  question: string;
  icon: 'building' | 'gear' | 'lightning' | 'brain' | 'clock' | 'rocket';
  subtitle: string;
  handwrittenNote?: string;
  componentType: 'what_hit_does' | 'services_provided' | 'how_automation_helps' | 'custom_solutions' | 'pricing_cost' | 'how_to_start';
}

export const QUICK_QUESTIONS: QuestionItem[] = [
  {
    id: 'what-hit-does',
    number: 1,
    question: 'What does HIT do?',
    icon: 'building',
    subtitle: 'Our Core Promise & Purpose',
    handwrittenNote: 'Here is how HIT solves real problems for your business',
    componentType: 'what_hit_does',
  },
  {
    id: 'services-provided',
    number: 2,
    question: 'Which services do you provide?',
    icon: 'gear',
    subtitle: 'The 3-Pillar Implementation Stack',
    handwrittenNote: 'Tap through our 3-pillar execution stack below',
    componentType: 'services_provided',
  },
  {
    id: 'how-automation-helps',
    number: 3,
    question: 'How does automation help?',
    icon: 'lightning',
    subtitle: 'Hours Saved & Real-Time WhatsApp Simulators',
    handwrittenNote: 'Test the live WhatsApp quote simulator below',
    componentType: 'how_automation_helps',
  },
  {
    id: 'custom-solutions',
    number: 4,
    question: 'Can you create a custom solution?',
    icon: 'brain',
    subtitle: 'How We Build AI for Your Exact Workflow',
    handwrittenNote: 'See how we build AI around your existing daily habits',
    componentType: 'custom_solutions',
  },
  {
    id: 'pricing-cost',
    number: 5,
    question: 'How much does it cost?',
    icon: 'clock',
    subtitle: 'Clear 3-Tier Pricing & Wage Loss Calculator',
    handwrittenNote: 'Check transparent rates & test the live calculator below',
    componentType: 'pricing_cost',
  },
  {
    id: 'how-to-start',
    number: 6,
    question: 'How can I get started?',
    icon: 'rocket',
    subtitle: '1-Day Audit Booking & WhatsApp Direct Line',
    handwrittenNote: 'Book your 1-day audit or message us directly below',
    componentType: 'how_to_start',
  },
];
