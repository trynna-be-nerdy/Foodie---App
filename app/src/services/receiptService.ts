import api from './api';

export interface ExtractedReceiptData {
  restaurantName: string | null;
  restaurantNameConfidence: number;
  totalAmount: number | null;
  receiptDate: string | null;
  lineItems: Array<{name: string; price: number}>;
  rawText: string;
}

export interface MatchedRestaurant {
  id: string;
  name: string;
  confidence: number;
}

export interface ReceiptScanResult {
  receiptId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'DUPLICATE';
  extractedData: ExtractedReceiptData | null;
  matchedRestaurant: MatchedRestaurant | null;
  pointsEarned: number;
  needsReview: boolean;
  error?: string;
}

export interface Receipt {
  id: string;
  restaurantId: string | null;
  imageUrl: string | null;
  totalAmount: number | null;
  receiptDate: string | null;
  pointsAwarded: number;
  status: string;
  createdAt: string;
}

export interface RestaurantOption {
  id: string;
  name: string;
  imageUrl: string | null;
  pointsPerDollar: number;
}

// Scan a receipt image
export async function scanReceipt(
  imageUri: string,
  restaurantId?: string,
  totalAmount?: number,
): Promise<ReceiptScanResult> {
  const formData = new FormData();

  // Prepare image file
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  formData.append('image', {
    uri: imageUri,
    name: `receipt.${fileType}`,
    type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
  } as any);

  if (restaurantId) {
    formData.append('restaurantId', restaurantId);
  }

  if (totalAmount) {
    formData.append('totalAmount', totalAmount.toString());
  }

  const response = await api.post<ReceiptScanResult>('/receipts/scan', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.success && response.data) {
    return response.data;
  }
  return {
    receiptId: '',
    status: 'FAILED' as const,
    extractedData: null,
    matchedRestaurant: null,
    pointsEarned: 0,
    needsReview: false,
    error: response.error?.message || 'Failed to scan receipt',
  };
}

// Update receipt with corrections
export async function updateReceipt(
  receiptId: string,
  restaurantId: string,
  totalAmount: number,
): Promise<ReceiptScanResult> {
  const response = await api.put<ReceiptScanResult>(`/receipts/${receiptId}`, {
    restaurantId,
    totalAmount,
  });

  if (response.success && response.data) {
    return response.data;
  }
  return {
    receiptId,
    status: 'FAILED' as const,
    extractedData: null,
    matchedRestaurant: null,
    pointsEarned: 0,
    needsReview: false,
    error: response.error?.message || 'Failed to update receipt',
  };
}

// Get receipt by ID
export async function getReceipt(receiptId: string): Promise<Receipt> {
  const response = await api.get<Receipt>(`/receipts/${receiptId}`);
  if (response.success && response.data) {
    return response.data;
  }
  throw new Error(response.error?.message || 'Failed to get receipt');
}

// Get receipt history
export async function getReceiptHistory(
  limit: number = 20,
  offset: number = 0,
): Promise<{
  receipts: Receipt[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}> {
  type HistoryResponse = {
    receipts: Receipt[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    };
  };
  const response = await api.get<HistoryResponse>('/receipts/history', {
    params: {limit, offset},
  });

  if (response.success && response.data) {
    return response.data;
  }
  return {
    receipts: [],
    pagination: {total: 0, limit, offset, hasMore: false},
  };
}

// Get restaurants for dropdown
export async function getRestaurantsForReceipt(): Promise<RestaurantOption[]> {
  const response = await api.get<RestaurantOption[]>('/receipts/restaurants');
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}
