/**
 * Cloud Deployment Provider Interface
 * Standard abstraction layer enabling seamless migration between Render, Vercel, and VPS
 */

export class CloudDeploymentAdapter {
  constructor(name) {
    this.name = name;
  }

  async deployStatic(sitePath, config) {
    throw new Error(`deployStatic not implemented on adapter: ${this.name}`);
  }

  async deployWebService(servicePath, envVars, config) {
    throw new Error(`deployWebService not implemented on adapter: ${this.name}`);
  }

  async getHealthStatus(serviceId) {
    throw new Error(`getHealthStatus not implemented on adapter: ${this.name}`);
  }

  async triggerRollback(serviceId, releaseId) {
    throw new Error(`triggerRollback not implemented on adapter: ${this.name}`);
  }
}
