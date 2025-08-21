import { FC } from "react";
import AdminComponent from "./AdminComponent";
import DashBoardComponent from "./DashBoardComponent";
import UserComponent from "./UserComponent";
import PermissionsComponent from "./PermissionsComponent";
import OrganizationAccessWrapper from "./OrganizationAccessWrapper";
interface OrganizationProperties {
  activeComponent?: string;
}

const OrganizationComponent: FC<OrganizationProperties> = ({
  activeComponent,
}) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case "admin":
        return <AdminComponent />;
      case "dashboard":
        return <DashBoardComponent />;
      case "users":
        return <UserComponent />;
      case "permissions":
        return <PermissionsComponent />;
      default:
        return <DashBoardComponent />; // Default to dashboard
    }
  };

  return (
    <OrganizationAccessWrapper>
      <div className="w-full h-full">{renderComponent()}</div>
    </OrganizationAccessWrapper>
  );
};

export default OrganizationComponent;
