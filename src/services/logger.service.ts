const isProduction = process.env.NODE_ENV === 'production';

/**
 * A simple logger service that conditionally logs messages based on the environment.
 * - debug and info messages are only shown in non-production environments.
 * - warn and error messages are always shown.
 */
export const logger = {
    /**
     * Logs a debug message.
     * Only logs if NODE_ENV is not 'production'.
     * @param {...any} args - Messages or objects to log.
     */
    debug: (...args: unknown[]): void => {
        if (!isProduction) {
            console.debug('[DEBUG]', ...args);
        }
    },

    /**
     * Logs an info message.
     * Only logs if NODE_ENV is not 'production'.
     * @param {...unknown} args - Messages or objects to log.
     */
    info: (...args: unknown[]): void => {
        if (!isProduction) {
            console.info('[INFO]', ...args);
        }
    },

    /**
     * Logs a warning message.
     * Always logs, regardless of NODE_ENV.
     * @param {...unknown} args - Messages or objects to log.
     */
    warn: (...args: unknown[]): void => {
        console.warn('[WARN]', ...args);
    },

    /**
     * Logs an error message.
     * Always logs, regardless of NODE_ENV.
     * @param {...unknown} args - Messages or objects to log.
     */
    error: (...args: unknown[]): void => {
        console.error('[ERROR]', ...args);
    },
};