export interface DataTableComponentProps {
    packedData:any;
    tableDefinition: {
      field: string;
      header: string;
      notSortable?: boolean;
      showModal?: boolean;
    }[];
    onEdit: (data: any) => void;
    onPageChange: (page: number) => void;
    search: string;
    modalFields: { [key: string]: { data: any[]; url: string } };
    startSearch: boolean;
    globalFilters?:any
    title?:string
  }