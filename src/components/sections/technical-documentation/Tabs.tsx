'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs as TabsPrimitive, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Thermometer, Droplets, Zap, Camera, Settings, TrendingUp } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_TABS = {
  title: 'AI-Driven Hydroponic Control System',
  subtitle: 'Real-time monitoring and autonomous management across all system layers',
  ctaText: 'View Full Documentation',
  ctaHref: '/documentation',
  tabs: [
    {
      id: 'sensors',
      label: 'Field Layer',
      title: 'Sensors & Actuators',
      description: 'Real-Time environmental and fertigation monitoring',
      icon: 'thermometer',
      metrics: [
        { name: 'Air Temperature', value: '24.2°C', status: 'optimal', progress: 75 },
        { name: 'Relative Humidity', value: '68%', status: 'good', progress: 68 },
        { name: 'CO₂ Concentration', value: '1,200 ppm', status: 'optimal', progress: 85 },
      ],
    },
    {
      id: 'control',
      label: 'Control Layer',
      title: 'HMI-PLC System',
      description: 'Industrial control with safety interlocks and MQTT communication',
      icon: 'settings',
      metrics: [
        { name: 'PLC Status', value: 'Online', status: 'optimal', progress: 100 },
        { name: 'Safety Interlocks', value: 'Active', status: 'good', progress: 90 },
        { name: '4G Connection', value: 'Strong', status: 'optimal', progress: 95 },
      ],
    },
    {
      id: 'ai',
      label: 'AI Platform',
      title: 'Cloud Intelligence',
      description: 'Hybrid AI optimization with contextual learning and vision analysis',
      icon: 'trending-up',
      metrics: [
        { name: 'AI Optimization', value: 'Running', status: 'optimal', progress: 88 },
        { name: 'Vision Analysis', value: 'Processing', status: 'good', progress: 72 },
        { name: 'Learning Rate', value: '0.023', status: 'optimal', progress: 82 },
      ],
    },
  ],
} as const;

type TabsProps = Partial<typeof DEFAULT_TABS>;

export default function Tabs(props: TabsProps) {
  const config = { ...DEFAULT_TABS, ...props };
  const navigate = useSmartNavigation();
  const [activeTab, setActiveTab] = useState(config.tabs[0].id);

  const getIcon = (iconName: string) => {
    const icons = {
      thermometer: Thermometer,
      droplets: Droplets,
      zap: Zap,
      camera: Camera,
      settings: Settings,
      'trending-up': TrendingUp,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Settings;
    return <IconComponent className="h-5 w-5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-muted';
    }
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="tabs" className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-muted p-1 rounded-lg mb-8">
            {config.tabs.map((tab, idx) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {getIcon(tab.icon)}
                <span data-editable={`tabs[${idx}].label`}>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {config.tabs.map((tab, idx) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Card className="bg-card text-card-foreground border-border">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary text-primary-foreground rounded-full">
                      {getIcon(tab.icon)}
                    </div>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl">
                    <span data-editable={`tabs[${idx}].title`}>{tab.title}</span>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    <span data-editable={`tabs[${idx}].description`}>{tab.description}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tab.metrics.map((metric, metricIdx) => (
                      <div
                        key={metricIdx}
                        className="bg-muted text-muted-foreground p-6 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">
                            <span data-editable={`tabs[${idx}].metrics[${metricIdx}].name`}>
                              {metric.name}
                            </span>
                          </h4>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(metric.status)} text-white`}
                          >
                            <span data-editable={`tabs[${idx}].metrics[${metricIdx}].status`}>
                              {metric.status}
                            </span>
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-3">
                          <span data-editable={`tabs[${idx}].metrics[${metricIdx}].value`}>
                            {metric.value}
                          </span>
                        </div>
                        <Progress value={metric.progress} className="h-2 bg-background" />
                        <div className="text-sm mt-2 text-right">{metric.progress}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
