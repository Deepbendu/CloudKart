export interface CloudService {
  id: string;
  name: string;
  provider: 'AWS' | 'Azure' | 'GCP';
  category: string;
  description: string;
  pricing: string;
  features: string[];
  regions: string[];
  tags: string[];
  freeTier: boolean;
  popular: boolean;
}

export const categories = [
  'Compute',
  'Storage',
  'Database',
  'Networking',
  'AI/ML',
  'Security',
  'DevOps',
  'Serverless',
  'Containers',
  'Analytics'
];

export const cloudServices: CloudService[] = [
  // AWS Services
  {
    id: 'aws-ec2',
    name: 'EC2',
    provider: 'AWS',
    category: 'Compute',
    description: 'Scalable virtual servers in the cloud',
    pricing: 'From $0.0058/hour',
    features: ['Auto Scaling', 'Load Balancing', 'Multiple Instance Types', 'Spot Instances'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'aws-s3',
    name: 'S3',
    provider: 'AWS',
    category: 'Storage',
    description: 'Object storage service with industry-leading scalability',
    pricing: 'From $0.023/GB',
    features: ['99.999999999% Durability', 'Lifecycle Management', 'Cross-Region Replication', 'Static Website Hosting'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'aws-rds',
    name: 'RDS',
    provider: 'AWS',
    category: 'Database',
    description: 'Managed relational database service',
    pricing: 'From $0.017/hour',
    features: ['Multiple Database Engines', 'Automated Backups', 'Multi-AZ Deployment', 'Read Replicas'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'aws-lambda',
    name: 'Lambda',
    provider: 'AWS',
    category: 'Serverless',
    description: 'Run code without thinking about servers',
    pricing: 'From $0.0000002/request',
    features: ['Event-driven', 'Auto Scaling', 'Multiple Runtime Support', 'VPC Support'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Serverless', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'aws-sagemaker',
    name: 'SageMaker',
    provider: 'AWS',
    category: 'AI/ML',
    description: 'Fully managed machine learning service',
    pricing: 'From $0.065/hour',
    features: ['Built-in Algorithms', 'Jupyter Notebooks', 'Model Training', 'Automatic Model Tuning'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
    tags: ['AI/ML', 'Popular'],
    freeTier: false,
    popular: true
  },

  // Azure Services
  {
    id: 'azure-vm',
    name: 'Virtual Machines',
    provider: 'Azure',
    category: 'Compute',
    description: 'On-demand, scalable computing resources',
    pricing: 'From $0.008/hour',
    features: ['Multiple VM Sizes', 'Availability Sets', 'Scale Sets', 'Hybrid Benefit'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'azure-blob',
    name: 'Blob Storage',
    provider: 'Azure',
    category: 'Storage',
    description: 'Massively scalable object storage for unstructured data',
    pricing: 'From $0.0184/GB',
    features: ['Multiple Access Tiers', 'Lifecycle Management', 'Soft Delete', 'Immutable Storage'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'azure-sql',
    name: 'SQL Database',
    provider: 'Azure',
    category: 'Database',
    description: 'Fully managed SQL database service',
    pricing: 'From $0.52/hour',
    features: ['Built-in Intelligence', 'Elastic Pools', 'Always Encrypted', 'Automatic Tuning'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'azure-functions',
    name: 'Functions',
    provider: 'Azure',
    category: 'Serverless',
    description: 'Event-driven serverless compute platform',
    pricing: 'From $0.000016/execution',
    features: ['Multiple Languages', 'Durable Functions', 'Premium Plan', 'VNET Integration'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Serverless', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'azure-ml',
    name: 'Machine Learning',
    provider: 'Azure',
    category: 'AI/ML',
    description: 'Enterprise-grade machine learning service',
    pricing: 'From $0.10/hour',
    features: ['AutoML', 'Designer Interface', 'MLOps', 'Responsible AI'],
    regions: ['eastus', 'westus2', 'westeurope'],
    tags: ['AI/ML', 'Popular'],
    freeTier: true,
    popular: true
  },

  // GCP Services
  {
    id: 'gcp-compute',
    name: 'Compute Engine',
    provider: 'GCP',
    category: 'Compute',
    description: 'Scalable, high-performance virtual machines',
    pricing: 'From $0.006/hour',
    features: ['Custom Machine Types', 'Preemptible VMs', 'Live Migration', 'Sustained Use Discounts'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'gcp-storage',
    name: 'Cloud Storage',
    provider: 'GCP',
    category: 'Storage',
    description: 'Unified object storage for developers and enterprises',
    pricing: 'From $0.020/GB',
    features: ['Multiple Storage Classes', 'Lifecycle Management', 'Object Versioning', 'Bucket Lock'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'gcp-sql',
    name: 'Cloud SQL',
    provider: 'GCP',
    category: 'Database',
    description: 'Fully managed relational database service',
    pricing: 'From $0.0150/hour',
    features: ['Multiple Database Engines', 'Automatic Backups', 'High Availability', 'Point-in-Time Recovery'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Core', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'gcp-functions',
    name: 'Cloud Functions',
    provider: 'GCP',
    category: 'Serverless',
    description: 'Event-driven serverless compute platform',
    pricing: 'From $0.0000004/request',
    features: ['Event-driven', 'Multiple Triggers', 'Automatic Scaling', 'No Server Management'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Serverless', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'gcp-ml',
    name: 'AI Platform',
    provider: 'GCP',
    category: 'AI/ML',
    description: 'Machine learning platform for building and deploying models',
    pricing: 'From $0.045/hour',
    features: ['Vertex AI', 'AutoML', 'Custom Training', 'Model Monitoring'],
    regions: ['us-central1', 'us-west1', 'europe-west1'],
    tags: ['AI/ML', 'Popular'],
    freeTier: true,
    popular: true
  },

  // Additional services for more comprehensive comparison
  {
    id: 'aws-dynamodb',
    name: 'DynamoDB',
    provider: 'AWS',
    category: 'Database',
    description: 'Fast and flexible NoSQL database service',
    pricing: 'From $0.25/month per GB',
    features: ['Serverless', 'Auto Scaling', 'Global Tables', 'Point-in-Time Recovery'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['NoSQL', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'azure-cosmos',
    name: 'Cosmos DB',
    provider: 'Azure',
    category: 'Database',
    description: 'Globally distributed, multi-model database service',
    pricing: 'From $0.008/hour',
    features: ['Multi-API Support', 'Global Distribution', 'Multiple Consistency Models', 'Serverless'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['NoSQL', 'Popular'],
    freeTier: true,
    popular: true
  },
  {
    id: 'gcp-firestore',
    name: 'Firestore',
    provider: 'GCP',
    category: 'Database',
    description: 'NoSQL document database built for automatic scaling',
    pricing: 'From $0.18/100K operations',
    features: ['Real-time Updates', 'Offline Support', 'Multi-region', 'ACID Transactions'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['NoSQL', 'Popular'],
    freeTier: true,
    popular: true
  }
];

export const getServicesByCategory = (category: string) => {
  return cloudServices.filter(service => service.category === category);
};

export const getServicesByProvider = (provider: 'AWS' | 'Azure' | 'GCP') => {
  return cloudServices.filter(service => service.provider === provider);
};

export const getPopularServices = () => {
  return cloudServices.filter(service => service.popular);
};

export const getFreeServices = () => {
  return cloudServices.filter(service => service.freeTier);
};