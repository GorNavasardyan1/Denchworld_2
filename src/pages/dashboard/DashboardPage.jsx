import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { GetProductsByCategory } from "../../api";
import { GetAllCategories } from "../../api";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/admin/Modal/ModalProduct/Modal";
import Dashboard from "../../components/admin/Dashboard";
//components

import { useState, useEffect } from "react";
import NotFound from "../../components/notFound/NotFound";

export default function Hashboard() {
  //modal isWindow
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  //jwt token
  const token = localStorage.getItem("jwtToken");
  let userData;
  let tokenTime;
  if (token) {
    userData = jwt_decode(token);
    tokenTime = userData.exp - Math.floor(Date.now() / 1000);
  }
  if (tokenTime < 0) {
    localStorage.setItem("jwtToken", "");
    userData = {};
  }
  //get all category
  const [categories, setCategories] = useState([]);
  const [lastId, setLastId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    GetAllCategories().then((data) => {
      setCategories(data);
      console.log(data);
      if (!lastId && data.length > 0) {
        setLastId(data[0]._id);
        setSelectedCategory(data[0]._id);
      }
    });
  }, []);

  //get products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    GetProductsByCategory(lastId, 0, 100).then((data) => {
      setProducts(data);
      console.log(data);
      setLoading(false);
    });
  }, [lastId]);
  //delete product
  const deleteProduct = async (id) => {
    toast.loading("Deleting", { id: "1" });
    try {
      const response = await fetch(
        `https://backendv1.vercel.app/post/deleteproduct?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        toast.success(data.message, { id: "1" });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const [oneCategory, setOneCategory] = useState({});
  const [countImgae, setCountImage] = useState(0);
  const modal = (oneCategory) => {
    setActive(true);
    setOneCategory(oneCategory);
    setCountImage(0);
  };

  const nextImage = (count, len) => {
    if (len - 1 > countImgae) {
      setCountImage(countImgae + count);
    }
  };

  const lastImage = (count) => {
    if (countImgae > 0) {
      setCountImage(countImgae - count);
    }
  };

  const deletePhoto = async (productId, url) => {
    try {
      toast.loading("Deleting Photo", { id: "1" });
      const response = await fetch(
        "https://backendv1.vercel.app/post/deletephotoinproduct",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            url,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message, { id: "1" });
      } else {
        toast.error(data.message, { id: "1" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : userData?.roles?.[0] === "ADMIN" ? (
        <div>
          <AdminNavigation />
          <Dashboard
            tokenTime={tokenTime}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setLastId={setLastId}
            products={products}
            deleteProduct={deleteProduct}
            modal={modal}
          />
        </div>
      ) : (
        <NotFound />
      )}
      <Modal
        active={active}
        setActive={setActive}
        oneCategory={oneCategory}
        nextImage={nextImage}
        lastImage={lastImage}
        countImgae={countImgae}
        deletePhoto={deletePhoto}
      />
    </>
  );
}
