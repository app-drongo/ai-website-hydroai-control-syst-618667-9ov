'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Cpu, Cloud, Zap, Shield, Settings, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our AI-driven hydroponic control systems',
  ctaText: 'Get Technical Support',
  ctaHref: '/support',
  categories: [
    {
      name: 'System Architecture',
      icon: 'cpu',
      questions: [
        {
          question: 'What are the five layers of the AI-driven control system?',
          answer:
            'Our system consists of: (1) Field Layer with sensors and actuators, (2) Control Layer with HMI-PLC cabinet, (3) Communication Layer via 4G/MQTT, (4) Cloud Layer with AI engine and data platform, and (5) User Layer with remote dashboard for monitoring and control.',
        },
        {
          question: 'How does the PLC communicate with the cloud AI platform?',
          answer:
            "The PLC connects through an industrial 4G router using MQTT over TLS protocol. It publishes telemetry to topics like 'tele/gh/{site}/zone/{zone}' and receives AI commands on 'cmd/gh/{site}/zone/{zone}'. Authentication uses device ID + token for security.",
        },
      ],
    },
    {
      name: 'AI & Control Logic',
      icon: 'cloud',
      questions: [
        {
          question: 'What type of AI algorithms power the autonomous control?',
          answer:
            'We use a hybrid approach combining rule-based safety constraints with AI optimization layers. This includes contextual bandit algorithms for adaptive learning and Model Predictive Control (MPC) for long-term optimization of climate and fertigation parameters.',
        },
        {
          question: 'How does the system ensure safety during autonomous operation?',
          answer:
            'Multiple safety guardrails are implemented: local PLC interlocks (e.g., temperature >35°C triggers fans ON, CO₂ OFF), overcurrent protection, thermal protection, water-level switches, and manual override capabilities. The system defaults to safe states during any failure.',
        },
      ],
    },
    {
      name: 'Sensors & Monitoring',
      icon: 'barChart3',
      questions: [
        {
          question: 'What environmental parameters does the system monitor?',
          answer:
            'The system continuously monitors air temperature, relative humidity, CO₂ concentration, light intensity (PPFD), electrical conductivity (EC), pH levels, water flow rates, tank levels (A/B/C/D nutrients + water), and soil moisture when applicable.',
        },
        {
          question: 'How does vision analysis contribute to quality control?',
          answer:
            'Computer vision cameras analyze fruit quality in real-time, assessing color, size, ripeness, and defect rates. This data feeds back into the AI engine to optimize growing conditions and predict harvest timing for maximum yield and quality.',
        },
      ],
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const itemId = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const getIcon = (iconName: string) => {
    const icons = {
      cpu: Cpu,
      cloud: Cloud,
      zap: Zap,
      shield: Shield,
      settings: Settings,
      barChart3: BarChart3,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {config.categories.map((category, idx) => (
            <Button
              key={idx}
              variant={activeCategory === idx ? 'default' : 'outline'}
              onClick={() => setActiveCategory(idx)}
              className="flex items-center gap-2"
            >
              {getIcon(category.icon)}
              <span data-editable={`categories[${idx}].name`}>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                {getIcon(config.categories[activeCategory].icon)}
                <h3 className="text-2xl font-semibold">
                  <span data-editable={`categories[${activeCategory}].name`}>
                    {config.categories[activeCategory].name}
                  </span>
                </h3>
                <Badge variant="secondary" className="ml-auto">
                  {config.categories[activeCategory].questions.length} Questions
                </Badge>
              </div>

              <div className="space-y-4">
                {config.categories[activeCategory].questions.map((item, questionIdx) => {
                  const itemId = `${activeCategory}-${questionIdx}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={questionIdx}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(activeCategory, questionIdx)}
                        className="w-full px-6 py-4 text-left bg-muted hover:bg-muted/80 transition-colors flex items-center justify-between group"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          <span
                            data-editable={`categories[${activeCategory}].questions[${questionIdx}].question`}
                          >
                            {item.question}
                          </span>
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 py-4 bg-background border-t border-border">
                          <p className="text-muted-foreground leading-relaxed">
                            <span
                              data-editable={`categories[${activeCategory}].questions[${questionIdx}].answer`}
                            >
                              {item.answer}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Need More Technical Information?</h3>
            <p className="text-muted-foreground mb-6">
              Our technical team is ready to help with system integration, custom configurations,
              and advanced troubleshooting.
            </p>
            <Button
              onClick={() => navigate(config.ctaHref)}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
