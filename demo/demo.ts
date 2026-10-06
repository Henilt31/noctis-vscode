/**
 * Noctis Theme - TypeScript Demo
 * Demonstrates classes, interfaces, generics, async functions, and decorators.
 */

export interface SessionConfig {
  readonly sessionId: string;
  maxRetries: number;
  timeoutMs?: number;
  environment: 'development' | 'staging' | 'production';
}

export type QueryResult<T> = {
  data: T | null;
  error?: string;
  durationMs: number;
};

export class TelemetryLogger {
  private static instance: TelemetryLogger;
  private readonly enabled: boolean = true;

  private constructor(private readonly prefix: string = '[Noctis]') {}

  public static getLogger(): TelemetryLogger {
    if (!TelemetryLogger.instance) {
      TelemetryLogger.instance = new TelemetryLogger();
    }
    return TelemetryLogger.instance;
  }

  public logEvent(name: string, payload: Record<string, unknown>): void {
    if (this.enabled) {
      console.log(`${this.prefix} Event: ${name}`, JSON.stringify(payload));
    }
  }
}

export async function executeDeepWorkPipeline<T extends { id: string }>(
  items: ReadonlyArray<T>,
  config: SessionConfig
): Promise<QueryResult<T[]>> {
  const logger = TelemetryLogger.getLogger();
  const startTime = Date.now();

  try {
    logger.logEvent('pipeline_start', { count: items.length, env: config.environment });

    // Process items asynchronously
    const results = await Promise.all(
      items.map(async (item) => {
        const isValid = item.id.length > 0;
        return isValid ? { ...item } : null;
      })
    );

    const validItems = results.filter((item): item is T => item !== null);

    return {
      data: validItems,
      durationMs: Date.now() - startTime,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown pipeline error';
    return {
      data: null,
      error: message,
      durationMs: Date.now() - startTime,
    };
  }
}
