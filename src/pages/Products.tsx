import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Header } from '../components/Header';
import { addProduct, generateInvoice } from "../store/slices/productSlice";
import { RootState, AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { Logo } from "../components/Logo";

export const Products = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    rate: "",
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      name: formData.name,
      quantity: Number(formData.quantity),
      rate: Number(formData.rate),
      total: Number(formData.quantity) * Number(formData.rate),
      gst: Number(formData.quantity) * Number(formData.rate) * 0.18,
    };
    dispatch(addProduct(product as any));
    setFormData({ name: "", quantity: "", rate: "" });
  };

  const handleGenerateInvoice = () => {
    dispatch(generateInvoice(products as any));
  };

  const calculateTotal = () => {
    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const gst = subtotal * 0.18;
    return {
      subtotal,
      gst,
      total: subtotal + gst,
    };
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      <header className="px-6 py-2 bg-[#1F1F1F] flex justify-between items-center">
        {" "}
        {/* Match Register header */}
        <Logo />
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#B6F09C] text-black rounded hover:bg-[#a5e08b] transition-colors"
        >
          Logout
        </button>
      </header>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-4">Add Products</h1>
      

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-white mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
              placeholder="Enter the product name"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Product Price</label>
            <input
              type="number"
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: e.target.value })
              }
              className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
              placeholder="Enter the price"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full p-3 rounded bg-[#2A2A2A] text-white border border-gray-700 focus:outline-none focus:border-[#B6F09C]"
              placeholder="Enter the Qty"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors flex items-center gap-2 w-fit"
          >
            Add Product
            <span className="text-xl">+</span>
          </button>
        </form>

        {products.length > 0 && (
          <>
            <div className="bg-black text-white rounded-tl-lg rounded-tr-lg overflow-hidden mb-8 border border-gray-700">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-black">
                  <tr>
                    <th className="px-6 py-3 text-left border-b border-gray-700">
                      Product Name <span className="text-2xl font-bold">↑</span>
                    </th>
                    <th className="px-6 py-3 text-left border-b border-gray-700">
                      Quantity <span className="text-2xl font-bold">↓</span>
                    </th>
                    <th className="px-6 py-3 text-left border-b border-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left border-b border-gray-700">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="px-6 py-4 border-b border-gray-700">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-700">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-700">
                        ₹{product.rate}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-700">
                        ₹{product.total}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-700">
                    <td
                      colSpan={3}
                      className="px-20 py-4 text-right border-b border-gray-700"
                    >
                      +GST 18%
                    </td>
                    <td className="px-6 py-4 border-b border-gray-700">
                      ₹{totals.gst.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerateInvoice}
                className="px-8 py-3 bg-[#2A2A2A] text-[#B6F09C] rounded hover:bg-[#3A3A3A] transition-colors"
              >
                Generate PDF Invoice
              </button>
            </div>
          </>
        )}
      </div>
      <div className="absolute w-[200px] h-[150px] left-[500.13px] top-[10px] bg-[#4F59A8] filter blur-[170px] transform rotate-[-90deg] z-0"></div>
    </div>
  );
};
