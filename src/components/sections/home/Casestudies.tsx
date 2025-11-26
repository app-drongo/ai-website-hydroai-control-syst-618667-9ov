'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Zap, Droplets, Thermometer, Activity } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CASE_STUDIES = {
  title: 'Real-World AI Hydroponic Deployments',
  subtitle:
    'Proven results from autonomous greenhouse control systems across diverse agricultural operations',
  ctaText: 'View Full Case Study',
  ctaHref: '/case-studies',
  studies: [
    {
      id: '1',
      title: 'Netherlands Tomato Farm',
      location: 'Westland, Netherlands',
      cropType: 'Cherry Tomatoes',
      systemSize: '2.5 hectares',
      imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&h=600&fit=crop',
      imageAlt: 'Modern hydroponic greenhouse with tomato plants',
      results: {
        yieldIncrease: '34%',
        waterSavings: '28%',
        energyReduction: '22%',
        qualityImprovement: '41%',
      },
      keyFeatures: [
        'AI-driven climate optimization',
        'Predictive fertigation control',
        'Computer vision quality monitoring',
      ],
      description:
        'Fully autonomous greenhouse management system with 4G connectivity and real-time AI decision making for optimal crop production.',
    },
    {
      id: '2',
      title: 'California Leafy Greens',
      location: 'Salinas Valley, CA',
      cropType: 'Mixed Leafy Greens',
      systemSize: '1.8 hectares',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      imageAlt: 'Hydroponic lettuce growing facility',
      results: {
        yieldIncrease: '42%',
        waterSavings: '35%',
        energyReduction: '18%',
        qualityImprovement: '38%',
      },
      keyFeatures: [
        'Multi-zone climate control',
        'Automated nutrient dosing',
        'Integrated pest monitoring',
      ],
      description:
        'Advanced hydroponic system with AI-powered environmental controls and precision fertigation for consistent, high-quality leafy green production.',
    },
    {
      id: '3',
      title: 'Australian Berry Farm',
      location: 'Queensland, Australia',
      cropType: 'Strawberries',
      systemSize: '3.2 hectares',
      imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
      imageAlt: 'Hydroponic strawberry cultivation system',
      results: {
        yieldIncrease: '29%',
        waterSavings: '31%',
        energyReduction: '25%',
        qualityImprovement: '45%',
      },
      keyFeatures: [
        'Adaptive lighting control',
        'Precision pH management',
        'Harvest prediction AI',
      ],
      description:
        'Comprehensive AI control system managing climate, irrigation, and lighting for premium strawberry production with enhanced fruit quality and shelf life.',
    },
  ],
} as const;

type CaseStudiesProps = Partial<typeof DEFAULT_CASE_STUDIES>;

export default function Casestudies(props: CaseStudiesProps) {
  const config = { ...DEFAULT_CASE_STUDIES, ...props };
  const navigate = useSmartNavigation();
  const [selectedStudy, setSelectedStudy] = useState(0);

  const handleViewCaseStudy = (studyId: string) => {
    navigate(`${config.ctaHref}/${studyId}`);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'yield':
        return <TrendingUp className="h-4 w-4" />;
      case 'water':
        return <Droplets className="h-4 w-4" />;
      case 'energy':
        return <Zap className="h-4 w-4" />;
      case 'quality':
        return <Activity className="h-4 w-4" />;
      default:
        return <Thermometer className="h-4 w-4" />;
    }
  };

  return (
    <section id="case-studies" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 lg:gap-12">
          {config.studies.map((study, idx) => (
            <Card key={study.id} className="bg-card text-card-foreground overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={study.imageUrl}
                    alt={study.imageAlt}
                    data-editable-src={`studies[${idx}].imageUrl`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      <span data-editable={`studies[${idx}].cropType`}>{study.cropType}</span>
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl lg:text-3xl">
                        <span data-editable={`studies[${idx}].title`}>{study.title}</span>
                      </CardTitle>
                      <Badge variant="outline">
                        <span data-editable={`studies[${idx}].systemSize`}>{study.systemSize}</span>
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      <span data-editable={`studies[${idx}].location`}>{study.location}</span>
                    </p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-8">
                      <span data-editable={`studies[${idx}].description`}>{study.description}</span>
                    </p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-accent text-accent-foreground p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getResultIcon('yield')}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          <span data-editable={`studies[${idx}].results.yieldIncrease`}>
                            {study.results.yieldIncrease}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Yield Increase</div>
                      </div>
                      <div className="bg-accent text-accent-foreground p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getResultIcon('water')}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          <span data-editable={`studies[${idx}].results.waterSavings`}>
                            {study.results.waterSavings}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Water Savings</div>
                      </div>
                      <div className="bg-accent text-accent-foreground p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getResultIcon('energy')}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          <span data-editable={`studies[${idx}].results.energyReduction`}>
                            {study.results.energyReduction}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Energy Reduction</div>
                      </div>
                      <div className="bg-accent text-accent-foreground p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getResultIcon('quality')}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          <span data-editable={`studies[${idx}].results.qualityImprovement`}>
                            {study.results.qualityImprovement}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Quality Improvement</div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-4">Key Features:</h4>
                      <ul className="space-y-2">
                        {study.keyFeatures.map((feature, featureIdx) => (
                          <li
                            key={featureIdx}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            <span data-editable={`studies[${idx}].keyFeatures[${featureIdx}]`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleViewCaseStudy(study.id)}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
