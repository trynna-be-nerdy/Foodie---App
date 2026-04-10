import api from './api';

export interface QRCodePayload {
  restaurantId: string;
  transactionId: string;
  amount: number;
  timestamp: number;
  signature: string;
}

export interface QRScanResult {
  success: boolean;
  scanId?: string;
  pointsEarned?: number;
  restaurantName?: string;
  error?: string;
  errorCode?: string;
}

export interface ScanStatus {
  todayScans: number;
  dailyLimit: number;
  remaining: number;
  canScan: boolean;
}

export interface QRScanHistoryItem {
  id: string;
  restaurantId: string;
  transactionId: string;
  amount: number;
  pointsAwarded: number;
  scannedAt: string;
  restaurant: {
    id: string;
    name: string;
    imageUrl: string | null;
  } | null;
}

// Scan a QR code
export async function scanQRCode(payload: QRCodePayload): Promise<QRScanResult> {
  try {
    const response = await api.post<QRScanResult>('/qr/scan', payload);
    if (response.success && response.data) {
      return response.data;
    }
    return {
      success: false,
      error: response.error?.message || 'Failed to scan QR code',
      errorCode: response.error?.code,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: 'Failed to scan QR code',
    };
  }
}

// Get scan status/limit
export async function getScanStatus(): Promise<ScanStatus> {
  const response = await api.get<ScanStatus>('/qr/status');
  if (response.success && response.data) {
    return response.data;
  }
  return {
    todayScans: 0,
    dailyLimit: 10,
    remaining: 10,
    canScan: true,
  };
}

// Get scan history
export async function getQRScanHistory(
  limit: number = 20,
  offset: number = 0,
): Promise<{
  scans: QRScanHistoryItem[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}> {
  type HistoryResponse = {
    scans: QRScanHistoryItem[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    };
  };
  const response = await api.get<HistoryResponse>('/qr/history', {
    params: {limit, offset},
  });
  if (response.success && response.data) {
    return response.data;
  }
  return {
    scans: [],
    pagination: {total: 0, limit, offset, hasMore: false},
  };
}

// Parse QR code data from scanned string
export function parseQRCodeData(data: string): QRCodePayload | null {
  try {
    // Try to parse as base64 encoded JSON first
    const decoded = atob(data);
    const parsed = JSON.parse(decoded);

    if (
      parsed.restaurantId &&
      parsed.transactionId &&
      typeof parsed.amount === 'number' &&
      typeof parsed.timestamp === 'number' &&
      parsed.signature
    ) {
      return parsed as QRCodePayload;
    }

    return null;
  } catch {
    // Try to parse as raw JSON
    try {
      const parsed = JSON.parse(data);

      if (
        parsed.restaurantId &&
        parsed.transactionId &&
        typeof parsed.amount === 'number' &&
        typeof parsed.timestamp === 'number' &&
        parsed.signature
      ) {
        return parsed as QRCodePayload;
      }

      return null;
    } catch {
      return null;
    }
  }
}
