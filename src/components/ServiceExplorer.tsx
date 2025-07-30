import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Cloud, 
  Database, 
  Server, 
  Zap, 
  Shield, 
  Search,
  Filter,
  Star,
  Gift
} from "lucide-react";
import { cloudServices, categories, type CloudService } from "@/data/services";

const ServiceExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [showFreeTier, setShowFreeTier] = useState(false);
  const [showPopular, setShowPopular] = useState(false);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-aws text-white';
      case 'Azure': return 'bg-azure text-white';
      case 'GCP': return 'bg-gcp-primary text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Compute': return Server;
      case 'Storage': return Database;
      case 'AI/ML': return Zap;
      case 'Security': return Shield;
      case 'Serverless': return Cloud;
      default: return Cloud;
    }
  };

  const filteredServices = cloudServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesProvider = selectedProvider === "all" || service.provider === selectedProvider;
    const matchesFreeTier = !showFreeTier || service.freeTier;
    const matchesPopular = !showPopular || service.popular;
    
    return matchesSearch && matchesCategory && matchesProvider && matchesFreeTier && matchesPopular;
  });

  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredServices.filter(service => service.category === category);
    return acc;
  }, {} as Record<string, CloudService[]>);

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
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
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

            <div className="flex gap-2">
              <Button
                variant={showFreeTier ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFreeTier(!showFreeTier)}
                className="flex-1"
              >
                <Gift className="h-4 w-4 mr-1" />
                Free Tier
              </Button>
              <Button
                variant={showPopular ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPopular(!showPopular)}
                className="flex-1"
              >
                <Star className="h-4 w-4 mr-1" />
                Popular
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredServices.length} services
          </div>
        </CardContent>
      </Card>

      {/* Services by Category */}
      <div className="space-y-8">
        {categories.map((category) => {
          const services = servicesByCategory[category];
          if (services.length === 0) return null;

          const CategoryIcon = getCategoryIcon(category);

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <CategoryIcon className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-semibold">{category}</h3>
                <Badge variant="secondary">{services.length} services</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card 
                    key={service.id} 
                    className="hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {service.name}
                            <Badge className={getProviderColor(service.provider)}>
                              {service.provider}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {service.description}
                          </CardDescription>
                        </div>
                        {service.popular && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">Pricing</p>
                          <p className="text-lg font-semibold text-primary">{service.pricing}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Key Features</p>
                          <div className="space-y-1">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {service.freeTier && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Gift className="h-3 w-3 mr-1" />
                              Free Tier
                            </Badge>
                          )}
                          {service.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Available in {service.regions.length} regions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Cloud className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceExplorer;