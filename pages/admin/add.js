import AddProduct from "../../components/Admin/AddProduct";
import AdminCheck from "../../components/Admin/AdminCheck";

const AddProductPage = () => {
  return (
    <AdminCheck>
      <main>
        <AddProduct/>
      </main>
    </AdminCheck>
  );
};

export default AddProductPage;
