'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, Shield, Zap, BarChart3, Wifi, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_BENEFITS = {
  title: 'Revolutionary AI-Driven Hydroponic Control',
  subtitle:
    'Transform your greenhouse operations with autonomous climate and fertigation management powered by advanced AI algorithms and real-time sensor integration.',
  ctaText: 'Request Demo',
  ctaHref: '/demo',
  benefits: [
    {
      icon: 'Cpu',
      title: 'Autonomous AI Control',
      description:
        'Advanced machine learning algorithms continuously optimize growing conditions based on real-time sensor data and historical performance patterns.',
      metrics: ['99.2% uptime', '35% yield increase', 'Real-time decisions'],
    },
    {
      icon: 'Shield',
      title: 'Multi-Layer Safety Systems',
      description:
        'Comprehensive safety guardrails with PLC-based interlocks, emergency protocols, and fail-safe mechanisms to protect crops and equipment.',
      metrics: ['Zero crop loss', '24/7 monitoring', 'Instant alerts'],
    },
    {
      icon: 'Zap',
      title: 'Precision Fertigation',
      description:
        'Intelligent dosing system with 4-channel nutrient delivery, pH/EC optimization, and adaptive feeding schedules based on plant growth stages.',
      metrics: ['±0.1 pH accuracy', '40% nutrient savings', 'Automated mixing'],
    },
    {
      icon: 'BarChart3',
      title: 'Predictive Analytics',
      description:
        'Machine learning models predict optimal harvest timing, disease prevention, and resource allocation using computer vision and environmental data.',
      metrics: ['95% accuracy', 'Early detection', 'Yield forecasting'],
    },
    {
      icon: 'Wifi',
      title: '4G Cloud Connectivity',
      description:
        'Secure MQTT communication over 4G networks enables remote monitoring, over-the-air updates, and seamless data synchronization.',
      metrics: ['Global access', 'TLS encryption', 'Offline backup'],
    },
    {
      icon: 'Leaf',
      title: 'Sustainable Operations',
      description:
        'Optimize resource consumption with intelligent water recycling, energy-efficient climate control, and minimal chemical usage.',
      metrics: ['60% water savings', '45% energy reduction', 'Organic certified'],
    },
  ],
} as const;

type BenefitsProps = Partial<typeof DEFAULT_BENEFITS>;

export default function Benefits(props: BenefitsProps) {
  const config = { ...DEFAULT_BENEFITS, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Cpu: Cpu,
      Shield: Shield,
      Zap: Zap,
      BarChart3: BarChart3,
      Wifi: Wifi,
      Leaf: Leaf,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="benefits" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {config.benefits.map((benefit, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className="bg-primary text-primary-foreground p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(benefit.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`benefits[${idx}].title`}>{benefit.title}</span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <span data-editable={`benefits[${idx}].description`}>{benefit.description}</span>
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  {benefit.metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">
                        <span data-editable={`benefits[${idx}].metrics[${metricIdx}]`}>
                          {metric}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Greenhouse?</h3>
            <p className="text-primary-foreground/90 mb-6">
              Experience the future of hydroponic farming with our AI-driven control system.
            </p>
            <Button
              onClick={handleCTAClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-background text-foreground hover:bg-background/90 font-semibold px-8 py-3"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
