  import './App.css';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
  import { Children, lazy, Suspense } from 'react';
  import Footer from "./components/Footer/Footer";
  import Navbaar from "./components/Navbaar/Navbaar";
  import ErrorBoundary from './components/errorboundary/ErrorBoundary'
  import { Provider } from 'react-redux';
  import { store } from './store/configration';
  import { PersistGate } from 'redux-persist/integration/react';
  // import Invoice from './components/Invoice';
  const Login = lazy(() => import('./components/login/Login'))
  const Home = lazy(() => import('./components/Home/home'));
  const Dashboard = lazy(()=>import('./components/DashboardFile/dashboard'))
  const Member = lazy(() => import('./components/member/Member'))
  const SingleMemberBookPrinting = lazy(() => import('./components/member/SingleMemberShares'))
  const SingleMemberTransactions = lazy(() => import('./components/member/SingleMemberTransactions'))
  const SingleMemberLoan = lazy(() => import('./components/member/SingleMemberLoan'))
  const SingleLoanCalculator = lazy (()=>import('./components/member/SingleLoanCalculator'))
  const LoanRequestForm = lazy (()=>import('./components/member/LoanRequestForm'))
  const LoanForm = lazy (()=>import('./components/member/LoanForm'))
  const MemberForm1 = lazy (()=>import('./components/member/MemberForm1'))
  const MemberForm2 = lazy (()=>import('./components/member/MemberForm2'))
  const MemberForm3 = lazy (()=>import('./components/member/MemberForm3'))
  const GuranteeForm = lazy(()=>import('./components/member/GuranteeForm'))
  const GuranteeRequests = lazy(()=>import('./components/member/GuranteeRequests'))
  const ParentTabs = lazy(()=>import('./components/member/ParentTabs'));
  const Add = lazy(() => import('./components/add/Add'))


  const USER_TYPES = {
    PUBLIC:"Public User",
    NORMAL:"Normal User",
    ADMIN_USER:"Admin User"
  }
  const CURRENT_USER = USER_TYPES.ADMIN_USER

  function App() {
    return (
      <div className="app">
        <Provider store={store}>
          <Router>
            <ErrorBoundary>
              <Suspense fallback={
                <div className="d-flex justify-content-center" style={{height:"100vh",width:"100%",background:"white"}}>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c8529f91-daaf-4193-ba2e-0c153785b4ab/d9fndfy-7ceccbdb-2a9c-4b0d-b10f-2a32bfb4cdd8.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M4NTI5ZjkxLWRhYWYtNDE5My1iYTJlLTBjMTUzNzg1YjRhYlwvZDlmbmRmeS03Y2VjY2JkYi0yYTljLTRiMGQtYjEwZi0yYTMyYmZiNGNkZDguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OWXyGQSzsBACLG_bus4F-1IpGMnP-FwQZ841OLnwO5U" className="images" alt="..."
                  ></img>
                  </div>
                  
                  }> 
                  <PersistGate persistor={store.__PERSISTOR} loading={null}>
                    <Navbaar  /> 
                    <div className='content'>
                      <Routes>
                      <Route path="/member/login" element={<AuthorizedElement allowedUserTypes={[USER_TYPES.PUBLIC,USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><Login USER={USER_TYPES.NORMAL} /></AuthorizedElement>} />
                      
                      <Route path="/admin/login" element={<AuthorizedElement allowedUserTypes={[USER_TYPES.PUBLIC,USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><Login 
                      USER={USER_TYPES.ADMIN_USER}/></AuthorizedElement>} />

                      <Route path="/home" element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER]}><Home CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path="/" element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL,USER_TYPES.PUBLIC]}><Dashboard  CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}  /></AuthorizedElement>} />

                      <Route path='/member' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER]}>
                        <Member CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES} AuthorizedElement={AuthorizedElement}/></AuthorizedElement>} />

                      <Route path='/member/:id/shares' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><SingleMemberBookPrinting  CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/transactions/:loan_id' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><SingleMemberTransactions  CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loan' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><SingleMemberLoan CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanCalculator' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><SingleLoanCalculator CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanRequest' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><LoanRequestForm CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanForm' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><LoanForm CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanform1' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><MemberForm1 CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanform2' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><MemberForm2 CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/loanform3' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><MemberForm3 CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/gurantorForm' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><GuranteeForm CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />

                      <Route path='/member/:id/viewRequests' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><GuranteeRequests CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />
                      
                      <Route path='/member/:id/pages' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER, USER_TYPES.NORMAL]}><ParentTabs  CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />
                      
                      <Route path='/add' element={<AuthorizedElement allowedUserTypes={[USER_TYPES.ADMIN_USER]}><Add CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/></AuthorizedElement>} />


                      <Route path="*" element={<img width="100%" height="750px" src="https://miro.medium.com/max/1400/1*zBFBJktPD3_z0S_35kO5Hg.gif" alt="not found" />} />

                      </Routes>  
                    </div>
                    <Footer />   
                  </PersistGate>
              </Suspense>
            </ErrorBoundary>
          </Router>
        </Provider>
      </div>
    );
  }


  function AuthorizedElement({ children, allowedUserTypes }) {
    const isUserAuthorized = allowedUserTypes.includes(CURRENT_USER);
  
    if (isUserAuthorized) {
      return <>{children}</>;
    }
  }
  export default App;
