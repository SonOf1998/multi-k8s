cd kubernetes
kubectl apply -f .
kubectl set image deployments/client-deployment client=mkis98=multi-client:$SHA
kubectl set image deployments/server-deployment server=mkis98=multi-server:$SHA
kubectl set image deployments/worker-deployment worker=mkis98=multi-worker:$SHA