import { proxyRequest , ActivityMetadata, FormData } from '@/services/proxy-api';

export interface ActivityConfig {
  enabled: {
    pageViews: boolean;
    buttonClicks: boolean;
    formSubmissions: boolean;
    apiCalls: boolean;
    loginLogout: boolean;
    formInputs: boolean;
    visitTime: boolean;
  };
}

class ActivityService {
  private static instance: ActivityService;
  private config: ActivityConfig = {
    enabled: {
      pageViews: true,
      buttonClicks: true,
      formSubmissions: true,
      apiCalls: true,
      loginLogout: true,
      formInputs: true,
      visitTime: true
    }
  };

  private constructor() {}

  public static getInstance(): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService();
    }
    return ActivityService.instance;
  }

  public async getUserConfig(userId: string): Promise<ActivityConfig> {
    try {
      const response = await proxyRequest({
        method: 'GET',
        url: `/activity/config/${userId}`,
        headers: {
          'Accept': '*/*'
        }
      });
      return response || this.config;
    } catch (error) {
      console.error('Error fetching user config:', error);
      return this.config;
    }
  }

  public async updateActivityConfig(userId: string, config: ActivityConfig): Promise<void> {
    try {
      await proxyRequest({
        method: 'PUT',
        url: `/activity/config/${userId}`,
        headers: {
          'Accept': '*/*'
        },
        data: config
      });
      this.config = config;
    } catch (error) {
      console.error('Error updating activity config:', error);
      throw error;
    }
  }

  public async trackPageView(path: string, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.pageViews) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'page_view',
          details: { path },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  public async trackButtonClick(elementId: string, path: string, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.buttonClicks) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'button_click',
          details: { elementId, path },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking button click:', error);
    }
  }

  public async trackFormSubmission(formId: string, path: string, formData: FormData, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.formSubmissions) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'form_submission',
          details: { formId, path, formData },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking form submission:', error);
    }
  }

  public async trackFormInput(formId: string, path: string, inputName: string, inputValue: string, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.formInputs) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'form_input',
          details: { formId, path, inputName, inputValue },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking form input:', error);
    }
  }

  public async trackApiCall(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.apiCalls) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'api_call',
          details: { endpoint, method, path },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking API call:', error);
    }
  }

  public async trackLogin(username: string, metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.loginLogout) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'login',
          details: { username },
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking login:', error);
    }
  }

  public async trackLogout(metadata?: ActivityMetadata): Promise<void> {
    if (!this.config.enabled.loginLogout) return;

    try {
      await proxyRequest({
        method: 'POST',
        url: '/activity/track',
        headers: {
          'Accept': '*/*'
        },
        data: {
          type: 'logout',
          details: {},
          metadata
        }
      });
    } catch (error) {
      console.error('Error tracking logout:', error);
    }
  }
}

export const activityService = ActivityService.getInstance(); 