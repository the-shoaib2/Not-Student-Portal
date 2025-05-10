import { ActivityTracker } from '../activity';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

jest.mock('cookies-next');
jest.mock('uuid');

const mock = new MockAdapter(axios);

describe('ActivityTracker', () => {
  let tracker: ActivityTracker;
  let mockCookie: jest.Mock;
  let mockUuid: jest.Mock;

  beforeEach(() => {
    tracker = ActivityTracker.getInstance();
    mockCookie = getCookie as jest.Mock;
    mockUuid = uuidv4 as jest.Mock;
    
    // Reset mocks
    mockCookie.mockClear();
    mockUuid.mockClear();
    mock.reset();
  });

  it('should track page view', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackPageView('/test-path', { studentId: 'test-student' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'page_view',
      path: '/test-path',
      metadata: { studentId: 'test-student' },
      sessionId: 'test-session-id'
    });
  });

  it('should track button click', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackButtonClick('btn-1', '/test-path', { studentId: 'test-student' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'button_click',
      elementId: 'btn-1',
      path: '/test-path',
      metadata: { studentId: 'test-student' },
      sessionId: 'test-session-id'
    });
  });

  it('should track form submission', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackFormSubmission('form-1', '/test-path', { field1: 'value1' }, { studentId: 'test-student' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'form_submission',
      formId: 'form-1',
      path: '/test-path',
      formData: { field1: 'value1' },
      metadata: { studentId: 'test-student' },
      sessionId: 'test-session-id'
    });
  });

  it('should track form input', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackFormInput('form-1', '/test-path', 'input-1', 'value1', { studentId: 'test-student' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'form_input',
      formId: 'form-1',
      path: '/test-path',
      inputName: 'input-1',
      inputValue: 'value1',
      metadata: { studentId: 'test-student' },
      sessionId: 'test-session-id'
    });
  });

  it('should track API call', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackApiCall('/api/test', 'POST', '/test-path', { studentId: 'test-student' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'api_call',
      apiEndpoint: '/api/test',
      apiMethod: 'POST',
      path: '/test-path',
      metadata: { studentId: 'test-student' },
      sessionId: 'test-session-id'
    });
  });

  it('should track login', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(200, { success: true });

    await tracker.trackLogin('test-user', { name: 'Test User' });

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toMatchObject({
      action: 'login',
      path: '',
      metadata: { studentId: 'test-user', name: 'Test User' },
      sessionId: 'test-session-id'
    });
  });

  it('should handle API errors gracefully', async () => {
    const token = 'test-token';
    mockCookie.mockResolvedValue(token);
    mockUuid.mockReturnValue('test-session-id');

    mock
      .onPost('/api/activity')
      .reply(500, { error: 'Internal Server Error' });

    await expect(tracker.trackPageView('/test-path')).resolves.not.toThrow();
  });
});
