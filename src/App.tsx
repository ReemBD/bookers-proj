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

function App() {
  const { bookMsg } = useBooks()
  useEffect(() => {
    if (bookMsg.type) {

      (toast as any)[bookMsg.type](bookMsg.content, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
  }, [bookMsg])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <div className="App">
          <Toaster />
          <AppHeader />
          <div className="main-container">
            <Routes>
              <Route path="/books" element={<BookApp />} >
                <Route path=":bookId" element={<BookDetails />} />
                <Route path="filter" element={<BookFilter />} />
              </Route>
            </Routes>
          </div>
        </div >
      </Router >
    </LocalizationProvider>
  );
}

export default App;
