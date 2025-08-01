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
  documentationUrl?: string;
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/ec2/'
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/s3/'
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/rds/'
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/lambda/'
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/sagemaker/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/virtual-machines/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/storage/blobs/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/azure-sql/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/azure-functions/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/machine-learning/'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/compute'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/storage'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/sql'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/functions'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/ai-platform'
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
    popular: true,
    documentationUrl: 'https://docs.aws.amazon.com/dynamodb/'
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
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/cosmos-db/'
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
    popular: true,
    documentationUrl: 'https://cloud.google.com/firestore'
  },

  // Networking Services
  {
    id: 'aws-vpc',
    name: 'VPC',
    provider: 'AWS',
    category: 'Networking',
    description: 'Virtual private cloud for isolated compute resources',
    pricing: 'Free (data transfer charges apply)',
    features: ['Private Network', 'Subnets', 'Security Groups', 'NAT Gateway'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Virtual Network', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://aws.amazon.com/vpc/'
  },
  {
    id: 'azure-vnet',
    name: 'Virtual Network',
    provider: 'Azure',
    category: 'Networking',
    description: 'Isolated network environment in Azure cloud',
    pricing: 'Free (data transfer charges apply)',
    features: ['Private Network', 'Subnets', 'Network Security Groups', 'VPN Gateway'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Virtual Network', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/virtual-network/'
  },
  {
    id: 'gcp-vpc',
    name: 'VPC',
    provider: 'GCP',
    category: 'Networking',
    description: 'Global virtual private cloud spanning all regions',
    pricing: 'Free (data transfer charges apply)',
    features: ['Global Network', 'Subnets', 'Firewall Rules', 'Cloud NAT'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Virtual Network', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://cloud.google.com/vpc'
  },

  // Security Services
  {
    id: 'aws-iam',
    name: 'IAM',
    provider: 'AWS',
    category: 'Security',
    description: 'Identity and access management service',
    pricing: 'Free',
    features: ['User Management', 'Role-Based Access', 'Multi-Factor Authentication', 'Policy Management'],
    regions: ['Global'],
    tags: ['Identity Management', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://aws.amazon.com/iam/'
  },
  {
    id: 'azure-ad',
    name: 'Active Directory',
    provider: 'Azure',
    category: 'Security',
    description: 'Cloud-based identity and access management',
    pricing: 'Free tier available',
    features: ['Single Sign-On', 'Multi-Factor Authentication', 'Conditional Access', 'Identity Protection'],
    regions: ['Global'],
    tags: ['Identity Management', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/active-directory/'
  },
  {
    id: 'gcp-iam',
    name: 'Cloud IAM',
    provider: 'GCP',
    category: 'Security',
    description: 'Unified identity and access management',
    pricing: 'Free',
    features: ['Fine-grained Access Control', 'Service Accounts', 'Audit Logs', 'Resource Hierarchy'],
    regions: ['Global'],
    tags: ['Identity Management', 'Core'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://cloud.google.com/iam'
  },

  // DevOps Services
  {
    id: 'aws-codepipeline',
    name: 'CodePipeline',
    provider: 'AWS',
    category: 'DevOps',
    description: 'Continuous delivery service for automated deployments',
    pricing: 'From $1/active pipeline/month',
    features: ['CI/CD Automation', 'Integration with AWS Services', 'Third-party Integrations', 'Visual Workflow'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['CI/CD', 'Automation'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://aws.amazon.com/codepipeline/'
  },
  {
    id: 'azure-devops',
    name: 'DevOps',
    provider: 'Azure',
    category: 'DevOps',
    description: 'Complete DevOps toolchain for development teams',
    pricing: 'Free for up to 5 users',
    features: ['Azure Repos', 'Azure Pipelines', 'Azure Boards', 'Azure Artifacts'],
    regions: ['Global'],
    tags: ['CI/CD', 'Project Management'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://azure.microsoft.com/en-us/services/devops/'
  },
  {
    id: 'gcp-build',
    name: 'Cloud Build',
    provider: 'GCP',
    category: 'DevOps',
    description: 'Serverless CI/CD platform for building and deploying',
    pricing: '120 build-minutes/day free',
    features: ['Docker Support', 'Native Git Integration', 'Vulnerability Scanning', 'Build Triggers'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['CI/CD', 'Serverless'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://cloud.google.com/build'
  },

  // Container Services
  {
    id: 'aws-ecs',
    name: 'ECS',
    provider: 'AWS',
    category: 'Containers',
    description: 'Fully managed container orchestration service',
    pricing: 'No additional charges for EC2 launch type',
    features: ['Docker Support', 'Service Discovery', 'Load Balancing', 'Auto Scaling'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Container Orchestration', 'Docker'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://aws.amazon.com/ecs/'
  },
  {
    id: 'azure-aks',
    name: 'AKS',
    provider: 'Azure',
    category: 'Containers',
    description: 'Managed Kubernetes service',
    pricing: 'Free cluster management',
    features: ['Kubernetes', 'Auto Scaling', 'Azure AD Integration', 'Virtual Nodes'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Kubernetes', 'Container Orchestration'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/aks/'
  },
  {
    id: 'gcp-gke',
    name: 'GKE',
    provider: 'GCP',
    category: 'Containers',
    description: 'Managed Kubernetes service',
    pricing: 'Free cluster management for zonal clusters',
    features: ['Kubernetes', 'Autopilot', 'Workload Identity', 'Binary Authorization'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Kubernetes', 'Container Orchestration'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://cloud.google.com/kubernetes-engine'
  },

  // Analytics Services
  {
    id: 'aws-redshift',
    name: 'Redshift',
    provider: 'AWS',
    category: 'Analytics',
    description: 'Fast, scalable data warehouse',
    pricing: 'From $0.25/hour',
    features: ['Columnar Storage', 'Parallel Processing', 'Automatic Backups', 'Encryption'],
    regions: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    tags: ['Data Warehouse', 'Big Data'],
    freeTier: false,
    popular: true,
    documentationUrl: 'https://aws.amazon.com/redshift/'
  },
  {
    id: 'azure-synapse',
    name: 'Synapse Analytics',
    provider: 'Azure',
    category: 'Analytics',
    description: 'Analytics service that brings together data integration and data warehousing',
    pricing: 'Pay-per-use pricing',
    features: ['Data Integration', 'Data Warehousing', 'Big Data Analytics', 'Machine Learning'],
    regions: ['eastus', 'westus2', 'westeurope', 'southeastasia'],
    tags: ['Data Warehouse', 'Big Data'],
    freeTier: false,
    popular: true,
    documentationUrl: 'https://docs.microsoft.com/en-us/azure/synapse-analytics/'
  },
  {
    id: 'gcp-bigquery',
    name: 'BigQuery',
    provider: 'GCP',
    category: 'Analytics',
    description: 'Serverless, highly scalable data warehouse',
    pricing: 'First 1TB queries/month free',
    features: ['Serverless', 'Real-time Analytics', 'Machine Learning', 'Geospatial Analysis'],
    regions: ['us-central1', 'us-west1', 'europe-west1', 'asia-southeast1'],
    tags: ['Data Warehouse', 'Serverless'],
    freeTier: true,
    popular: true,
    documentationUrl: 'https://cloud.google.com/bigquery'
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