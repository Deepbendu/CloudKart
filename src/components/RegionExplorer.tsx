import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Globe,
  MapPin,
  Check,
  X,
  Zap
} from "lucide-react";
import { cloudServices, getServicesByProvider, type CloudService } from "@/data/services";

const RegionExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState("us-east-1");

  // Region mappings for different providers
  const regionMappings = {
    'us-east-1': {
      aws: 'us-east-1',
      azure: 'eastus',
      gcp: 'us-central1',
      display: 'US East (N. Virginia / East US / Central)'
    },
    'us-west-2': {
      aws: 'us-west-2',
      azure: 'westus2',
      gcp: 'us-west1',
      display: 'US West (Oregon / West US 2 / West)'
    },
    'eu-west-1': {
      aws: 'eu-west-1',
      azure: 'westeurope',
      gcp: 'europe-west1',
      display: 'Europe (Ireland / West Europe / West)'
    },
    'ap-southeast-1': {
      aws: 'ap-southeast-1',
      azure: 'southeastasia',
      gcp: 'asia-southeast1',
      display: 'Asia Pacific (Singapore / Southeast Asia)'
    }
  };

  const regions = Object.keys(regionMappings);
  const currentRegion = regionMappings[selectedRegion as keyof typeof regionMappings];

  const getServiceAvailability = (service: any) => {
    const regionToCheck = currentRegion[service.provider.toLowerCase() as keyof typeof currentRegion];
    return service.regions.includes(regionToCheck);
  };

  const awsServices = getServicesByProvider('AWS');
  const azureServices = getServicesByProvider('Azure');
  const gcpServices = getServicesByProvider('GCP');

  const getAvailabilityStats = () => {
    const stats = {
      AWS: { available: 0, total: awsServices.length },
      Azure: { available: 0, total: azureServices.length },
      GCP: { available: 0, total: gcpServices.length }
    };

    awsServices.forEach(service => {
      if (getServiceAvailability(service)) stats.AWS.available++;
    });
    azureServices.forEach(service => {
      if (getServiceAvailability(service)) stats.Azure.available++;
    });
    gcpServices.forEach(service => {
      if (getServiceAvailability(service)) stats.GCP.available++;
    });

    return stats;
  };

  const stats = getAvailabilityStats();

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'text-aws';
      case 'Azure': return 'text-azure';
      case 'GCP': return 'text-gcp-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getProviderBadgeColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-aws text-white';
      case 'Azure': return 'bg-azure text-white';
      case 'GCP': return 'bg-gcp-primary text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Region Explorer</h2>
        <p className="text-muted-foreground">
          Explore service availability across different cloud regions
        </p>
      </div>

      {/* Region Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Region
          </CardTitle>
          <CardDescription>
            Choose a region to see service availability across providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {regionMappings[region as keyof typeof regionMappings].display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-medium">
                {currentRegion.display}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(([provider, data]) => (
          <Card key={provider}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className={getProviderBadgeColor(provider)}>
                  {provider}
                </Badge>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getProviderColor(provider)}`}>
                    {data.available}/{data.total}
                  </div>
                  <div className="text-sm text-muted-foreground">services</div>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    provider === 'AWS' ? 'bg-aws' :
                    provider === 'Azure' ? 'bg-azure' :
                    'bg-gcp-primary'
                  }`}
                  style={{ width: `${(data.available / data.total) * 100}%` }}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                {Math.round((data.available / data.total) * 100)}% availability
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Availability Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Availability</CardTitle>
          <CardDescription>
            Detailed breakdown of service availability in {currentRegion.display}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">AWS</TableHead>
                  <TableHead className="text-center">Azure</TableHead>
                  <TableHead className="text-center">GCP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Group services by category and name for comparison */}
                {Object.entries(
                  cloudServices.reduce((acc, service) => {
                    const key = `${service.category}-${service.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                    if (!acc[key]) {
                      acc[key] = {
                        category: service.category,
                        services: { AWS: null as CloudService | null, Azure: null as CloudService | null, GCP: null as CloudService | null }
                      };
                    }
                    acc[key].services[service.provider] = service;
                    return acc;
                  }, {} as Record<string, { category: string; services: { AWS: CloudService | null; Azure: CloudService | null; GCP: CloudService | null } }>)
                ).map(([key, group]) => {
                  const serviceName = Object.values(group.services).find((s: CloudService | null) => s !== null)?.name || 'Unknown';
                  
                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{serviceName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{group.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {group.services.AWS ? (
                          getServiceAvailability(group.services.AWS) ? (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <X className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Not Available</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">No Equivalent</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {group.services.Azure ? (
                          getServiceAvailability(group.services.Azure) ? (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <X className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Not Available</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">No Equivalent</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {group.services.GCP ? (
                          getServiceAvailability(group.services.GCP) ? (
                            <div className="flex items-center justify-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <X className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Not Available</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">No Equivalent</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Region Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Region Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-aws">AWS Region</h4>
              <p className="text-sm text-muted-foreground mb-1">Region Code:</p>
              <p className="font-mono text-sm">{currentRegion.aws}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-azure">Azure Region</h4>
              <p className="text-sm text-muted-foreground mb-1">Region Code:</p>
              <p className="font-mono text-sm">{currentRegion.azure}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-gcp-primary">GCP Region</h4>
              <p className="text-sm text-muted-foreground mb-1">Region Code:</p>
              <p className="font-mono text-sm">{currentRegion.gcp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionExplorer;