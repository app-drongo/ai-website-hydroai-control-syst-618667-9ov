'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Thermometer, Droplets, Zap, Leaf, Activity, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState, useEffect } from 'react';

const DEFAULT_STATS = {
  title: 'System Performance Metrics',
  subtitle: 'Real-time monitoring of AI-driven hydroponic greenhouse operations',
  ctaText: 'View Full Dashboard',
  ctaHref: '/dashboard',
  metrics: [
    {
      id: 'efficiency',
      label: 'System Efficiency',
      value: '97.3%',
      change: '+2.1%',
      trend: 'up',
      icon: 'activity',
      description: 'Overall automation efficiency',
    },
    {
      id: 'yield',
      label: 'Crop Yield Increase',
      value: '34.2%',
      change: '+5.8%',
      trend: 'up',
      icon: 'leaf',
      description: 'Compared to traditional methods',
    },
    {
      id: 'energy',
      label: 'Energy Optimization',
      value: '28.7%',
      change: '+3.2%',
      trend: 'up',
      icon: 'zap',
      description: 'Energy consumption reduction',
    },
  ],
  liveStats: [
    {
      id: 'temperature',
      label: 'Temperature',
      value: '24.2°C',
      status: 'optimal',
      icon: 'thermometer',
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: '68%',
      status: 'optimal',
      icon: 'droplets',
    },
    {
      id: 'ph',
      label: 'pH Level',
      value: '6.1',
      status: 'optimal',
      icon: 'activity',
    },
  ],
} as const;

type StatsProps = Partial<typeof DEFAULT_STATS>;

export default function Stats(props: StatsProps) {
  const config = { ...DEFAULT_STATS, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      activity: Activity,
      leaf: Leaf,
      zap: Zap,
      thermometer: Thermometer,
      droplets: Droplets,
      trending: TrendingUp,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Activity;
    return <IconComponent className="h-6 w-6" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="stats" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {config.metrics.map((metric, idx) => (
            <Card
              key={metric.id}
              className={`bg-card text-card-foreground border-border transition-all duration-500 hover:shadow-lg ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getIcon(metric.icon)}
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium" data-editable={`metrics[${idx}].change`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    <span data-editable={`metrics[${idx}].label`}>{metric.label}</span>
                  </h3>
                  <div className="text-2xl font-bold">
                    <span data-editable={`metrics[${idx}].value`}>{metric.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable={`metrics[${idx}].description`}>{metric.description}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Environmental Stats */}
        <Card className="bg-card text-card-foreground border-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Live Environmental Data</h3>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                Real-time
              </Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {config.liveStats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-muted-foreground">{getIcon(stat.icon)}</div>
                    <div>
                      <p className="text-sm font-medium">
                        <span data-editable={`liveStats[${idx}].label`}>{stat.label}</span>
                      </p>
                      <p className="text-lg font-bold">
                        <span data-editable={`liveStats[${idx}].value`}>{stat.value}</span>
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(stat.status)}>
                    <span data-editable={`liveStats[${idx}].status`}>{stat.status}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
