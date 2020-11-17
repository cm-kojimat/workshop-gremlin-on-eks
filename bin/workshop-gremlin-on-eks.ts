#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WorkshopGremlinOnEksStack } from '../lib/workshop-gremlin-on-eks-stack';

const app = new cdk.App();
new WorkshopGremlinOnEksStack(app, 'WorkshopGremlinOnEksStack');
