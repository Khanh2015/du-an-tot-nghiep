import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import { getOrderDetails } from "../api/api";

// import use param from react dom
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const History = () => {
  const { carts, addCart, removeCart } = useContext(CartContext);

  const { id } = useParams();

  const isCartEmpty = carts.length === 0;

  const totalQuantity = carts.length;
  const totalPrice = carts.reduce((total, product) => total + product.price, 0);
  const finalPrice = totalPrice;

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    getOrderDetails(id).then((res) => {
      console.log("ordeDetail res", res);
      setOrderDetails(res);
    });
  }, [id]);

  return (
    <div className="container2 grid grid-cols-[3fr_1fr] gap-5 mt-16">
      {isCartEmpty ? (
        <div>
          <div className="text-center text-2xl font-semibold text-brown-strong">
            Đơn hàng của bạn trống.
          </div>
          <Link
            to={"/"}
            className="text-white px-5 py-3 bg-green-500 rounded-lg text-lg font-semibold hover:opacity-70"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="title">Giỏ hàng</h2>
          <table className="mt-5">
            <thead>
              <tr className="border-b border-brown-strong">
                <th className="text-brown-strong font-semibold text-lg">
                  Sản phẩm
                </th>
                <th className="text-brown-strong font-semibold text-lg">
                  Số lượng
                </th>
                <th className="text-brown-strong font-semibold text-lg">Giá</th>
                <th className="text-brown-strong font-semibold text-lg">
                  Tổng
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts.map((product, index) => (
                <tr key={index} className="border-b border-brown-strong">
                  <td className="text-brown-strong p-3 align-middle flex items-center gap-3 max-w-[520px]">
                    <img
                      src={`/src/assets/images/${product.image}`}
                      alt="product image"
                      className="w-[200px]"
                    />
                    <div>
                      <span className="text-lg font-semibold">
                        {product.name}
                      </span>
                      <div>
                        <div className="mt-1">Màu sắc: {product.color}</div>
                        <div className="mt-1">
                          Chất liệu: {product.material}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-brown-strong p-3 align-middle">
                    {product.quantity || 1}
                  </td>
                  <td className="text-brown-strong p-3 text-lg font-semibold">
                    {product.price.toLocaleString()} đ
                  </td>
                  <td className="text-brown-strong p-3 text-xl hover:text-red-600 cursor-pointer">
                    <i
                      className="fa-regular fa-trash-can"
                      onClick={() => removeCart(product._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <Link
              to={"/"}
              className="text-white px-5 py-3 bg-green-500 rounded-lg text-lg font-semibold hover:opacity-70"
            >
              Tiếp tục mua hàng
            </Link>
            <div
              className="text-red-600 text-lg font-semibold cursor-pointer"
              onClick={() => {
                carts.forEach((product) => removeCart(product._id));
              }}
            >
              Xóa toàn bộ giỏ hàng
            </div>
          </div>
        </div>
      )}
      {isCartEmpty || (
        <div className="mt-14 text-brown-strong">
          <h2 className="text-2xl font-bold ">Tổng tiền giỏ hàng</h2>
          <div className="flex items-center justify-between mt-4">
            <span>Tổng sản phẩm</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Tổng tiền hàng</span>
            <span className="font-semibold">
              {totalPrice.toLocaleString()} ₫
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Thành tiền</span>
            <span className="font-semibold">
              {finalPrice.toLocaleString()} ₫
            </span>
          </div>

          {/* <div className="flex items-center justify-between mt-4">
          <span>Tạm tính</span>
          <span className="font-semibold">
            {(finalPrice + 100000).toLocaleString()} ₫
          </span>
        </div> */}

          <Link
            to={"/checkout"}
            className="block mt-5 text-center py-3 text-lg font-semibold uppercase rounded-lg bg-brown-light text-white border-2 border-brown-light duration-200 hover:text-brown-light hover:border-brown-light hover:bg-white"
          >
            Đặt hàng
          </Link>
        </div>
      )}
    </div>
  );
};

export default History;
