// Auth Interfaces
export interface LoginCredentials {
    username: string;
    password: string;
    grecaptcha?: string;
  }
  
  export interface LoginRequest {
    studentId: string;
    password: string;
    deviceName: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    id: string;
    studentId: string;
    name: string;
    userName: string;
    email: string;
    roles: string[];
    commaSeparatedRoles: string;
    deviceName: string;
    lastLoginTime: string;
  }
  
  export interface PasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    email: string;
    phone: string;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  
  export interface FindUserRequest {
    email: string;
  }
  
  export interface FindUserResponse {
    userId: string;
    maskedEmail: string;
    maskedPhone: string;
    name: string;
    avatar?: string;
    recoveryMethods: {
      email?: {
        options: ('code' | 'link')[];
      };
      sms?: boolean;
    };
  }
  
  export interface SendResetCodeRequest {
    userId: string;
    method: 'email' | 'sms';
    type: 'code' | 'link';
  }
  
  // Profile Interfaces
  export interface StudentInfo {
    studentId: string;
    fkCampus: string;
    campusName: string;
    studentName: string;
    batchId: string;
    batchNo: number;
    programCredit: number;
    programId: string;
    programName: string;
    progShortName: string;
    programType: string;
    deptShortName: string;
    departmentName: string;
    facultyName: string;
    facShortName: string;
    semesterId: string;
    semesterName: string;
    shift: string;
    completedCredits: string;
    cgpa?: string | number;
    photoUrl?: string;
    // Additional fields from the detailed profile
    photoFile?: string;
    personId?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickName?: string;
    sex?: string;
    bloodGroup?: string;
    birthDate?: string;
    religion?: string;
    email?: string;
    mobile?: string;
    presentHouse?: string;
    presentStreet?: string;
    presentCity?: string;
    preDisId?: number;
    preDivisionId?: number;
    preCountryCode?: string;
    presentDistrict?: string;
    presentCountry?: string;
    presentZipCode?: string;
    presentPhone?: string;
    permanentHouse?: string;
    permanentStreet?: string;
    permanentCity?: string;
    perDisId?: number;
    permanentDistrict?: string;
    permanentCountry?: string;
    permanentZipCode?: string;
    permanentPhone?: string;
    fatherName?: string;
    motherName?: string;
    maritalStatus?: string;
    passportNo?: string;
    nationality?: string;
    voterId?: string;
    tin?: string;
    notes?: string;
    workPhone?: string;
    placeOfBirth?: string;
    socialNetId?: string;
    fatherMobile?: string;
    fatherEmail?: string;
    fatherOccupation?: string;
    fatherDesignation?: string;
    fatherEmployerName?: string;
    fatherAnnualIncome?: number;
    motherMobile?: string;
    motherEmail?: string;
    motherOccupation?: string;
    motherDesignation?: string;
    motherEmployerName?: string;
    motherAnnualIncome?: number;
    parentAddress?: string;
    localGuardianName?: string;
    localGuardianMobile?: string;
    localGuardianEmail?: string;
    localGuardianRelation?: string;
    localGuardianAddress?: string;
    bearEduExpense?: string;
    prePostOffice?: string;
    prePoliceStation?: string;
    perPostOffice?: string;
    perPoliceStation?: string;
    emailAlternative?: string;
    hostelAddress?: string;
    messAddress?: string;
    otherAddress?: string;
    waverPercent?: string | null;
    waverSemester?: string | null;
  }
  
  export interface PresentAddressInfo {
    presentDistrictName: string | null;
    presentDivisionName: string | null;
    presentCountryName: string | null;
  }
  
  export interface PermanentAddressInfo {
    permanentDistrictName: string | null;
    permanentDivisionName: string | null;
    permanentCountryName: string | null;
  }
  
  export interface EducationInfo {
    id: string;
    institute: string;
    degree: string;
    major: string;
    result: string;
    scale: string;
    passingYear: string;
    duration: string;
  }
  
  export interface PhotographInfo {
    photoUrl: string;
    photoData: string;
    image?: string;
  }
  
  // Result Interfaces
  export interface Semester {
    semesterId: string;
    semesterYear: number;
    semesterName: string;
  }
  
  export interface Result {
    semesterId: string;
    semesterName: string;
    semesterYear: number;
    studentId: string;
    courseId: string;
    customCourseId: string;
    courseTitle: string;
    totalCredit: number;
    grandTotal: number | null;
    pointEquivalent: number;
    gradeLetter: string;
    cgpa: number;
    blocked: string;
    blockCause: string | null;
    tevalSubmitted: string;
    teval: string;
    semesterAccountsClearance: string | null;
  }
  
  // Payment Interfaces
  export interface PaymentScheme {
    // Add payment scheme fields
    id: string;
    amount: number;
    dueDate: string;
    description: string;
  }
  
  export interface PaymentLedger {
    // Add payment ledger fields
    transactions: Array<{
      date: string;
      description: string;
      debit: number;
      credit: number;
      balance: number;
    }>;
  }
  
  // Dashboard Interfaces
  // SGPA Data Interface
  export interface SGPAData {
    semester: string;
    sgpa: number;
  };
  
  export interface CGPAData {
    labels: string[];
    data: number[];
    sgpaData: SGPAData[];
    // Add other CGPA graph related fields
  }
  
  // Payment Scheme Interface
  export interface PaymentScheme {
    schemeId: number
    headDescription: string
    paymentAmount: number
    multiple: string
    courseType: string
  }
  
  // Payment Data Interfaces
  export interface PaymentData {
    totalCredit: number;
    totalDebit: number;
    totalOther: number;
  }
  
  export interface PaymentSummary {
    totalPaid: string;
    totalPayable: string;
    totalDue: string;
    totalOthers: string;
  }
  
  interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  interface ErrorResponse {
    message: string;
    status: number;
  }
  
  // Add specific types for API responses
  interface ApiError {
    responseMessage?: string;
    message?: string;
    status?: number;
  }
  
  interface ApiSuccess<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  // Add type for request body
  interface RequestBody {
    [key: string]: unknown;
  }
  
  // Add type for metadata
  export interface ActivityMetadata {
    userAgent?: string;
    screenResolution?: string;
    pageLoadTime?: number;
    referrer?: string;
    [key: string]: unknown;
  }
  
  // Add type for form data
  export interface FormData {
    [key: string]: string | number | boolean | null;
  }
  
  // Add type for API call metadata
  interface ApiCallMetadata {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    metadata?: ActivityMetadata;
  }
  
  // Add type for login metadata
  interface LoginMetadata {
    studentId?: string;
    email?: string;
    name?: string;
    sessionDuration?: number;
  }
  
  // Add type for logout metadata
  interface LogoutMetadata {
    reason?: string;
    timestamp?: Date;
    [key: string]: unknown;
  }
  
  // Add type for activity data
  interface ActivityData {
    type: string;
    details: Record<string, unknown>;
    timestamp: Date;
    metadata?: ActivityMetadata;
  }
  
  // Add type for user config
  interface UserConfig {
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
  
  // Add type for activity tracker
  interface ActivityTracker {
    getInstance(): ActivityTracker;
    getUserConfig(userId: string): Promise<UserConfig>;
    updateActivityConfig(userId: string, config: UserConfig): Promise<void>;
    trackPageView(path: string, metadata?: ActivityMetadata): Promise<void>;
    trackButtonClick(elementId: string, path: string, metadata?: ActivityMetadata): Promise<void>;
    trackFormSubmission(formId: string, path: string, formData: FormData, metadata?: ActivityMetadata): Promise<void>;
    trackFormInput(formId: string, path: string, inputName: string, inputValue: string, metadata?: ActivityMetadata): Promise<void>;
    trackApiCall(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: ActivityMetadata): Promise<void>;
    trackLogin(username: string, metadata?: LoginMetadata): Promise<void>;
    trackLogout(metadata?: LogoutMetadata): Promise<void>;
  }
  
  // Semester Exam Clearance Interfaces
  export interface SemesterExamClearance {
    studentId: string | null;
    semesterId: string;
    semesterName: string;
    registration: boolean;
    midTermExam: boolean;
    finalExam: boolean;
  }
  
  export interface SemesterExamClearanceTabProps {
    data: SemesterExamClearance[] | null;
    loading: boolean;
  }
  
  
  export interface Semester {
    semesterId: string
    semesterYear: number
    semesterName: string
  }
  
  export interface Student {
    email: string
    name: string
    studentId: string
    semesterId: string
    personId: number
    batchNo: number
    programId: string
  }
  
  export interface PaymentSummaryData {
    totalCredit: number
    totalDebit: number
    totalOther: number
  }
  
  export interface PaymentLedgerItem {
    transactionDate: string;
    semesterId: string;
    collectedBy: string | null;
    headDescription: string;
    debit: number;
    credit: number;
    others: number;
    showLedger: string;
  }
  
  export interface DivisionListResponse {
    id: string;
    name: string;
  }
  
  export interface CountryListResponse {
    id: string;
    name: string;
  }
  
  export interface EducationResponse {
    id: string;
    institute: string;
    degree: string;
    major: string;
    result: string;
    scale: string;
    passingYear: string;
    duration: string;
  }
  
  export interface DegreeListResponse {
    id: string;
    name: string;
  }
  
  export interface PhotographResponse {
    photoUrl: string;
    photoData: string;
    image?: string;
  }
  
  export interface InsuranceResponse {
    id: string;
    policyNumber: string;
    provider: string;
    coverage: string;
    expiryDate: string;
  }
  
  export interface GuardianResponse {
    id: string;
    name: string;
    relation: string;
    contact: string;
    address: string;
  }
  
  export interface CourseRoutine {
    courseId: string;
    courseTitle: string;
    section: string;
    schedule: Array<{
      day: string;
      time: string;
      room: string;
    }>;
  }
  
  export interface RegisteredCourse {
    courseId: string;
    courseTitle: string;
    credit: number;
    section: string;
    instructor: string;
  }
  
  export interface DropSemester {
    semesterId: string;
    semesterName: string;
    status: string;
  }
  
  export interface PaymentData {
    totalDue: number;
    totalPaid: number;
    balance: number;
  }
  
  export interface CGPAData {
    cgpa: number;
    creditsCompleted: number;
    creditsAttempted: number;
  }
  
  export interface Semester {
    id: string;
    name: string;
    year: number;
  }
  
  export interface TevalSubmitCheck {
    submitted: boolean;
    message: string;
  }
  
  export interface LiveResult {
    courseId: string;
    courseTitle: string;
    section: string;
    instructor: string;
    grade: string;
    marks: number;
  }
  
  export interface Semester {
    semesterId: string
    semesterYear: number
    semesterName: string
  }
  
  export interface Course {
    customCourseId: string
    courseTitle: string
    courseSectionId: number
    advisedStatus: string
    designation: string
    employeeName: string
    regClearenc: string
    sectionName: string
    semesterId: string
    semesterName: string
    semesterYear: number
    studentId: string
    totalCredit: number
  }
  
  export interface CourseResult {
    att: number
    q1: number
    q2: number
    q3: number
    quiz: number
    mid1: number
    mid2: number
  }
  export interface Semester {
    semesterId: string
    semesterYear: number
    semesterName: string
  }
  
  export interface Student {
    email: string
    name: string
    studentId: string
    semesterId: string
    personId: number
    batchNo: number
    programId: string
  }
  
  export interface PaymentSummaryData {
    totalCredit: number
    totalDebit: number
    totalOther: number
  }
  
  export interface PaymentLedgerItem {
    transactionDate: string
    semesterId: string
    collectedBy: string | null
    headDescription: string
    debit: number
    credit: number
    others: number
    showLedger: string
  }

  export interface ResultProps {}

  export interface ResultData {
  semesterId: string;
  semesterName: string;
  semesterYear: number;
  studentId: string;
  courseId: string;
  customCourseId: string;
  courseTitle: string;
  totalCredit: number;
  grandTotal: number | null;
  pointEquivalent: number;
  gradeLetter: string;
  cgpa: number;
  blocked: string;
  blockCause: string | null;
  tevalSubmitted: string;
  teval: string;
  semesterAccountsClearance: string | null;
  // Additional fields for student info
  program?: string;
  studentName?: string;
  enrollmentSemester?: string;
  batch?: string;
}

export interface StudentInfo {
  program: string;
  name: string;
  id: string;
  semesterName: string;
  batch: string;
  department: string;
  faculty: string;
  campus: string;
  programCredit: number;
  programType: string;
  currentSemester: string;
}