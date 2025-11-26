'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, Cpu, Wifi, Mail, Phone, MapPin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'HydroAI Systems',
  tagline: 'Autonomous AI-Driven Hydroponic Control Systems for Next-Generation Agriculture',
  description:
    'Leading provider of industrial IoT solutions for precision agriculture and autonomous greenhouse management.',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Case Studies', href: '/case-studies' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Data Security', href: '/security' },
  ],

  // Social Links
  socialLinks: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/hydroai' },
    { label: 'GitHub', href: 'https://github.com/hydroai' },
    { label: 'Documentation', href: '/docs' },
  ],

  // Contact Info
  email: 'contact@hydroai-systems.com',
  phone: '+1 (555) 123-4567',
  address: 'Industrial IoT Center, Silicon Valley, CA',

  // Certifications
  certifications: [
    'ISO 27001 Certified',
    'Industrial IoT Compliant',
    'Agricultural Safety Standards',
  ],

  // Copyright
  copyrightYear: '2024',
  copyrightText: 'All rights reserved.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span data-editable="email">{config.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span data-editable="address">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <nav className="space-y-2">
              {config.companyLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`companyLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="space-y-2">
              {config.legalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Certifications */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Certifications & Compliance</h4>
          </div>
          <div className="flex flex-wrap gap-4">
            {config.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
              >
                <span data-editable={`certifications[${idx}]`}>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © <span data-editable="copyrightYear">{config.copyrightYear}</span>{' '}
            <span data-editable="companyName">{config.companyName}</span>.{' '}
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {config.socialLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(link.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={link.href}
              >
                <Wifi className="h-4 w-4 mr-1" />
                <span data-editable={`socialLinks[${idx}].label`}>{link.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
