import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import edit from '../../Icons/edit.svg';
import trash from '../../Icons/trash.svg';
import './index.css';
import { ITEMS_PER_PAGE } from '../../Constants';
// import NoData from '../NoData.js';
import { Dialog } from 'primereact/dialog';
import axios_api from '../../api/axios_api.js';
import SortIcon from '../../Icons/sort.svg';
import { string } from 'yup';

interface DataTableComponentProps {
  packedData: {
    Data: any[];
    getData: (
      page: number,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      order: string | undefined,
      sortField: string | undefined,
      search: string
    ) => void;
    onEdit: (data: any) => void;
    onDelete: (data: any) => void;
    count: number;
  };
  tableDefinition: {
    field: string;
    header: string;
    notSortable?: boolean;
    showModal?: boolean;
  }[];
  onPageChange: (page: number) => void;
  search: string;
  modalFields: { [key: string]: { data: any[]; url: string } };
  startSearch: boolean;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  packedData,
  tableDefinition,
  onPageChange,
  search,
  modalFields,
  startSearch,
}) => {
  const { Data, getData, onEdit, onDelete, count } = packedData;

  const [totalRecords, setTotalRecords] = useState(count);
  const [first, setFirst] = useState(0);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalDef, setModalDef] = useState<{ field: string; header: string }[]>([]);
  const [modalData, setModalData] = useState<any[]>([]);
  const [header, setHeader] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setTotalRecords(count);
  }, [count]);

  useEffect(() => {
    let order = sortOrder === 1 ? 'ASC' : 'DESC';
    getData(1, setLoading, order, sortField, search);
  }, [startSearch]);

  const PageChange = (event: { first: number; page: number }) => {
    setFirst(event.first);
    const newPage = event.page + 1;
    onPageChange(newPage);
    getData(newPage, setLoading, undefined, undefined, search);
  };

  const onSort = (event: { sortOrder: number; sortField: string }) => {
    let order = event.sortOrder === 1 ? 'ASC' : 'DESC';
    getData(1, setLoading, order, event.sortField, search);
    setSortField(event.sortField);
    setSortOrder(event.sortOrder);
  };

  let ActionComponent = (data: any) => {
    return (
      <div className="action-box">
        <img
          title="Edit"
          src={edit}
          style={{ cursor: 'pointer', width: '25px' }}
          onClick={() => onEdit(data)}
        />
        <img
          title="Delete"
          style={{ cursor: 'pointer', width: '25px' }}
          src={trash}
          onClick={() => onDelete(data)}
        />
      </div>
    );
  };

  let handleClick = (data: any, field: string, header: string) => {
    setModalDef(modalFields[field]?.data || []);
    setHeader(header);
    if (data[field] !== 'All') {
      setShow(true);
      setModalLoading(true);
      axios_api
        .get(`${modalFields[field]?.url}/${data[field]}`)
        .then((response) => {
          setModalLoading(false);
          setModalData(response?.data?.data || []);
        })
        .catch((err) => setModalLoading(false));
    }
  };

  let ClickableComponent = (data: any, field: string, header: string) => {
    if (data[field] === 'All') {
      return data[field];
    }
    if (data[field] === true) {
      return 'YES';
    }
    if (data[field] === false) {
      return 'NO';
    }
    let a = data[field].split(',');
    let mapping: { [key: string]: string }  = {
      CommodityCode: 'Commodity Code',
      CompanyCode: 'Company Code',
      Plant: 'Plant',
      PurchaseOrganization: 'Purchase Organization',
    };

    return (
      <div
        onClick={() => handleClick(data, field, header)}
        style={{ cursor: 'pointer', color: 'var(--primary)' }}
      >
        {a?.length + '  '}
        {a?.length > 1 ? `${mapping[field]}s` : mapping[field]}
      </div>
    );
  };

  let renderNoMessage = () => {
    // return <NoData colSpan={10} text="No data found!" />;
    return <div>NO DATA</div>
  };

  const emptyMessage = renderNoMessage();

  return (
    <>
      <DataTable
        // value={Data}
        // paginator
        // dataKey="id"
        // rows={ITEMS_PER_PAGE}
        // emptyMessage={emptyMessage}
        // first={first}
        // totalRecords={totalRecords}
        // onPage={PageChange}
        // onSort={onSort}
        // sortField={sortField}
        // sortOrder={sortOrder}
        // loading={loading}
        // lazy
      >
        {tableDefinition?.map((def, id) => {
          return (
            <Column
              key={id}
              field={def.field}
              header={def.header}
              sortable={!def?.notSortable}
              // rowId={Data}
              body={
                def?.showModal
                  ? (rowData) => ClickableComponent(rowData, def.field, def.header)
                  : null
              }
            />
          );
        })}
        <Column header="Action" filterField="" showFilterMenu={false} body={ActionComponent} className="hello" />
      </DataTable>
      <Dialog
        header={header}
        visible={show}
        onHide={() => setShow(false)}
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '50vw' }}
      >
        <DataTable value={modalData} paginator rows={ITEMS_PER_PAGE} dataKey="id" loading={modalLoading} emptyMessage={emptyMessage} showGridlines>
          {modalDef?.map((def, id) => {
            return <Column key={id} field={def.field} header={def.header} sortable 
            // rowId={Data}
             />;
          })}
        </DataTable>
      </Dialog>
    </>
  );
};

export default DataTableComponent;
