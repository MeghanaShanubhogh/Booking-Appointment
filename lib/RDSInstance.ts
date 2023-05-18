import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import { Vpc, SubnetType } from '@aws-cdk/aws-ec2';
import {CfnDBCluster, CfnDBSubnetGroup} from '@aws-cdk/aws-rds';

export class RDSInstance extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, deploymentStage: string) {
    super(scope, id, props);

    // Let's create VPC
    const vpc = new Vpc(this, 'Vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: [
        { name : 'aurora_isolated_', subnetType: SubnetType.ISOLATED }
      ]
    });

    // get Subnets Ids from VPC
    const subnetIds: string [] = [];
    vpc.isolatedSubnets.forEach(subnet => {
      subnetIds.push(subnet.subnetId);
    });

    // print output for the subnet ids

    new CfnOutput(this, 'VpcSubnetsIds', {
      value: JSON.stringify(subnetIds)
    });

    // print output for the secuirty group
    new CfnOutput(this, 'VpcDefaultSecuirtyGroup', {
      value: vpc.vpcDefaultSecurityGroup
    });

    // create subnetgroup

    const dbSubnetGroup: CfnDBSubnetGroup = new CfnDBSubnetGroup(this, 'AuroraSubnetGroup', {
      dbSubnetGroupDescription: 'Subnet group to access aurora',
      dbSubnetGroupName: 'aurora-sls-subnet-group',
      subnetIds
    });

    // create aurora db serverless instance

    const aurora = new CfnDBCluster(this, 'AuroraServerlessCdk', {
      databaseName: 'onexlab',
      dbClusterIdentifier: 'aurora-sls',
      engine: 'aurora',
      engineMode: 'serverless',
      enableHttpEndpoint: true,
      masterUsername: 'test',
      masterUserPassword: 'test123123',
      port: 3306,
      dbSubnetGroupName: dbSubnetGroup.dbSubnetGroupName,
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: 2,
        minCapacity: 2,
        secondsUntilAutoPause: 3600
      }
    });

    // wait for subnet group to be created
    aurora.addDependsOn(dbSubnetGroup);

    // construct arn from available information
    const account = props?.env?.account;
    const region = props?.env?.region;

    const auroraArn = `arn:aws:rds:${region}:${account}:cluster:${aurora.dbClusterIdentifier}`;

    new CfnOutput(this, 'AuroraClusterArn', {
      exportName: `${deploymentStage}`,
      value: auroraArn
    });

  }
}
