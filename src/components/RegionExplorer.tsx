import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Globe,
  MapPin,
  Activity,
  Wifi,
  Clock,
  TrendingDown
} from "lucide-react";

type LatencyData = {
  [region: string]: {
    AWS: number;
    Azure: number;
    GCP: number;
  };
};

const RegionExplorer = () => {
  const [latencyData, setLatencyData] = useState<LatencyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Major regions with India focus
  const majorRegions = {
    'us-east': { name: 'US East', code: 'us-east-1', country: '🇺🇸', city: 'Virginia' },
    'us-west': { name: 'US West', code: 'us-west-2', country: '🇺🇸', city: 'Oregon' },
    'eu-west': { name: 'Europe West', code: 'eu-west-1', country: '🇪🇺', city: 'Ireland' },
    'ap-south': { name: 'Asia Pacific (Mumbai)', code: 'ap-south-1', country: '🇮🇳', city: 'Mumbai' },
    'ap-southeast': { name: 'Asia Pacific (Singapore)', code: 'ap-southeast-1', country: '🇸🇬', city: 'Singapore' },
    'ap-northeast': { name: 'Asia Pacific (Tokyo)', code: 'ap-northeast-1', country: '🇯🇵', city: 'Tokyo' }
  };

  // Provider regions mapping
  const providerRegions = {
    AWS: [
      { code: 'us-east-1', name: 'US East (N. Virginia)', latency: 0 },
      { code: 'us-west-2', name: 'US West (Oregon)', latency: 0 },
      { code: 'eu-west-1', name: 'Europe (Ireland)', latency: 0 },
      { code: 'ap-south-1', name: 'Asia Pacific (Mumbai)', latency: 0 },
      { code: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', latency: 0 },
      { code: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)', latency: 0 }
    ],
    Azure: [
      { code: 'eastus', name: 'East US', latency: 0 },
      { code: 'westus2', name: 'West US 2', latency: 0 },
      { code: 'westeurope', name: 'West Europe', latency: 0 },
      { code: 'centralindia', name: 'Central India', latency: 0 },
      { code: 'southeastasia', name: 'Southeast Asia', latency: 0 },
      { code: 'japaneast', name: 'Japan East', latency: 0 }
    ],
    GCP: [
      { code: 'us-central1', name: 'US Central', latency: 0 },
      { code: 'us-west1', name: 'US West', latency: 0 },
      { code: 'europe-west1', name: 'Europe West', latency: 0 },
      { code: 'asia-south1', name: 'Asia South (Mumbai)', latency: 0 },
      { code: 'asia-southeast1', name: 'Asia Southeast', latency: 0 },
      { code: 'asia-northeast1', name: 'Asia Northeast', latency: 0 }
    ]
  };

  // Simulate latency data with realistic values
  const simulateLatency = () => {
    const baseLatency = {
      'us-east': { AWS: 15, Azure: 18, GCP: 16 },
      'us-west': { AWS: 25, Azure: 28, GCP: 22 },
      'eu-west': { AWS: 35, Azure: 32, GCP: 30 },
      'ap-south': { AWS: 12, Azure: 15, GCP: 14 }, // Best for India
      'ap-southeast': { AWS: 45, Azure: 48, GCP: 40 },
      'ap-northeast': { AWS: 55, Azure: 52, GCP: 50 }
    };

    // Add some randomness for realism
    Object.keys(baseLatency).forEach(region => {
      Object.keys(baseLatency[region as keyof typeof baseLatency]).forEach(provider => {
        const base = baseLatency[region as keyof typeof baseLatency][provider as keyof typeof baseLatency[keyof typeof baseLatency]];
        baseLatency[region as keyof typeof baseLatency][provider as keyof typeof baseLatency[keyof typeof baseLatency]] = 
          base + Math.floor(Math.random() * 10) - 5;
      });
    });

    return baseLatency;
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = simulateLatency();
      
      // Update provider regions with latency
      Object.keys(providerRegions).forEach(provider => {
        providerRegions[provider as keyof typeof providerRegions].forEach((region, index) => {
          const regionKey = Object.keys(majorRegions)[index] as keyof typeof majorRegions;
          if (regionKey && data[regionKey]) {
            region.latency = data[regionKey][provider as keyof typeof data[keyof typeof data]];
          }
        });
      });

      setLatencyData(data);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getLatencyColor = (latency: number) => {
    if (latency < 30) return 'text-green-600 bg-green-50';
    if (latency < 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getLatencyBadge = (latency: number) => {
    if (latency < 30) return 'bg-green-500';
    if (latency < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const globalStats = {
    totalRegions: Object.keys(majorRegions).length * 3, // 6 regions × 3 providers
    bestLatency: latencyData ? Math.min(...Object.values(latencyData).map(regionData => Math.min(regionData.AWS, regionData.Azure, regionData.GCP))) : 0,
    coverage: '6 Major Regions'
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'text-aws';
      case 'Azure': return 'text-azure';
      case 'GCP': return 'text-gcp-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Region & Latency Explorer</h2>
          <p className="text-muted-foreground">Loading real-time latency data...</p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Region & Latency Explorer</h2>
        <p className="text-muted-foreground">
          Real-time latency and availability across cloud regions with focus on India
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Total Regions</h3>
                  <p className="text-muted-foreground">{globalStats.coverage}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {globalStats.totalRegions}
                </div>
                <div className="text-sm text-muted-foreground">endpoints</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Best Latency</h3>
                  <p className="text-muted-foreground">Lowest observed</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {globalStats.bestLatency}ms
                </div>
                <div className="text-sm text-muted-foreground">Mumbai</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Geographic Coverage</h3>
                  <p className="text-muted-foreground">Regions worldwide</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  3
                </div>
                <div className="text-sm text-muted-foreground">continents</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Cards with Major Regions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(providerRegions).map(([provider, regions]) => (
          <Card key={provider}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${getProviderColor(provider)}`}>
                <Wifi className="h-5 w-5" />
                {provider} Regions
              </CardTitle>
              <CardDescription>
                6 major regions with latency data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {regions.map((region, index) => {
                  const regionKey = Object.keys(majorRegions)[index] as keyof typeof majorRegions;
                  const regionInfo = majorRegions[regionKey];
                  return (
                    <div key={region.code} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{regionInfo?.country}</span>
                        <div>
                          <p className="font-medium text-sm">{regionInfo?.city}</p>
                          <p className="text-xs text-muted-foreground font-mono">{region.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getLatencyColor(region.latency)} border-0`}>
                          {region.latency}ms
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latency Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Latency Comparison
          </CardTitle>
          <CardDescription>
            Region-wise latency comparison across all providers (lower is better)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-center">AWS</TableHead>
                  <TableHead className="text-center">Azure</TableHead>
                  <TableHead className="text-center">GCP</TableHead>
                  <TableHead className="text-center">Best</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latencyData && Object.entries(latencyData).map(([regionKey, data]) => {
                  const region = majorRegions[regionKey as keyof typeof majorRegions];
                  const values = [data.AWS, data.Azure, data.GCP];
                  const minLatency = Math.min(...values);
                  const bestProvider = Object.keys(data).find(provider => 
                    data[provider as keyof typeof data] === minLatency
                  );
                  
                  return (
                    <TableRow key={regionKey}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span>{region.country}</span>
                          <span>{region.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge 
                            className={`${getLatencyColor(data.AWS)} border-0`}
                          >
                            {data.AWS}ms
                          </Badge>
                          {data.AWS === minLatency && (
                            <TrendingDown className="h-4 w-4 text-green-600 ml-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge 
                            className={`${getLatencyColor(data.Azure)} border-0`}
                          >
                            {data.Azure}ms
                          </Badge>
                          {data.Azure === minLatency && (
                            <TrendingDown className="h-4 w-4 text-green-600 ml-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge 
                            className={`${getLatencyColor(data.GCP)} border-0`}
                          >
                            {data.GCP}ms
                          </Badge>
                          {data.GCP === minLatency && (
                            <TrendingDown className="h-4 w-4 text-green-600 ml-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getProviderColor(bestProvider || '')} bg-primary/10 border-0`}>
                          {bestProvider}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* India Focus Section */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            🇮🇳 India Focus
          </CardTitle>
          <CardDescription>
            Optimized cloud performance for Indian businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Mumbai Data Centers</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">AWS ap-south-1</span>
                  <Badge className="bg-aws text-white">12ms</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Azure centralindia</span>
                  <Badge className="bg-azure text-white">15ms</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">GCP asia-south1</span>
                  <Badge className="bg-gcp-primary text-white">14ms</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Recommendations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• AWS offers lowest latency for Mumbai region</li>
                <li>• All providers support Hindi language services</li>
                <li>• Data residency compliance available</li>
                <li>• 24/7 local support in Indian timezone</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionExplorer;