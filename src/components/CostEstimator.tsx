import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket,
  CheckCircle,
  XCircle,
  DollarSign,
  Server,
  Database,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  MapPin,
  Settings,
  FileText,
  ArrowRight
} from "lucide-react";
import { cloudServices } from "@/data/services";

const CostEstimator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentProvider, setCurrentProvider] = useState("aws");
  const [targetProvider, setTargetProvider] = useState("gcp");
  const [migrationComplexity, setMigrationComplexity] = useState("medium");
  const [selectedSpecificService, setSelectedSpecificService] = useState("none");
  const [availableServices, setAvailableServices] = useState([]);

  // Filter services based on selected provider
  useEffect(() => {
    const filtered = cloudServices.filter(service => 
      currentProvider === "on-premise" ? true : service.provider.toLowerCase() === currentProvider
    );
    setAvailableServices(filtered);
    setSelectedSpecificService("none"); // Reset service selection when provider changes
  }, [currentProvider]);

  const serviceOptions = [
    { id: "compute", name: "Compute/VMs", icon: Server },
    { id: "storage", name: "Storage", icon: Database },
    { id: "database", name: "Database", icon: Database },
    { id: "serverless", name: "Serverless", icon: Zap },
    { id: "networking", name: "Networking", icon: Globe },
    { id: "security", name: "Security", icon: Shield }
  ];

  const getEquivalentService = (sourceService, targetProv) => {
    const mappings = {
      "aws-s3": {
        azure: "Azure Blob Storage",
        gcp: "Google Cloud Storage"
      },
      "aws-ec2": {
        azure: "Azure Virtual Machines", 
        gcp: "Google Compute Engine"
      },
      "aws-rds": {
        azure: "Azure SQL Database",
        gcp: "Google Cloud SQL"
      },
      "aws-lambda": {
        azure: "Azure Functions",
        gcp: "Google Cloud Functions"
      }
    };
    return mappings[sourceService]?.[targetProv] || "Manual assessment needed";
  };

  const getMigrationStrategy = () => {
    const strategies = {
      simple: {
        duration: "2-4 weeks",
        approach: "Lift and Shift",
        description: "Direct migration with minimal changes to existing architecture",
        effort: "Low",
        riskLevel: "Low",
        tools: ["AWS Application Migration Service", "Azure Migrate", "Google Cloud Migrate for Compute Engine"]
      },
      medium: {
        duration: "1-3 months", 
        approach: "Re-platform",
        description: "Some optimization and cloud-native service adoption",
        effort: "Medium",
        riskLevel: "Medium", 
        tools: ["AWS Database Migration Service", "Azure Database Migration Service", "Google Database Migration Service"]
      },
      complex: {
        duration: "3-12 months",
        approach: "Re-architect", 
        description: "Complete redesign using cloud-native patterns and services",
        effort: "High",
        riskLevel: "High",
        tools: ["Custom migration tools", "Professional services", "Multi-phase approach"]
      }
    };
    return strategies[migrationComplexity];
  };

  const getProviderAdvice = (provider) => {
    const advice = {
      aws: {
        strengths: ["Largest service portfolio", "Mature ecosystem", "Extensive documentation"],
        considerations: ["Can be complex to navigate", "Pricing can vary by region significantly"]
      },
      azure: {
        strengths: ["Great Microsoft integration", "Strong hybrid capabilities", "Enterprise-focused"],
        considerations: ["Learning curve for non-Microsoft shops", "Some services newer than AWS equivalents"]
      },
      gcp: {
        strengths: ["Competitive pricing", "Strong AI/ML services", "Simplified management"],
        considerations: ["Smaller service portfolio", "Less third-party integrations"]
      }
    };
    return advice[provider];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Rocket className="h-8 w-8 text-primary" />
          Migration Planner & Cost-Saving Tips
          <Badge variant="secondary" className="ml-2">Beta</Badge>
        </h2>
        <p className="text-muted-foreground">
          Plan your cloud migration strategy and discover cost optimization opportunities
        </p>
        <div className="mt-4 max-w-2xl mx-auto p-3 bg-muted/50 rounded-md border-l-4 border-primary">
          <p className="text-sm text-muted-foreground text-center">
            🚧 <strong>Work in Progress:</strong> More advanced features and migration tools coming soon! 
            Current version provides basic guidance and cost-saving tips.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Migration Configuration */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Migration Configuration
              </CardTitle>
              <CardDescription>
                Configure your migration parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Provider</label>
                <Select value={currentProvider} onValueChange={setCurrentProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                    <SelectItem value="on-premise">On-Premise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Provider</label>
                <Select value={targetProvider} onValueChange={setTargetProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Migration Complexity</label>
                <Select value={migrationComplexity} onValueChange={setMigrationComplexity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple (Few dependencies)</SelectItem>
                    <SelectItem value="medium">Medium (Some integration)</SelectItem>
                    <SelectItem value="complex">Complex (Highly integrated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Services to Migrate</label>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                  {serviceOptions.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <Button
                        key={service.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedServices(selectedServices.filter(s => s !== service.id));
                          } else {
                            setSelectedServices([...selectedServices, service.id]);
                          }
                        }}
                        className="flex items-center gap-1 text-xs h-8"
                      >
                        <Icon className="h-3 w-3" />
                        {service.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {availableServices.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specific Service (Optional)</label>
                  <Select value={selectedSpecificService} onValueChange={setSelectedSpecificService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specific service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None selected</SelectItem>
                      {availableServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {service.description.substring(0, 40)}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Migration Strategy & Tips */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Migration Strategy & Cost Optimization
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Migration Overview */}
              <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-primary">Your Migration Plan</h3>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                  <div>
                    <span className="font-medium">Strategy:</span>
                    <p className="text-muted-foreground">{getMigrationStrategy().approach}</p>
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>
                    <p className="text-muted-foreground">{getMigrationStrategy().duration}</p>
                  </div>
                  <div>
                    <span className="font-medium">Effort:</span>
                    <p className="text-muted-foreground">{getMigrationStrategy().effort}</p>
                  </div>
                  <div>
                    <span className="font-medium">Services:</span>
                    <p className="text-muted-foreground">{selectedServices.length} selected</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {getMigrationStrategy().description}
                </p>
                {selectedSpecificService && selectedSpecificService !== "none" && (
                  <div className="mt-3 p-2 bg-background rounded border">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Service Migration:</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      {cloudServices.find(s => s.id === selectedSpecificService)?.name} → {getEquivalentService(selectedSpecificService, targetProvider)}
                    </p>
                  </div>
                )}
              </div>

              {/* Tabs for detailed information */}
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="strategy">Migration Strategy</TabsTrigger>
                  <TabsTrigger value="plan">Migration Plan</TabsTrigger>
                  <TabsTrigger value="dosdonts">Do's & Don'ts</TabsTrigger>
                  <TabsTrigger value="costtips">Cost-Saving Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strategy" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Migration Approach
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Strategy:</span>
                            <Badge variant="outline">{getMigrationStrategy().approach}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Risk Level:</span>
                            <Badge variant={getMigrationStrategy().riskLevel === 'Low' ? 'default' : 
                                           getMigrationStrategy().riskLevel === 'Medium' ? 'secondary' : 'destructive'}>
                              {getMigrationStrategy().riskLevel}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Duration:</span>
                            <span>{getMigrationStrategy().duration}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Effort Level:</span>
                            <span>{getMigrationStrategy().effort}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded">
                          {getMigrationStrategy().description}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Target Provider Benefits</h4>
                        <div className="space-y-1 text-sm">
                          {getProviderAdvice(targetProvider).strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="font-medium text-orange-600">Considerations:</p>
                          {getProviderAdvice(targetProvider).considerations.map((consideration, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{consideration}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="plan" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          Pre-Migration Checklist
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Complete data inventory and dependency mapping</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Perform security and compliance assessment</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Configure network connectivity and firewall rules</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Set up backup and rollback procedures</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Prepare disaster recovery plan</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Settings className="h-4 w-4 text-purple-600" />
                          Recommended Tools
                        </h4>
                        <div className="space-y-2 text-sm">
                          {getMigrationStrategy().tools.map((tool, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Settings className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span>{tool}</span>
                            </div>
                          ))}
                        </div>
                        {migrationComplexity === "complex" && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
                            <p className="font-medium text-yellow-800">Recommendation:</p>
                            <p className="text-yellow-700">Consider engaging professional services for complex migrations.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          Timeline & Phases
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium">Phase 1: Assessment</p>
                            <p className="text-muted-foreground">1-2 weeks</p>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium">Phase 2: Planning</p>
                            <p className="text-muted-foreground">1-2 weeks</p>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium">Phase 3: Migration</p>
                            <p className="text-muted-foreground">{getMigrationStrategy().duration}</p>
                          </div>
                          <div className="border-l-2 border-primary pl-3">
                            <p className="font-medium">Phase 4: Optimization</p>
                            <p className="text-muted-foreground">Ongoing</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="dosdonts" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Migration Do's
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Start with a pilot project to validate approach</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Implement proper backup and disaster recovery</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Use infrastructure as code (Terraform, CloudFormation)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Set up comprehensive monitoring and alerting</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Train your team on the new platform</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Plan for data migration testing and validation</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          Migration Don'ts
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't migrate everything at once</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't ignore network latency and bandwidth limits</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't skip security and compliance review</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't forget about storage configuration optimization</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't underestimate the learning curve</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>Don't neglect cost monitoring from day one</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="costtips" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-green-600">Instance Optimization</h4>
                        </div>
                        <div className="space-y-2 text-sm text-left">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Use reserved instances for 30-60% savings on predictable workloads</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Leverage spot instances for batch processing (up to 90% savings)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Right-size VMs based on actual usage patterns</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Use burstable instances for variable workloads</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Database className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-600">Storage & Data</h4>
                        </div>
                        <div className="space-y-2 text-sm text-left">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Implement tiered storage (hot, warm, cold, archive)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Set up lifecycle policies for automated archiving</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Choose the right region for data residency and cost</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Compress and deduplicate data where possible</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Zap className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-600">Automation & Scaling</h4>
                        </div>
                        <div className="space-y-2 text-sm text-left">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Implement auto-scaling to match demand</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Use serverless for event-driven workloads</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Leverage free tiers and credits effectively</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>Set up cost alerts and budget monitoring</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;