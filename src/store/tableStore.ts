import { SemesterExamClearance } from '../app/RegistrationExamClearance';

// Define the store interface
interface TableState {
  data: SemesterExamClearance[] | null;
  loading: boolean;
  sortColumn: keyof SemesterExamClearance | null;
  sortDirection: 'asc' | 'desc';
  setData: (data: SemesterExamClearance[] | null) => void;
  setLoading: (loading: boolean) => void;
  setSorting: (column: keyof SemesterExamClearance | null, direction: 'asc' | 'desc') => void;
  sortData: () => void;
}

// Create a simple store object that mimics Zustand's API
const createStore = () => {
  // Initial state
  let state: TableState = {
    data: null,
    loading: false,
    sortColumn: 'semesterId',
    sortDirection: 'desc',
    setData: () => {},
    setLoading: () => {},
    setSorting: () => {},
    sortData: () => {},
  };

  // Store implementation
  const store = {
    getState: () => state,
    setState: (partial: Partial<TableState>) => {
      state = { ...state, ...partial };
    },
  };

  // Initialize actions
  state.setData = (data) => {
    store.setState({ data });
  };

  state.setLoading = (loading) => {
    store.setState({ loading });
  };

  state.setSorting = (column, direction) => {
    store.setState({ sortColumn: column, sortDirection: direction });
    state.sortData();
  };

  state.sortData = () => {
    const { data, sortColumn, sortDirection } = state;
    
    if (!data || !sortColumn) return;
    
    const sortedData = [...data].sort((a, b) => {
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
      
      return 0;
    });
    
    store.setState({ data: sortedData });
  };

  return () => state;
};

// Export the store hook
export const useTableStore = createStore();
