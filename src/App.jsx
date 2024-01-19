import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import sapLogo from './assets/sap-logo.png';
import { FaSearch } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiBullhorn } from 'react-icons/ci';
import { CiBellOn } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
// import Square from './components/Square.jsx';
import Square from './components/Square';

function App() {
  const [count, setCount] = useState(0);

  const items = [
    'My Paystubs',
    'My Benefits',
    'My Leave Requests',
    'My Timesheet',
    'Approve Leave Requests',
    'Approve Timesheets'
  ];

  const bottomItems = [
    'Approve Requisitions',
    'Order From Requisitions',
    'Approve Purchase Orders'
  ];

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
            {items.map((item, i) => {
              return <Square key={i} text={item} />;
            })}
          </div>
          <div style={{ padding: '10px' }}>ERP Logistics (MM) Apps</div>
          <div className="square-wrapper">
            {bottomItems.map((item, i) => {
              return <Square key={i} text={item} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
