'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Cpu, Zap, Shield, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'AI-Driven Hydroponic Greenhouse Control System',
  subtitle: 'Autonomous climate and fertigation management through intelligent HMI-PLC integration',
  description:
    'Real-time sensor data collection, AI-powered decision making, and seamless cloud connectivity for next-generation agricultural automation.',
  ctaText: 'View System Architecture',
  ctaHref: '/architecture',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  features: ['5-Layer Architecture', 'Real-time AI Control', '4G Cloud Integration'],
  stats: [
    { label: 'Sensor Types', value: '12+', icon: 'sensors' },
    { label: 'Control Points', value: '8', icon: 'control' },
    { label: 'Response Time', value: '<100ms', icon: 'speed' },
  ],
  statusText: 'System Online',
  backgroundPattern: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isAnimated, setIsAnimated] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsAnimated(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % config.stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.stats.length]);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getStatIcon = (iconType: string) => {
    switch (iconType) {
      case 'sensors':
        return <Cpu className="h-5 w-5" />;
      case 'control':
        return <Zap className="h-5 w-5" />;
      case 'speed':
        return <Shield className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-background text-foreground py-20 lg:py-32 overflow-hidden"
    >
      {config.backgroundPattern && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <span data-editable="statusText">{config.statusText}</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              {config.features.map((feature, idx) => (
                <Badge key={idx} variant="outline" className="border-primary/20 text-primary">
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Stats/Visual Column */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Main Stats Card */}
            <Card className="bg-card text-card-foreground border-border/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-3 gap-6">
                  {config.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className={`text-center transition-all duration-500 ${
                        currentStat === idx ? 'scale-110 text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div className="flex justify-center mb-2">{getStatIcon(stat.icon)}</div>
                      <div className="text-2xl font-bold">
                        <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                      </div>
                      <div className="text-sm">
                        <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Architecture Preview */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">Field Layer</div>
                  <div className="text-sm text-muted-foreground">Sensors & Actuators</div>
                </CardContent>
              </Card>
              <Card className="bg-accent/5 border-accent/20 hover:bg-accent/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
                  <div className="font-semibold">AI Engine</div>
                  <div className="text-sm text-muted-foreground">Cloud Processing</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
