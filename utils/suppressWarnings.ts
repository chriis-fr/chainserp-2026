// Suppress noisy dev-only messages from third-party code and browser interventions
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (msg.includes('Support for defaultProps will be removed')) return;
    originalError.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : String(args[0] ?? '');
    // Suppress defaultProps warning from react-share
    if (msg.includes('Support for defaultProps will be removed')) return;
    // Suppress passive event listener violation (e.g. from @accessible/drawer)
    if (msg.includes('non-passive event listener') && msg.includes('touchstart')) return;
    // Suppress "[Violation] ... handler took Xms"
    if (msg.includes('[Violation]') && msg.includes('handler took')) return;
    // Suppress browser intervention re lazy images
    if (msg.includes('[Intervention]') && msg.includes('Images loaded lazily')) return;
    originalWarn.apply(console, args);
  };
}
