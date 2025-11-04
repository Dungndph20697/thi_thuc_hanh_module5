import React, { useEffect, useState } from "react";
import axios from "axios";
import FormAddProduct from "./FormAddProduct";
import SearchBar from "./SearchBar";

export default function ListProduct() {
  const [listProduct, setListProduct] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const loadData = async () => {
    try {
      const [productRes, categoryRes] = await Promise.all([
        axios.get("http://localhost:3000/product"),
        axios.get("http://localhost:3000/category"),
      ]);

      const products = productRes.data;
      const categories = categoryRes.data;

      const merged = products.map((p) => {
        const category = categories.find((c) => c.id === Number(p.categoryId));
        return {
          ...p,
          categoryName: category ? category.nameCategory : "Không rõ",
          description: p.description || "-",
        };
      });

      merged.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));

      setListProduct(merged);
      setFilteredList(merged); 
      setCategories(categories);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    let result = listProduct.filter((p) => {
      const matchName =
        searchName === "" ||
        p.nameProduct.toLowerCase().includes(searchName.toLowerCase());
      const matchCategory =
        searchCategory === "" || p.categoryName === searchCategory;
      return matchName && matchCategory;
    });

    setFilteredList(result);
    setNoResult(result.length === 0);
  };

  return (
    <>
      <h1>Danh sách sản phẩm</h1>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <SearchBar
          categories={categories}
          searchName={searchName}
          setSearchName={setSearchName}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          onSearch={handleSearch}
        />
        <FormAddProduct onAddSuccess={loadData} />
      </div>

      {noResult ? (
        <div className="alert alert-warning text-center">Không có kết quả</div>
      ) : (
        <table className="table table-hover text-center align-middle table-striped big-table">
          <thead className="table-light">
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Thể loại</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Ngày nhập sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.codeProduct}</td>
                <td>{p.nameProduct}</td>
                <td>{p.description}</td>
                <td>{p.categoryName}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  {p.importDate
                    ? new Date(p.importDate).toLocaleDateString("vi-VN")
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
