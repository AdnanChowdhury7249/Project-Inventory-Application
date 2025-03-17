import { useState, useEffect } from "react";
import { getAllItems } from "../api";

const AllItemsPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllItems()
      .then((res) =>
        setItems(res.data))
      .catch((error) => console.error("error displaying items", error))
  }, [])

  return (
    <div>
      <h2 className="text-center text-2xl font-bold py-10">All Items</h2>
      <div className="flex justify-center  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-full max-w-5xl">
          {items.map((item) => (
            <div key={item.id}
              className=" border rounded-3xl shadow border-gray-200 bg-white 
             transition-transform duration-500 ease-in-out 
             hover:scale-102 hover:shadow-lg">
              {item.image_url && (
                <div className=" rounded-t-3xl w-full h-50 flex justify-center items-center bg-gray-100  overflow-hidden">
                  <img
                    src={`http://localhost:5000${item.image_url}`}
                    alt={item.name}
                    className=" w-full h-full object-fill"
                  />
                </div>
              )}
              <div className="flex items-center justify-between my-4">
                <h2 className=" ml-8 text-lg font-bold">{item.name}</h2>
                <div className="flex space-x-2 mr-4">
                </div>
              </div>
              <p className="ml-8 ">{item.description}</p>
              <p className="ml-8 my-8 text-gray-500 text-sm my-2.5">Category: {item.category_name}</p>
            </div>

          ))}

        </div>
      </div >
    </div>
  )
}

export default AllItemsPage
