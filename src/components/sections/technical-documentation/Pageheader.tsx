'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cpu, Zap, Shield, BarChart3 } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PAGE_HEADER = {
  title: 'AI-Driven Hydroponic Greenhouse Control System',
  subtitle: 'Autonomous climate and fertigation management through intelligent PLC integration',
  description:
    'Real-time sensor data collection, AI-powered decision making, and seamless cloud connectivity for next-generation agricultural automation.',
  ctaText: 'View System Architecture',
  ctaHref: '/architecture',
  secondaryCtaText: 'Technical Documentation',
  secondaryCtaHref: '/docs',
  statusText: 'Production Ready',
  version: 'v2.1.0',
  features: ['5-Layer Architecture', 'Real-time AI Control', '4G Cloud Integration'],
  specs: [
    { icon: 'Cpu', label: 'PLC Integration', value: 'Modbus RTU/RS-485' },
    { icon: 'Zap', label: 'Response Time', value: '<100ms' },
    { icon: 'Shield', label: 'Safety Systems', value: 'Multi-layer Protection' },
  ],
} as const;

type PageHeaderProps = Partial<typeof DEFAULT_PAGE_HEADER>;

export default function Pageheader(props: PageHeaderProps) {
  const config = { ...DEFAULT_PAGE_HEADER, ...props };
  const navigate = useSmartNavigation();

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Cpu: Cpu,
      Zap: Zap,
      Shield: Shield,
      BarChart3: BarChart3,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="page-header" className="bg-background text-foreground py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <span data-editable="statusText">{config.statusText}</span>
            </Badge>
            <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground">
              <span data-editable="version">{config.version}</span>
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="description">{config.description}</span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {config.features.map((feature, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium"
              >
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </Badge>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg font-semibold"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Technical Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {config.specs.map((spec, idx) => (
              <Card key={idx} className="bg-card text-card-foreground border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3 text-primary">
                    {getIcon(spec.icon)}
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                    <span data-editable={`specs[${idx}].label`}>{spec.label}</span>
                  </h3>
                  <p className="font-bold text-foreground">
                    <span data-editable={`specs[${idx}].value`}>{spec.value}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
