'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Code, Database, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_DOWNLOAD = {
  title: 'AI-Driven Hydroponic Control System',
  subtitle: 'Complete Technical Documentation & Implementation Package',
  description:
    'Download comprehensive system architecture, code libraries, and deployment guides for autonomous greenhouse management.',
  mainPackage: {
    name: 'Complete System Package',
    version: 'v2.1.0',
    size: '847 MB',
    description:
      'Full implementation including PLC code, AI models, cloud platform, and HMI interface',
  },
  downloads: [
    {
      id: 'architecture',
      name: 'System Architecture',
      type: 'PDF Documentation',
      size: '12.4 MB',
      icon: 'FileText',
      description:
        '5-layer architecture overview, hardware specifications, and integration protocols',
    },
    {
      id: 'plc-code',
      name: 'PLC Control Logic',
      type: 'Ladder Logic & ST',
      size: '8.7 MB',
      icon: 'Code',
      description:
        'Industrial PLC code for Siemens/Delta systems with safety interlocks and MQTT communication',
    },
    {
      id: 'ai-models',
      name: 'AI Engine & Models',
      type: 'Python Package',
      size: '156 MB',
      icon: 'Database',
      description:
        'Pre-trained models for climate control, fertigation optimization, and quality analysis',
    },
  ],
  features: [
    'Real-time sensor integration (T°, RH, CO₂, pH, EC)',
    'Autonomous climate & fertigation control',
    'Computer vision for crop quality assessment',
    '4G/MQTT cloud connectivity with offline backup',
    'Industrial HMI dashboard with safety guardrails',
    'Scalable multi-zone greenhouse management',
  ],
  requirements: {
    hardware: 'Industrial PLC (Siemens S7-1200+), 4G Router, Sensor Package',
    software: 'TIA Portal v17+, Python 3.9+, Node.js 18+, TimescaleDB',
    connectivity: '4G/LTE, Ethernet, Modbus RTU/TCP, MQTT over TLS',
  },
  licenseType: 'Commercial License',
  supportLevel: 'Enterprise Support Included',
} as const;

type DownloadProps = Partial<typeof DEFAULT_DOWNLOAD>;

export default function Download(props: DownloadProps) {
  const config = { ...DEFAULT_DOWNLOAD, ...props };
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (downloadId: string, fileName: string) => {
    setDownloadingId(downloadId);

    // Simulate download process
    setTimeout(() => {
      // In real implementation, this would trigger actual file download
      const link = document.createElement('a');
      link.href = `/downloads/${downloadId}.zip`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingId(null);
    }, 2000);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      FileText: FileText,
      Code: Code,
      Database: Database,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || FileText;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="download" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Main Package Card */}
        <Card className="bg-primary text-primary-foreground mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="h-8 w-8" />
                  <h2 className="text-2xl font-bold">
                    <span data-editable="mainPackage.name">{config.mainPackage.name}</span>
                  </h2>
                  <Badge variant="secondary" className="bg-primary-foreground text-primary">
                    <span data-editable="mainPackage.version">{config.mainPackage.version}</span>
                  </Badge>
                </div>
                <p className="text-primary-foreground/90 mb-4">
                  <span data-editable="mainPackage.description">
                    {config.mainPackage.description}
                  </span>
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span data-editable="licenseType">{config.licenseType}</span>
                  </span>
                  <span>
                    Size: <span data-editable="mainPackage.size">{config.mainPackage.size}</span>
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={() => handleDownload('complete-package', config.mainPackage.name)}
                disabled={downloadingId === 'complete-package'}
              >
                <Download className="h-5 w-5 mr-2" />
                {downloadingId === 'complete-package'
                  ? 'Downloading...'
                  : 'Download Complete Package'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Individual Downloads */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {config.downloads.map((download, idx) => (
            <Card
              key={download.id}
              className="bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-primary">{getIcon(download.icon)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      <span data-editable={`downloads[${idx}].name`}>{download.name}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span data-editable={`downloads[${idx}].type`}>{download.type}</span>
                      {' • '}
                      <span data-editable={`downloads[${idx}].size`}>{download.size}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  <span data-editable={`downloads[${idx}].description`}>
                    {download.description}
                  </span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownload(download.id, download.name)}
                  disabled={downloadingId === download.id}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {downloadingId === download.id ? 'Downloading...' : 'Download'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features & Requirements */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Key Features */}
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">System Capabilities</h3>
              <ul className="space-y-3">
                {config.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      <span data-editable={`features[${idx}]`}>{feature}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Hardware</h4>
                  <p className="text-sm">
                    <span data-editable="requirements.hardware">
                      {config.requirements.hardware}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Software</h4>
                  <p className="text-sm">
                    <span data-editable="requirements.software">
                      {config.requirements.software}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Connectivity</h4>
                  <p className="text-sm">
                    <span data-editable="requirements.connectivity">
                      {config.requirements.connectivity}
                    </span>
                  </p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-medium text-primary">
                    <span data-editable="supportLevel">{config.supportLevel}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
