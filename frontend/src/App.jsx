import { useState } from 'react';
import './App.css';
import sapLogo from './assets/sap-logo.png';
import { CiSearch } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiBullhorn } from 'react-icons/ci';
import { CiBellOn } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import Square from './components/Square';
import { useEffect } from 'react';
import axios from 'axios'

function App() {
    const [count, setCount] = useState(0);
    const [humanCapitalItems, setHumanCapitalItems] = useState([])
    const [erpApps, setErpApps] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5126/human-capital-items').then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })

        /*axios.get('http://localhost:5126/erp-map-items').then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })*/
    }, [])

  /*const humanCapitalItems = [
    'My Paystubs',
    'My Benefits',
    'My Leave Requests',
    'My Timesheet',
    'Approve Leave Requests',
    'Approve Timesheets'
  ];

  const erpApps = [
    'Approve Requisitions',
    'Order From Requisitions',
    'Approve Purchase Orders'
  ];*/

  return (
    <>
      <div className="nav-wrapper">
        <nav>
          <div className="left-nav">
            <img src={sapLogo} height="40px" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div>Home</div>

              <IoMdArrowDropdown size="1.5rem" />
            </div>
          </div>
          <div className="right-nav">
            <CiSearch size="2rem" />
            <CiMail size="2rem" />
            <CiBullhorn size="2rem" />
            <CiBellOn size="2rem" />
            <CiUser size="2rem" />
          </div>
        </nav>
      </div>

      <div className="main-wrapper">
        <main>
          <div className="bottom-nav">
            <div style={{ borderBottom: '5px solid black' }}>Human Capital</div>
            <div>ERP Logistics</div>
          </div>
          <div className="square-wrapper">
            {humanCapitalItems.map((item, i) => {
              return <Square key={i} text={item} />;
            })}
          </div>
          <div style={{ padding: '10px' }}>ERP Logistics (MM) Apps</div>
          <div className="square-wrapper">
            {erpApps.map((item, i) => {
              return <Square key={i} text={item} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
