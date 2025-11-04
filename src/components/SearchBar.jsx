import React from "react";

export default function SearchBar({
  categories,
  searchName,
  setSearchName,
  searchCategory,
  setSearchCategory,
  onSearch,
}) {
  return (
    <div
      className="p-3 bg-white rounded-3 shadow-sm d-flex align-items-center gap-3 flex-wrap"
      style={{ flex: 1 }}
    >
      <div className="flex-grow-1" style={{ minWidth: "220px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sản phẩm..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <div style={{ minWidth: "200px" }}>
        <select
          className="form-select"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="">Chọn thể loại</option>
          {categories.map((c) => (
            <option key={c.id} value={c.nameCategory}>
              {c.nameCategory}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary px-4 fw-semibold" onClick={onSearch}>
        Tìm kiếm
      </button>
    </div>
  );
}
