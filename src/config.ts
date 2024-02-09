const rdsConfig = {
  secretArn: process.env.QRUD_SECRET_ARN,
  resourceArn: process.env.QRUD_RESOURCE_ARN,
  region: process.env.QRUD_REGION,
};

export { rdsConfig };
