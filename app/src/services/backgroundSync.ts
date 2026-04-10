let isConfigured = false;

export async function configureBackgroundSync(): Promise<void> {
  if (isConfigured) {
    return;
  }
  isConfigured = true;
}
