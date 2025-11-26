'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Cpu, Wifi, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CONTACT = {
  title: 'Contact Our AI Agriculture Experts',
  subtitle:
    'Ready to revolutionize your greenhouse operations? Get in touch with our technical team for a custom AI-driven hydroponic solution.',
  formTitle: 'Request Technical Consultation',
  namePlaceholder: 'Your Name',
  emailPlaceholder: 'your.email@company.com',
  messagePlaceholder: 'Describe your greenhouse setup, crop types, and automation requirements...',
  submitText: 'Send Technical Inquiry',
  contactInfo: [
    {
      icon: 'MapPin',
      label: 'Technical Center',
      value: 'Silicon Valley AgTech Hub, CA 94025',
    },
    {
      icon: 'Phone',
      label: 'Direct Line',
      value: '+1 (555) 123-GROW',
    },
    {
      icon: 'Mail',
      label: 'Technical Support',
      value: 'support@aihydroponics.tech',
    },
  ],
  features: ['24/7 System Monitoring', 'AI-Powered Optimization', 'Industrial IoT Integration'],
  responseTime: 'Response within 4 hours',
  certifications: ['ISO 27001', 'CE Certified', 'FCC Approved'],
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const navigate = useSmartNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      MapPin: MapPin,
      Phone: Phone,
      Mail: Mail,
      Clock: Clock,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || MapPin;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Technical Features */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {config.features.map((feature, idx) => (
              <Badge key={idx} variant="secondary" className="px-4 py-2">
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Cpu className="h-6 w-6 text-primary" />
                <span data-editable="formTitle">{config.formTitle}</span>
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                data-form-id="69264471607df1351ad496be"
              >
                <div>
                  <Input
                    type="text"
                    placeholder={config.namePlaceholder}
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="bg-background border-border"
                    required
                    data-editable="namePlaceholder"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder={config.emailPlaceholder}
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="bg-background border-border"
                    required
                    data-editable="emailPlaceholder"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder={config.messagePlaceholder}
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    className="bg-background border-border min-h-[120px]"
                    required
                    data-editable="messagePlaceholder"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <span data-editable="submitText">{config.submitText}</span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span data-editable="responseTime">{config.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Wifi className="h-6 w-6 text-primary" />
                  Get Connected
                </h3>

                <div className="space-y-6">
                  {config.contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">{getIcon(info.icon)}</div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          <span data-editable={`contactInfo[${idx}].label`}>{info.label}</span>
                        </h4>
                        <p className="text-muted-foreground">
                          <span data-editable={`contactInfo[${idx}].value`}>{info.value}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  Industry Certified
                </h3>
                <div className="flex flex-wrap gap-3">
                  {config.certifications.map((cert, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                    >
                      <span data-editable={`certifications[${idx}]`}>{cert}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
