/**
 * 손익관리 > 가동율현황
 */
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { gridStyle } from '../../styles/gridStyle';
import OrgSearchBar from '../searchs/OrgSearchBar';

function PageOpRateCst(props) {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  class Thead {
    constructor(headerName,field,type,width){
      this.headerName = headerName;
      this.field = field;
      this.type = type;
      this.width = width;
    }
  }
  
  const headFnc = (headerName,field,...ot) =>{
    return {  
      headerName : headerName,
      field : field,
      type : ot[0],
      width : ot[1],
    }
  }
  const columnDefs = [
    {
      headerName: '이름',
      field: 'name',
      width: 80,
      colSpan: (params) =>
        params.data.name === '합계' || params.data.name === '총계' ? 3 : 1,
    },
    new Thead('등급','job_grade','', 150 ),
    headFnc('년차','years_sum','', 80 ),
    new Thead('1월','mon1','rightAligned', 75 ),
    new Thead('2월','mon2','rightAligned', 75 ),
    new Thead('3월','mon3','rightAligned', 75 ),
    new Thead('4월','mon4','rightAligned', 75 ),
    new Thead('5월','mon5','rightAligned', 75 ),
    new Thead('6월','mon6','rightAligned', 75 ),
    new Thead('7월','mon1','rightAligned', 75 ),
    new Thead('8월','mon7','rightAligned', 75 ),
    headFnc('9월','mon9','rightAligned', 75 ),
    headFnc('10월','mon10','rightAligned', 75 ),
    headFnc('11월','mon11','rightAligned', 75 ),
    headFnc('12월','mon12','rightAligned', 80 ),
    headFnc('합계','total','rightAligned', 80 ),
    {
      headerName: '현가동율',
      field: 'cur_rate_per',
      type: 'rightAligned',
      width: 90,
    },
    {
      headerName: '년가동율',
      field: 'year_rate_per',
      type: 'rightAligned',
      width: 90,
    },
  ];

  const gridHeight = 30;
  const contents = (
    <div style={{ float: 'right' }}>
      <label>{'[ '}</label>
      <label style={{ color: 'Blue' }}>신규입사자</label>
      <span>{' | '}</span>
      <label style={{ color: 'cyan' }}>휴직자</label>
      <span>{' | '}</span>
      <label style={{ color: 'red' }}>퇴사자</label>
      <span>{' ]'}</span>
    </div>
  );

  function handleSearch(searchInfo) {
    // 비동기 통신, promise 반환
    fetch(process.env.REACT_APP_HOST + 'opratecsts', { method: 'GET' })
      .then((res) => {
        return res.json(); // json으로 받을 것을 명시
      })
      .then((data) => {
        if (data) {
          const rows = data.map((row) => {
            return {
              ...row,
              cur_rate_per: row.cur_rate + '%',
              year_rate_per: row.year_rate + '%',
            };
          });

          setRowData(rows);
          searchInfo.setRowCount(rows.length);
        } else {
          setRowData([]);
          searchInfo.setRowCount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleExcel() {
    return true;
  }

  return (
    <>
      <OrgSearchBar
        title="가동률현황"
        contents={contents}
        onSearch={handleSearch}
        onExcel={handleExcel}
      />

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          columnDefs={columnDefs} // Column Defs for Columns
          headerHeight={gridHeight}
          rowHeight={gridHeight}
          rowData={rowData} // Row Data for Rows
        />
      </div>
    </>
  );
}

export default PageOpRateCst;


let title='admin';
let body='admin';
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
   body: JSON.stringify({
     // your expected POST request payload goes here
      title,
      body
      })
})
  .then(res => res.json())
  .then(data => {
   // enter you logic when the fetch is successful
    console.log(data)
  })
  .catch(error => {
  // enter your logic for when there is an error (ex. error toast)
   console.log(error)
  })  