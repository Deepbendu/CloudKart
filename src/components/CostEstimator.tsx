import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Server,
  Database,
  Zap
} from "lucide-react";

const CostEstimator = () => {
  const [computeHours, setComputeHours] = useState("730"); // Default to 730 hours (1 month)
  const [storageGB, setStorageGB] = useState("100");
  const [requests, setRequests] = useState("100000");
  const [region, setRegion] = useState("us-east-1");
  const [instanceType, setInstanceType] = useState("t3.medium");

  // Simplified pricing calculations (in reality, these would come from APIs)
  const calculateCosts = () => {
    const hours = parseFloat(computeHours) || 0;
    const storage = parseFloat(storageGB) || 0;
    const reqs = parseFloat(requests) || 0;

    // AWS Pricing (simplified)
    const awsCompute = hours * 0.0416; // t3.medium hourly rate
    const awsStorage = storage * 0.023; // S3 standard
    const awsRequests = (reqs / 1000) * 0.0004; // S3 requests
    const awsTotal = awsCompute + awsStorage + awsRequests;

    // Azure Pricing (simplified)
    const azureCompute = hours * 0.0548; // B2s equivalent (higher than AWS)
    const azureStorage = storage * 0.0208; // Blob storage
    const azureRequests = (reqs / 10000) * 0.004;
    const azureTotal = azureCompute + azureStorage + azureRequests;

    // GCP Pricing (simplified) - Most competitive
    const gcpCompute = hours * 0.0389; // e2-standard-2 (competitive pricing)
    const gcpStorage = storage * 0.020; // Cloud Storage
    const gcpRequests = (reqs / 1000) * 0.0004;
    const gcpTotal = gcpCompute + gcpStorage + gcpRequests;

    return {
      aws: { compute: awsCompute, storage: awsStorage, requests: awsRequests, total: awsTotal },
      azure: { compute: azureCompute, storage: azureStorage, requests: azureRequests, total: azureTotal },
      gcp: { compute: gcpCompute, storage: gcpStorage, requests: gcpRequests, total: gcpTotal }
    };
  };

  const costs = calculateCosts();
  const cheapest = Object.entries(costs).reduce((a, b) => 
    costs[a[0] as keyof typeof costs].total < costs[b[0] as keyof typeof costs].total ? a : b
  )[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cloud Cost Estimator</h2>
        <p className="text-muted-foreground">
          Calculate and compare monthly costs across cloud providers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Usage Parameters
              </CardTitle>
              <CardDescription>
                Enter your expected monthly usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="compute-hours">Compute Hours/Month</Label>
                <Input
                  id="compute-hours"
                  type="number"
                  value={computeHours}
                  onChange={(e) => setComputeHours(e.target.value)}
                  placeholder="730"
                />
                <p className="text-xs text-muted-foreground">
                  730 hours = 24/7 for one month
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage">Storage (GB)</Label>
                <Input
                  id="storage"
                  type="number"
                  value={storageGB}
                  onChange={(e) => setStorageGB(e.target.value)}
                  placeholder="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests">API Requests/Month</Label>
                <Input
                  id="requests"
                  type="number"
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Primary Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instance-type">Instance Type</Label>
                <Select value={instanceType} onValueChange={setInstanceType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="t3.small">Small (1 vCPU, 2GB RAM)</SelectItem>
                    <SelectItem value="t3.medium">Medium (2 vCPU, 4GB RAM)</SelectItem>
                    <SelectItem value="t3.large">Large (2 vCPU, 8GB RAM)</SelectItem>
                    <SelectItem value="t3.xlarge">XLarge (4 vCPU, 16GB RAM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Comparison */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Monthly Cost Comparison
              </CardTitle>
              <CardDescription>
                Estimated monthly costs based on your usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* AWS Cost */}
                <Card className={`${cheapest === 'aws' ? 'ring-2 ring-aws border-aws' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-aws text-white">AWS</Badge>
                      {cheapest === 'aws' && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Cheapest
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-aws mb-2">
                      {formatCurrency(costs.aws.total)}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compute:</span>
                        <span>{formatCurrency(costs.aws.compute)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span>{formatCurrency(costs.aws.storage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Requests:</span>
                        <span>{formatCurrency(costs.aws.requests)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Azure Cost */}
                <Card className={`${cheapest === 'azure' ? 'ring-2 ring-azure border-azure' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-azure text-white">Azure</Badge>
                      {cheapest === 'azure' && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Cheapest
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-azure mb-2">
                      {formatCurrency(costs.azure.total)}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compute:</span>
                        <span>{formatCurrency(costs.azure.compute)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span>{formatCurrency(costs.azure.storage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Requests:</span>
                        <span>{formatCurrency(costs.azure.requests)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GCP Cost */}
                <Card className={`${cheapest === 'gcp' ? 'ring-2 ring-gcp-primary border-gcp-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gcp-primary text-white">GCP</Badge>
                      {cheapest === 'gcp' && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Cheapest
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gcp-primary mb-2">
                      {formatCurrency(costs.gcp.total)}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compute:</span>
                        <span>{formatCurrency(costs.gcp.compute)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span>{formatCurrency(costs.gcp.storage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Requests:</span>
                        <span>{formatCurrency(costs.gcp.requests)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Breakdown Tabs */}
              <Tabs defaultValue="breakdown" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
                  <TabsTrigger value="migration">Migration Plan & Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="breakdown" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Server className="h-8 w-8 mx-auto text-primary mb-2" />
                        <h3 className="font-semibold mb-1">Compute Costs</h3>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency((costs.aws.compute + costs.azure.compute + costs.gcp.compute) / 3)}
                        </p>
                        <p className="text-sm text-muted-foreground">Average across providers</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Database className="h-8 w-8 mx-auto text-secondary mb-2" />
                        <h3 className="font-semibold mb-1">Storage Costs</h3>
                        <p className="text-2xl font-bold text-secondary">
                          {formatCurrency((costs.aws.storage + costs.azure.storage + costs.gcp.storage) / 3)}
                        </p>
                        <p className="text-sm text-muted-foreground">Average across providers</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 mx-auto text-gcp-primary mb-2" />
                        <h3 className="font-semibold mb-1">Request Costs</h3>
                        <p className="text-2xl font-bold text-gcp-primary">
                          {formatCurrency((costs.aws.requests + costs.azure.requests + costs.gcp.requests) / 3)}
                        </p>
                        <p className="text-sm text-muted-foreground">Average across providers</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="migration" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Migration Roadmap</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="border-l-2 border-primary pl-3">
                            <h4 className="font-medium text-primary">Phase 1: Assessment (Weeks 1-2)</h4>
                            <p className="text-muted-foreground">Inventory current workloads and dependencies</p>
                          </div>
                          <div className="border-l-2 border-secondary pl-3">
                            <h4 className="font-medium text-secondary">Phase 2: Planning (Weeks 3-4)</h4>
                            <p className="text-muted-foreground">Design target architecture and migration strategy</p>
                          </div>
                          <div className="border-l-2 border-gcp-primary pl-3">
                            <h4 className="font-medium text-gcp-primary">Phase 3: Migration (Weeks 5-12)</h4>
                            <p className="text-muted-foreground">Execute migration in phases with testing</p>
                          </div>
                          <div className="border-l-2 border-aws pl-3">
                            <h4 className="font-medium text-aws">Phase 4: Optimization (Ongoing)</h4>
                            <p className="text-muted-foreground">Monitor, optimize, and scale as needed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Migration Best Practices</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <p><strong>Start Small:</strong> Begin with non-critical workloads to gain experience</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                            <p><strong>Data Strategy:</strong> Plan data migration carefully with backup strategies</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-gcp-primary mt-2 flex-shrink-0"></div>
                            <p><strong>Security First:</strong> Implement security and compliance from day one</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-aws mt-2 flex-shrink-0"></div>
                            <p><strong>Training:</strong> Ensure team is trained on new cloud platform</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-azure mt-2 flex-shrink-0"></div>
                            <p><strong>Monitoring:</strong> Set up comprehensive monitoring and alerting</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold mb-2 text-primary">Cloud Provider Benefits</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Why choose {cheapest.toUpperCase()} for your migration?
                        </p>
                        <div className="text-xs space-y-1">
                          {cheapest === 'aws' && (
                            <>
                              <p>• Largest market share and ecosystem</p>
                              <p>• Extensive third-party integrations</p>
                              <p>• Mature enterprise features</p>
                            </>
                          )}
                          {cheapest === 'azure' && (
                            <>
                              <p>• Best integration with Microsoft tools</p>
                              <p>• Strong hybrid cloud capabilities</p>
                              <p>• Enterprise-focused features</p>
                            </>
                          )}
                          {cheapest === 'gcp' && (
                            <>
                              <p>• Advanced AI/ML capabilities</p>
                              <p>• Competitive pricing model</p>
                              <p>• Strong data analytics tools</p>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold mb-2 text-secondary">Cost Optimization</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Save up to 60% with these strategies
                        </p>
                        <div className="text-xs space-y-1 text-left">
                          <p>• Reserved instances for predictable workloads</p>
                          <p>• Auto-scaling for variable demand</p>
                          <p>• Spot instances for batch processing</p>
                          <p>• Right-sizing based on usage patterns</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold mb-2 text-gcp-primary">Migration Tools</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Leverage these migration services
                        </p>
                        <div className="text-xs space-y-1 text-left">
                          <p>• Database migration services</p>
                          <p>• Server migration tools</p>
                          <p>• Application modernization guides</p>
                          <p>• Cost calculator and assessment tools</p>
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