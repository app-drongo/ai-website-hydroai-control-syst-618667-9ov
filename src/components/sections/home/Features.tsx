'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Cpu,
  Cloud,
  Smartphone,
  Database,
  Shield,
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Eye,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'AI-Driven Hydroponic Control System',
  subtitle: 'Five-Layer Architecture for Autonomous Greenhouse Management',
  description:
    'Complete end-to-end solution combining IoT sensors, PLC control, 4G connectivity, cloud AI, and intuitive dashboards for optimal crop production.',
  ctaText: 'View System Architecture',
  ctaHref: '/architecture',
  features: [
    {
      id: 'field-layer',
      icon: 'Activity',
      title: 'Field Layer',
      description:
        'Comprehensive sensor network monitoring air temperature, humidity, CO₂, light intensity, EC, pH, and water flow with PLC-controlled actuators.',
      technologies: ['Analog/Digital Sensors', 'Modbus-RTU', 'RS-485', '4-20mA'],
      category: 'Hardware',
    },
    {
      id: 'control-layer',
      icon: 'Settings',
      title: 'Control Layer',
      description:
        'Industrial PLC with HMI touch panel featuring embedded safety interlocks, manual/auto modes, and MQTT communication capabilities.',
      technologies: ['Siemens PLC', 'HMI Panel', 'Ladder Logic', 'Safety Interlocks'],
      category: 'Control',
    },
    {
      id: 'communication-layer',
      icon: 'Smartphone',
      title: 'Communication Layer',
      description:
        'Secure 4G connectivity with MQTT over TLS, device authentication, and local buffer backup for network outage resilience.',
      technologies: ['4G Router', 'MQTT/TLS', 'Device Auth', 'Store & Forward'],
      category: 'Connectivity',
    },
    {
      id: 'cloud-layer',
      icon: 'Cloud',
      title: 'Cloud AI Platform',
      description:
        'Hybrid AI engine combining rule-based safety constraints with optimization algorithms, plus computer vision for quality analysis.',
      technologies: ['FastAPI', 'TimescaleDB', 'Computer Vision', 'MPC Optimization'],
      category: 'Intelligence',
    },
    {
      id: 'user-layer',
      icon: 'Eye',
      title: 'User Interface',
      description:
        'Real-time dashboard with sensor monitoring, fertigation status, quality metrics, manual overrides, and comprehensive reporting.',
      technologies: ['WebSocket', 'Real-time Charts', 'Mobile Responsive', 'Alarm System'],
      category: 'Interface',
    },
    {
      id: 'ai-optimization',
      icon: 'Cpu',
      title: 'AI Optimization',
      description:
        'Contextual bandit algorithms and model predictive control for long-term adaptation, energy efficiency, and yield maximization.',
      technologies: [
        'Machine Learning',
        'Predictive Control',
        'Energy Optimization',
        'Yield Analytics',
      ],
      category: 'Intelligence',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Activity,
      Cloud,
      Smartphone,
      Database,
      Shield,
      Cpu,
      Thermometer,
      Droplets,
      Zap,
      Eye,
      Settings,
      TrendingUp,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Activity;
    return <IconComponent className="h-8 w-8" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Hardware: 'bg-primary text-primary-foreground',
      Control: 'bg-secondary text-secondary-foreground',
      Connectivity: 'bg-accent text-accent-foreground',
      Intelligence: 'bg-muted text-muted-foreground',
      Interface: 'bg-card text-card-foreground',
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            <span data-editable="description">{config.description}</span>
          </p>
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    {getIcon(feature.icon)}
                  </div>
                  <div className="flex-1">
                    <Badge className={`mb-2 ${getCategoryColor(feature.category)}`}>
                      <span data-editable={`features[${idx}].category`}>{feature.category}</span>
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {feature.technologies.map((tech, techIdx) => (
                    <Badge
                      key={techIdx}
                      variant="outline"
                      className="text-xs bg-muted text-muted-foreground border-border"
                    >
                      <span data-editable={`features[${idx}].technologies[${techIdx}]`}>
                        {tech}
                      </span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted text-muted-foreground p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Transform Your Greenhouse Operations?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Deploy our complete AI-driven hydroponic control system for autonomous climate
              management, optimal fertigation, and maximum yield efficiency.
            </p>
            <Button
              onClick={handleCTAClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
