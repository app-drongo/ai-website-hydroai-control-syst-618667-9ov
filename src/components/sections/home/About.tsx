'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, Shield, BarChart3, Leaf, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_ABOUT = {
  title: 'AI-Driven Hydroponic Control Systems',
  subtitle: 'Revolutionizing Agriculture Through Autonomous Intelligence',
  description:
    'Our cutting-edge AI platform combines real-time sensor data, machine learning algorithms, and industrial automation to deliver unprecedented precision in hydroponic greenhouse management. From climate control to fertigation optimization, our system ensures maximum yield with minimal resource consumption.',

  // Core capabilities
  capabilities: [
    {
      icon: 'Cpu',
      title: 'Autonomous Decision Making',
      description:
        'Advanced AI algorithms continuously analyze environmental data and make real-time adjustments to optimize growing conditions.',
    },
    {
      icon: 'Shield',
      title: 'Safety-First Architecture',
      description:
        'Multi-layered safety protocols with hardware interlocks ensure system reliability and crop protection under all conditions.',
    },
    {
      icon: 'BarChart3',
      title: 'Predictive Analytics',
      description:
        'Machine learning models predict optimal harvest timing, detect early disease indicators, and forecast resource requirements.',
    },
  ],

  // Technical specifications
  specifications: [
    '5-Layer System Architecture',
    'Industrial PLC Integration',
    '4G/5G Cloud Connectivity',
    'Real-time MQTT Communication',
    'Computer Vision Quality Analysis',
    'Hybrid AI + Rule-based Control',
  ],

  // Performance metrics
  metrics: [
    { label: 'Yield Increase', value: '35%' },
    { label: 'Water Savings', value: '40%' },
    { label: 'Energy Efficiency', value: '28%' },
  ],

  imageUrl:
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop&crop=center',
  imageAlt: 'Modern hydroponic greenhouse with AI control systems',

  ctaText: 'Explore Our Technology',
  ctaHref: '/technology',
  secondaryCtaText: 'View Case Studies',
  secondaryCtaHref: '/case-studies',
} as const;

type AboutProps = Partial<typeof DEFAULT_ABOUT>;

export default function About(props: AboutProps) {
  const config = { ...DEFAULT_ABOUT, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Cpu: Cpu,
      Shield: Shield,
      BarChart3: BarChart3,
      Zap: Zap,
      Leaf: Leaf,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-8 w-8" />;
  };

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="about" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <Image
              src={config.imageUrl}
              alt={config.imageAlt}
              data-editable-src="imageUrl"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          </div>

          {/* Capabilities */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8">Core Capabilities</h3>
            {config.capabilities.map((capability, idx) => (
              <Card key={idx} className="bg-card text-card-foreground border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg flex-shrink-0">
                      {getIcon(capability.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        <span data-editable={`capabilities[${idx}].title`}>{capability.title}</span>
                      </h4>
                      <p className="text-muted-foreground">
                        <span data-editable={`capabilities[${idx}].description`}>
                          {capability.description}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications & Metrics */}
        <div className="grid gap-12 md:grid-cols-2 mb-16">
          {/* Specifications */}
          <Card className="bg-muted text-muted-foreground">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Technical Specifications</h3>
              <div className="grid gap-3">
                {config.specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span data-editable={`specifications[${idx}]`}>{spec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Performance Impact</h3>
              <div className="space-y-6">
                {config.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-primary-foreground/90">
                      <span data-editable={`metrics[${idx}].label`}>{metric.label}</span>
                    </span>
                    <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                      <span data-editable={`metrics[${idx}].value`}>{metric.value}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handlePrimaryCTA}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCTA}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
