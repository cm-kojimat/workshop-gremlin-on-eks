import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as eks from "@aws-cdk/aws-eks";

export class WorkshopGremlinOnEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Vpc", { maxAzs: 2 });

    new eks.Cluster(this, "Cluster", {
      version: eks.KubernetesVersion.V1_18,
      vpc,
      defaultCapacity: 2,
      defaultCapacityInstance: new ec2.InstanceType(
        `${ec2.InstanceClass.T3}.${ec2.InstanceSize.MEDIUM}`
      ),
    });
  }
}
