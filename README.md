# workshop gremlin on eks

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Node.js のインストール

https://nodejs.org/

各環境に合わせてインストールを行ってください。

```bash
> node --version
v14.15.1
```

## Kubectl のインストール

https://kubernetes.io/docs/tasks/tools/install-kubectl/

各環境に合わせてインストールを行ってください。

```bash
> kubectl version
Client Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.3", GitCommit:"1e11e4a2108024935ecfcb2912226cedeafd99df", GitTreeState:"clean", BuildDate:"2020-10-14T12:50:19Z", GoVersion:"go1.15.2", Compiler:"gc", Platform:"darwin/amd64"}
```

## EKS の環境を構築

```bash
npm clean-install
npm run cdk bootstrap
npm run cdk deploy
```

## Gremlin の Deamon のインストール

https://www.gremlin.com/docs/infrastructure-layer/installation/

### シークレットの設定

```bash
mkdir -p gremlin-manifests/
curl -o gremlin-manifests/gremlin-conf.yaml -L https://k8s.gremlin.com/resources/gremlin-conf.yaml
vim gremlin-manifests/gremlin-conf.yaml
```

`GREMLIN_TEAM_ID`, `GREMLIN_CLUSTER_ID` を入力し
`GREMLIN_TEAM_SECRET` は削除してください。

### Certificates のダウンロード

`右上のメニュー > Team Settings > Configuration > Download`

### Certificates の名前を変更

- Certificates.zip を解凍します
- `*.pub_cert.pem` から `gremlin.cert` に名前を変更します
- `*.priv_key.pem` から `gremlin.key` に名前を変更します

### EKS が立ち上がるまで待機

### Certificates を登録

- cdk の outputs `ClusterConfigCommand*` のコマンドを入力します

```bash
kubectl create namespace gremlin
kubectl -n gremlin create secret generic gremlin-team-cert --from-file=gremlin.cert --from-file=gremlin.key
```

### Gremlin 側の manifests を設定

```bash
kubectl apply -f manifests
```

下記のコマンドで確認できます。

```bash
kubectl get deployments -n gremlin
kubectl get daemonset   -n gremlin
```

## Microservices をデプロイ

```bash
mkdir -p microservices-manifests/
curl -o microservices-manifests/microservices-manifests.yaml -L https://raw.githubusercontent.com/GoogleCloudPlatform/microservices-demo/master/release/kubernetes-manifests.yaml
kubectl create namespace demo
kubectl apply -n demo -f microservices-manifests
```

下記のコマンドで接続先を確認できます。

```bash
kubectl get svc -n demo
```

## Microservices を削除

```bash
kubectl delete -n demo -f microservices-manifests
```

## Gremlin を削除

```bash
kubectl delete -n gremlin -f gremlin-manifests
```

## EKS を削除

```bash
npm run cdk destroy
```
