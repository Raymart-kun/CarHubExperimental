"use client";

// import { getcarModel, addProduct } from '@/lib/actions/admin.actions';
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { addCar, getCarModels } from "@/lib/actions/agent.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "react-toastify";

function AddCar() {
  const [carModel, setcarModel] = useState("Select Car Model");
  const [selectedcarModelId, setSelectedcarModelId] = useState("");
  const [carModelList, setcarModelList] = useState<any[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const [optionsList, setOptionslist] = useState<any[]>([]);
  const [options, setOptions] = useState("");
  const [optionPrice, setOptionPrice] = useState<any>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [showImage, setShowImage] = useState("");
  const [popup, setPopup] = useState(false);
  const [newCatergoryName, setNewcarModelName] = useState("");
  const [carModelError, setcarModelError] = useState(false);
  let newcarModel = "New Car Model";
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadThing("media");
  const [disableBtn, setdisableBtn] = useState(false);

  useEffect(() => {
    getCarModelsList();
  }, []);

  async function getCarModelsList() {
    const carModelListDB = await getCarModels();

    if (carModelListDB) setcarModelList(carModelListDB);

    console.log(carModelList);
  }

  const AddPress = () => {
    let price;

    if (options !== "") {
      if (
        optionPrice === 0 ||
        optionPrice === undefined ||
        optionPrice === null ||
        optionPrice === ""
      ) {
        price = 0;
      } else price = optionPrice;

      const option = { option: options, addprice: price };
      setOptionslist([...optionsList, option]);
      setOptions("");
      setOptionPrice("");
      console.log(optionsList);
    }
  };

  const carModelPress = (carModel: any, _id: string) => {
    console.log(carModel, newcarModel);
    if (carModel === newcarModel) setPopup(true);
    else setcarModel(carModel);
    setSelectedcarModelId(_id);
  };

  const addCatergoryPress = () => {
    let text = newCatergoryName.replace(/ /g, "");
    if (text === "") setcarModelError(true);
    else {
      setcarModelList((array) => [
        ...carModelList,
        { carModelName: newCatergoryName, _id: "" },
      ]);
      setcarModel(text);
      setPopup(false);
    }

    console.log(carModelList);
  };

  const submitPress = async (e: any) => {
    let imgUrl = "";
    e.preventDefault();
    if (carModel === "Select Car Model") {
      alert("Please Select Car Model");
    } else {
      const loadingtoast = toast.loading("Adding Car to Database...");
      loadingtoast;

      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        // change value of image in form
        imgUrl = imgRes[0].url;
      }

      await addCar({
        name: e.target.productname.value,
        carImage: imgUrl,
        description: e.target.description.value,
        carModelId: selectedcarModelId,
        carModel: carModel,
        price: e.target.price.value,
        options: optionsList,
      });

      setFiles([]);
      console.log(selectedcarModelId);
      setcarModel("Select Car Model");
      // getCategories()
      e.target.reset();
      // router.refresh()

      toast.update(loadingtoast, {
        autoClose: 5000,
        closeOnClick: true,
        render: "Car Added Successfuly",
        type: "success",
        isLoading: false,
      });
      console.log("save press");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();

    // check if image selected
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      console.log("size is: ", Math.round(file.size / 1024));
      if (Math.round(file.size / 1024) > 4096) {
        alert("image must be less than 4mb");
        return;
      }

      // set selected image to files refer to const = files
      setFiles(Array.from(e.target.files));

      // if file is not image abort function
      if (!file.type.includes("image")) return;

      // get string value of image
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        // change image on form display
        setShowImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const removePress = (i: any) => {
    setOptionslist(optionsList.filter((opt, id) => i != id));
  };

  return (
    <div className="flex flex-col bg-white w-full px-5">
      <p className="self-center text-3xl text-dark font-extrabold">
        Add Car Info
      </p>
      ``
      <form className="mt-5" onSubmit={submitPress}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 justify-center place-self-start items-center">
            <div className="relative h-[200px] w-[200px] border border-black rounded-md overflow-hidden">
              {showImage ? (
                <Image
                  src={showImage}
                  alt="upload"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  className="object-contain"
                />
              ) : null}
            </div>
            <div className="flex relative overflow-hidden w-full">
              <button
                type="button"
                onClick={() => {
                  if (showImage !== "") {
                    setShowImage(""), setFiles([]);
                  } else {
                    if (ref.current) ref.current.click();
                  }
                }}
                className="bg-primary-blue py-[5px] px-3 rounded-md text-base font-bold text-white relative w-full"
              >
                {`${showImage !== "" ? "Remove Image" : "Upload Image"}`}
              </button>
              <input
                ref={ref}
                onChange={(e) => handleImage(e)}
                type="file"
                accept="image/*"
                className="absolute w-full h-full opacity-0 hidden"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <p className="font-semibold">Name</p>
              <input
                required
                name="productname"
                id="productname"
                className="border border-black py-1 px-2 rounded-md outline-none focus-within:border-primary"
              />
            </div>

            <div
              className="flex relative flex-col flex-1 overflow-visible hover:cursor-pointer focus-within:border-primary"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <p className="font-semibold">Car Model</p>
              <div
                className={`flex justify-between border py-1 px-2 ${
                  dropdown
                    ? "rounded-tl-md rounded-tr-md border-primary-blue"
                    : "rounded-md border-black"
                } outline-none items-center`}
              >
                <p className="text-base text-dark font-medium">{carModel}</p>
                {dropdown ? <FaAngleUp /> : <FaAngleDown />}
              </div>

              {dropdown && (
                <div className="absolute w-full top-[57px] shadow-md bg-white border border-primary-blue border-t-0 rounded-bl-md rounded-br-md z-10">
                  <ul className="flex flex-col gap-1">
                    {carModelList.map((cat, i) => (
                      <li
                        className="text-dark font-medium  px-2 hover:bg-primary-blue hover:text-white"
                        onClick={() => carModelPress(cat.carModelName, cat._id)}
                        key={i}
                      >
                        {cat.carModelName}
                      </li>
                    ))}
                    <li
                      className="text-dark font-medium  px-2 hover:bg-primary-blue hover:text-white"
                      onClick={() => carModelPress(newcarModel, "")}
                    >
                      {newcarModel}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold">Description</p>
            <textarea
              required
              name="description"
              id="description"
              className="border border-black py-1 px-2 rounded-md outline-none h-[150px] focus-within:border-primary"
            />
          </div>

          <div className="flex flex-col flex-1">
            <p className="font-semibold">Price</p>
            <div className="flex flex-1 border border-black py-1 px-2 rounded-md focus-within:border-primary">
              <p className="text-base font-medium">₱</p>
              <input
                name="price"
                id="price"
                type="number"
                className="outline-none flex-1 ml-2"
              />
            </div>
          </div>

          <div className="self-center">
            <button
              disabled={disableBtn}
              type="submit"
              onClick={() => AddPress()}
              className="bg-primary-blue py-[5px] px-3 rounded-md text-base font-bold text-white"
            >
              Save Car
            </button>
          </div>
        </div>
      </form>
      {popup && (
        <div className="darkbg">
          <div className="bg-white rounded-md w-full max-w-sm px-5 py-10 flex flex-col gap-3 relative">
            <FaXmark
              className="hover:cursor-pointer absolute right-4 top-4"
              size={20}
              onClick={() => {
                setPopup(false);
                setcarModelError(false);
                setNewcarModelName("");
              }}
            />

            <div className="flex flex-col flex-1">
              <p className="font-semibold">Car Model</p>
              <input
                className="border border-black py-1 px-2 rounded-md outline-none focus-within:border-primary"
                onChange={(e) => setNewcarModelName(e.target.value)}
              />
              {carModelError && (
                <p className="font-normal text-sm text-primary">
                  please fill up the field!
                </p>
              )}
            </div>

            <div className="w-full" onClick={() => addCatergoryPress()}>
              <button
                type="button"
                className={`${
                  disableBtn ? "bg-gray-700" : "bg-primary-blue"
                } py-[5px] px-3 rounded-md text-base font-bold text-white w-full`}
              >
                Add Car Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCar;
