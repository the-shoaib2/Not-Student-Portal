export interface PaymentSchemeData {
  schemeId: number;
  headDescription: string;
  paymentAmount: number;
  multiple: string;
  courseType: string;
}

export interface PaymentSummary {
  totalDue: number;
  totalPaid: number;
  remainingBalance: number;
}
