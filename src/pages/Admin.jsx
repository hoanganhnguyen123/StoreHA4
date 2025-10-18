// src/pages/Admin.jsx
import imageCompression from "browser-image-compression";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useArts } from "../context/ArtContext";
import { artSamples } from "../data/artSamples";

export default function Admin() {
  const navigate = useNavigate();
  const { arts: artworks, setArts } = useArts();

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tất cả");

  const [newArt, setNewArt] = useState({
    title: "",
    category: "Di tích lịch sử",
    description: "",
    priceCanvas: "",
    priceShirt: "",
    priceCup: "",
    priceDigital: "",
    imageCanvas: "",
    imageShirt: "",
    imageCup: "",
    imageDigital: "",
    warrantyType: "Bảo hành nhà cung cấp",
    warrantyPeriod: "12 tháng",
    style: "Cổ điển",
    material: "Gỗ",
    origin: "Trong nước",
    glassType: "Single",
    shipFrom: "TP.HCM",
  });

  // ✅ Load dữ liệu ban đầu
  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin !== "true") navigate("/admin-login");
    else {
      const saved = JSON.parse(localStorage.getItem("artworks"));
      if (saved && saved.length > 0) setArts(saved);
      else {
        setArts(artSamples);
        localStorage.setItem("artworks", JSON.stringify(artSamples));
      }
    }
  }, [navigate, setArts]);

 // ✅ Thêm hoặc cập nhật sản phẩm (phiên bản tối ưu)
const handleAddOrUpdate = () => {
  // 1️⃣ Kiểm tra hợp lệ tối thiểu
  if (!newArt.title.trim()) {
    alert("⚠️ Vui lòng nhập tên sản phẩm!");
    return;
  }
  if (!newArt.priceCanvas || Number(newArt.priceCanvas) <= 0) {
    alert("⚠️ Vui lòng nhập giá hợp lệ cho Tranh Canvas!");
    return;
  }

  // 2️⃣ Kiểm tra hợp lệ ảnh
  const imageFields = [
    "imageCanvas",
    "imageShirt",
    "imageCup",
    "imageDigital",
  ];

  // Nếu người dùng để trống -> tự sinh ảnh placeholder
  const checkedImages = {};
  imageFields.forEach((field) => {
    checkedImages[field] =
      newArt[field] && newArt[field].startsWith("data:image")
        ? newArt[field] // base64 hợp lệ
        : newArt[field] && newArt[field].startsWith("http")
        ? newArt[field] // URL hợp lệ
        : `https://dummyimage.com/400x400/ccc/fff&text=${encodeURIComponent(
            field.replace("image", "")
          )}`;
  });

  // 3️⃣ Cấu trúc dữ liệu chuẩn
  const formattedArt = {
    title: newArt.title.trim(),
    category: newArt.category,
    description: newArt.description || "Không có mô tả",
    images: {
      "Tranh Canvas": checkedImages.imageCanvas,
      "Áo Thun In Hình": checkedImages.imageShirt,
      "Cốc Nghệ Thuật": checkedImages.imageCup,
      "File Kỹ Thuật Số (Digital Art)": checkedImages.imageDigital,
    },
    price: {
      "Tranh Canvas": Number(newArt.priceCanvas) || 0,
      "Áo Thun In Hình": Number(newArt.priceShirt) || 0,
      "Cốc Nghệ Thuật": Number(newArt.priceCup) || 0,
      "File Kỹ Thuật Số (Digital Art)": Number(newArt.priceDigital) || 0,
    },
    details: {
      warrantyType: newArt.warrantyType,
      warrantyPeriod: newArt.warrantyPeriod,
      style: newArt.style,
      material: newArt.material,
      origin: newArt.origin,
      glassType: newArt.glassType,
      shipFrom: newArt.shipFrom,
    },
  };

  // 4️⃣ Cập nhật hoặc thêm mới
  let updated = [];
  if (editingId) {
    updated = artworks.map((a) =>
      a.id === editingId ? { ...a, ...formattedArt } : a
    );
  } else {
    const newItem = {
      id: Date.now(),
      ...formattedArt,
    };
    updated = [...artworks, newItem];
  }

  // 5️⃣ Lưu localStorage an toàn
  try {
    setArts(updated);
    localStorage.setItem("artworks", JSON.stringify(updated));
    alert(editingId ? "✅ Đã lưu thay đổi!" : "✅ Đã thêm sản phẩm mới!");
  } catch (err) {
    console.error("Lỗi lưu localStorage:", err);
    alert("⚠️ Không thể lưu dữ liệu! Ảnh có thể quá lớn (vượt 5MB).");
  }

  // 6️⃣ Reset form
  setNewArt({
    title: "",
    category: "Di tích lịch sử",
    description: "",
    priceCanvas: "",
    priceShirt: "",
    priceCup: "",
    priceDigital: "",
    imageCanvas: "",
    imageShirt: "",
    imageCup: "",
    imageDigital: "",
    warrantyType: "Bảo hành nhà cung cấp",
    warrantyPeriod: "12 tháng",
    style: "Cổ điển",
    material: "Gỗ",
    origin: "Trong nước",
    glassType: "Single",
    shipFrom: "TP.HCM",
  });

  setEditingId(null);


  };

  // ✅ Xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const updated = artworks.filter((a) => a.id !== id);
      setArts(updated);
      localStorage.setItem("artworks", JSON.stringify(updated));
    }
  };

  // ✅ Chỉnh sửa sản phẩm
  const handleEdit = (art) => {
    setEditingId(art.id);
    setNewArt({
      title: art.title,
      category: art.category,
      description: art.description,
      priceCanvas: art.price["Tranh Canvas"],
      priceShirt: art.price["Áo Thun In Hình"],
      priceCup: art.price["Cốc Nghệ Thuật"],
      priceDigital: art.price["File Kỹ Thuật Số (Digital Art)"],
      imageCanvas: art.images["Tranh Canvas"],
      imageShirt: art.images["Áo Thun In Hình"],
      imageCup: art.images["Cốc Nghệ Thuật"],
      imageDigital: art.images["File Kỹ Thuật Số (Digital Art)"],
      ...art.details,
    });
  };

  // ✅ Upload hoặc nhập URL ảnh
  const ImageInput = ({ label, value, onChange }) => {
    const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🧩 Cấu hình nén ảnh
  const options = {
    maxSizeMB: 0.3, // tối đa ~300KB
    maxWidthOrHeight: 800, // resize nếu ảnh quá to
    useWebWorker: true,
  };

  try {
    // 🔹 Nén ảnh trước khi đọc base64
    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ target: { value: reader.result } });
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error("Lỗi nén ảnh:", error);
    alert("⚠️ Không thể xử lý ảnh. Vui lòng chọn ảnh khác nhỏ hơn 5MB.");
  }
};

    return (
      <div className="flex flex-col gap-2 border p-3 rounded-lg bg-gray-50">
        <label className="font-medium text-sm text-gray-700">{label}</label>
        <input
          placeholder={`URL ${label}`}
          value={value}
          onChange={onChange}
          className="border p-2 rounded text-sm"
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
        {value && (
          <img src={value} alt={label} className="w-24 h-24 object-cover rounded border mt-1" />
        )}
      </div>
    );
  };

  // ✅ Lọc sản phẩm theo tìm kiếm và danh mục
  const filteredArtworks = artworks.filter((art) => {
    const matchSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      filterCategory === "Tất cả" || art.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-700">🎨 Quản trị sản phẩm</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>

      {/* Form thêm/chỉnh sửa */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
        </h2>

        {/* Thông tin chính */}
        <div className="grid md:grid-cols-3 gap-3 mb-3">
          <input
            placeholder="Tên tranh"
            value={newArt.title}
            onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={newArt.category}
            onChange={(e) => setNewArt({ ...newArt, category: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Di tích lịch sử</option>
            <option>Văn hóa dân gian</option>
            <option>Phong cảnh Việt Nam</option>
            <option>Chân dung nghệ thuật</option>
            <option>Khác</option>
          </select>

          <div className="col-span-3">
            <label className="font-medium text-gray-700 block mb-2">📝 Mô tả sản phẩm (dài)</label>
            <textarea
                placeholder="Nhập mô tả chi tiết sản phẩm..."
                value={newArt.description}
                onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                className="border p-3 rounded w-full h-40 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

        </div>

        {/* Giá */}
        <div className="grid md:grid-cols-4 gap-3 mb-3">
          {["Canvas", "Shirt", "Cup", "Digital"].map((type) => (
            <input
              key={type}
              type="number"
              placeholder={`Giá ${type}`}
              value={newArt[`price${type}`]}
              onChange={(e) => setNewArt({ ...newArt, [`price${type}`]: e.target.value })}
              className="border p-2 rounded"
            />
          ))}
        </div>

        {/* Hình ảnh */}
        <h3 className="font-semibold mt-4 mb-2 text-gray-700">🖼 Hình ảnh sản phẩm</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-3">
          <ImageInput
            label="Tranh Canvas"
            value={newArt.imageCanvas}
            onChange={(e) => setNewArt({ ...newArt, imageCanvas: e.target.value })}
          />
          <ImageInput
            label="Áo Thun"
            value={newArt.imageShirt}
            onChange={(e) => setNewArt({ ...newArt, imageShirt: e.target.value })}
          />
          <ImageInput
            label="Cốc Nghệ Thuật"
            value={newArt.imageCup}
            onChange={(e) => setNewArt({ ...newArt, imageCup: e.target.value })}
          />
          <ImageInput
            label="File Kỹ Thuật Số"
            value={newArt.imageDigital}
            onChange={(e) => setNewArt({ ...newArt, imageDigital: e.target.value })}
          />
        </div>
 {/* Chi tiết */}
        <h3 className="font-semibold mt-4 mb-2 text-gray-700">📦 Chi tiết sản phẩm</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={newArt.warrantyType}
            onChange={(e) => setNewArt({ ...newArt, warrantyType: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Bảo hành nhà cung cấp</option>
            <option>Bảo hành chính hãng</option>
            <option>Không bảo hành</option>
          </select>
          <select
            value={newArt.warrantyPeriod}
            onChange={(e) => setNewArt({ ...newArt, warrantyPeriod: e.target.value })}
            className="border p-2 rounded"
          >
            <option>6 tháng</option>
            <option>12 tháng</option>
            <option>24 tháng</option>
          </select>
          <select
            value={newArt.style}
            onChange={(e) => setNewArt({ ...newArt, style: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Cổ điển</option>
            <option>Hiện đại</option>
            <option>Trừu tượng</option>
            <option>Tối giản</option>
          </select>
          <select
            value={newArt.material}
            onChange={(e) => setNewArt({ ...newArt, material: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Gỗ</option>
            <option>Vải canvas</option>
            <option>Gốm</option>
            <option>Nhựa</option>
          </select>
          <select
            value={newArt.origin}
            onChange={(e) => setNewArt({ ...newArt, origin: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Trong nước</option>
            <option>Nhập khẩu</option>
          </select>
          <select
            value={newArt.shipFrom}
            onChange={(e) => setNewArt({ ...newArt, shipFrom: e.target.value })}
            className="border p-2 rounded"
          >
            <option>TP.HCM</option>
            <option>Hà Nội</option>
            <option>Bình Dương</option>
            <option>Đà Nẵng</option>
          </select>
        </div>
        <button
          onClick={handleAddOrUpdate}
          className={`mt-5 ${
            editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-6 py-2 rounded-lg`}
        >
          {editingId ? "💾 Lưu thay đổi" : "➕ Thêm sản phẩm"}
        </button>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Tất cả</option>
          <option>Di tích lịch sử</option>
          <option>Văn hóa dân gian</option>
          <option>Phong cảnh Việt Nam</option>
          <option>Chân dung nghệ thuật</option>
          <option>Khác</option>
        </select>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((art) => (
          <div key={art.id} className="bg-white shadow-lg rounded-xl p-4 flex flex-col">
            <img
              src={Object.values(art.images)[0]}
              alt={art.title}
              className="rounded-lg mb-3 h-48 w-full object-cover"
            />
            <h3 className="font-semibold text-lg text-indigo-700">{art.title}</h3>
            <p className="text-gray-500 text-sm">{art.category}</p>
            <p className="text-gray-600 text-sm mb-2">{art.description}</p>

            <div className="bg-gray-100 p-2 rounded text-sm mb-2">
              {Object.entries(art.price).map(([type, price]) => (
                <p key={type}>
                  <strong>{type}:</strong> {price.toLocaleString()} đ
                </p>
              ))}
            </div>

            <details className="text-sm bg-gray-50 p-2 rounded">
              <summary className="cursor-pointer font-semibold">Chi tiết sản phẩm</summary>
              <ul className="text-gray-600 mt-1 list-disc ml-5">
                {Object.entries(art.details || {}).map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}:</strong> {v}
                  </li>
                ))}
              </ul>
            </details>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(art)}
                className="flex-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                ✏️ Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(art.id)}
                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
