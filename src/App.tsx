import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/LoginContainer'
import Registration from './pages/Registration/RegistrationContainer'
import Dashboard from './pages/Dashboard/DashboardContainer'
import Users from './pages/Users/UsersContainer'
import Roles from './pages/Roles/RolesContainer'
import UserRoles from './pages/UserRoles/UserRolesContainer'
import AssigneeGroups from './pages/AssigneeGroups/AssigneeGroupsContainer'
import AssigneeGroupUsers from './pages/AssigneeGroupUsers/AssigneeGroupUsersContainer'
import CaseStatus from './pages/CaseStatus/CaseStatusContainer'
import GroupCaseStatus from './pages/GroupCaseStatus/GroupCaseStatusContainer'
import ScDepartments from './pages/ScDepartments/ScDepartmentsContainer'
import ScCategory from './pages/ScCategory/ScCategoryContainer'
import ScSubCategory from './pages/ScSubCategory/ScSubCategoryContainer'
import ScServices from './pages/ScServices/ScServicesContainer'
import Cases from './pages/Cases/CasesContainer'

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="user-roles" element={<UserRoles />} />
          <Route path="assignee-groups" element={<AssigneeGroups />} />
          <Route path="assignee-group-users" element={<AssigneeGroupUsers />} />
          <Route path="case-status" element={<CaseStatus />} />
          <Route path="group-case-status" element={<GroupCaseStatus />} />
          <Route path="sc-departments" element={<ScDepartments />} />
          <Route path="sc-category" element={<ScCategory />} />
          <Route path="sc-subcategory" element={<ScSubCategory />} />
          <Route path="sc-services" element={<ScServices />} />
          <Route path="cases" element={<Cases />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
