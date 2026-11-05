import { CloudDeploymentAdapter } from './interface.js';

/**
 * Render Cloud Deployment Adapter
 * Implements deployment hooks for Render Web Services & Static Sites
 */
export class RenderDeploymentAdapter extends CloudDeploymentAdapter {
  constructor(apiKey = process.env.RENDER_API_KEY) {
    super('render');
    this.apiKey = apiKey;
    this.apiBase = 'https://api.render.com/v1';
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async getHealthStatus(serviceId) {
    if (!this.apiKey) {
      return { status: 'CONFIG_REQUIRED', message: 'RENDER_API_KEY is not configured.' };
    }
    try {
      const res = await fetch(`${this.apiBase}/services/${serviceId}`, {
        headers: this.getHeaders()
      });
      if (!res.ok) throw new Error(`Render API responded with HTTP ${res.status}`);
      const data = await res.json();
      return { status: 'HEALTHY', details: data };
    } catch (err) {
      return { status: 'UNAVAILABLE', error: err.message };
    }
  }

  async triggerDeploy(serviceId) {
    if (!this.apiKey) throw new Error('RENDER_API_KEY required to trigger deploy.');
    const res = await fetch(`${this.apiBase}/services/${serviceId}/deploys`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return res.json();
  }
}

