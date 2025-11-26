'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_COMPARISON = {
  title: 'AI-Driven Hydroponic Control Systems',
  subtitle: 'Compare traditional vs autonomous greenhouse management solutions',
  traditionalTitle: 'Traditional Manual Control',
  aiTitle: 'AI-Driven Autonomous System',
  ctaText: 'Get AI System',
  ctaHref: '/contact',
  traditionalFeatures: [
    'Manual sensor monitoring',
    'Basic timer-based irrigation',
    'Static environmental controls',
  ],
  aiFeatures: [
    'Real-time AI optimization',
    'Predictive climate management',
    'Autonomous fertigation control',
  ],
  traditionalLimitations: ['Human error prone', 'Limited scalability', 'Reactive responses only'],
  aiAdvantages: [
    '24/7 autonomous operation',
    'Machine learning adaptation',
    'Predictive maintenance alerts',
  ],
  performanceMetrics: [
    {
      metric: 'Yield Increase',
      traditional: 'Baseline',
      ai: '35-50% higher',
      improvement: true,
    },
    {
      metric: 'Water Efficiency',
      traditional: 'Standard usage',
      ai: '40% reduction',
      improvement: true,
    },
    {
      metric: 'Labor Requirements',
      traditional: '8 hours/day',
      ai: '1 hour/day',
      improvement: true,
    },
  ],
} as const;

type ComparisonProps = Partial<typeof DEFAULT_COMPARISON>;

export default function Comparison(props: ComparisonProps) {
  const config = { ...DEFAULT_COMPARISON, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="comparison" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Main Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Traditional System */}
          <Card className="bg-card text-card-foreground border-border relative">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-muted text-muted-foreground rounded-full w-fit">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">
                <span data-editable="traditionalTitle">{config.traditionalTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Core Features</h4>
                <ul className="space-y-2">
                  {config.traditionalFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span data-editable={`traditionalFeatures[${idx}]`} className="text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Limitations</h4>
                <ul className="space-y-2">
                  {config.traditionalLimitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <X className="h-4 w-4 text-destructive flex-shrink-0" />
                      <span
                        data-editable={`traditionalLimitations[${idx}]`}
                        className="text-sm text-muted-foreground"
                      >
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* AI System */}
          <Card className="bg-primary text-primary-foreground border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-accent-foreground px-4 py-1">Recommended</Badge>
            </div>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-primary-foreground/10 rounded-full w-fit">
                <Cpu className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">
                <span data-editable="aiTitle">{config.aiTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3">Advanced Capabilities</h4>
                <ul className="space-y-2">
                  {config.aiFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-accent flex-shrink-0" />
                      <span data-editable={`aiFeatures[${idx}]`} className="text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div>
                <h4 className="font-semibold mb-3">Key Advantages</h4>
                <ul className="space-y-2">
                  {config.aiAdvantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      <span data-editable={`aiAdvantages[${idx}]`} className="text-sm">
                        {advantage}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleCTAClick}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-6"
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="bg-card text-card-foreground rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Performance Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Metric</th>
                  <th className="text-center py-4 px-4 font-semibold">Traditional</th>
                  <th className="text-center py-4 px-4 font-semibold">AI-Driven</th>
                </tr>
              </thead>
              <tbody>
                {config.performanceMetrics.map((metric, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">
                      <span data-editable={`performanceMetrics[${idx}].metric`}>
                        {metric.metric}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      <span data-editable={`performanceMetrics[${idx}].traditional`}>
                        {metric.traditional}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-2 text-primary font-semibold">
                        <span data-editable={`performanceMetrics[${idx}].ai`}>{metric.ai}</span>
                        {metric.improvement && <ArrowRight className="h-4 w-4" />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
