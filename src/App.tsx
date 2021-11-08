import { useBooks } from 'lib/hooks/useBooks';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookApp } from 'views/BookApp';
import { BookDetails } from 'views/BookDetails';
import { AppHeader } from './cmps/base/app-header';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BookFilter } from 'cmps/book-app/cmps/book-filter';
import { Homepage } from 'views/Homepage';
import { LoginSignup } from 'views/LoginSignup';
import { bookersToast } from 'lib/hooks/bookersToast';
import { ModalPortal } from 'cmps/base/modal-portal';

function App() {
  const { bookMsg } = useBooks()
  useEffect(() => {
    if (bookMsg.type) {

      bookersToast[bookMsg.type](bookMsg.content)
    }
  }, [bookMsg])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <div className="App">
          <ModalPortal/>
          <Toaster />
          <AppHeader />
          <div className="main-container">
            <Routes>
              <Route path="/books" element={<BookApp />} >
                <Route path=":bookId" element={<BookDetails />} />
                <Route path="filter" element={<BookFilter />} />
              </Route>
              <Route path="/enter" element={<LoginSignup />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </div >
      </Router >
    </LocalizationProvider>
  );
}

export default App;
