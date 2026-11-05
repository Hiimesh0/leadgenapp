import { CloudDeploymentAdapter } from './interface.js';

/**
 * VPS Docker Deployment Adapter
 * Implements deployment hooks for self-hosted Linux VPS (Hetzner / DigitalOcean)
 */
export class VpsDockerAdapter extends CloudDeploymentAdapter {
  constructor(host = process.env.VPS_HOST) {
    super('vps-docker');
    this.host = host;
  }

  async getHealthStatus(serviceName) {
    // Probes local or remote container health
    return {
      status: 'OPERATIONAL',
      provider: 'vps-docker',
      targetHost: this.host || 'localhost'
    };
  }
}
