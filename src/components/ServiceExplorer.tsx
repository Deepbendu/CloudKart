import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter,
  ExternalLink,
  Server,
  Database,
  Zap,
  Shield,
  Globe,
  Code2,
  Container,
  BarChart,
  Network
} from "lucide-react";
import { cloudServices, categories } from "@/data/services";

const ServiceExplorer = ({ initialCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");

  // Set category based on prop or URL parameter
  useEffect(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      setSelectedCategory(initialCategory);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      if (categoryParam && categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
        // Clear the URL parameter after setting the category
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [initialCategory]);

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'AWS': return 'bg-aws text-white';
      case 'Azure': return 'bg-azure text-white';
      case 'GCP': return 'bg-gcp-primary text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compute': return Server;
      case 'Storage': return Database;
      case 'Database': return Database;
      case 'Serverless': return Zap;
      case 'AI/ML': return Zap;
      case 'Security': return Shield;
      case 'Networking': return Network;
      case 'DevOps': return Code2;
      case 'Containers': return Container;
      case 'Analytics': return BarChart;
      default: return Globe;
    }
  };

  const getServiceTypeTag = (service) => {
    // Generate functional tags based on service features and category
    if (service.category === 'Compute') return 'Virtual Machines';
    if (service.category === 'Storage') return 'Data Storage';
    if (service.category === 'Database') return 'Data Management';
    if (service.category === 'Serverless') return 'Event-Driven';
    if (service.category === 'AI/ML') return 'Machine Learning';
    if (service.category === 'Security') return 'Access Control';
    if (service.category === 'Networking') return 'Network Infrastructure';
    if (service.category === 'DevOps') return 'Automation';
    if (service.category === 'Containers') return 'Container Management';
    if (service.category === 'Analytics') return 'Data Analytics';
    return 'Cloud Service';
  };

  // Filter services based on search term, category, and provider
  const filteredServices = cloudServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesProvider = selectedProvider === "all" || service.provider === selectedProvider;
    
    return matchesSearch && matchesCategory && matchesProvider;
  });

  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cloud Service Explorer</h2>
        <p className="text-muted-foreground">
          Discover and compare cloud services across AWS, Azure, and Google Cloud
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Find the perfect cloud services for your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Services</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Provider</label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="All Providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Azure">Azure</SelectItem>
                  <SelectItem value="GCP">Google Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedProvider("all");
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services by Category */}
      {Object.keys(servicesByCategory).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(servicesByCategory).map(([category, services]) => {
            const CategoryIcon = getCategoryIcon(category);
            const serviceArray = Array.isArray(services) ? services : [];
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <CategoryIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">{category}</h3>
                  <Badge variant="outline">{serviceArray.length} services</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {serviceArray.map((service) => (
                    <Card key={service.id} className="h-full hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge className={getProviderColor(service.provider)}>
                                {service.provider}
                              </Badge>
                              <Badge variant="secondary">
                                {getServiceTypeTag(service)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Pricing:</span>
                            <span className="text-sm">{service.pricing}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Regions:</span>
                            <span className="text-sm">{service.regions.length} available</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-sm font-medium">Key Features:</span>
                          <div className="flex flex-wrap gap-1">
                            {service.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            {service.freeTier && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Free Tier
                              </Badge>
                            )}
                            {service.popular && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          
                          {service.documentationUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="h-8 px-2"
                            >
                              <a 
                                href={service.documentationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span className="text-xs">Docs</span>
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find the services you're looking for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceExplorer;