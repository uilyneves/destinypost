import { AiProviderTestService } from './ai-provider-test.service';

describe('AiProviderTestService', () => {
  const originalFetch = global.fetch;
  let service: AiProviderTestService;

  beforeEach(() => {
    service = new AiProviderTestService();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('testa endpoint OpenAI compativel pelo catalogo de modelos', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200 });

    const result = await service.test('openai-compatible', 'secret', {
      baseUrl: 'https://api.destinyai.com.br/v1/',
      model: 'gemini-2.5-flash',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.destinyai.com.br/v1/models',
      expect.objectContaining({
        headers: { Authorization: 'Bearer secret' },
        signal: expect.any(AbortSignal),
      })
    );
    expect(result).toEqual({ ok: true });
  });

  it('testa OmniRoute pelo endpoint de modelos', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, status: 200 });

    const result = await service.test('omniroute', 'omni-secret', {
      baseUrl: 'https://omniroute.example.com/v1/',
      model: 'combo/social-copy',
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://omniroute.example.com/v1/models',
      expect.objectContaining({
        headers: { Authorization: 'Bearer omni-secret' },
        signal: expect.any(AbortSignal),
      })
    );
    expect(result).toEqual({ ok: true });
  });

  it('rejeita endpoint OpenAI compativel ausente', async () => {
    const result = await service.test('openai-compatible', 'secret', {});

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: 'URL do endpoint nao configurada.',
    });
  });

  it('rejeita URL com credenciais embutidas', async () => {
    const result = await service.test('openai-compatible', 'secret', {
      baseUrl: 'https://user:password@example.com/v1',
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });
});
