'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Cpu, Settings, Zap, FileText, Phone, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'HydroAI Control',
  brandTagline: 'Autonomous AI-Driven Hydroponic Control Systems',
  navItems: [
    { label: 'Home', href: '/', icon: 'Home' },
    { label: 'System Overview', href: '#hero', icon: 'Cpu' },
    { label: 'Architecture', href: '#features', icon: 'Settings' },
    { label: 'Benefits', href: '#benefits', icon: 'Zap' },
    { label: 'Technical Docs', href: '/technical', icon: 'FileText' },
    { label: 'Contact', href: '#contact', icon: 'Phone' },
  ],
  ctaText: 'Get Started',
  ctaHref: '#contact',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Home: Home,
      Cpu: Cpu,
      Settings: Settings,
      Zap: Zap,
      FileText: FileText,
      Phone: Phone,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Home;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <section id="navigation">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span
                  data-editable="brandName"
                  className="text-lg font-bold text-foreground leading-tight"
                >
                  {config.brandName}
                </span>
                <span
                  data-editable="brandTagline"
                  className="text-xs text-muted-foreground hidden sm:block leading-tight"
                >
                  {config.brandTagline}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {config.navItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                  className="text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {getIcon(item.icon)}
                  <span data-editable={`navItems[${idx}].label`} className="ml-2">
                    {item.label}
                  </span>
                </Button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                onClick={() => handleNavClick(config.ctaHref)}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card text-card-foreground">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span
                        data-editable="brandName"
                        className="text-lg font-bold text-card-foreground"
                      >
                        {config.brandName}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2">
                      {config.navItems.map((item, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="lg"
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`navItems[${idx}].href`}
                          data-href={item.href}
                          className="w-full justify-start text-card-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          {getIcon(item.icon)}
                          <span data-editable={`navItems[${idx}].label`} className="ml-3">
                            {item.label}
                          </span>
                        </Button>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={() => handleNavClick(config.ctaHref)}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      size="lg"
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
