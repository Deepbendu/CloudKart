import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  MapPin, 
  Zap, 
  Clock,
  Activity,
  TrendingUp,
  Server
} from "lucide-react";

interface RegionData {
  code: string;
  name: string;
  location: string;
  latency: number;
}

interface ProviderRegions {
  name: string;
  totalRegions: number;
  regions: RegionData[];
  color: string;
  bgColor: string;
  borderColor: string;
}

const RegionExplorer = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("all");

  // Simulated latency data with realistic values
  const providerData: ProviderRegions[] = [
    {
      name: "AWS",
      totalRegions: 6,
      color: "text-aws",
      bgColor: "bg-aws/5",
      borderColor: "border-aws",
      regions: [
        { code: "us-east-1", name: "US East (N. Virginia)", location: "Virginia, USA", latency: 15 },
        { code: "us-west-2", name: "US West (Oregon)", location: "Oregon, USA", latency: 25 },
        { code: "eu-west-1", name: "Europe (Ireland)", location: "Dublin, Ireland", latency: 35 },
        { code: "ap-south-1", name: "Asia Pacific (Mumbai)", location: "Mumbai, India", latency: 45 },
        { code: "ap-southeast-1", name: "Asia Pacific (Singapore)", location: "Singapore", latency: 50 },
        { code: "ap-northeast-1", name: "Asia Pacific (Tokyo)", location: "Tokyo, Japan", latency: 55 }
      ]
    },
    {
      name: "Azure",
      totalRegions: 6,
      color: "text-azure",
      bgColor: "bg-azure/5",
      borderColor: "border-azure",
      regions: [
        { code: "eastus", name: "East US", location: "Virginia, USA", latency: 18 },
        { code: "westus2", name: "West US 2", location: "Washington, USA", latency: 28 },
        { code: "westeurope", name: "West Europe", location: "Netherlands", latency: 32 },
        { code: "centralindia", name: "Central India", location: "Pune, India", latency: 42 },
        { code: "southeastasia", name: "Southeast Asia", location: "Singapore", latency: 48 },
        { code: "japaneast", name: "Japan East", location: "Tokyo, Japan", latency: 52 }
      ]
    },
    {
      name: "GCP",
      totalRegions: 6,
      color: "text-gcp-primary",
      bgColor: "bg-gcp-primary/5",
      borderColor: "border-gcp-primary",
      regions: [
        { code: "us-central1", name: "US Central1", location: "Iowa, USA", latency: 20 },
        { code: "us-west1", name: "US West1", location: "Oregon, USA", latency: 22 },
        { code: "europe-west1", name: "Europe West1", location: "Belgium", latency: 30 },
        { code: "asia-south1", name: "Asia South1", location: "Mumbai, India", latency: 40 },
        { code: "asia-southeast1", name: "Asia Southeast1", location: "Singapore", latency: 46 },
        { code: "asia-northeast1", name: "Asia Northeast1", location: "Tokyo, Japan", latency: 58 }
      ]
    }
  ];

  // Calculate global stats
  const totalRegions = providerData.reduce((sum, provider) => sum + provider.totalRegions, 0);
  const bestLatency = Math.min(...providerData.flatMap(p => p.regions.map(r => r.latency)));
  const majorAreas = 6; // US East, US West, Europe, India, Singapore, Japan

  const getLatencyBadge = (latency: number) => {
    if (latency < 30) return { variant: "default", color: "text-green-600 bg-green-50 border-green-200", label: "Excellent" };
    if (latency < 60) return { variant: "secondary", color: "text-yellow-600 bg-yellow-50 border-yellow-200", label: "Good" };
    return { variant: "destructive", color: "text-red-600 bg-red-50 border-red-200", label: "Fair" };
  };

  const filteredProviders = selectedProvider === "all" ? providerData : providerData.filter(p => p.name.toLowerCase() === selectedProvider);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Regional Availability & Performance</h2>
        <p className="text-muted-foreground">
          Compare global presence and estimated latency across providers
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Server className="h-8 w-8 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold">{totalRegions}</div>
            <p className="text-sm text-muted-foreground">Total Regions</p>
            <p className="text-xs text-muted-foreground mt-1">Across 3 providers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto text-secondary mb-2" />
            <div className="text-2xl font-bold">{bestLatency}ms</div>
            <p className="text-sm text-muted-foreground">Best Latency</p>
            <p className="text-xs text-muted-foreground mt-1">Lowest observed latency</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 mx-auto text-gcp-primary mb-2" />
            <div className="text-2xl font-bold">{majorAreas}</div>
            <p className="text-sm text-muted-foreground">Coverage</p>
            <p className="text-xs text-muted-foreground mt-1">Major geographic areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Provider Tabs */}
      <Tabs value={selectedProvider} onValueChange={setSelectedProvider} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Providers</TabsTrigger>
          <TabsTrigger value="aws">AWS</TabsTrigger>
          <TabsTrigger value="azure">Azure</TabsTrigger>
          <TabsTrigger value="gcp">GCP</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {providerData.map((provider) => (
            <Card key={provider.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                    provider.name === 'AWS' ? 'from-aws to-aws' :
                    provider.name === 'Azure' ? 'from-azure to-azure' : 
                    'from-gcp-primary to-gcp-secondary'
                  }`} />
                  {provider.name} Global Presence
                  <Badge variant="outline">{provider.totalRegions} regions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.regions.map((region) => {
                    const badge = getLatencyBadge(region.latency);
                    return (
                      <Card key={region.code} className={`${provider.bgColor} border-l-4 ${provider.borderColor}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{region.name}</h4>
                              <p className="text-sm text-muted-foreground">{region.location}</p>
                              <p className="text-xs text-muted-foreground font-mono">{region.code}</p>
                            </div>
                            <Badge className={badge.color}>
                              {badge.label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Activity className={`h-4 w-4 ${provider.color}`} />
                            <span className="text-sm">Latency</span>
                            <span className={`font-bold ${provider.color}`}>{region.latency}ms</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Individual provider tabs */}
        {providerData.map((provider) => (
          <TabsContent key={provider.name.toLowerCase()} value={provider.name.toLowerCase()} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                    provider.name === 'AWS' ? 'from-aws to-aws' :
                    provider.name === 'Azure' ? 'from-azure to-azure' : 
                    'from-gcp-primary to-gcp-secondary'
                  }`} />
                  {provider.name} Global Presence
                  <Badge variant="outline">{provider.totalRegions} regions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.regions.map((region) => {
                    const badge = getLatencyBadge(region.latency);
                    return (
                      <Card key={region.code} className={`${provider.bgColor} border-l-4 ${provider.borderColor}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{region.name}</h4>
                              <p className="text-sm text-muted-foreground">{region.location}</p>
                              <p className="text-xs text-muted-foreground font-mono">{region.code}</p>
                            </div>
                            <Badge className={badge.color}>
                              {badge.label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Activity className={`h-4 w-4 ${provider.color}`} />
                            <span className="text-sm">Latency</span>
                            <span className={`font-bold ${provider.color}`}>{region.latency}ms</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Latency Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Latency Comparison by Region</CardTitle>
          <CardDescription>
            Compare response times across providers for major regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Region</th>
                  <th className="text-center p-2 font-semibold">AWS</th>
                  <th className="text-center p-2 font-semibold">Azure</th>
                  <th className="text-center p-2 font-semibold">GCP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">US East</td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">15ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">18ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">20ms</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">US West</td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">25ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">28ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">22ms</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Europe</td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">35ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">32ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200">30ms</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">India</td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">45ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">42ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">40ms</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Singapore</td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">50ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">48ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">46ms</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Japan</td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">55ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">52ms</Badge>
                  </td>
                  <td className="text-center p-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">58ms</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionExplorer;