import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowRight,
  Check,
  X,
  DollarSign,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import { cloudServices, categories, getServicesByCategory } from "@/data/services";

const ServiceComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState("Compute");
  const [comparisonServices, setComparisonServices] = useState<string[]>([]);

  const categoryServices = getServicesByCategory(selectedCategory);
  
  // Group services by provider for comparison
  const servicesByProvider = {
    AWS: categoryServices.filter(s => s.provider === 'AWS'),
    Azure: categoryServices.filter(s => s.provider === 'Azure'),
    GCP: categoryServices.filter(s => s.provider === 'GCP')
  };

  // Get equivalent services for comparison
  const getEquivalentServices = () => {
    const equivalents = [];
    const maxServices = Math.max(
      servicesByProvider.AWS.length,
      servicesByProvider.Azure.length,
      servicesByProvider.GCP.length
    );

    for (let i = 0; i < maxServices; i++) {
      equivalents.push({
        aws: servicesByProvider.AWS[i] || null,
        azure: servicesByProvider.Azure[i] || null,
        gcp: servicesByProvider.GCP[i] || null
      });
    }

    return equivalents;
  };

  const equivalentServices = getEquivalentServices();

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'border-l-aws bg-aws/5';
      case 'Azure': return 'border-l-azure bg-azure/5';
      case 'GCP': return 'border-l-gcp-primary bg-gcp-primary/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const toggleServiceComparison = (serviceId: string) => {
    setComparisonServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : prev.length < 3 ? [...prev, serviceId] : prev
    );
  };

  const selectedServices = cloudServices.filter(s => comparisonServices.includes(s.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Service Comparison</h2>
        <p className="text-muted-foreground">
          Compare equivalent services across cloud providers
        </p>
      </div>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
          <CardDescription>
            Choose a service category to compare offerings from AWS, Azure, and Google Cloud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Service Comparison Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          {selectedCategory} Services Comparison
        </h3>
        
        {equivalentServices.map((serviceGroup, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
                {/* AWS Service */}
                <div className={`p-4 sm:p-6 ${getProviderColor('AWS')} border-l-4`}>
                  {serviceGroup.aws ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{serviceGroup.aws.name}</h4>
                          <Badge className="bg-aws text-white mt-1">AWS</Badge>
                        </div>
                        <Button
                          variant={comparisonServices.includes(serviceGroup.aws.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleServiceComparison(serviceGroup.aws.id)}
                          disabled={!comparisonServices.includes(serviceGroup.aws.id) && comparisonServices.length >= 3}
                        >
                          {comparisonServices.includes(serviceGroup.aws.id) ? "Remove" : "Compare"}
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {serviceGroup.aws.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-aws" />
                          <span className="font-medium">{serviceGroup.aws.pricing}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-aws" />
                          <span className="text-sm">{serviceGroup.aws.regions.length} regions</span>
                        </div>
                        
                        {serviceGroup.aws.freeTier && (
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Free Tier Available</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Key Features:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {serviceGroup.aws.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-aws mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <X className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No equivalent service</p>
                    </div>
                  )}
                </div>

                {/* Azure Service */}
                <div className={`p-4 sm:p-6 ${getProviderColor('Azure')} border-l-4`}>
                  {serviceGroup.azure ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{serviceGroup.azure.name}</h4>
                          <Badge className="bg-azure text-white mt-1">Azure</Badge>
                        </div>
                        <Button
                          variant={comparisonServices.includes(serviceGroup.azure.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleServiceComparison(serviceGroup.azure.id)}
                          disabled={!comparisonServices.includes(serviceGroup.azure.id) && comparisonServices.length >= 3}
                        >
                          {comparisonServices.includes(serviceGroup.azure.id) ? "Remove" : "Compare"}
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {serviceGroup.azure.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-azure" />
                          <span className="font-medium">{serviceGroup.azure.pricing}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-azure" />
                          <span className="text-sm">{serviceGroup.azure.regions.length} regions</span>
                        </div>
                        
                        {serviceGroup.azure.freeTier && (
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Free Tier Available</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Key Features:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {serviceGroup.azure.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-azure mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <X className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No equivalent service</p>
                    </div>
                  )}
                </div>

                {/* GCP Service */}
                <div className={`p-4 sm:p-6 ${getProviderColor('GCP')} border-l-4`}>
                  {serviceGroup.gcp ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{serviceGroup.gcp.name}</h4>
                          <Badge className="bg-gcp-primary text-white mt-1">GCP</Badge>
                        </div>
                        <Button
                          variant={comparisonServices.includes(serviceGroup.gcp.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleServiceComparison(serviceGroup.gcp.id)}
                          disabled={!comparisonServices.includes(serviceGroup.gcp.id) && comparisonServices.length >= 3}
                        >
                          {comparisonServices.includes(serviceGroup.gcp.id) ? "Remove" : "Compare"}
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {serviceGroup.gcp.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gcp-primary" />
                          <span className="font-medium">{serviceGroup.gcp.pricing}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gcp-primary" />
                          <span className="text-sm">{serviceGroup.gcp.regions.length} regions</span>
                        </div>
                        
                        {serviceGroup.gcp.freeTier && (
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Free Tier Available</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Key Features:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {serviceGroup.gcp.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-gcp-primary mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <X className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No equivalent service</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      {selectedServices.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
            <CardDescription>
              Side-by-side comparison of selected services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Attribute</TableHead>
                    {selectedServices.map((service) => (
                      <TableHead key={service.id} className="text-center">
                        <div className="space-y-1">
                          <div className="font-semibold">{service.name}</div>
                          <Badge className={
                            service.provider === 'AWS' ? 'bg-aws text-white' :
                            service.provider === 'Azure' ? 'bg-azure text-white' :
                            'bg-gcp-primary text-white'
                          }>
                            {service.provider}
                          </Badge>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Pricing</TableCell>
                    {selectedServices.map((service) => (
                      <TableCell key={service.id} className="text-center">
                        {service.pricing}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Free Tier</TableCell>
                    {selectedServices.map((service) => (
                      <TableCell key={service.id} className="text-center">
                        {service.freeTier ? (
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Regions</TableCell>
                    {selectedServices.map((service) => (
                      <TableCell key={service.id} className="text-center">
                        {service.regions.length}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Features</TableCell>
                    {selectedServices.map((service) => (
                      <TableCell key={service.id} className="text-center">
                        <div className="text-sm space-y-1">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <div key={i}>{feature}</div>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceComparison;