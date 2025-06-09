import { useState, useEffect } from 'react';

interface DeploymentStatus {
  status: 'idle' | 'deploying' | 'success' | 'error';
  message: string;
  deployUrl?: string;
  deployId?: string;
  claimed?: boolean;
  claimUrl?: string;
}

export const useDeploymentStatus = (initialDeployId?: string) => {
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>({
    status: initialDeployId ? 'deploying' : 'idle',
    message: initialDeployId ? 'Checking deployment status...' : 'No deployment in progress',
    deployId: initialDeployId
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkDeploymentStatus = async (deployId?: string) => {
    if (!deployId) {
      setDeploymentStatus({
        status: 'idle',
        message: 'No deployment in progress'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to check deployment status
      // For demonstration, we'll simulate a deployment status check
      const response = await fetch(`/api/deployment-status?id=${deployId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch deployment status');
      }
      
      const data = await response.json();
      
      setDeploymentStatus({
        status: data.status,
        message: data.message || '',
        deployUrl: data.deployUrl,
        deployId: deployId,
        claimed: data.claimed,
        claimUrl: data.claimUrl
      });
    } catch (error) {
      setDeploymentStatus({
        status: 'error',
        message: 'Failed to check deployment status',
        deployId: deployId
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialDeployId) {
      checkDeploymentStatus(initialDeployId);
      
      // Set up polling to check status every 10 seconds
      const interval = setInterval(() => checkDeploymentStatus(initialDeployId), 10000);
      
      return () => clearInterval(interval);
    }
  }, [initialDeployId]);

  return {
    deploymentStatus,
    isLoading,
    checkDeploymentStatus
  };
};

export default useDeploymentStatus;