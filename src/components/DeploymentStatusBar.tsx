import React from 'react';
import { AlertCircle, CheckCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { useDeploymentStatus } from '../hooks/useDeploymentStatus';

interface DeploymentStatusBarProps {
  deployId?: string;
}

export const DeploymentStatusBar: React.FC<DeploymentStatusBarProps> = ({ deployId }) => {
  const { deploymentStatus, isLoading, checkDeploymentStatus } = useDeploymentStatus(deployId);

  if (deploymentStatus.status === 'idle') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {deploymentStatus.status === 'deploying' && (
              <Clock className="h-5 w-5 text-primary-600 animate-pulse mr-2" />
            )}
            {deploymentStatus.status === 'success' && (
              <CheckCircle className="h-5 w-5 text-success-600 mr-2" />
            )}
            {deploymentStatus.status === 'error' && (
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
            )}
            
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {deploymentStatus.status === 'deploying' && 'Deployment in Progress'}
                {deploymentStatus.status === 'success' && 'Deployment Successful'}
                {deploymentStatus.status === 'error' && 'Deployment Failed'}
              </p>
              <p className="text-xs text-neutral-600">{deploymentStatus.message}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => checkDeploymentStatus(deployId)}
              disabled={isLoading}
              className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-900 px-2 py-1 rounded hover:bg-neutral-100"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            {deploymentStatus.status === 'success' && deploymentStatus.deployUrl && (
              <a 
                href={deploymentStatus.deployUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-primary-100 text-primary-800 hover:bg-primary-200"
              >
                View Site <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
            
            {deploymentStatus.claimUrl && (
              <a 
                href={deploymentStatus.claimUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-success-100 text-success-800 hover:bg-success-200"
              >
                Claim Site <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatusBar;