'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Cloud, Database, Cpu, Wifi } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_INTEGRATIONS = {
  title: 'System Integrations',
  subtitle:
    'Seamlessly connect your AI-driven hydroponic control system with industry-leading platforms and protocols',
  description:
    'Our comprehensive integration layer ensures compatibility with existing infrastructure while providing secure, real-time data exchange across all system components.',
  ctaText: 'View Integration Guide',
  ctaHref: '/documentation/integrations',
  secondaryCtaText: 'Contact Support',
  secondaryCtaHref: '/support',
  categories: [
    {
      id: 'communication',
      title: 'Communication Protocols',
      description: 'Industrial-grade communication standards for reliable data transmission',
      icon: 'Wifi',
      integrations: [
        {
          name: 'MQTT over TLS',
          status: 'native',
          description: 'Secure pub/sub messaging for real-time telemetry',
        },
        {
          name: 'Modbus RTU/TCP',
          status: 'native',
          description: 'Standard industrial protocol for PLC communication',
        },
        {
          name: 'OPC UA',
          status: 'supported',
          description: 'Unified architecture for industrial automation',
        },
      ],
    },
    {
      id: 'cloud',
      title: 'Cloud Platforms',
      description: 'Enterprise cloud services for scalable AI processing and data storage',
      icon: 'Cloud',
      integrations: [
        {
          name: 'AWS IoT Core',
          status: 'native',
          description: 'Managed cloud platform for IoT device connectivity',
        },
        {
          name: 'Azure IoT Hub',
          status: 'native',
          description: 'Bi-directional communication with cloud services',
        },
        {
          name: 'Google Cloud IoT',
          status: 'supported',
          description: 'Machine learning integration for predictive analytics',
        },
      ],
    },
    {
      id: 'hardware',
      title: 'Hardware Systems',
      description: 'Compatible with leading industrial automation hardware',
      icon: 'Cpu',
      integrations: [
        {
          name: 'Siemens S7-1200/1500',
          status: 'native',
          description: 'Direct integration with Siemens PLC systems',
        },
        {
          name: 'Allen-Bradley CompactLogix',
          status: 'native',
          description: 'Rockwell Automation PLC compatibility',
        },
        {
          name: 'Schneider Electric M580',
          status: 'supported',
          description: 'Modicon PLC series integration',
        },
      ],
    },
  ],
  features: [
    'Real-time bidirectional communication',
    'Encrypted data transmission (TLS 1.3)',
    'Automatic failover and redundancy',
    'Edge computing capabilities',
    'RESTful API endpoints',
    'WebSocket real-time updates',
  ],
} as const;

type IntegrationsProps = Partial<typeof DEFAULT_INTEGRATIONS>;

const getIcon = (iconName: string) => {
  const icons = {
    Wifi: Wifi,
    Cloud: Cloud,
    Cpu: Cpu,
    Zap: Zap,
    Shield: Shield,
    Database: Database,
  };
  const IconComponent = icons[iconName as keyof typeof icons] || Zap;
  return <IconComponent className="h-6 w-6" />;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'native':
      return 'bg-primary text-primary-foreground';
    case 'supported':
      return 'bg-secondary text-secondary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Integrations(props: IntegrationsProps) {
  const config = { ...DEFAULT_INTEGRATIONS, ...props };
  const navigate = useSmartNavigation();

  return (
    <section id="integrations" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-muted-foreground max-w-4xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Integration Categories */}
        <div className="grid gap-8 lg:gap-12 mb-16">
          {config.categories.map((category, categoryIdx) => (
            <Card key={category.id} className="bg-card text-card-foreground">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      <span data-editable={`categories[${categoryIdx}].title`}>
                        {category.title}
                      </span>
                    </CardTitle>
                    <p className="text-muted-foreground">
                      <span data-editable={`categories[${categoryIdx}].description`}>
                        {category.description}
                      </span>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.integrations.map((integration, integrationIdx) => (
                    <div
                      key={integration.name}
                      className="bg-muted text-muted-foreground p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          <span
                            data-editable={`categories[${categoryIdx}].integrations[${integrationIdx}].name`}
                          >
                            {integration.name}
                          </span>
                        </h4>
                        <Badge className={getStatusColor(integration.status)}>
                          <span
                            data-editable={`categories[${categoryIdx}].integrations[${integrationIdx}].status`}
                          >
                            {integration.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm">
                        <span
                          data-editable={`categories[${categoryIdx}].integrations[${integrationIdx}].description`}
                        >
                          {integration.description}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-muted text-muted-foreground p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Integration Features</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate(config.ctaHref)}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(config.secondaryCtaHref)}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
