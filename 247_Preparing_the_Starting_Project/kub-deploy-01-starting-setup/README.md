0. 前置作業
    1. local machine 要已有 minikube 及 kubectl
    2. 安裝 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) 到 local machine
    3. <a id="step0_3"></a>在 local machine 的 minikube 啟動 (started) 且乾淨的狀態下，將 `~/users/.kube/config` 複製一份出來並且備份
    4. <a id="step0_4"></a>為 AWS CLI 建 access key 讓 local machine 能夠透過 CLI 連到 AWS 主控平台
        - 在練習的情況下，這個 key 最好用完就刪掉 (或 deactivate)
        - 非練習的正式環境情境要以其他方法處理 certification

1. <a id="step1"></a>建 IAM EKS Cluster Role
    - 選 AWS 內建預設的 EKS - Cluster Role 即可

2. <a id="step2"></a>建 IAM EKS Worker Node Role
    - 選 AWS 內建預設的 EC2 Role，並確認其中必須包含下面三個 access policies
        - AmazonEKSWorkerNodePolicy
        - AmazonEKS_CNI_Policy
        - AmazonEC2ContainerRegistryReadOnly

3. <a id="step3"></a>建 VPC (through CloudFormation)
    - 在 CloudFormation Service 中建新的 Stack
    - 用 [<u>**參考連結**</u>](https://docs.aws.amazon.com/eks/latest/userguide/creating-a-vpc.html#create-vpc) 中的 IPv4 url (AWS 提供的 template) 建置 VPC

4. 建 EKS Cluster
    - Cluster Service Role 選 [Step 1.](#step1) 建好的 Role
    - VPC 選 [Step 3.](#step3) 建好的 VPC

5. Local Machine 執行指令 (AWS CLI)
    - 這邊會用到 [前置作業 4](#step0_4) 建置的 access key
    ```
    aws configure
    ```

6. Local Machine 執行指令 (AWS CLI)
    - 用 local machine 的 minikube config file 當作基底 ([前置作業 3](#step0_3))，透過 AWS CLI 跟建置好的 EKS Cluster 進行映射
    - 注意 `<region-of-the-eks-cluster>` 要參考使用的帳號本身的地區(或建置的 EKS Cluster 的地區)
    ```
    aws eks --region <region-of-the-eks-cluster> update-kubeconfig --name <eks-cluster-name>
    ```
    - 完成後可以視需求將 local machine 的 minikube virtual cluster 刪掉 (指令 `minikube delete`，不影響 AWS EKS)

7. 在 EKS Cluster 的 運算(Compute)頁簽下建立 Node Group
    - Node IAM Role 選 [Step 2.](#step2) 建好的 Role

8. 完成上述所有步驟沒有問題產生，即可於 local machine 上直接使用 `kubectl` 指令操作影響 **AWS EKS**，方法跟 minikube 在 local machine 上的運作一模一樣



----



1. 建新的 VPC 給 EFS 用 (選 [Step 3.](#step3) 建好的 VPC)

2. 建新的 EFS 並且在 sub-net 選項中選取前一個步驟新建的 VPC

3. 參考 user.yaml 的範例