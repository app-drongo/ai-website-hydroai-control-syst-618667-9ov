'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu, Zap, Shield, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  title: 'Transform Your Agriculture with AI-Driven Precision',
  subtitle:
    'Deploy autonomous hydroponic control systems that optimize yield, reduce costs, and ensure consistent quality through intelligent automation.',
  primaryCtaText: 'Start Your Implementation',
  primaryCtaHref: '/implementation',
  secondaryCtaText: 'View Technical Specs',
  secondaryCtaHref: '/specifications',
  features: ['Real-time AI optimization', '99.9% system uptime', '30% yield increase'],
  stats: [
    { label: 'Sensors Monitored', value: '50+', icon: 'BarChart3' },
    { label: 'Response Time', value: '<100ms', icon: 'Zap' },
    { label: 'Automation Level', value: '100%', icon: 'Cpu' },
  ],
  trustIndicator: 'Trusted by 200+ commercial growers worldwide',
  urgencyText: 'Limited beta slots available for Q1 2024',
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('cta');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveFeature(prev => (prev + 1) % config.features.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible, config.features.length]);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      BarChart3,
      Zap,
      Cpu,
      Shield,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || BarChart3;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section
      id="cta"
      className={`bg-gradient-to-br from-primary/5 via-background to-accent/5 text-foreground py-20 lg:py-32 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span data-editable="urgencyText">{config.urgencyText}</span>
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              <span data-editable="title">{config.title}</span>
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {config.stats.map((stat, idx) => (
              <Card
                key={idx}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 text-primary">{getIcon(stat.icon)}</div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Carousel */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-border/50">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Key Benefits</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {config.features.map((feature, idx) => (
                  <Badge
                    key={idx}
                    variant={idx === activeFeature ? 'default' : 'secondary'}
                    className={`px-4 py-2 text-sm transition-all duration-500 ${
                      idx === activeFeature
                        ? 'bg-primary text-primary-foreground scale-110'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <span data-editable={`features[${idx}]`}>{feature}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={handlePrimaryClick}
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span data-editable="trustIndicator">{config.trustIndicator}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
