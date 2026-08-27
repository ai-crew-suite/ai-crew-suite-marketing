export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  link: string;
  buttonLabel: string;
  buttonVariant: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  isPopular: boolean;
}

export interface PricingComponentContent {
  title: string;
  description: string;
  annualDiscount: number;
  plans: PricingPlan[];
}