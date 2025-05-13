Install MongoDB into the Kubernetes Cluster through MongoDB Deployment + Service 

Create a Persistent Volume for storage 

Deploy MongoDB 6 as a container 

Uses a Secret for username and password 

Exposes MongoDB as a ClusterIP service 

Create a Kubernetes secret called mongo-secret 

Stroe the values under keys mongo-user and mongo-password 

Then deploy the MongoDB to the Kubernetes cluster 

Update the actual application to use MongoDB, use the crendentials from the environment variables and log each calculation into a MongoDB collection

Update deployment.yaml to pass the MongoDB connection details 

Then rebuild the Docker image and restart the deployment 

Ensure server connects to MongoDB prior to running 

Then run tests to demonstrate CRUD 
