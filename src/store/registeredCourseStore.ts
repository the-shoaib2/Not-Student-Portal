import { SemesterInfo, RegisteredCourse } from '../app/RegisteredCourse';

interface RegisteredCourseState {
  registeredCourses: RegisteredCourse[] | null;
  loading: boolean;
  selectedSemester: SemesterInfo | null;
  semesters: SemesterInfo[];
  semesterLoading: boolean;
  selectedRoutine: any[] | null;
  selectedRoutineCourseTitle: string;
  sortColumn: keyof RegisteredCourse | null;
  sortDirection: 'asc' | 'desc';
  routineSortColumn: string | null;
  routineSortDirection: 'asc' | 'desc';
  setRegisteredCourses: (data: RegisteredCourse[] | null) => void;
  setLoading: (loading: boolean) => void;
  setSelectedSemester: (semester: SemesterInfo | null) => void;
  setSemesters: (semesters: SemesterInfo[]) => void;
  setSemesterLoading: (loading: boolean) => void;
  setSelectedRoutine: (routine: any[] | null) => void;
  setSelectedRoutineCourseTitle: (title: string) => void;
  setSorting: (column: keyof RegisteredCourse | null, direction: 'asc' | 'desc') => void;
  setRoutineSorting: (column: string | null, direction: 'asc' | 'desc') => void;
  sortData: () => void;
  sortRoutineData: () => void;
}

// Create a simple store object that mimics Zustand's API
const createStore = () => {
  // Initial state
  let state: RegisteredCourseState = {
    registeredCourses: null,
    loading: false,
    selectedSemester: null,
    semesters: [],
    semesterLoading: false,
    selectedRoutine: null,
    selectedRoutineCourseTitle: '',
    sortColumn: null,
    sortDirection: 'asc',
    routineSortColumn: null,
    routineSortDirection: 'asc',
    setRegisteredCourses: () => {},
    setLoading: () => {},
    setSelectedSemester: () => {},
    setSemesters: () => {},
    setSemesterLoading: () => {},
    setSelectedRoutine: () => {},
    setSelectedRoutineCourseTitle: () => {},
    setSorting: () => {},
    setRoutineSorting: () => {},
    sortData: () => {},
    sortRoutineData: () => {},
  };

  // Store implementation
  const store = {
    getState: () => state,
    setState: (partial: Partial<RegisteredCourseState>) => {
      state = { ...state, ...partial };
    },
  };

  // Initialize actions
  state.setRegisteredCourses = (data) => {
    store.setState({ registeredCourses: data });
  };

  state.setLoading = (loading) => {
    store.setState({ loading });
  };

  state.setSelectedSemester = (semester) => {
    store.setState({ selectedSemester: semester });
  };

  state.setSemesters = (semesters) => {
    store.setState({ semesters });
  };

  state.setSemesterLoading = (loading) => {
    store.setState({ semesterLoading: loading });
  };

  state.setSelectedRoutine = (routine) => {
    store.setState({ selectedRoutine: routine });
  };

  state.setSelectedRoutineCourseTitle = (title) => {
    store.setState({ selectedRoutineCourseTitle: title });
  };

  state.setSorting = (column, direction) => {
    store.setState({ sortColumn: column, sortDirection: direction });
    state.sortData();
  };

  state.setRoutineSorting = (column, direction) => {
    store.setState({ routineSortColumn: column, routineSortDirection: direction });
    state.sortRoutineData();
  };

  state.sortData = () => {
    const { registeredCourses, sortColumn, sortDirection } = state;
    
    if (!registeredCourses || !sortColumn) return;
    
    const sortedData = [...registeredCourses].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === 'asc' 
          ? (aValue === bValue ? 0 : aValue ? -1 : 1) 
          : (aValue === bValue ? 0 : aValue ? 1 : -1);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
      
      return 0;
    });
    
    store.setState({ registeredCourses: sortedData });
  };

  state.sortRoutineData = () => {
    const { selectedRoutine, routineSortColumn, routineSortDirection } = state;
    
    if (!selectedRoutine || !routineSortColumn) return;
    
    const sortedData = [...selectedRoutine].sort((a, b) => {
      const aValue = a[routineSortColumn];
      const bValue = b[routineSortColumn];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return routineSortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    store.setState({ selectedRoutine: sortedData });
  };

  return () => state;
};

// Export the store hook
export const useRegisteredCourseStore = createStore();
