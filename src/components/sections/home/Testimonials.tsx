'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Building2, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DEFAULT_TESTIMONIALS = {
  title: 'Trusted by Leading Agricultural Operations',
  subtitle:
    'See how our AI-driven hydroponic systems are transforming greenhouse operations worldwide',
  testimonials: [
    {
      id: '1',
      quote:
        'Our yield increased by 40% while reducing water consumption by 35%. The AI system continuously optimizes our nutrient delivery and climate control with precision we never achieved manually.',
      author: 'Dr. Sarah Chen',
      role: 'Head of Operations',
      company: 'GreenTech Farms',
      location: 'Netherlands',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      metrics: {
        yieldIncrease: '40%',
        waterSavings: '35%',
        energyEfficiency: '28%',
      },
    },
    {
      id: '2',
      quote:
        'The autonomous fertigation management has eliminated human error and reduced our labor costs by 60%. The system learns from our crops and adapts in real-time to environmental changes.',
      author: 'Marcus Rodriguez',
      role: 'Facility Manager',
      company: 'Vertical Harvest Solutions',
      location: 'California, USA',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      metrics: {
        laborReduction: '60%',
        cropQuality: '95%',
        systemUptime: '99.2%',
      },
    },
    {
      id: '3',
      quote:
        'The predictive analytics and quality assessment through computer vision has revolutionized our harvest timing. We now achieve consistent premium grade produce with minimal waste.',
      author: 'Elena Kowalski',
      role: 'Agricultural Engineer',
      company: 'Nordic Greenhouse Systems',
      location: 'Sweden',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      metrics: {
        premiumGrade: '92%',
        wasteReduction: '45%',
        harvestAccuracy: '98%',
      },
    },
  ],
  stats: [
    {
      icon: 'TrendingUp',
      value: '150+',
      label: 'Active Installations',
    },
    {
      icon: 'Users',
      value: '50M+',
      label: 'Plants Monitored',
    },
    {
      icon: 'Building2',
      value: '25',
      label: 'Countries Deployed',
    },
  ],
} as const;

type TestimonialsProps = Partial<typeof DEFAULT_TESTIMONIALS>;

export default function Testimonials(props: TestimonialsProps) {
  const config = { ...DEFAULT_TESTIMONIALS, ...props };
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % config.testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [config.testimonials.length]);

  const getIcon = (iconName: string) => {
    const icons = {
      TrendingUp: TrendingUp,
      Users: Users,
      Building2: Building2,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || TrendingUp;
    return <IconComponent className="h-6 w-6" />;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {config.stats.map((stat, idx) => (
            <Card key={idx} className="bg-card text-card-foreground border-border">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4 text-primary">{getIcon(stat.icon)}</div>
                <div className="text-3xl font-bold mb-2">
                  <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                </div>
                <div className="text-muted-foreground">
                  <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {config.testimonials.map((testimonial, idx) => (
            <Card
              key={testimonial.id}
              className={`bg-card text-card-foreground border-border transition-all duration-500 ${
                idx === activeTestimonial
                  ? 'ring-2 ring-primary shadow-lg scale-105'
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary mb-4" />

                {/* Rating */}
                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  <span data-editable={`testimonials[${idx}].quote`}>"{testimonial.quote}"</span>
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(testimonial.metrics).map(([key, value], metricIdx) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        <span data-editable={`testimonials[${idx}].metrics.${key}`}>{value}</span>
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <Image
                    src={testimonial.imageUrl}
                    alt={`${testimonial.author} profile`}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                    data-editable-src={`testimonials[${idx}].imageUrl`}
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      <span data-editable={`testimonials[${idx}].author`}>
                        {testimonial.author}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`testimonials[${idx}].role`}>{testimonial.role}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span data-editable={`testimonials[${idx}].company`}>
                        {testimonial.company}
                      </span>
                      <span className="mx-2">•</span>
                      <span data-editable={`testimonials[${idx}].location`}>
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {config.testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeTestimonial
                  ? 'bg-primary scale-125'
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`View testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
