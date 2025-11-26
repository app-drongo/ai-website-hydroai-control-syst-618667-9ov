'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Cpu,
  Cloud,
  Wifi,
  Database,
  Monitor,
  Thermometer,
  Droplets,
  Zap,
} from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PROCESS = {
  title: 'AI-Driven Hydroponic Control System',
  subtitle: 'Five-Layer Architecture for Autonomous Greenhouse Management',
  description:
    'Our comprehensive system integrates field sensors, PLC control, 4G connectivity, cloud AI, and user interfaces for complete hydroponic automation.',
  ctaText: 'View System Demo',
  ctaHref: '/demo',
  layers: [
    {
      id: 'field',
      title: 'Field Layer',
      subtitle: 'Sensors & Actuators',
      description:
        'Environmental sensors (temperature, humidity, CO₂, pH, EC) and actuators (pumps, fans, valves) for real-time monitoring and control.',
      icon: 'thermometer',
      features: ['Multi-parameter sensors', 'Industrial actuators', 'Safety interlocks'],
    },
    {
      id: 'control',
      title: 'Control Layer',
      subtitle: 'HMI-PLC Cabinet',
      description:
        'Industrial PLC with HMI panel providing local control, safety guardrails, and MQTT communication to cloud AI platform.',
      icon: 'cpu',
      features: ['Modbus-RTU integration', 'Local safety logic', 'Manual/Auto modes'],
    },
    {
      id: 'communication',
      title: 'Communication Layer',
      subtitle: '4G Router & MQTT',
      description:
        'Secure 4G connectivity with MQTT protocol for real-time data transmission and command reception from cloud AI system.',
      icon: 'wifi',
      features: ['Industrial 4G router', 'MQTT over TLS', 'Offline buffering'],
    },
    {
      id: 'cloud',
      title: 'Cloud Layer',
      subtitle: 'AI & Data Platform',
      description:
        'Hybrid AI engine combining rule-based safety with machine learning optimization for adaptive greenhouse management.',
      icon: 'cloud',
      features: ['TimescaleDB storage', 'AI optimization', 'Vision analysis'],
    },
    {
      id: 'user',
      title: 'User Layer',
      subtitle: 'Remote Dashboard',
      description:
        'Web-based monitoring and control interface with real-time telemetry, analytics, and manual override capabilities.',
      icon: 'monitor',
      features: ['Real-time monitoring', 'Historical analytics', 'Mobile responsive'],
    },
  ],
} as const;

type ProcessProps = Partial<typeof DEFAULT_PROCESS>;

export default function Process(props: ProcessProps) {
  const config = { ...DEFAULT_PROCESS, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      thermometer: Thermometer,
      cpu: Cpu,
      wifi: Wifi,
      cloud: Cloud,
      monitor: Monitor,
      droplets: Droplets,
      zap: Zap,
      database: Database,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="process" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Process Flow */}
        <div className="grid gap-8 lg:gap-12">
          {config.layers.map((layer, idx) => (
            <div key={layer.id} className="relative">
              {/* Connection Line */}
              {idx < config.layers.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-full w-px h-12 bg-border transform -translate-x-1/2 z-10" />
              )}

              {/* Layer Card */}
              <Card className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    {/* Content */}
                    <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                          {getIcon(layer.icon)}
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            Layer {idx + 1}
                          </Badge>
                          <h3 className="text-2xl font-bold">
                            <span data-editable={`layers[${idx}].title`}>{layer.title}</span>
                          </h3>
                          <p className="text-primary font-medium">
                            <span data-editable={`layers[${idx}].subtitle`}>{layer.subtitle}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 text-lg">
                        <span data-editable={`layers[${idx}].description`}>
                          {layer.description}
                        </span>
                      </p>

                      <div className="grid gap-2">
                        {layer.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-foreground">
                              <span data-editable={`layers[${idx}].features[${featureIdx}]`}>
                                {feature}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visual Element */}
                    <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''} flex justify-center`}>
                      <div className="bg-muted text-muted-foreground p-12 rounded-xl">
                        <div className="text-6xl opacity-50">{getIcon(layer.icon)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
