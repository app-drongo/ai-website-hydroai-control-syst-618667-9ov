'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CONTACT = {
  title: 'Contact Our Technical Team',
  subtitle: 'Get expert support for your AI-driven hydroponic control systems',
  description:
    'Our engineers are ready to help you optimize your greenhouse automation, troubleshoot system issues, or discuss custom implementations.',

  // Contact Information
  address: '1247 Innovation Drive, AgTech Park, CA 94025',
  phone: '+1 (555) 123-4567',
  email: 'support@hydrotech-ai.com',
  hours: '24/7 Technical Support Available',

  // Contact Methods
  contactMethods: [
    {
      icon: 'phone',
      title: 'Emergency Support',
      value: '+1 (555) 911-GROW',
      description: 'Critical system failures',
    },
    {
      icon: 'mail',
      title: 'Technical Inquiries',
      value: 'engineering@hydrotech-ai.com',
      description: 'System optimization & customization',
    },
    {
      icon: 'clock',
      title: 'Response Time',
      value: '< 2 hours',
      description: 'Average first response',
    },
  ],

  // Form Fields
  formTitle: 'Technical Support Request',
  namePlaceholder: 'Your Name',
  emailPlaceholder: 'your.email@company.com',
  systemPlaceholder: 'System ID or Location',
  messagePlaceholder:
    'Describe your technical issue, system requirements, or optimization goals...',
  submitText: 'Send Technical Request',

  // Success Message
  successTitle: 'Request Submitted Successfully',
  successMessage:
    'Our technical team will review your request and respond within 2 hours during business hours.',

  // Specialties
  specialties: [
    'PLC Integration & Programming',
    'AI Model Optimization',
    'Sensor Calibration & Maintenance',
  ],
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const navigate = useSmartNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    system: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-muted-foreground max-w-4xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid gap-6">
              {config.contactMethods.map((method, idx) => (
                <Card key={idx} className="bg-card text-card-foreground border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        {getIcon(method.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          <span data-editable={`contactMethods[${idx}].title`}>{method.title}</span>
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          <span data-editable={`contactMethods[${idx}].value`}>{method.value}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span data-editable={`contactMethods[${idx}].description`}>
                            {method.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Information */}
            <Card className="bg-muted text-muted-foreground border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Headquarters</p>
                      <p className="text-sm">
                        <span data-editable="address">{config.address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Availability</p>
                      <p className="text-sm">
                        <span data-editable="hours">{config.hours}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Technical Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {config.specialties.map((specialty, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    <span data-editable={`specialties[${idx}]`}>{specialty}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-2xl">
                <span data-editable="formTitle">{config.formTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-form-id="69264498607df1351ad496c1"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Input
                        placeholder={config.namePlaceholder}
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        required
                        className="bg-background border-border"
                        data-editable="namePlaceholder"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder={config.emailPlaceholder}
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        required
                        className="bg-background border-border"
                        data-editable="emailPlaceholder"
                      />
                    </div>
                  </div>

                  <Input
                    placeholder={config.systemPlaceholder}
                    value={formData.system}
                    onChange={e => handleInputChange('system', e.target.value)}
                    className="bg-background border-border"
                    data-editable="systemPlaceholder"
                  />

                  <Textarea
                    placeholder={config.messagePlaceholder}
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    required
                    rows={6}
                    className="bg-background border-border resize-none"
                    data-editable="messagePlaceholder"
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    <span data-editable="successTitle">{config.successTitle}</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    <span data-editable="successMessage">{config.successMessage}</span>
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-border"
                  >
                    Send Another Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
