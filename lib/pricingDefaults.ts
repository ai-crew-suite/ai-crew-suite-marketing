import type { PricingComponentContent } from './pricingTypes';

export const defaultPricingComponentContent: PricingComponentContent = {
  title: 'Choose the deployment model that fits your Backstage instance',
  description:
    'Start with open source plugins, move to a hosted workflow later, or keep the whole pipeline in your own infrastructure from day one.',
  annualDiscount: 20,
  plans: [
    {
      name: 'Open Source',
      monthlyPrice: 0,
      description:
        'For teams that want full control and are happy to run the stack themselves.',
      features: ['Unlimited projects', 'Community support', 'All eighteen plugins'],
      link: 'https://github.com/your-org/ai-crew-suite',
      buttonLabel: 'Start self-hosting',
      buttonVariant: 'outline',
      isPopular: false,
    },
    {
      name: 'Team',
      monthlyPrice: 399,
      description:
        'Managed plan with additional collaboration features and priority support.',
      features: ['Managed upgrades', 'Email & chat support', 'Team workspace', 'Plugin marketplace access'],
      link: '/signup',
      buttonLabel: 'Join waitlist',
      buttonVariant: 'default',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 1499,
      description:
        'Private deployment, custom plugins, and security review for larger organizations.',
      features: ['SLA-backed support', 'Custom plugin development', 'Dedicated infrastructure', 'Compliance reporting'],
      link: '/signup',
      buttonLabel: 'Contact Sales',
      buttonVariant: 'outline',
      isPopular: false,
    },
  ],
};