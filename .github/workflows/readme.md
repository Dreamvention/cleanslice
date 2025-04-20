# GitHub Workflows for Kubernetes + ArgoCD CI/CD Pipeline

This directory contains GitHub Actions workflow configurations that form the CI/CD pipeline for a microservices architecture deployed on Kubernetes using ArgoCD.

## Overview

The pipeline setup consists of three main workflows:

- `api-pipeline.yml` - Handles the API service
- `app-pipeline.yml` - Handles the frontend application
- `admin-pipeline.yml` - Handles the admin panel

Each pipeline follows the same pattern:

1. Builds a Docker image
2. Pushes it to AWS ECR
3. Updates the corresponding Helm chart values
4. Triggers ArgoCD sync through GitOps

## Prerequisites

To use these workflows, you need:

1. A Kubernetes cluster
2. ArgoCD installed on the cluster
3. AWS ECR repository
4. GitHub repository for Helm charts (GitOps repository)
5. Self-hosted GitHub runner with:
   - Docker installed
   - AWS CLI configured
   - Git configured with SSH access to the GitOps repository

## Required Secrets

The following GitHub secrets need to be configured:

- `REPO_URL`: AWS ECR repository URL
- `HELM_REPO_URL`: GitHub repository URL for the Helm charts
- `API_URL`: API endpoint URL (for app and admin builds)

## Workflow Structure

Each workflow is triggered on:

- Push to `main` branch (only when files in respective directory change)
- Manual trigger via `workflow_dispatch`

### Pipeline Stages

1. **Build Job**:

   - Checks out the code
   - Builds Docker image with version tag based on commit SHA
   - Authenticates with AWS ECR
   - Pushes the image to ECR

2. **Deploy Job**:
   - Clones the GitOps repository
   - Updates the image tag in the corresponding Helm chart's values.yaml
   - Commits and pushes the changes
   - ArgoCD detects the change and syncs the application

## Adding a New Project

To add a new project to this CI/CD setup:

1. Create a new workflow file (e.g., `new-service-pipeline.yml`):

   ```yaml
   name: New Service CI/CD Pipeline

   on:
     push:
       branches:
         - main
       paths:
         - "new-service/**"
     workflow_dispatch:
   ```

2. Copy the jobs structure from existing pipelines

3. Update the following:

   - Working directory path
   - Docker image name/tag prefix
   - Helm chart path in the GitOps repository
   - Any build-specific arguments or environment variables

4. In your GitOps repository:

   - Create a new Helm chart for your service
   - Set up the initial values.yaml file
   - Configure ArgoCD to watch this new chart

5. Set up the required secrets if any new ones are needed

## Best Practices

1. Keep the Docker builds optimized and use multi-stage builds
2. Use specific versions for GitHub Actions
3. Implement proper cleanup in temporary directories
4. Use meaningful commit messages for GitOps changes
5. Implement proper error handling and notifications

## Security Considerations

1. Use secrets for sensitive information
2. Implement proper RBAC in Kubernetes
3. Use minimal base images for Docker
4. Regularly update dependencies and base images
5. Implement security scanning in the pipeline if needed
